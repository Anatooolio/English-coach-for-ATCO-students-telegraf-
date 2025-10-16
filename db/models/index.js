'use strict'

const fs = require('fs')
const path = require('path')

// ИМПОРТ: Импортируем весь модуль.
const SequelizeModule = require('sequelize')

// ИЗВЛЕЧЕНИЕ: Гарантированное получение конструктора и типов
const SequelizeConstructor =
	SequelizeModule.Sequelize || SequelizeModule.default || SequelizeModule
const DataTypes = SequelizeModule.DataTypes
const Model = SequelizeModule.Model // Нам нужна Model для наследования

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database.json')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
	sequelize = new SequelizeConstructor(
		process.env[config.use_env_variable],
		config
	)
} else {
	sequelize = new SequelizeConstructor(
		config.database,
		config.username,
		config.password,
		config
	)
}

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		)
	})
	.forEach(file => {
		// КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Передаем извлеченный DataTypes
		const model = require(path.join(__dirname, file))(sequelize)
		db[model.name] = model
	})

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = SequelizeConstructor

module.exports = db
