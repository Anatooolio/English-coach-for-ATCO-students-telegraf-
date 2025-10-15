'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.UserShortTrack, { foreignKey: 'userId' })
			User.hasMany(models.UserLongTrack, { foreignKey: 'userId' })
			User.hasMany(models.UserGrammarAnswer, { foreignKey: 'userId' })
			User.hasMany(models.userAchievement, {
				foreignKey: 'userId',
				as: 'achievements',
			})
		}
	}

	User.init(
		{
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			username: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'Users',
		}
	)

	return User
}
