'use strict'
const { Model, DataTypes } = require('sequelize')

module.exports = sequelize => {
	class userAchievement extends Model {
		static associate(models) {
			userAchievement.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user',
			})
		}
	}

	userAchievement.init(
		{
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			key: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			unlockedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'userAchievement',
			timestamps: true,
		}
	)

	return userAchievement
}
