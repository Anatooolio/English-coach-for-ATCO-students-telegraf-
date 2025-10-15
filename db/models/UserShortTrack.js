'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class UserShortTrack extends Model {
		static associate(models) {
			UserShortTrack.belongsTo(models.User, { foreignKey: 'userId' })
			UserShortTrack.belongsTo(models.Track, { foreignKey: 'trackId' })
		}
	}

	UserShortTrack.init(
		{
			userId: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			trackId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			sentAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'UserShortTrack',
			tableName: 'UserShortTracks',
			indexes: [
				{
					unique: true,
					fields: ['userId', 'trackId'],
				},
			],
		}
	)

	return UserShortTrack
}
