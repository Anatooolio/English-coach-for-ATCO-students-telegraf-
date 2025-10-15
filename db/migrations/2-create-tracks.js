'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Tracks', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			title: {
				type: Sequelize.STRING,
			},
			script: {
				type: Sequelize.STRING,
			},
			fileId: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.BOOLEAN,
			},
			sent: {
				type: Sequelize.BOOLEAN,
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
	},

	down: async queryInterface => {
		await queryInterface.dropTable('Tracks')
	},
}
