'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('IcaoGrammarQuestions', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			question: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			options: {
				type: Sequelize.ARRAY(Sequelize.STRING),
				allowNull: false,
			},
			answerIndex: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			explanation: {
				type: Sequelize.TEXT,
			},
			type: {
				type: Sequelize.ENUM('singleSelect', 'multiSelect'),
				defaultValue: 'singleSelect',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	down: async queryInterface => {
		await queryInterface.dropTable('IcaoGrammarQuestions')
	},
}
