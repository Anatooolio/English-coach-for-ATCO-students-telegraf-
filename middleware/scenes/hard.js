const { Telegraf, Scenes, session, Markup } = require('telegraf')
const { BaseScene, Stage } = Scenes
const os = require('os')
const questions = require('../../materials/questions/decisions.json')

const hardScene = new BaseScene('hardLevel')
hardScene.enter(async ctx => {
	try {
		await ctx.replyWithHTML(
			`Отлично&#128077;!${os.EOL}Ты выбрал <i>высокую</i> сложность. ${os.EOL}Прослушай аудио ниже и ответь на мои вопросы.${os.EOL}Отвечать можно только TRUE, FALSE, NOT STATED ${os.EOL}Дальше наш с тобой диалог будет на английском	&#128515;`,
			Markup.keyboard([['Stop']]).resize()
		)
		await ctx.replyWithAudio(
			{
				source: questions['hard'].url,
			},
			Markup.inlineKeyboard([
				Markup.button.callback("I'M READY TO ANSWER QUESTIONS", 'ready'),
			])
		)
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})
hardScene.action('ready', ctx => ctx.scene.enter('hardQuestions'))
hardScene.hears('Stop', async ctx => await ctx.scene.enter('welcome'))

module.exports = hardScene
