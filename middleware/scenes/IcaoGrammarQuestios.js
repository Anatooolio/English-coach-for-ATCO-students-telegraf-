require('dotenv').config()
const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const { IcaoGrammarQuestion, UserGrammarAnswer } = require('../../db/models')
const { Sequelize } = require('sequelize')

const grammaticalTestScene = new BaseScene('grammar')

// 📤 Вспомогательная функция для отправки/редактирования вопроса
async function sendQuestion(ctx, question) {
	if (!question || !question.options || !question.options.length) {
		return ctx.reply('⚠️ Ошибка в вопросе. Пропускаем.')
	}

	const text = `<b>🧠 Вопрос:</b>\n${question.question}`
	const keyboard = {
		inline_keyboard: question.options.map((opt, i) => [
			{ text: opt, callback_data: `answer_${question.id}_${i}` },
		]),
	}

	// Всегда отправляем новый вопрос как новое сообщение
	const sent = await ctx.replyWithHTML(text, { reply_markup: keyboard })
	ctx.session.lastQuestionMessageId = sent.message_id
}

// 🎬 Вход в сцену
grammaticalTestScene.enter(ctx => {
	// Сбрасываем сессию
	ctx.session.questionIndex = null
	ctx.session.questions = null
	ctx.session.errorMode = false
	ctx.session.errorQueue = null
	ctx.session.isRunningGrammar = false
	ctx.session.lastQuestionId = null
	ctx.session.lastAnswerTime = null
	ctx.session.lastQuestionMessageId = null

	const intro = [
		`📘 <b>Тест на грамматику</b>`,
		`🧠 Проверь и прокачай свои знания с помощью коротких вопросов.`,
		`📋 <b>Как проходит тест:</b>`,
		`1️⃣ Вопрос с несколькими вариантами ответа.`,
		`2️⃣ Выбираешь тот, что считаешь правильным.`,
		`3️⃣ Сразу узнаешь результат и получаешь объяснение.`,
		`4️⃣ Все твои ответы сохраняются — можно повторить ошибки позже.`,
		`🛠 <b>Действия:</b>`,
		`📡 Запустить тест`,
		`🔁 Повторить ошибки`,
		`🛑 Остановить (только во время теста)`,
		`⬅️ Назад`,
	].join('\n')

	ctx.replyWithHTML(
		intro,
		Markup.keyboard([
			['📡 Запустить тест'],
			['🔁 Повторить ошибки'],
			['⬅️ Назад'],
		]).resize()
	)
})

// ⬅️ Назад
grammaticalTestScene.hears('⬅️ Назад', ctx => {
	ctx.session = {}
	ctx.scene.enter('welcome')
})

// 🛑 Остановка
grammaticalTestScene.hears('🛑 Stop', ctx => {
	// Проверяем, что тест вообще запущен, чтобы не сбрасывать сессию просто так
	if (!ctx.session.isRunningGrammar) {
		return ctx.reply(
			'🚫 Тест не был запущен. Выберите действие:',
			Markup.keyboard([
				['📡 Запустить тест'],
				['🔁 Повторить ошибки'],
				['⬅️ Назад'],
			]).resize()
		)
	}

	// Очищаем сессию, связанную с тестом
	ctx.session.isRunningGrammar = false
	ctx.session.questionIndex = null
	ctx.session.questions = null
	ctx.session.errorMode = false
	ctx.session.errorQueue = null

	// Выводим сообщение об остановке и ПЕРЕЗАПУСКАЕМ СЦЕНУ
	// Переход на 'grammar' снова вызовет grammaticalTestScene.enter(ctx => {...})
	// и корректно выведет главное меню сцены.
	ctx
		.reply('🚫 Тест остановлен. Возврат в главное меню грамматики.')
		.then(() => {
			ctx.scene.enter('grammar')
		})
})

