require('dotenv').config()
const { Telegraf, Markup, session, Scenes } = require('telegraf')
const { message } = require('telegraf/filters')
const os = require('os')
const levels = require('./middleware/const')
const questions = require('./materials/questions/decisions.json')
const { getRandomQuestion } = require('./middleware/randomQuestion')
// const { enter, leave } = Scenes.Stage

const CORRECT_OPTION_CHOSEN_EVENT = 'CORRECT_OPTION_CHOSEN_EVENT'
const INCORRECT_OPTION_CHOSEN_EVENT = 'INCORRECT_OPTION_CHOSEN_EVENT'

// const easyScene = require('./middleware/scenes/easy')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(Telegraf.log())
bot.use(session())

// const stage = new Scenes.Stage([new Scenes.BaseScene(easyScene)],)
// bot.use(stage.middleware())
//, mediumScene, hardScene
// bot.hears('easy', async ctx => await ctx.scene.enter('easyWizard'))

bot.start(ctx =>
	ctx.replyWithHTML(
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
        ${os.EOL}Если ты готов начинать, выбери уровень сложности, где:${
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
)
bot.help(ctx =>
	ctx.reply(
		`После выбора уровня сложности тебе придется прослушать запись переговоров.${os.EOL}Постарайся прослушать аудио не больше двух раз. После этого ответь на мои вопросы.${os.EOL}TRUE - ПРАВДА${os.EOL}FALSE - ЛОЖЬ${os.EOL}NOT STATED - НЕ УПОМЯНУТО`
	)
)
bot.command('info', ctx =>
	ctx.reply(
		`Данный бот был сделан студентом 5 курса СПбГУ ГА Маргач Анатолием в рамках проекта <Хакатон>.${os.EOL}Над проектом работали:${os.EOL}Кирилл Пономарев,${os.EOL}Арина Саенко,${os.EOL}Даниил Лебедев,${os.EOL}Алексей Греньков,${os.EOL}Виктория Мосеева.`
	)
)
bot.on(message('sticker'), ctx => ctx.reply('👍'))

Object.keys(questions).map(level => {
	const question = getRandomQuestion(level)
	let inlineKeyboard
	bot.action(level, async ctx => {
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
		try {
			await ctx.answerCbQuery()
			await ctx.replyWithHTML(
				`Отлично&#128077;!${os.EOL}Ты выбрал <i>${
					levels[ctx.match[0]]
				}</i> сложность. ${
					os.EOL
				}Прослушай аудио ниже и ответь на мои вопросы.${
					os.EOL
				}Отвечать можно только TRUE, FALSE, NOT STATED ${
					os.EOL
				}Дальше наш с тобой диалог будет на английском	&#128515;`
			)
			await ctx.replyWithAudio({
				source: questions[level].url,
			})
			await ctx.reply(question.text, inlineKeyboard)
		} catch (error) {
			await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
			console.log(`ERROR: ${error}`)
		}
	})
})

bot.action(CORRECT_OPTION_CHOSEN_EVENT, async ctx => {
	try {
		await ctx.replyWithHTML(
			`THIS IS THE CORRECT ANSWER &#9989;${os.EOL}GOOD JOB!`
		)
		// await ctx.reply(question.text, inlineKeyboard)
		ctx.answerCbQuery()
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})

bot.action(INCORRECT_OPTION_CHOSEN_EVENT, async ctx => {
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
bot.action('waiting', async ctx => {
	try {
		await ctx.answerCbQuery('Изучение приостановлено...')
		await ctx.reply('Возвращайся скорее!')
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})

bot.hears('hi', ctx => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
