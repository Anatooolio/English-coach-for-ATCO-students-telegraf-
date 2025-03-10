const { OpenAI } = require('openai')

const baseURL = 'https://api.aimlapi.com/v1'
const apiKey = '0c65d4559aaa4e1aabfbb63dd0126dc1'
const systemPrompt = 'You are an air traffic controller'
const userPrompt = 'Tell me about radiocommunication between a pilot and an air traffic controller'

const api = new OpenAI({
	apiKey,
	baseURL,
})

const main = async () => {
	const completion = await api.chat.completions.create({
		model: 'mistralai/Mistral-7B-Instruct-v0.2',
		messages: [
			{
				role: 'system',
				content: systemPrompt,
			},
			{
				role: 'user',
				content: userPrompt,
			},
		],
		temperature: 0.7,
		max_tokens: 256,
	})

	const response = completion.choices[0].message.content

	console.log('User:', userPrompt)
	console.log('AI:', response)
}

main()