// 📡 Запуск теста
grammaticalTestScene.hears('📡 Запустить тест', async ctx => {
	if (ctx.session.isRunningGrammar) {
		return ctx.reply('⚠️ Тест уже запущен. Заверши его или нажми "🛑 Stop".')
	}
	try {
		const answered = await UserGrammarAnswer.findAll({
			where: { userId: ctx.chat.id },
			attributes: ['questionId'],
		})
		const passedIds = answered.map(a => a.questionId)

		const questions = await IcaoGrammarQuestion.findAll({
			where: { id: { [Sequelize.Op.notIn]: passedIds } },
			order: [Sequelize.literal('RANDOM()')], // Случайный порядок
			limit: 10, // Ограничим количество вопросов для теста
		})

		if (!questions.length) {
			return ctx.reply('🎉 Ты уже прошёл все вопросы!')
		}

		ctx.session.questions = questions.map(q => q.id)
		ctx.session.questionIndex = 0
		ctx.session.isRunningGrammar = true

		await ctx.reply(
			`🎯 Начинаем тест! Всего вопросов: ${questions.length}`,
			Markup.keyboard([['🛑 Stop'], ['⬅️ Назад']]).resize()
		)
		const firstQuestion = questions[0]
		return sendQuestion(ctx, firstQuestion)
	} catch (error) {
		console.error('Ошибка при запуске теста:', error)
		return ctx.reply('Произошла ошибка при загрузке вопросов.')
	}
})

// 🔁 Повтор ошибок
grammaticalTestScene.hears('🔁 Повторить ошибки', async ctx => {
	if (ctx.session.isRunningGrammar) {
		return ctx.reply(
			'⚠️ Уже идёт другая сессия. Заверши её или нажми "🛑 Stop".'
		)
	}
	try {
		const mistakes = await UserGrammarAnswer.findAll({
			where: { userId: ctx.chat.id, isCorrect: false },
			attributes: [
				[Sequelize.fn('DISTINCT', Sequelize.col('questionId')), 'questionId'],
			],
			raw: true,
		})

		if (!mistakes.length) {
			return ctx.reply('✅ Ошибок не найдено!')
		}

		ctx.session.errorMode = true
		ctx.session.errorQueue = mistakes.map(m => m.questionId)
		ctx.session.isRunningGrammar = true

		await ctx.reply(
			`🔁 Повторим вопросы, в которых ты ошибался: ${ctx.session.errorQueue.length} вопросов.`,
			Markup.keyboard([['🛑 Stop'], ['⬅️ Назад']]).resize()
		)

		const firstId = ctx.session.errorQueue[0]
		const firstQuestion = await IcaoGrammarQuestion.findByPk(firstId)
		return sendQuestion(ctx, firstQuestion)
	} catch (error) {
		console.error('Ошибка при повторе ошибок:', error)
		return ctx.reply('Произошла ошибка при загрузке ошибок.')
	}
})

