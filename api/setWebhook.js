import { setWebhook } from 'telebot-vercel'
import bot from '../englishBot'

const path = 'api/telegram.js'

export default setWebhook({ bot, path, handleErrors: true })
