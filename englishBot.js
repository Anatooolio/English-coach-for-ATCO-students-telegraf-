require('dotenv').config()
const { Telegraf, Markup, session, Scenes } = require('telegraf')
const { User } = require('./db/models')
const { BaseScene, Stage } = Scenes
const os = require('os')

const welcomeScene = require('./middleware/scenes/welcome')
const audioScene = require('./middleware/scenes/audioTests')
const shortTracksScene = require('./middleware/scenes/shortTracks')
const longTracksScene = require('./middleware/scenes/longTracks')
const grammaticalTestScene = require('./middleware/scenes/IcaoGrammarQuestios')
const libraryScene = require('./middleware/scenes/library')
const profileScene = require('./middleware/scenes/profile')
const achievementsScene = require('./middleware/scenes/achievements')
const vocabularyScene = require('./middleware/scenes/vocabulary')
const adminScene = require('./middleware/scenes/admin')

const stage = new Stage([
	welcomeScene,
	audioScene,
	shortTracksScene,
	longTracksScene,
	grammaticalTestScene,
	libraryScene,
	profileScene,
	achievementsScene,
	vocabularyScene,
	adminScene,
])

const bot = new Telegraf(process.env.BOT_TOKEN)
const ADMIN_ID = Number(process.env.ADMIN_ID)

bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())

// 👋 Старт: проверка на админа
bot.start(async ctx => {
	try {
		const { first_name, last_name, username } = ctx.message.from
		const chatId = ctx.chat.id

		await User.findOrCreate({
			where: { username },
			defaults: {
				id: chatId,
				first_name,
				last_name,
				username,
			},
		})

		if (ctx.from.id === ADMIN_ID) {
			// Админ получает выбор
			await ctx.reply(
				'👋 Добро пожаловать, администратор! Выберите режим входа:',
				Markup.keyboard([
					['🛠 Админ-панель'],
					['🚀 Войти как пользователь'],
				]).resize()
			)
		} else {
			// Обычный пользователь — сразу в приветствие
			await ctx.scene.enter('welcome')
		}
	} catch (error) {
		await ctx.reply(
			'⚠️ Ошибка при добавлении пользователя в базу. Попробуйте перезапустить бота.'
		)
		console.error(`START ERROR: ${error}`)
	}
})

// 🎯 Обработка выбора админа
bot.hears('🛠 Админ-панель', ctx => {
	if (ctx.from.id === ADMIN_ID) {
		ctx.scene.enter('admin')
	} else {
		ctx.reply('⛔️ У вас нет доступа к админ-панели.')
	}
})

bot.hears('🚀 Войти как пользователь', ctx => {
	ctx.scene.enter('welcome')
})

// 🆘 Команда помощи
bot.help(ctx =>
	ctx.reply(
		`После выбора уровня сложности тебе придется прослушать запись переговоров.${os.EOL}Постарайся прослушать аудио не больше двух раз. После этого ответь на мои вопросы.${os.EOL}TRUE - ПРАВДА${os.EOL}FALSE - ЛОЖЬ${os.EOL}NOT STATED - НЕ УПОМЯНУТО`
	)
)

// ℹ️ Информация
bot.command('info', ctx =>
	ctx.reply(
		`Данный бот был сделан студентом 5 курса СПбГУ ГА Маргач Анатолием в рамках проекта <Хакатон>.`
	)
)

bot.hears('hi', ctx => ctx.reply('Hey there'))

bot.launch()
console.log('🚀 Бот запущен...')

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
