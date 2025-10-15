const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const { longTrack, UserLongTrack, Sequelize } = require('../../db/models')
const { Op } = Sequelize

const longTracksScene = new BaseScene('longTracks')
const userTrackIndex = {}

longTracksScene.enter(ctx => {
	const intro = [
		`🎧 <b>Раздел: длинные треки</b>`,
		`🛫 На экзамене по авиационному английскому тебе нужно прослушать 2 трека и <b>пересказать ситуацию</b>.`,
		`💡 Запомни детали: тип проблемы, запрос пилота, курс, высота и другие элементы.`,
		`📋 <b>Алгоритм:</b>`,
		`1️⃣ Прослушай трек до двух раз.`,
		`2️⃣ Запиши основные детали.`,
		`3️⃣ Перескажи ситуацию в своей форме.`,
		`4️⃣ Отметь сложность: "🟢 Лёгкий" или "🔴 Тяжёлый".`,
		`5️⃣ Тяжёлые треки можно будет повторить позже — с кнопкой "🔁 Повторить".`,
		`🧠 Для ориентира я буду отправлять позывной и тип проблемы.`,
		`🚀 <b>Готов приступить?</b> Жми "🟢 I’m ready!"`,
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

longTracksScene.hears('🟢 I’m ready!', async ctx => {
	const chatId = ctx.chat.id

	if (userTrackIndex[chatId]?.isRunning) {
		return ctx.reply('⚠️ Серия уже запущена. Заверши текущие треки.')
	}

	try {
		const evaluatedIds = await UserLongTrack.findAll({
			where: { userId: chatId },
			attributes: ['trackId'],
		}).then(r => r.map(e => e.trackId))

		const tracks = await longTrack.findAll({
			where: { status: null, id: { [Op.notIn]: evaluatedIds } },
			order: [['createdAt', 'ASC']],
			limit: 2,
		})

		if (!tracks.length) {
			return ctx.reply('🪂 Нет новых треков.')
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

longTracksScene.hears('🔁 Повторить тяжёлые треки', async ctx => {
	const chatId = ctx.chat.id

	if (userTrackIndex[chatId]?.isRunning) {
		return ctx.reply('⚠️ Сначала заверши текущую серию.')
	}

	try {
		const retryTracks = await UserLongTrack.findAll({
			where: { userId: chatId, status: false },
			include: [{ model: longTrack, where: { status: null } }],
			order: [['createdAt', 'ASC']],
		}).then(r => r.map(e => e.longTrack))

		if (!retryTracks.length) {
			return ctx.reply('👌 У тебя пока нет тяжёлых треков для повторения.')
		}

		userTrackIndex[chatId] = {
			index: 0,
			trackList: retryTracks,
			isRetry: true,
			isRunning: true,
		}

		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при повторной загрузке:', error)
		ctx.reply('⚠️ Не удалось загрузить повторные треки.')
	}
})

longTracksScene.hears('⬅️ Назад', ctx => {
	delete userTrackIndex[ctx.chat.id]
	ctx.scene.enter('audio')
})

longTracksScene.hears(['🟢 Трек легкий', '🔴 Трек тяжёлый'], async ctx => {
	const chatId = ctx.chat.id
	const state = userTrackIndex[chatId]
	if (!state) return

	const track = state.trackList[state.index]
	const isEasy = ctx.message.text.includes('легкий')

	try {
		await UserLongTrack.upsert({
			userId: chatId,
			trackId: track.id,
			status: isEasy,
			sentAt: new Date(),
		})

		userTrackIndex[chatId].index += 1
		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при сохранении оценки:', error)
		ctx.reply('⚠️ Не удалось сохранить ответ.')
	}
})

longTracksScene.hears('➡️ Далее', async ctx => {
	const chatId = ctx.chat.id

	if (userTrackIndex[chatId]?.isRunning) {
		return ctx.reply('⚠️ Ты уже в процессе. Заверши текущую серию.')
	}

	try {
		const evaluatedIds = await UserLongTrack.findAll({
			where: { userId: chatId },
			attributes: ['trackId'],
		}).then(r => r.map(e => e.trackId))

		const tracks = await longTrack.findAll({
			where: { status: null, id: { [Op.notIn]: evaluatedIds } },
			order: [['createdAt', 'ASC']],
			limit: 2,
		})

		if (!tracks.length) {
			return ctx.reply('🪂 Нет новых треков.')
		}

		userTrackIndex[chatId] = {
			index: 0,
			trackList: tracks,
			isRetry: false,
			isRunning: true,
		}

		await sendNextTrack(ctx, chatId)
	} catch (error) {
		console.error('Ошибка при повторной отправке треков:', error)
		ctx.reply('⚠️ Не удалось загрузить треки.')
	}
})

longTracksScene.leave(ctx => {
	delete userTrackIndex[ctx.chat.id]
})

async function sendNextTrack(ctx, chatId) {
	const state = userTrackIndex[chatId]
	const { trackList, index, isRetry } = state

	if (index >= trackList.length) {
		delete userTrackIndex[chatId]
		return ctx.reply(
			'✅ Все треки обработаны!',
			Markup.keyboard([['➡️ Далее'], ['⬅️ Назад']]).resize()
		)
	}

	const track = trackList[index]
	const audioUrl = `https://drive.google.com/uc?export=download&id=${track.fileId}`

	let caption = [
		isRetry ? '🔁 Этот трек показался тебе тяжёлым. Попробуй снова!' : '',
		`✈️ <b>Позывной:</b> ${track.title}`,
		track.script ? `🆘 <b>Тип проблемы:</b> ${track.script}` : '',
		`🎙️ <b>Трек ${index + 1} из ${trackList.length}</b>`,
	]
		.filter(Boolean)
		.join('\n')

	const loadingMessage = await ctx.reply('⏳ Загружаю трек...')
	await ctx.replyWithAudio({ url: audioUrl }, { caption, parse_mode: 'HTML' })

	try {
		await ctx.deleteMessage(loadingMessage.message_id)
	} catch (error) {
		console.error('Не удалось удалить сообщение загрузки:', error)
	}

	await ctx.reply(
		'💬 Насколько тебе был понятен трек?',
		Markup.keyboard([['🟢 Трек легкий'], ['🔴 Трек тяжёлый'], ['⬅️ Назад']])
			.resize()
			.oneTime()
	)
}

module.exports = longTracksScene
