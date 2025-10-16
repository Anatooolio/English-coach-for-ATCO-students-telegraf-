'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = sequelize => {
	class UserLongTrack extends Model {
		static associate(models) {
			UserLongTrack.belongsTo(models.User, { foreignKey: 'userId' })
			UserLongTrack.belongsTo(models.longTrack, { foreignKey: 'trackId' })
		}
	}
	UserLongTrack.init(
		{
			userId: DataTypes.BIGINT,
			trackId: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
			sentAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'UserLongTrack',
			tableName: 'UserLongTracks',
			indexes: [
				{
					unique: true,
					fields: ['userId', 'trackId'],
				},
			],
		}
	)
	return UserLongTrack
}
