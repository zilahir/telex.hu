/* eslint-disable unicorn/filename-case */
import React, { useEffect, useState } from 'react'

import { cloudFnGet } from '../../requests'
import { apiEndpoints } from '../../requests/apiEndpoints'
import ListItem from './components/ListItem'
import RSS, { } from './components/Rss'
import styles from './Newtab.module.scss'
import Header from './components/Header'
import Footer from './components/Footer'

const Newtab = () => {
	const [reviewData, setReviewData] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	const hide = true
	useEffect(() => {
		cloudFnGet(apiEndpoints.getAllReviews)
			.then(result => {
				setReviewData(result.data)
				toggleLoading(false)
			})
	}, [])
	return (
		<>
			<Header />
			<div className={styles.rootContainer}>
				<RSS />
				<div className={styles.reviewsContainer}>
					{
						!hide && !isLoading && reviewData.map(thisReview => (
							<ListItem
								key={thisReview.article.articleId}
								articleId={thisReview.article.articleId}
								articleUrl={thisReview.article.articleUrl}
								revision={thisReview.currentRevision}
							/>
						))
					}
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Newtab
