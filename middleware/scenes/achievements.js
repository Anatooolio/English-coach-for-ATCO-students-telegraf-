const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const { userAchievement } = require('../../db/models')
const achievements = require('../config/achievementsList')

const achievementsScene = new BaseScene('achievements')

async function safeFindAchievements(userId) {
	try {
		return (await userAchievement.findAll({ where: { userId } })) || []
	} catch (err) {
		console.error('❌ Ошибка при загрузке userAchievement:', err)
		return []
	}
}

achievementsScene.enter(async ctx => {
	const userId = ctx.chat?.id?.toString()
	if (!userId) {
		await ctx.reply('⚠️ Не удалось определить ID пользователя.')
		return
	}

	const stats = ctx.session?.stats || {}
	const unlocked = await safeFindAchievements(userId)
	const unlockedKeys = new Set(unlocked.map(a => a.key))
	const unlockedMap = Object.fromEntries(
		unlocked.map(a => [a.key, a.unlockedAt])
	)

	let unlockedCount = 0
	let reply = `🎖️ <b>Твои достижения</b>\n\n`

	for (const badge of achievements) {
		const current = badge.getStat(stats)
		const done = badge.check(stats)
		const alreadyUnlocked = unlockedKeys.has(badge.key)

		if (done && !alreadyUnlocked) {
			const [achievement, created] = await userAchievement.findOrCreate({
				where: { userId, key: badge.key },
				defaults: { unlockedAt: new Date() },
			})
			unlockedMap[badge.key] = new Date()
		}

		const date = unlockedMap[badge.key]
		if (alreadyUnlocked) unlockedCount++

		reply += `${badge.icon} <b>${badge.label}</b>\n`
		reply += alreadyUnlocked
			? `✅ Получено`
			: `🔒 Прогресс: ${current}/${badge.target}`
		reply += `\n➡️ ${badge.condition}`
		if (date) {
			reply += `\n📅 Получено: ${new Date(date).toLocaleDateString()}`
		}
		reply += `\n────────────\n`
	}

	reply += `\n${
		unlockedCount
			? `🏅 Ты разблокировал <b>${unlockedCount}</b> достижений — крутой прогресс!`
			: `😶 Пока ни одного значка.\n💡 Пройди трек, тест или просто открой библиотеку — и ачивки появятся!`
	}`

	await ctx.replyWithHTML(
		reply,
		Markup.keyboard([['⬅️ Назад в профиль']]).resize()
	)
})

achievementsScene.hears('⬅️ Назад в профиль', ctx => ctx.scene.enter('profile'))

module.exports = achievementsScene
