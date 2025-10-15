module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserGrammarAnswers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			questionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'IcaoGrammarQuestions',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			isCorrect: {
				type: Sequelize.BOOLEAN,
			},
			answeredAt: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})

		// 💡 Добавление ограничения уникальности
		await queryInterface.addConstraint('UserGrammarAnswers', {
			fields: ['userId', 'questionId'],
			type: 'unique',
			name: 'user_question_unique',
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('UserGrammarAnswers')
	},
}
