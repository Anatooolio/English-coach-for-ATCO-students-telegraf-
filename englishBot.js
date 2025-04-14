require('dotenv').config()
const { Telegraf, Markup, session, Scenes } = require('telegraf')
const { BaseScene, Stage } = Scenes
const { message } = require('telegraf/filters')
const express = require('express')
const os = require('os')
const welcomeScene = require('./middleware/scenes/welcome')
const audioScene = require('./middleware/scenes/audio')
const easyScene = require('./middleware/scenes/easy')
const mediumScene = require('./middleware/scenes/medium')
const hardScene = require('./middleware/scenes/hard')
const easyQuestionsScene = require('./middleware/scenes/easyQuestions')
const mediumQuestionsScene = require('./middleware/scenes/mediumQuestions')
const hardQuestionsScene = require('./middleware/scenes/hardQuestions')


const stage = new Stage([
	welcomeScene,
	audioScene,
	easyScene,
	mediumScene,
	hardScene,
	easyQuestionsScene,
	mediumQuestionsScene,
	hardQuestionsScene,
])

const bot = new Telegraf(process.env.BOT_TOKEN)

//Сервер
const app = express()
// Установка Webhook
const PORT = 3000
const webhookPath = '/telegraf'
bot.telegram.setWebhook(`${process.env.VERCEL_URL}${webhookPath}`)
// Express-обработчики
//логирование
app.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`)
	next()
})
app.get('/', (req, res) => res.send('Bot is running!'))
// app.post('/telegraf', bot.webhookCallback('/telegraf'))
// app.use(bot.webhookCallback('/telegraf'))
app.post('/telegraf', (req, res) => {
	console.log(`Webhook received:`, req.body)
	bot.handleUpdate(req.body) // Явный вызов обработки обновлений бота
	res.sendStatus(200) // Ответ Telegram
})



app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())


bot.start(ctx => ctx.scene.enter('welcome'))
bot.help(ctx =>
	ctx.reply(
		`После выбора уровня сложности тебе придется прослушать запись переговоров.${os.EOL}Постарайся прослушать аудио не больше двух раз. После этого ответь на мои вопросы.${os.EOL}TRUE - ПРАВДА${os.EOL}FALSE - ЛОЖЬ${os.EOL}NOT STATED - НЕ УПОМЯНУТО`
	)
)
bot.command('info', ctx =>
	ctx.reply(
		`Данный бот был сделан студентом 5 курса СПбГУ ГА Маргач Анатолием в рамках проекта <Хакатон>.`
	)
)

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