// ✅❌ Ответ через callback_query
grammaticalTestScene.on('callback_query', async ctx => {
	const data = ctx.callbackQuery.data
	if (!data.startsWith('answer_')) return

	const [, , selectedIndex] = data.split('_')
	const qId = parseInt(data.split('_')[1])
	await ctx.answerCbQuery()

	if (!ctx.session.isRunningGrammar) {
		return ctx.answerCbQuery('⚠️ Тест не активен. Начните новый тест.')
	}

	// Проверка, что это ответ на последнее отправленное сообщение
	if (
		ctx.callbackQuery.message.message_id !== ctx.session.lastQuestionMessageId
	) {
		return ctx.answerCbQuery(
			'⚠️ Слишком поздно. Ответ принят только для последнего вопроса.'
		)
	}

	// Защита от двойного ответа
	if (ctx.session.lastQuestionId === qId) {
		return ctx.answerCbQuery('⏳ Ответ уже обработан.')
	}

	// Защита от спама
	const now = Date.now()
	if (ctx.session.lastAnswerTime && now - ctx.session.lastAnswerTime < 1000) {
		return ctx.answerCbQuery('⚠️ Не спеши!')
	}
	ctx.session.lastAnswerTime = now
	ctx.session.lastQuestionId = qId

	const question = await IcaoGrammarQuestion.findByPk(qId)
	const isCorrect = parseInt(selectedIndex) === question.answerIndex

	await UserGrammarAnswer.upsert({
		userId: ctx.chat.id,
		questionId: question.id,
		isCorrect,
		answeredAt: new Date(),
	})

	// 1. Формируем фидбек
	const selectedOptionText = question.options[selectedIndex]
	const correctOptionText = question.options[question.answerIndex]

	const status = isCorrect ? '✅ Верно' : '❌ Неверно'
	const correctInfo = isCorrect
		? 'Отличная работа!'
		: `Правильный ответ: <b>${correctOptionText}</b>`

	const feedback = [
		`\n\n---`,
		`<b>${status}!</b>`,
		`Твой ответ: ${selectedOptionText}`,
		correctInfo,
		`\n<b>Объяснение:</b>`,
		question.explanation || 'Объяснение отсутствует.',
	].join('\n')

	// 2. Редактируем сообщение с вопросом, чтобы показать фидбек
	try {
		await ctx.telegram.editMessageText(
			ctx.chat.id,
			ctx.callbackQuery.message.message_id,
			null,
			`${ctx.callbackQuery.message.text}${feedback}`,
			{ parse_mode: 'HTML' }
		)
	} catch (err) {
		console.error('Ошибка при редактировании сообщения с фидбеком:', err)
		// Если редактирование не удалось, хотя бы удалим кнопки
		await ctx.editMessageReplyMarkup({ inline_keyboard: [] })
	}

	// 3. Логика перехода к следующему вопросу (через 1 секунду)
	setTimeout(async () => {
		// Повтор ошибок
		if (ctx.session.errorMode) {
			if (isCorrect) {
				// Удаляем из очереди, только если ответ правильный
				ctx.session.errorQueue = ctx.session.errorQueue.filter(
					id => id !== question.id
				)
			} else {
				// В режиме ошибок перемещаем неправильный ответ в конец очереди
				ctx.session.errorQueue = ctx.session.errorQueue.filter(
					id => id !== question.id
				)
				ctx.session.errorQueue.push(question.id)
			}

			if (!ctx.session.errorQueue.length) {
				ctx.session.isRunningGrammar = false
				ctx.session = {}
				return ctx.reply(
					'🎉 Ошибки исправлены. Отличная работа!',
					Markup.keyboard([
						['📡 Запустить тест'],
						['🔁 Повторить ошибки'],
						['⬅️ Назад'],
					]).resize()
				)
			}
			const nextId = ctx.session.errorQueue[0]
			const nextQuestion = await IcaoGrammarQuestion.findByPk(nextId)
			return sendQuestion(ctx, nextQuestion)
		}

		// Обычный тест
		ctx.session.questionIndex += 1
		if (
			Array.isArray(ctx.session.questions) &&
			ctx.session.questionIndex < ctx.session.questions.length
		) {
			const nextId = ctx.session.questions[ctx.session.questionIndex]
			const nextQuestion = await IcaoGrammarQuestion.findByPk(nextId)
			return sendQuestion(ctx, nextQuestion)
		} else {
			ctx.session.isRunningGrammar = false
			ctx.session = {}
			return ctx.reply(
				'📝 Все вопросы пройдены!',
				Markup.keyboard([
					['📡 Запустить тест'],
					['🔁 Повторить ошибки'],
					['⬅️ Назад'],
				]).resize()
			)
		}
	}, 1000) // Задержка для чтения фидбека
})

// ❗ Важно: У Telegraf есть проблема с редактированием/удалением сообщений сразу после callback_query.
// Таймаут помогает избежать ошибок "message not modified".

module.exports = grammaticalTestScene
