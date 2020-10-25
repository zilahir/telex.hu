/* eslint-disable unicorn/filename-case */
import React, { useEffect, useState } from 'react'

import { cloudFnGet } from '../../requests'
import { apiEndpoints } from '../../requests/apiEndpoints'
import ListItem from './components/ListItem'
import RSS, { } from './components/Rss'
import styles from './Newtab.module.scss'

const Newtab = () => {
	const [reviewData, setReviewData] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	useEffect(() => {
		cloudFnGet(apiEndpoints.getAllReviews)
			.then(result => {
				setReviewData(result.data)
				toggleLoading(false)
			})
	}, [])
	return (
		<div className={styles.rootContainer}>
			<RSS />
			<div className={styles.reviewsContainer}>
				{
					!isLoading && reviewData.map(thisReview => (
						<ListItem
							key={thisReview.article.articleId}
							articleId={thisReview.article.articleId}
							articleUrl={thisReview.article.articleUrl}
							articleSlug={thisReview.article.articleSlug}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Newtab
