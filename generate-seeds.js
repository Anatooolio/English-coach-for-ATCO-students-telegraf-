//Команда для генерации сидов: node generate-seeds.js

const fs = require('fs')

// Исходные данные: список ссылок и названий
const rawTracks = [
	{
		title: 'EAB2384',
		script: 'Technical problem on board',
		url: 'https://drive.google.com/file/d/1tQiHaxmcHl5_kp4ATTcFXq9VMrXoujCw/view?usp=drive_link',
	},
	{
		title: 'EST322',
		script: 'Delays',
		url: 'https://drive.google.com/file/d/148BVbhj7zqikBHRDZcxmSs6G27UudcOm/view?usp=drive_link',
	},
	{
		title: 'Onues892',
		script: 'Standard flight',
		url: 'https://drive.google.com/file/d/1TuYdK5GTwOXvz5Mp_E1Ji9Mfws224Ya2/view?usp=drive_link',
	},
	{
		title: 'Sapers486',
		script: 'Technical problem on board',
		url: 'https://drive.google.com/file/d/19sVlwJ78-_nzWuTpxcJ2loUEYIJ7INVQ/view?usp=drive_link',
	},
	{
		title: 'VP-BFS',
		script: 'Technical problem on board',
		url: 'https://drive.google.com/file/d/1V8IMeSMW5RYykoZw04AP3OeP1AUp59lW/view?usp=drive_link',
	},
	{
		title: 'DLH3185',
		script: 'Technical problem on board',
		url: 'https://drive.google.com/file/d/1fnDwtyzarwqaM8zFOGW-9ECCXQbbIjDi/view?usp=drive_link',
	},
	{
		title: 'BAW875',
		script: 'Landing gear problem',
		url: 'https://drive.google.com/file/d/15kbJShJD0nPl9BnHBiBv4kEtTS_NfXV1/view?usp=drive_link',
	},
	{
		title: 'LOK3E',
		script: 'Communication',
		url: 'https://drive.google.com/file/d/1lWDKxnzLj9sWIRCX4_dSzcezLNfK64TN/view?usp=drive_link',
	},
	{
		title: 'NFA032',
		script: 'Fire',
		url: 'https://drive.google.com/file/d/1paxnIhobxtf_CH6sQdTLqxDZJegEEG2h/view?usp=drive_link',
	},
	{
		title: 'DCCJS',
		script: 'Technical problem on board',
		url: 'https://drive.google.com/file/d/1ilqCCerte5BfsQwRTzV9cg-155mZ_y-F/view?usp=drive_link',
	},
	{
		title: 'IJM519',
		script: 'Weather',
		url: 'https://drive.google.com/file/d/1jDnW0bkS5h4CgW8s1pDb8XTEZ75A9Wd6/view?usp=drive_link',
	},
	{
		title: 'A9CBXD',
		script: 'Landing gear problem',
		url: 'https://drive.google.com/file/d/1rYZFC4xp2xCmo4xkqo3sVb0rOQZzAKdb/view?usp=drive_link',
	},
	{
		title: 'BAW875(Laser)',
		script: 'Laser',
		url: 'https://drive.google.com/file/d/1SfPoL2o2x3rp7Usa4grAq-vVUfichkcJ/view?usp=drive_link',
	},
	{
		title: 'CPA256',
		script: 'Communication problem',
		url: 'https://drive.google.com/file/d/1A9i60CULVHLWreJTsS6jBqRxRfLN08Ip/view?usp=drive_link',
	},
	{
		title: 'JPA',
		script: 'Hydraulic problem',
		url: 'https://drive.google.com/file/d/19DJwVJETF0Y6iLe2syDNZL7mv8K4MvGV/view?usp=drive_link',
	},
	{
		title: 'HTG_102',
		script: 'Fuel problem',
		url: 'https://drive.google.com/file/d/1DSFlALjuA4AB71IjMfbM-nTloi5ylmrA/view?usp=drive_link',
	},
	{
		title: 'CLX642',
		script: 'Bird strike',
		url: 'https://drive.google.com/file/d/1CJB85NSEQu9O9gKwKy-HZ3Vww41ylQog/view?usp=drive_link',
	},
	{
		title: 'Delta2836',
		script: 'Engine problem',
		url: 'https://drive.google.com/file/d/1yxsJUJWKalolYxKMQhZhZ6NpdqAJ0jI3/view?usp=drive_link',
	},
	{
		title: 'SVW23LD',
		script: 'Delays',
		url: 'https://drive.google.com/file/d/1S6rOQ0n4_h8nv0YNVUkVs1iFHJtRbK8K/view?usp=drive_link',
	},
	{
		title: 'BAW16',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1NUVLMjMLLOuzRN_qpmOCfyyKtrb9GxGf/view?usp=drive_link',
	},
	{
		title: 'BAW11',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/18vnN-CqZlRcshiRfiUgd8iFHY_InxKAo/view?usp=drive_link',
	},
	{
		title: 'Norvegian251',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1EGI2m_hl-KRvfiZVUUWzW1XtJO60gDcq/view?usp=drive_link',
	},
	{
		title: 'Track 14',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/15UKrECcGeI7QT5hQAtKcM1zWvv2zhkvv/view?usp=drive_link',
	},
	{
		title: 'EasyChina',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1zsrtAgwPtTkM6hlgKrKPZOFmgOhNdxkS/view?usp=drive_link',
	},
	{
		title: 'OY132',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1DOJJRUklZdtt7jObS1i4_TxtiSTYfamV/view?usp=drive_link',
	},
	{
		title: 'KLM837',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1eErze26shOwWgkTo1D8w-51Gb6wSVhKu/view?usp=drive_link',
	},
	{
		title: 'KLM871',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1Nnatdh5b6xTZ9_zSzjy0fI-lX2YvSUn6/view?usp=drive_link',
	},
	{
		title: 'AFR277',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1xOQfV-QrDad_GUSmdXr3qIrnYWQIZtxH/view?usp=drive_link',
	},
	{
		title: 'Valet1JGR',
		script: 'Bird strike',
		url: 'https://drive.google.com/file/d/1I2NwpGeyn8F2dOl-YVI_P6ue6ZHl9Ff1/view?usp=drive_link',
	},
	{
		title: 'Turkish475',
		script: 'Problem during disembarking',
		url: 'https://drive.google.com/file/d/1GdUCc9ul4dLULdSLtsFWsw0njZfkD77C/view?usp=drive_link',
	},
	{
		title: 'N586G',
		script: 'State border',
		url: 'https://drive.google.com/file/d/16qJzjj2_p8pgAUOSZ7D2Ra_TZXzjEgwo/view?usp=drive_link',
	},
	{
		title: 'Qatar725',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/1gonbeHoMdXeHeI3iOqPc40WGNENE-Zr5/view?usp=drive_link',
	},
	{
		title: 'Track 1',
		script: 'Navigation problem',
		url: 'https://drive.google.com/file/d/18Tah-no4GNd-bqVXF5B7zGcAOnT2KdaH/view?usp=drive_link',
	},
	{
		title: 'VNP',
		script: 'Delays',
		url: 'https://drive.google.com/file/d/1YgXwC4NSaXdoHTz6bUTJfd8acsEOxD0O/view?usp=drive_link',
	},
	{
		title: 'Track 2',
		script: 'Air rage',
		url: 'https://drive.google.com/file/d/1EzfR2rYQdhEKMb0pXn3hgsn2YxzoMHQb/view?usp=drive_link',
	},
	{
		title: '4LD',
		script: 'Unruly pax',
		url: 'https://drive.google.com/file/d/16uQLMMGMRbBwY46o22btbWC-587oC8Zz/view?usp=drive_link',
	},
	{
		title: 'AFR1153',
		script: 'Fire',
		url: 'https://drive.google.com/file/d/1GU6uXQhwEcmK43XmROxu_SKcrqndsj9-/view?usp=drive_link',
	},
	{
		title: 'Fraction760H',
		script: 'Landing gear problem',
		url: 'https://drive.google.com/file/d/1MuiY0nNNChejc7E4jtL1lsTmLGattACk/view?usp=drive_link',
	},
	{
		title: 'CCA795',
		script: 'Communication problem',
		url: 'https://drive.google.com/file/d/1S5Zb3ucdRFaxDlQhvPRR5l62YThr5cVj/view?usp=drive_link',
	},
	{
		title: 'CLX875',
		script: 'RWY excursion',
		url: 'https://drive.google.com/file/d/1IydUpTCKK5xDq0x2ialOkCq_WM5aK31a/view?usp=drive_link',
	},
	{
		title: 'Track 3',
		script: 'Landing gear problem',
		url: 'https://drive.google.com/file/d/1deIdCUib1FZx90xjHZsbkay2nkzN1fbv/view?usp=drive_link',
	},
	{
		title: 'CPA92P',
		script: 'Weather',
		url: 'https://drive.google.com/file/d/1-JV9D65Ap8R6rXCXyw_9mo3E7G9vifUA/view?usp=drive_link',
	},
	{
		title: 'DLH729',
		script: 'Electrical problem',
		url: 'https://drive.google.com/file/d/1yFt8jW_FWMHQ2sjTZ4mHnJYjReQKjAxO/view?usp=drive_link',
	},
	{
		title: 'AFR139',
		script: 'Medical problem',
		url: 'https://drive.google.com/file/d/11nYyrx-dw13SyZM0pZ1hQJADxtEINt9d/view?usp=drive_link',
	},
	{
		title: 'DLH8385',
		script: 'Weather',
		url: 'https://drive.google.com/file/d/10zuC5eE_l3fYrAp2S_nsS5OsExvQcLt8/view?usp=drive_link',
	},
]

// Функция для извлечения fileId
function extractFileId(googleUrl) {
	const match = googleUrl.match(/\/d\/(.*?)\/|id=([^&]+)/)
	return match ? match[1] || match[2] : null
}

// Генерация сидов
const seedData = rawTracks
	.map(track => {
		const fileId = extractFileId(track.url)
		if (!fileId) {
			console.warn(`Не удалось извлечь fileId из: ${track.url}`)
			return null
		}

		return {
			title: track.title,
			script: track.script,
			fileId: fileId,
			status: null,
			sent: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
	})
	.filter(Boolean) // Удаляем null

// Вывод в файл для вставки
fs.writeFileSync('generated-tracks.json', JSON.stringify(seedData, null, 2))
console.log('✅ Сиды сгенерированы: generated-tracks.json')
