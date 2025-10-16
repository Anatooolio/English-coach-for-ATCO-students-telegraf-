require('dotenv').config()

const { Scenes, Markup } = require('telegraf')

const { BaseScene } = Scenes

const getBotStats = require('../config/getBotStats')

const adminScene = new BaseScene('admin')

const ADMIN_ID = Number(process.env.ADMIN_ID)

const isAdmin = ctx => ctx.from.id === ADMIN_ID

adminScene.enter(ctx => {
	if (!isAdmin(ctx)) {
		return ctx.reply('⛔️ У вас нет доступа к админ-панели.')
	}

	return ctx.reply(
		'👨‍✈️ Добро пожаловать в админ-панель!',

		Markup.inlineKeyboard([
			[Markup.button.callback('📊 Статистика бота', 'stats')],

			[Markup.button.callback('📢 Рассылка', 'broadcast')],

			[Markup.button.callback('🔒 Заблокировать пользователя', 'ban_user')],

			[Markup.button.callback('🚪 Выход', 'exit')],
		])
	)
})

adminScene.action('stats', async ctx => {
	if (!isAdmin(ctx)) return ctx.editMessageText('⛔️ Доступ запрещён.')

	const stats = await getBotStats()

	await ctx.editMessageText(`📊 Статистика бота:

- Всего пользователей: ${stats.totalUsers}

- Активных сегодня: ${stats.activeToday}

- Новых за неделю: ${stats.newThisWeek}`)
})

adminScene.action('broadcast', async ctx => {
	if (!isAdmin(ctx)) return ctx.editMessageText('⛔️ Доступ запрещён.')

	await ctx.editMessageText(
		'📢 Чтобы отправить рассылку, используйте команду:\n\n/broadcast <текст сообщения>'
	)
})

adminScene.action('ban_user', async ctx => {
	if (!isAdmin(ctx)) return ctx.editMessageText('⛔️ Доступ запрещён.')

	await ctx.editMessageText(
		'🔒 Чтобы заблокировать пользователя, используйте:\n\n/ban <user_id>'
	)
})

adminScene.action('exit', async ctx => {
	await ctx.editMessageText('🚪 Вы вышли из админ-панели.')

	ctx.scene.leave()
})

module.exports = adminScene
