const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const { Track, UserShortTrack, Sequelize } = require('../../db/models')
const { Op } = Sequelize

const shortTracksScene = new BaseScene('shortTracks')
const userTrackIndex = {}

shortTracksScene.enter(ctx => {
	const intro = [
		`🎧 <b>Добро пожаловать в раздел коротких треков!</b>`,
		`🔊 На экзамене тебе предстоит прослушать 8 коротких треков и дать по каждому <b>диспетчерскую реакцию</b>.`,
		`📋 <b>Алгоритм действий:</b>`,
		`1️⃣ Прослушай трек один раз и отреагируй как диспетчер.`,
		`2️⃣ Не понял? Попроси повторить и включи трек повторно. <b>*Не больше двух раз!</b>`,
		`3️⃣ Ответил? Жми "🟢 Трек легкий" или "🔴 Трек тяжёлый".`,
		`4️⃣ Я запомню тяжёлые треки — позже ты сможешь повторить их с кнопкой "🔁 Повторить тяжёлые треки".`,
		`🧠 Чтобы правильно отреагировать, ответь на три вопроса:`,
		`<i>• What did the pilot report?</i>`,
		`<i>• What was the problem?</i>`,
		`<i>• What did the pilot request?</i>`,
		`🚀 <b>Готов начать?</b> Жми кнопку ниже!`,
	].join('\n')

	ctx.replyWithHTML(
		intro,
		Markup.keyboard([
			['🟢 I’m ready!'],
			['🔁 Повторить тяжёлые треки'],
			['⬅️ Назад'],
		]).resize()
	)
})

shortTracksScene.hears('🟢 I’m ready!', async ctx => {
	const chatId = ctx.chat.id

	if (userTrackIndex[chatId]?.isRunning) {
		return ctx.reply('⚠️ Серия уже начата. Заверши текущие треки.')
	}

	try {
		const evaluatedTrackIds = await UserShortTrack.findAll({
			where: { userId: chatId },
			attributes: ['trackId'],
		}).then(r => r.map(e => e.trackId))

		const tracks = await Track.findAll({
			where: {
				status: null,
				id: { [Op.notIn]: evaluatedTrackIds },
			},
			order: [['createdAt', 'ASC']],
			limit: 8,
		})

		if (!tracks.length) {
			return ctx.reply('🪂 Нет новых треков!')
		}

		userTrackIndex[chatId] = {
			index: 0,
			trackList: tracks,
			isRetry: false,
			isRunning: true,
		}

		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при загрузке треков:', error)
		ctx.reply('⚠️ Не удалось загрузить треки.')
	}
})

shortTracksScene.hears('🔁 Повторить тяжёлые треки', async ctx => {
	const chatId = ctx.chat.id

	if (userTrackIndex[chatId]?.isRunning) {
		return ctx.reply('⚠️ Серия уже запущена. Заверши текущие треки.')
	}

	try {
		const pendingTracks = await UserShortTrack.findAll({
			where: { userId: chatId, status: false },
			include: [{ model: Track, where: { status: null } }],
			order: [['createdAt', 'ASC']],
		}).then(r => r.map(e => e.Track))

		if (!pendingTracks.length) {
			return ctx.reply('👌 У тебя пока нет тяжёлых треков для повторения.')
		}

		userTrackIndex[chatId] = {
			index: 0,
			trackList: pendingTracks,
			isRetry: true,
			isRunning: true,
		}

		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при загрузке повторных треков:', error)
		ctx.reply('⚠️ Не удалось загрузить повтор.')
	}
})

shortTracksScene.hears('⬅️ Назад', ctx => {
	delete userTrackIndex[ctx.chat.id]
	ctx.scene.enter('audio')
})

shortTracksScene.hears(['🟢 Трек легкий', '🔴 Трек тяжёлый'], async ctx => {
	const chatId = ctx.chat.id
	const state = userTrackIndex[chatId]
	if (!state) return

	const track = state.trackList[state.index]
	const isEasy = ctx.message.text.includes('легкий')

	try {
		// ⚠️ Только в обычной серии проверяем, оценивал ли уже пользователь
		if (!state.isRetry) {
			const alreadyEvaluated = await UserShortTrack.findOne({
				where: { userId: chatId, trackId: track.id },
			})

			if (alreadyEvaluated) {
				await ctx.reply('⚠️ Ты уже оценил этот трек.')
				return
			}
		}

		// ✅ Сохраняем или обновляем оценку
		await UserShortTrack.upsert({
			userId: chatId,
			trackId: track.id,
			status: isEasy,
			sentAt: new Date(),
		})

		userTrackIndex[chatId].index += 1
		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при сохранении:', error)
		ctx.reply('⚠️ Не удалось сохранить выбор.')
	}
})

shortTracksScene.leave(ctx => {
	delete userTrackIndex[ctx.chat.id]
})

async function sendNextTrack(ctx, chatId) {
	const state = userTrackIndex[chatId]
	const { trackList, index, isRetry } = state

	if (index >= trackList.length) {
		delete userTrackIndex[chatId]
		return ctx.reply(
			'✅ Все треки обработаны!',
			Markup.keyboard([['⬅️ Назад']]).resize()
		)
	}

	const track = trackList[index]

	if (!track.fileId || !/^[\w-]{10,}$/.test(track.fileId)) {
		console.warn(`Некорректный fileId: ${track.fileId}`)
		userTrackIndex[chatId].index += 1
		return await sendNextTrack(ctx, chatId)
	}

	const directUrl = `https://drive.google.com/uc?export=download&id=${track.fileId}`

	let caption = [
		isRetry ? '🔁 Этот трек вызвал затруднение ранее. Попробуй снова!' : '',
		`✈️ <b>Позывной:</b> ${track.title}`,
		`🎙️ <b>Трек ${index + 1} из ${trackList.length}</b>`,
	]
		.filter(Boolean)
		.join('\n')

	// await ctx.reply('🔄 Загружаем трек...')
	await ctx.replyWithAudio({ url: directUrl }, { caption, parse_mode: 'HTML' })

	await ctx.reply(
		'💬 Насколько тебе был понятен трек?',
		Markup.keyboard([['🟢 Трек легкий'], ['🔴 Трек тяжёлый'], ['⬅️ Назад']])
			.resize()
			.oneTime()
	)
}

module.exports = shortTracksScene
