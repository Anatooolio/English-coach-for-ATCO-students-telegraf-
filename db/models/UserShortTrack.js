'use strict'

// ИЗМЕНЕНИЕ 1: Импортируем Model и DataTypes вместе
const { Model, DataTypes } = require('sequelize')

// ИЗМЕНЕНИЕ 2: Удаляем DataTypes из аргументов функции
module.exports = sequelize => {
	class UserShortTrack extends Model {
		static associate(models) {
			UserShortTrack.belongsTo(models.User, { foreignKey: 'userId' })
			UserShortTrack.belongsTo(models.Track, { foreignKey: 'trackId' })
		}
	}

	UserShortTrack.init(
		{
			// DataTypes теперь доступен из импорта выше
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
