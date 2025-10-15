const { createBadge } = require('./badgeFactory')

module.exports = [
	// 🚀 Серьёзные
	createBadge({
		key: 'short_total_1',
		label: '👣 Первый шаг',
		icon: '👣',
		statKey: 'shortTotal',
		target: 1,
		condition: 'Пройти 1 короткий трек',
	}),
	createBadge({
		key: 'learning_days_7',
		label: '🧭 Путь ученика',
		icon: '🧭',
		statKey: 'learningDays',
		target: 7,
		condition: 'Заниматься 7 дней подряд',
	}),
	createBadge({
		key: 'long_easy_2',
		label: '🏆 Завершение',
		icon: '🏆',
		statKey: 'longEasy',
		target: 2,
		condition: 'Пройти 2 лёгких длинных трека',
	}),
	createBadge({
		key: 'grammar_correct_10',
		label: '📚 Теоретик',
		icon: '📚',
		statKey: 'grammarCorrect',
		target: 10,
		condition: 'Правильно ответить на 10 грамматических вопросов',
	}),
	createBadge({
		key: 'score_20',
		label: '📈 Прогресс',
		icon: '📈',
		statKey: 'score',
		target: 20,
		condition: 'Набрать 20 рейтинговых баллов',
	}),

	// 😂 Прикольные
	createBadge({
		key: 'open_library_night',
		label: '🌚 Ночной штурм',
		icon: '🌚',
		statKey: 'nightOpens',
		target: 1,
		condition: 'Открыть библиотеку после полуночи',
	}),
	createBadge({
		key: 'long_pause',
		label: '😴 Вернулся из комы',
		icon: '😴',
		statKey: 'daysAway',
		target: 10,
		condition: 'Вернуться после 10+ дней отсутствия',
	}),
]
