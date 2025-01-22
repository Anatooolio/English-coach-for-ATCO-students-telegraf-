const decisions = require('../materials/questions/decisions.json')
const { Random } = require('random-js')

const getRandomQuestion = (topic) => {
	const random = new Random()
	const questionTopic = topic.toLowerCase()
	const randomQuestionIndex = random.integer(0, decisions[questionTopic].questions.length - 1)
	return decisions[questionTopic].questions[randomQuestionIndex]
}

module.exports = { getRandomQuestion }
