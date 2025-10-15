const { User } = require('../../db/models')
const { Op } = require('sequelize')

async function getBotStats() {
	const now = new Date()

	const startOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	)
	const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

	const totalUsers = await User.count()

	const activeToday = await User.count({
		where: {
			updatedAt: {
				[Op.gte]: startOfToday,
			},
		},
	})

	const newThisWeek = await User.count({
		where: {
			createdAt: {
				[Op.gte]: sevenDaysAgo,
			},
		},
	})

	return { totalUsers, activeToday, newThisWeek }
}

module.exports = getBotStats
