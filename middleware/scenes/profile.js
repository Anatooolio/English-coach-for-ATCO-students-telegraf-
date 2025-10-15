const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const {
	UserShortTrack,
	UserLongTrack,
	UserGrammarAnswer,
	User,
	userAchievement,
} = require('../../db/models')
const achievements = require('../config/achievementsList')

const profileScene = new BaseScene('profile')

function getProgressLevel(score) {
	if (score < 10) return '🌱 Новичок'
	if (score < 30) return '🚀 Продвинутый'
	if (score < 60) return '🧠 Мастер'
	return '🏆 Гранд-мастер'
}

function getCoachMessage(level) {
	return (
		{
			'🌱 Новичок':
				'👀 Ты только начинаешь путь. Я рядом — будем учиться шаг за шагом!',
			'🚀 Продвинутый':
				'🔥 Отличный темп! Ты уже в воздухе, осталось набрать высоту.',
			'🧠 Мастер':
				'💪 Ты силён! Осталось доработать детали — и ты станешь примером.',
			'🏆 Гранд-мастер':
				'🏅 Ты прошёл почти всё! Поделись опытом — это уже искусство.',
		}[level] || '🙂 Продолжай — ты на пути!'
	)
}

function getMotivatorTips(stats) {
	const tips = []

	if (stats.grammarCorrect < 5 && stats.grammarMistakes > 5) {
		tips.push('✍️ Ошибки — знак роста. Подумай, какие правила стоит повторить.')
	}
	if (stats.shortHard >= 3 || stats.longHard >= 3) {
		tips.push(
			'🧠 Ты выбираешь сложные треки — значит готов к настоящей прокачке.'
		)
	}
	if (stats.learningDays >= 5 && stats.grammarCorrect >= 10) {
		tips.push('📈 Ты набрал стабильность. Готов пройти замер уровня?')
	}
	if (stats.score >= 30) {
		tips.push(
			'🚀 Ты на высоте. Время подумать: закрепить успех или сделать рывок?'
		)
	}
	if (stats.score < 5) {
		tips.push('⏳ Не теряй момент. Один трек сегодня — шаг вперёд завтра.')
	}
	if (stats.learningDays === 4) {
		tips.push('📅 У тебя почти серия. Удержи темп — это важно для прогресса.')
	}
	if (stats.grammarCorrect > 15) {
		tips.push(
			'🎯 Много точных ответов — отличный результат. Подкрепи его ещё одним треком.'
		)
	}
	if (tips.length === 0) {
		tips.push('💡 Выбери трек и продолжай путь. Каждый шаг имеет значение.')
	}

	return tips
}

async function safeFindAll(model, userId) {
	try {
		return (await model.findAll({ where: { userId } })) || []
	} catch (err) {
		console.error(`Ошибка при загрузке из ${model.name}:`, err)
		return []
	}
}

function calculateStats(shorts, longs, grammar, user) {
	const now = new Date()
	const lastSeen = user?.lastSeen ? new Date(user.lastSeen) : null

	const shortEasy = shorts.filter(r => r.status === true)
	const shortHard = shorts.filter(r => r.status === false)
	const longEasy = longs.filter(r => r.status === true)
	const longHard = longs.filter(r => r.status === false)
	const grammarCorrect = grammar.filter(r => r.isCorrect)
	const grammarMistakes = grammar.filter(r => !r.isCorrect)

	return {
		shortTotal: shorts.length,
		shortEasy: shortEasy.length,
		shortHard: shortHard.length,
		longTotal: longs.length,
		longEasy: longEasy.length,
		longHard: longHard.length,
		grammarCorrect: grammarCorrect.length,
		grammarMistakes: grammarMistakes.length,
		score: shortEasy.length + longEasy.length + grammarCorrect.length,
		learningDays: new Set(
			[...shorts, ...longs, ...grammar]
				.map(r => r.createdAt?.toDateString())
				.filter(Boolean)
		).size
	}
}

async function saveUserAchievements(userId, stats) {
	for (const badge of achievements) {
		try {
			if (!badge.check(stats)) continue
			const existing = await userAchievement.findOne({
				where: { userId, key: badge.key },
			})
			if (!existing) {
				await userAchievement.create({
					userId,
					key: badge.key,
					unlockedAt: new Date(),
				})
			}
		} catch (err) {
			console.error(`Ошибка при сохранении ачивки ${badge.key}:`, err)
		}
	}
}

profileScene.enter(async ctx => {
	const userId = ctx.chat?.id?.toString()
	if (!userId) {
		await ctx.reply('⚠️ Не удалось определить пользователя.')
		return
	}

	try {
		const [shorts, longs, grammar, user] = await Promise.all([
			safeFindAll(UserShortTrack, userId),
			safeFindAll(UserLongTrack, userId),
			safeFindAll(UserGrammarAnswer, userId),
			User.findOne({ where: { id: userId } }),
		])

		const stats = calculateStats(shorts, longs, grammar, user)
		ctx.session.stats = stats

		await saveUserAchievements(userId, stats)
		await User.update({ lastSeen: new Date() }, { where: { id: userId } })

		const level = getProgressLevel(stats.score)
		const coach = getCoachMessage(level)

		const message = [
			`👤 <b>Твой профиль</b>`,
			`🏅 Уровень: <b>${level}</b> (${stats.score} баллов)`,
			`🎧 Короткие треки: <b>${stats.shortTotal}</b> (тяжёлых: ${stats.shortHard})`,
			`📻 Длинные треки: <b>${stats.longTotal}</b> (тяжёлых: ${stats.longHard})`,
			`📝 Грамматика: <b>${
				stats.grammarCorrect + stats.grammarMistakes
			}</b> (ошибок: ${stats.grammarMistakes})`,
			`📆 Активность: <b>${stats.learningDays}</b> дней`,
			`🎓 ${coach}`,
			`⬇️ Что дальше?`,
		].join('\n')

		await ctx.replyWithHTML(
			message,
			Markup.keyboard([
				['💬 Советы тренера', '🎖️ Мои достижения'],
				['⬅️ Назад'],
			]).resize()
		)
	} catch (error) {
		console.error('⛔ Ошибка в profileScene:', error)
		await ctx.reply(
			'⚠️ Что-то пошло не так при загрузке профиля. Попробуй позже!'
		)
	}
})

profileScene.hears('🎖️ Мои достижения', ctx => ctx.scene.enter('achievements'))
profileScene.hears('⬅️ Назад', ctx => ctx.scene.enter('welcome'))

profileScene.hears('💬 Советы тренера', async ctx => {
	const stats = ctx.session?.stats
	if (!stats) {
		await ctx.reply('⚠️ Статистика недоступна. Перезайди в профиль.')
		return
	}

	const tips = getMotivatorTips(stats)
	const message = `<b>Советы тренера:</b>\n${tips
		.map(t => '👉 ' + t)
		.join('\n')}`
	await ctx.replyWithHTML(message)
})

module.exports = profileScene
