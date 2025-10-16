'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = sequelize => {
	class longTrack extends Model {
		static associate(models) {
			longTrack.hasMany(models.UserLongTrack, { foreignKey: 'trackId' })
		}
	}
	longTrack.init(
		{
			title: DataTypes.STRING,
			script: DataTypes.STRING,
			fileId: DataTypes.STRING,
			status: DataTypes.STRING,
			sent: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'longTrack',
			tableName: 'longTracks',
		}
	)
	return longTrack
}
