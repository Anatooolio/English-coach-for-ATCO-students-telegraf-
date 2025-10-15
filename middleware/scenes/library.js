const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const { Book } = require('../../db/models')

const libraryScene = new BaseScene('library')

libraryScene.enter(ctx => {
	ctx.reply('📚 <b>Добро пожаловать в библиотеку!</b>\nВыберите действие:', {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: [
				[Markup.button.callback('📘 Показать всё', 'show_all')],
				[Markup.button.callback('🔍 Поиск книги', 'search')],
			],
		},
	})
})

libraryScene.action('back', async ctx => {
	await ctx.answerCbQuery()
	ctx.session.returnedFromLibrary = true
	ctx.scene.enter('welcome')
})

libraryScene.action('show_all', async ctx => {
	await ctx.answerCbQuery()

	try {
		const books = await Book.findAll()

		if (!books.length) {
			await ctx.reply('📭 Библиотека пуста.')
		} else {
			const list = books
				.map(
					b => `📖 <b>${b.title}</b>\n<a href="${b.link}">📎 Читать онлайн</a>`
				)
				.join('\n\n')

			await ctx.replyWithHTML(`<b>Список доступных книг:</b>\n\n${list}`)
		}

		ctx.session.returnedFromLibrary = true
		ctx.scene.enter('welcome')
	} catch (error) {
		console.error('Ошибка при получении книг:', error)
		await ctx.reply('⚠️ Не удалось загрузить книги.')
	}
})

libraryScene.action('search', async ctx => {
	await ctx.answerCbQuery()
	ctx.session.awaitingSearch = true
	await ctx.reply('🔎 Введите название книги или его часть:')
})

libraryScene.on('text', async ctx => {
	if (!ctx.session.awaitingSearch) return

	ctx.session.awaitingSearch = false
	const query = ctx.message.text.trim().toLowerCase()

	try {
		const books = await Book.findAll()
		const results = books.filter(b => b.title.toLowerCase().includes(query))

		if (!results.length) {
			await ctx.reply('😕 Ничего не найдено.')
		} else {
			const reply = results
				.map(
					b => `📖 <b>${b.title}</b>\n<a href="${b.link}">📎 Читать онлайн</a>`
				)
				.join('\n\n')

			await ctx.replyWithHTML(`<b>Результаты поиска:</b>\n\n${reply}`)
		}

		ctx.session.returnedFromLibrary = true
		ctx.scene.enter('welcome')
	} catch (error) {
		console.error('Ошибка при поиске книг:', error)
		await ctx.reply('⚠️ Произошла ошибка при выполнении поиска.')
	}
})

module.exports = libraryScene
