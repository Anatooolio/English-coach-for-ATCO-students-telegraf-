const { Telegraf, Scenes, session, Markup } = require('telegraf')
const { BaseScene, Stage } = Scenes
const os = require('os')
const questions = require('../../materials/questions/decisions.json')

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
            ${
							os.EOL
						}Я твой лучший проводник в мир правильной фразеологии радиообмена &#9992;
                        ${
													os.EOL
												}С моей помощью ты углубишь свои знания, а, может и приобретешь новые! 
                        ${
													os.EOL
												}Если ты готов начинать, выбери уровень сложности, где:${
				os.EOL
			}EASY - легко&#127379;${os.EOL}MEDIUM - средне&#127383;${
				os.EOL
			}HARD - сложно&#127384;`,

			Markup.inlineKeyboard([
				Object.keys(questions).map(level =>
					Markup.button.callback(level.toUpperCase(), level)
				),
				[Markup.button.callback('Oh no, not now!', 'waiting')],
			])
		)
	} catch (error) {
		await ctx.reply(
			'Произошла ошибка на стадии приветствия! Попробуй перезагрузить меня...'
		)
		console.log(`ERROR: ${error}`)
	}
})
welcomeScene.action('easy', ctx => {
	ctx.scene.enter('easyLevel'), 
    ctx.answerCbQuery()
})
welcomeScene.action('medium', ctx => {
    ctx.scene.enter('mediumLevel'),
    ctx.answerCbQuery()
})
welcomeScene.action('hard', ctx => {
    ctx.scene.enter('hardLevel'),
    ctx.answerCbQuery()
})

module.exports = welcomeScene
