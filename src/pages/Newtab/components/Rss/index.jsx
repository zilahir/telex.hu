import React, { useEffect, useState } from 'react'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import shortid from 'shortid'
import { Button, CardContent, CardActions, Typography, makeStyles, Card, CardMedia } from '@material-ui/core'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import { format } from 'date-fns'
import StackGrid from 'react-stack-grid'

import { getRssFeed } from '../../utils/getRssFeed'
import { colors } from '../../utils/theme'
import { apiEndpoints, telexRoot } from '../../../../requests/apiEndpoints'
import { cloudFnGet } from '../../../../requests'
import { getArticleSlug } from './utils/getArticleSlug'

/**
 * @author zilahir
 * @function RSS
 * */

const useStyles = makeStyles({
	root: {
		backgroundColor: colors.darkAlter,
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	articleTitle: {
		color: '#f9f9f9',
		fontSize: 22,
	},
	card: {
		flex: 1,
	},
	footer: {
		fontSize: 12,
		display: 'flex',
		alignItems: 'center',
		marginTop: 10,
		color: '#f9f9f9',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	iconClass: {
		color: '#f9f9f9',
		marginRight: 10,
	},
	readMore: {
		color: '#f9f9f9',
		backgroundColor: colors.darkMain,
	},
})

const RSS = () => {
	const [telexRss, setTelexRss] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	// const [pagination, setPagination] = useState(15)
	const pagination = 15

	const classes = useStyles()
	useEffect(() => {
		const promiseArray = []
		const resultArray = []
		getRssFeed().then(result => {
			result.items.forEach(currentArticle => {
				promiseArray.push(new Promise(resolve => {
					cloudFnGet(`${apiEndpoints.telexArticles}/${getArticleSlug(currentArticle.link)}`)
						.then(articleResult => {
							resultArray.push({
								currentArticle,
								articleMeta: articleResult.data,
							})
							resolve()
						})
				}))
			})
			Promise.all(promiseArray).then(() => {
				setTelexRss(resultArray)
				toggleLoading(false)
			})
		})
	}, [])

	return (
		<StackGrid
			columnWidth={300}
			gutterHeight={30}
			gutterWidth={20}
		>
			{
				!isLoading && telexRss.slice(0, pagination).map(thisArticle => (
					<Card
						key={`article-${shortid.generate()}`}
						role="button"
						tabIndex={-1}
						onKeyDown={undefined}
						className={classes.root}
					>
						<CardMedia
							className={classes.media}
							image={`${telexRoot}${thisArticle.articleMeta.facebookImage}`}
							title={thisArticle.currentArticle.title}
						/>
						<CardContent className={classes.card}>
							<Typography
								className={classes.articleTitle}
							>
								{thisArticle.currentArticle.title}
							</Typography>
							<Typography className={classes.footer}>
								<QueryBuilderIcon className={classes.iconClass} fontSize="small" />
								{format(new Date(thisArticle.currentArticle.isoDate), 'yyyy-mm-dd HH:mm')}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								className={classes.readMore}
								endIcon={<OpenInNewIcon />}
								size="small"
								onClick={
									() => window.location.replace(thisArticle.currentArticle.link)
								}
							>
								Megnyitás
							</Button>
						</CardActions>
					</Card>
				))
			}
		</StackGrid>
	)
}

export default RSS
