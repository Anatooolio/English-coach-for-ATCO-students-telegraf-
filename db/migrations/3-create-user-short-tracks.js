'use strict'
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('UserShortTracks', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
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
			trackId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Tracks',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			sentAt: {
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

		await queryInterface.addConstraint('UserShortTracks', {
			fields: ['userId', 'trackId'],
			type: 'unique',
			name: 'uq_user_track_combo',
		})
	},

	down: async queryInterface => {
		await queryInterface.dropTable('UserShortTracks')
	},
}
