const { Telegraf, Scenes, session, Markup } = require('telegraf')
const { BaseScene, Stage } = Scenes
const os = require('os')
const { getRandomQuestion } = require('../randomQuestion')
const CORRECT_OPTION_CHOSEN_EVENT = 'CORRECT_OPTION_CHOSEN_EVENT'
const INCORRECT_OPTION_CHOSEN_EVENT = 'INCORRECT_OPTION_CHOSEN_EVENT'
let inlineKeyboard

const hardQuestionsScene = new BaseScene('hardQuestions')

hardQuestionsScene.enter(async ctx => {
	try {
		const question = getRandomQuestion('hard')
		const btnRows = question.options.map(option => {
			return [
				Markup.button.callback(
					`${option.text}`,
					option.isCorrect
						? CORRECT_OPTION_CHOSEN_EVENT
						: INCORRECT_OPTION_CHOSEN_EVENT
				),
			]
		})
		inlineKeyboard = Markup.inlineKeyboard(btnRows)
		await ctx.reply(question.text, inlineKeyboard)
	} catch (error) {
		await ctx.reply(
			'Произошла ошибка на стадии генерации легких вопросов! Попробуй перезагрузить меня...'
		)
		console.log(`ERROR: ${error}`)
	}
})

hardQuestionsScene.action(CORRECT_OPTION_CHOSEN_EVENT, async ctx => {
	try {
		await ctx.replyWithHTML(
			`THIS IS THE CORRECT ANSWER &#9989;${os.EOL}GOOD JOB!`
		)
		await ctx.scene.enter('hardQuestions')
		ctx.answerCbQuery()
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})

hardQuestionsScene.action(INCORRECT_OPTION_CHOSEN_EVENT, async ctx => {
	try {
		ctx.replyWithHTML(
			`THIS IS AN INCORRECT ANSWER &#10060;${os.EOL}TRY AGAIN...`
		)
		ctx.answerCbQuery()
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})

hardQuestionsScene.hears('Stop', async ctx => await ctx.scene.enter('welcome'))

module.exports = hardQuestionsScene
