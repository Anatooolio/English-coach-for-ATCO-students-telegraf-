const { Telegraf, Scenes, session, Markup } = require('telegraf')
const { BaseScene, Stage } = Scenes
const os = require('os')
// const questions = require('../../materials/questions/decisions.json')

const welcomeScene = new BaseScene('welcome')
welcomeScene.enter(async ctx => {
    // await ctx.replyWithKeyboardRemove()
	try {
		await ctx.replyWithHTML(
			`Привет, <b>${
				ctx.message.from.first_name
					? ctx.message.from.first_name
					: 'Любитель неба'
			}</b>&#9995;
            ${os.EOL}Я твой лучший проводник в мир правильной фразеологии радиообмена &#9992;
            ${os.EOL}С моей помощью ты углубишь свои знания, а, может и приобретешь новые!
			${os.EOL}Выбери программу из списка, а я скажу, что нужно будет сделать!
			${os.EOL}И помни: <i>Nothing is impossible!</i>`, 
			Markup.keyboard([
				['Audio test'],
				['Grammar test (пока не доступно)'],
				['Guidance documents (пока не доступно)'],
				['Speaking test (пока не доступно)'],
				['Quiz (пока не доступно)'],
			]).resize()
		)
	} catch (error) {
		await ctx.reply(
			'Произошла ошибка на стадии приветствия! Попробуй перезагрузить меня...'
		)
		console.log(`ERROR: ${error}`)
	}
})
welcomeScene.hears('Audio test', ctx => ctx.scene.enter('audio'))


module.exports = welcomeScene
