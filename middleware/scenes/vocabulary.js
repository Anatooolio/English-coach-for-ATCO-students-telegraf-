const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes

const vocabularyScene = new BaseScene('vocabulary')

// Список тем
const topics = [
	'Weather',
	'RVSM',
	'Medical problems',
	'Pilots incapacity',
	'Air rage',
	'FOD',
	'RWY incursion',
	'Technical problems',
	'Decompression',
	'Fuel',
	'Wild life',
	'Electrical problems',
	'Engine problems',
	'Communication issue',
	'Belly landing (gear up landing)',
	'FMS',
	'Fire',
	'Delays',
	'Nearmiss',
	'UFO',
	'Security in aviation',
	'Terror',
]

// Разбиваем на строки по 2 кнопки
function chunk(array, size) {
	return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
		array.slice(i * size, i * size + size)
	)
}

vocabularyScene.enter(ctx => {
	const keyboard = chunk(topics, 2)
	ctx.reply(
		'📚 Выбери тему для изучения:',
		Markup.keyboard([...keyboard, ['⬅️ Назад']]).resize()
	)
})

// Обработка выбора темы
topics.forEach(topic => {
	vocabularyScene.hears(topic, ctx => {
		ctx.reply(`🔍 Ты выбрал тему: <b>${topic}</b>`, { parse_mode: 'HTML' })
		// Здесь можно добавить переход в под-сцену или отправку материалов
	})
})

// Назад
vocabularyScene.hears('⬅️ Назад', ctx => ctx.scene.enter('welcome'))

module.exports = vocabularyScene
