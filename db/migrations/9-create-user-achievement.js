'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('userAchievements', {
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
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },      
			key: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			unlockedAt: {
				type: Sequelize.DATE,
				allowNull: true,
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

		// Уникальное ограничение: один пользователь — один ключ-достижение
		await queryInterface.addConstraint('userAchievements', {
			fields: ['userId', 'key'],
			type: 'unique',
			name: 'unique_user_achievement',
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('userAchievements')
	},
}
