'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Track extends Model {
		static associate(models) {
			Track.hasMany(models.UserShortTrack, { foreignKey: 'trackId' })
		}
	}

	Track.init(
		{
			title: DataTypes.STRING,
			script: DataTypes.STRING,
			fileId: DataTypes.STRING,
			status: DataTypes.BOOLEAN,
			sent: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Track',
			tableName: 'Tracks',
		}
	)

	return Track
}
