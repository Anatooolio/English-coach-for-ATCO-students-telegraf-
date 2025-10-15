const { Scenes, Markup } = require('telegraf')
const { BaseScene } = Scenes
const os = require('os')

const audioScene = new BaseScene('audio')

audioScene.enter(async ctx => {
	try {
		const message = [
			`🎧 <b>Ты выбрал аудирование!</b>`,
			``,
			`🗣️ На экзамене по авиационному английскому тебе предстоит работать с двумя типами аудиотреков:`,
			``,
			`• <b>Короткие треки</b> — твоя задача: отреагировать как диспетчер.`,
			`• <b>Длинные треки</b> — нужно пересказать, что произошло во время полёта.`,
			``,
			`🚀 <b>Готов начать?</b> Выбери тип треков ниже:`,
		].join('\n')

		await ctx.replyWithHTML(
			message,
			Markup.keyboard([
				['🎙️ Short tracks'],
				['📻 Long tracks'],
				['⬅️ Назад'],
			]).resize()
		)
	} catch (error) {
		console.error('Ошибка в сцене с аудио тестированием:', error)
		await ctx.reply(
			'⚠️ Возникла ошибка при загрузке аудио-сцены. Попробуй перезапустить меня.'
		)
	}
})

// Обработка выбора
audioScene.hears('🎙️ Short tracks', ctx => ctx.scene.enter('shortTracks'))
audioScene.hears('📻 Long tracks', ctx => ctx.scene.enter('longTracks'))
audioScene.hears('⬅️ Назад', ctx => ctx.scene.enter('welcome'))

module.exports = audioScene
