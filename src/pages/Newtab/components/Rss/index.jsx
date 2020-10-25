import React, { useEffect, useState } from 'react'

import { getRssFeed } from '../../utils/getRssFeed'
import styles from './Rss.module.scss'

/**
 * @author zilahir
 * @function RSS
 * */

const RSS = () => {
	const [telexRss, setTelexRss] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	const [pagination, setPagination] = useState(7)
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
					<div
						className={styles.oneItem}
						role="button"
						tabIndex={-1}
						onKeyDown={undefined}
						onClick={() => window.location.replace(thisArticle.link)}
					>
						<p>
							{thisArticle.title}
						</p>
					</div>
				))
			}
		</div>
	)
}

export default RSS
