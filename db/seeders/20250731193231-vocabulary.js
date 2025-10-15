'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Vocabulary', [
			{ topic: 'Weather', word: 'rain', translation: 'дождь' },
			{ topic: 'Weather', word: 'cloud', translation: 'облако' },
			{ topic: 'Weather', word: 'snow', translation: 'снег' },
			{ topic: 'Weather', word: 'wind', translation: 'ветер' },
			{ topic: 'Weather', word: 'storm', translation: 'буря' },
			{ topic: 'Weather', word: 'fog', translation: 'туман' },
			{ topic: 'Weather', word: 'temperature', translation: 'температура' },
			{ topic: 'Weather', word: 'humidity', translation: 'влажность' },
			{ topic: 'Weather', word: 'lightning', translation: 'молния' },
			{ topic: 'Weather', word: 'hail', translation: 'град' },
			{ topic: 'Weather', word: 'Visibility', translation: 'Видимость' },
			{ topic: 'Weather', word: 'Crosswind', translation: 'Боковой ветер' },
			{ topic: 'Weather', word: 'Precipitation', translation: 'Осадки' },
			{
				topic: 'Weather',
				word: 'Temperature inversion',
				translation: 'Инверсия температуры',
			},
			{ topic: 'Weather', word: 'Turbulence', translation: 'Турбулентность' },
			{ topic: 'Weather', word: 'Jet stream', translation: 'Струйное течение' },
			{ topic: 'Weather', word: 'Thunderstorm', translation: 'Гроза' },
			{ topic: 'Weather', word: 'Wind shear', translation: 'Сдвиг ветра' },
			{
				topic: 'Weather',
				word: 'Ceiling',
				translation: 'Нижняя граница облаков',
			},

			{ topic: 'RVSM', word: 'altitude', translation: 'высота' },
			{ topic: 'RVSM', word: 'separation', translation: 'эшелонирование' },
			{
				topic: 'RVSM',
				word: 'airspace',
				translation: 'воздушное пространство',
			},
			{ topic: 'RVSM', word: 'approval', translation: 'разрешение' },
			{ topic: 'RVSM', word: 'equipment', translation: 'оборудование' },
			{ topic: 'RVSM', word: 'compliance', translation: 'соответствие' },
			{ topic: 'RVSM', word: 'flight level', translation: 'эшелон' },
			{ topic: 'RVSM', word: 'navigation', translation: 'навигация' },
			{ topic: 'RVSM', word: 'certification', translation: 'сертификация' },
			{
				topic: 'RVSM',
				word: 'RVSM',
				translation: 'Минимальное вертикальное эшелонирование',
			},
			{
				topic: 'RVSM',
				word: 'Altitude separation',
				translation: 'Вертикальное разделение',
			},
			{
				topic: 'RVSM',
				word: 'Airspace',
				translation: 'Воздушное пространство',
			},
			{
				topic: 'RVSM',
				word: 'Monitoring',
				translation: 'Контроль соответствия',
			},
			{
				topic: 'RVSM',
				word: 'Height-keeping performance',
				translation: 'Точность удержания высоты',
			},
			{ topic: 'RVSM', word: 'ATC clearance', translation: 'Разрешение УВД' },
			{
				topic: 'RVSM',
				word: 'Pitot-static system',
				translation: 'Система измерения давления',
			},
			{
				topic: 'RVSM',
				word: 'TCAS',
				translation: 'Система предупреждения столкновений',
			},
			{ topic: 'RVSM', word: 'Deviation', translation: 'Отклонение от высоты' },

			{ topic: 'Medical problems', word: 'nausea', translation: 'тошнота' },
			{ topic: 'Medical problems', word: 'vomiting', translation: 'рвота' },
			{
				topic: 'Medical problems',
				word: 'dizziness',
				translation: 'головокружение',
			},
			{ topic: 'Medical problems', word: 'pain', translation: 'боль' },
			{ topic: 'Medical problems', word: 'fever', translation: 'лихорадка' },
			{
				topic: 'Medical problems',
				word: 'unconscious',
				translation: 'без сознания',
			},
			{
				topic: 'Medical problems',
				word: 'bleeding',
				translation: 'кровотечение',
			},
			{ topic: 'Medical problems', word: 'injury', translation: 'травма' },
			{ topic: 'Medical problems', word: 'stroke', translation: 'инсульт' },
			{
				topic: 'Medical problems',
				word: 'heart attack',
				translation: 'сердечный приступ',
			},

			{ topic: 'Pilots incapacity', word: 'fatigue', translation: 'усталость' },
			{ topic: 'Pilots incapacity', word: 'illness', translation: 'болезнь' },
			{ topic: 'Pilots incapacity', word: 'stroke', translation: 'инсульт' },
			{
				topic: 'Pilots incapacity',
				word: 'heart attack',
				translation: 'сердечный приступ',
			},
			{
				topic: 'Pilots incapacity',
				word: 'loss of consciousness',
				translation: 'потеря сознания',
			},
			{
				topic: 'Pilots incapacity',
				word: 'dizziness',
				translation: 'головокружение',
			},
			{ topic: 'Pilots incapacity', word: 'seizure', translation: 'приступ' },
			{
				topic: 'Pilots incapacity',
				word: 'blurred vision',
				translation: 'затуманенное зрение',
			},
			{
				topic: 'Pilots incapacity',
				word: 'confusion',
				translation: 'замешательство',
			},
			{
				topic: 'Pilots incapacity',
				word: 'speech difficulty',
				translation: 'затруднённая речь',
			},

			{ topic: 'Air rage', word: 'shouting', translation: 'крики' },
			{ topic: 'Air rage', word: 'threats', translation: 'угрозы' },
			{ topic: 'Air rage', word: 'violence', translation: 'насилие' },
			{ topic: 'Air rage', word: 'intoxication', translation: 'опьянение' },
			{
				topic: 'Air rage',
				word: 'disruption',
				translation: 'нарушение порядка',
			},
			{ topic: 'Air rage', word: 'refusal', translation: 'отказ' },
			{ topic: 'Air rage', word: 'argument', translation: 'ссора' },
			{ topic: 'Air rage', word: 'interference', translation: 'вмешательство' },
			{ topic: 'Air rage', word: 'restraint', translation: 'удержание' },
			{ topic: 'Air rage', word: 'handcuffs', translation: 'наручники' },

			{ topic: 'FOD', word: 'tools', translation: 'инструменты' },
			{ topic: 'FOD', word: 'nuts', translation: 'гайки' },
			{ topic: 'FOD', word: 'bolts', translation: 'болты' },
			{ topic: 'FOD', word: 'plastic', translation: 'пластик' },
			{ topic: 'FOD', word: 'metal', translation: 'металл' },
			{ topic: 'FOD', word: 'paper', translation: 'бумага' },
			{ topic: 'FOD', word: 'glass', translation: 'стекло' },
			{ topic: 'FOD', word: 'wire', translation: 'провод' },
			{ topic: 'FOD', word: 'rubber', translation: 'резина' },
			{ topic: 'FOD', word: 'tape', translation: 'лента' },
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Vocabulary', null, {})
	},
}
