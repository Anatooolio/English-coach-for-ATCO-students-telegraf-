'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Books', [
			{
				title: 'ICAO Doc 4444',
				description: 'Air Traffic Management.',
				link: 'https://recursosdeaviacion.com/wp-content/uploads/2021/01/icao-doc-4444-air-traffic-management.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'ICAO Doc 9432',
				description: 'Manual of Radiotelephony.',
				link: 'https://aviation-is.better-than.tv/icaodocs/Doc%209432%20-%20Manual%20of%20Radiotelephony/DOC%209432%20-%204%20ed.%202007.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'ICAO Doc 8400',
				description: 'Сокращения и коды ICAO',
				link: 'https://aerohelp.ru/sysfiles/374_141.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'ФАП №362',
				description:
					'Порядок осуществления радиосвязи в воздушном пространстве Российской Федерации',
				link: 'https://base.garant.ru/70359988/',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Авиационный английский язык',
				description: 'Учебно-методическое пособие Е.Л.Воронянская',
				link: 'http://lib.uvauga.ru/disk/2024/Voronyanskaya_Trazhukova_Fedechko_Shlyamova_Aviatsionny_angliyskiy_yazyk_Sbornik_testov_2024.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Институт Аэронавигации',
				description: 'Учебно-методическое пособие',
				link: 'https://clck.ru/3NLJBJ',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Авиационный английский язык в нештатных ситуациях',
				description: 'Автор Н.К.Арагилян',
				link: 'https://lib.ulstu.ru/venec/disk/2015/Aragilyan_6.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Oxford English for Aviation Book',
				description: 'Для пилотов и для диспетчеров УВД',
				link: 'http://vancesclass.pbworks.com/w/file/fetch/95013737/Oxford%20English%20for%20Aviation%20Book.pdf',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: 'Aviation English',
				description: 'Учебник О.И.Мухтабарова',
				link: 'https://clck.ru/3NLKij',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Books', null, {})
	},
}
