'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLongTracks', {
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
			trackId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'longTracks',
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
    await queryInterface.addConstraint('UserLongTracks', {
			fields: ['userId', 'trackId'],
			type: 'unique',
			name: 'uq_user_longTrack_combo',
		})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserLongTracks');
  }
};