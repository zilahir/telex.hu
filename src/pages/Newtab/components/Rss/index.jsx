import React, { useEffect, useState } from 'react'

import { telexRoot } from '../../../../requests/apiEndpoints'
import { getRssFeed } from '../../utils/getRssFeed'
import styles from './Rss.module.scss'

/**
 * @author zilahir
 * @function RSS
 * */

const RSS = () => {
	const [telexRss, setTelexRss] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	const [pagination, setPagination] = useState(5)
	useEffect(() => {
		getRssFeed().then(result => {
			setTelexRss(result.items)
			toggleLoading(false)
		})
	}, [])
	return (
		<div className={styles.rssContianer}>
			{
				!isLoading && telexRss.slice(0, pagination).map(thisArticle => (
					<p>
						{thisArticle.title}
					</p>
				))
			}
		</div>
	)
}

export default RSS
