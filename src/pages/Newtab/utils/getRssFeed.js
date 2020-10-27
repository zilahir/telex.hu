import Parser from 'rss-parser'

import { telexRoot } from '../../../requests/apiEndpoints'

const parser = new Parser()

export const getRssFeed = () => new Promise((resolve, reject) => {
	parser.parseURL(`${telexRoot}/rss`).then(result => {
		resolve(result)
	})
		.catch(error => {
			reject(error)
		})
})
