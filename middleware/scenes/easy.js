const { Markup, Composer, Scenes } = require('telegraf')
const startStep = new Composer()
startStep.on('text', async ctx => {
	try {
		ctx.wizard.state.data = {}
		ctx.wizard.state.data.userName = ctx.message.from.username
		ctx.wizard.state.data.firstName = ctx.message.from.first_name
		ctx.wizard.state.data.lastName = ctx.message.from.last_name
		await ctx.reply('Ура!')
	} catch (error) {
		await ctx.reply('Произошла ошибка! Попробуй перезагрузить меня...')
		console.log(`ERROR: ${error}`)
	}
})

const easyScene = new Scenes.WizardScene('easyWizard', startStep)

module.exports = easyScene
