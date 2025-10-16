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
		const { first_name, last_name } = ctx.message.from
		const username = ctx.message.from.username // Может быть undefined
		const chatId = ctx.from.id // <--- Используем ctx.from.id, он всегда есть

		await User.findOrCreate({
			// ИЗМЕНЕНИЕ: Ищем по ID, который всегда существует.
			where: { id: chatId },
			defaults: {
				id: chatId,
				first_name,
				last_name,
				// ИЗМЕНЕНИЕ: Если юзернейм отсутствует, сохраняем null.
				username: username || null,
			},
		})

		if (ctx.from.id === ADMIN_ID) {
			// ... (остальной код для админа)
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
		// ... (обработка ошибок)
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
		`
		🛠 Сообщить об ошибке или задать вопрос

Если вы обнаружили ошибку в тесте (неверный ответ, плохой звук) или у вас есть предложение, вы можете отправить личное сообщение администратору.

Напишите свое сообщение сразу после этой команды:

/feedback [Ваше сообщение]

Пример: /feedback Я нашел опечатку в вопросе по грамматике 3-го уровня.

Мы обязательно рассмотрим ваше обращение!
		`
	)
)

// ℹ️ Информация
bot.command('info', ctx =>
	ctx.reply(
		`👋 Добро пожаловать в тренажер AeroLingo! 
🎯 Наша цель — помочь вам подготовиться к экзамену ИКАО.

📚 Как пользоваться ботом:

📱Навигация: Используйте кнопки внизу экрана для выбора раздела (Аудирование, Грамматика, Словарный запас).

🎧Тесты на Аудирование: Старайтесь прослушать аудиозапись не более двух раз.

✅Ответы: Чтобы дать верный ответ внимательно читай инструкцию к каждому заданию, и тогда, я уверен, у тебя все получится!.

📈Прогресс: Вся ваша статистика и история прохождения тестов сохраняется в разделе "Профиль".

🔰Вы всегда можете вернуться в главное меню, нажав /start.`
	)
)

bot.command('feedback', async ctx => {
	const feedbackText = ctx.message.text.split('/feedback')[1].trim()
	const sender = `@${ctx.from.username || ctx.from.id}`

	if (!feedbackText) {
		return ctx.reply(
			'Пожалуйста, введите текст сообщения после команды /feedback.'
		)
	}

	try {
		// Отправка сообщения администратору
		await bot.telegram.sendMessage(
			ADMIN_ID, // ID администратора из вашего .env
			`📢 НОВЫЙ ОТЗЫВ/СООБЩЕНИЕ:\n\nОт пользователя: ${sender}\nТекст: ${feedbackText}`
		)

		// Уведомление пользователя
		await ctx.reply(
			'✅ Ваше сообщение отправлено администратору. Спасибо за помощь!'
		)
	} catch (error) {
		console.error('Ошибка при отправке отзыва администратору:', error)
		await ctx.reply(
			'⚠️ Не удалось отправить сообщение администратору. Попробуйте позже.'
		)
	}
})

bot.launch()
console.log('🚀 Бот запущен...')

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
