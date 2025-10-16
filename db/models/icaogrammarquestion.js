'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = sequelize => {
	class IcaoGrammarQuestion extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			IcaoGrammarQuestion.hasMany(models.UserGrammarAnswer, {
				foreignKey: 'questionId',
			})
		}
	}
	IcaoGrammarQuestion.init(
		{
			question: DataTypes.TEXT,
			options: DataTypes.ARRAY(DataTypes.STRING),
			answerIndex: DataTypes.INTEGER,
			explanation: DataTypes.TEXT,
			type: {
				type: DataTypes.ENUM('singleSelect', 'multiSelect'),
				defaultValue: 'singleSelect',
			},
		},
		{
			sequelize,
			modelName: 'IcaoGrammarQuestion',
			tableName: 'IcaoGrammarQuestions',
		}
	)
	return IcaoGrammarQuestion
}
