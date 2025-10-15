'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class UserGrammarAnswer extends Model {
		static associate(models) {
			UserGrammarAnswer.belongsTo(models.User, { foreignKey: 'userId' })
			UserGrammarAnswer.belongsTo(models.IcaoGrammarQuestion, {
				foreignKey: 'questionId',
			})
		}
	}

	UserGrammarAnswer.init(
		{
			userId: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			questionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			isCorrect: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			answeredAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'UserGrammarAnswer',
			tableName: 'UserGrammarAnswers',
			indexes: [
				{
					unique: true,
					name: 'user_question_unique', // 👈 рекомендую явно указать имя
					fields: ['userId', 'questionId'],
				},
			],
		}
	)

	return UserGrammarAnswer
}
