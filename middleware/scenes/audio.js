const { Telegraf, Scenes, session, Markup } = require('telegraf')
const { BaseScene, Stage } = Scenes
const os = require('os')
const questions = require('../../materials/questions/decisions.json')

const audioScene = new BaseScene('audio')
audioScene.enter(async ctx => {
	// await ctx.replyWithKeyboardRemove()
	try {
		await ctx.replyWithHTML(
			`Алгоритм работы:
&#10102; Выбери уровень сложности
(<b>EASY</b> - легко, <b>MEDIUM</b> - средне, <b>HARD</b> - высокая);
&#10103; Прослушай радиообмен;
&#10104; Ответь на вопросы (<i>К каждому аудиофайлу прилагаются несколько утверждений, задачей будет ответить являются ли они правдивыми, ложными, или вовсе не относящимся к содержанию радиообмена</i>).`,

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
audioScene.action('easy', ctx => {
	ctx.scene.enter('easyLevel'), ctx.answerCbQuery()
})
audioScene.action('medium', ctx => {
	ctx.scene.enter('mediumLevel'), ctx.answerCbQuery()
})
audioScene.action('hard', ctx => {
	ctx.scene.enter('hardLevel'), ctx.answerCbQuery()
})

module.exports = audioScene
