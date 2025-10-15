const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const os = require('os')

const welcomeScene = new BaseScene('welcome')

welcomeScene.enter(async ctx => {
	try {
		if (ctx.session?.returnedFromLibrary) {
			ctx.session.returnedFromLibrary = false
			return // без приветствия
		}

		const name = ctx.message?.from?.first_name?.trim() || 'Любитель неба'

		const greetingMessage = [
			`👋 Привет, <b>${name}</b>!`,
			``,
			`Я — твой персональный навигатор в мире авиационной фразеологии и английского языка ✈️`,
			``,
			`🧠 Вместе мы изучим правила, отработаем навыки и разберёмся с тем, что действительно важно.`,
			`📘 Ты сможешь проверить свои знания, получить доступ к библиотеке и пройти полезные тесты.`,
			``,
			`🔽 Просто выбери программу ниже, и я расскажу, что нужно сделать.`,
			``,
			`💬 И помни: <i>Nothing is impossible!</i>`,
		].join('\n')

		await ctx.replyWithHTML(
			greetingMessage,
			Markup.keyboard([
				['🎧 Audio test'],
				['📝 Grammar test'],
				['📚 Library'],
				// ['🗂 Vocabulary'],
				['👤 My profile'],
			]).resize()
		)
	} catch (error) {
		await ctx.reply(
			'⚠️ Произошла ошибка на стадии приветствия! Попробуй перезапустить меня.'
		)
		console.error(`WELCOME SCENE ERROR: ${error}`)
	}
})

// 🎧 Аудио тест
welcomeScene.hears('🎧 Audio test', ctx => ctx.scene.enter('audio'))

// 📝 Грамматический тест
welcomeScene.hears('📝 Grammar test', ctx => ctx.scene.enter('grammar'))

// 📚 Библиотека
welcomeScene.hears('📚 Library', ctx => ctx.scene.enter('library'))

welcomeScene.hears('👤 My profile', ctx => ctx.scene.enter('profile'))

welcomeScene.hears('🗂 Vocabulary', ctx => ctx.scene.enter('vocabulary'))

welcomeScene.hears('/admin', ctx => ctx.scene.enter('admin'))


module.exports = welcomeScene
