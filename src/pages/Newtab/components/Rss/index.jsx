import React, { useEffect, useState } from 'react'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import shortid from 'shortid'
import { Button, CardContent, CardActions, Typography, makeStyles, Card, CardHeader, CardMedia } from '@material-ui/core'

import { getRssFeed } from '../../utils/getRssFeed'
import styles from './Rss.module.scss'
import { colors } from '../../utils/theme'
import { telexRoot } from '../../../../requests/apiEndpoints'

/**
 * @author zilahir
 * @function RSS
 * */

const useStyles = makeStyles({
	root: {
		backgroundColor: colors.pastelYellow,
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
	},
	articleTitle: {
		color: colors.telexBlue,
		fontSize: 22,
	},
	card: {
		flex: 1,
	},
	footer: {
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
})

const RSS = () => {
	const [telexRss, setTelexRss] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	const [pagination, setPagination] = useState(7)
	const classes = useStyles()
	useEffect(() => {
		getRssFeed().then(result => {
			console.debug('result', result)
			setTelexRss(result.items)
			toggleLoading(false)
		})
	}, [])
	return (
		<div className={styles.rssContianer}>
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
							image={`${telexRoot}/uploads/img-cache/1/6/0/3/4/1603470489-temp-eiacaf-20201023-600-400-zc.jpg`}
							title={thisArticle.title}
						/>
						<CardContent className={classes.card}>
							<Typography
								className={classes.articleTitle}
							>
								{thisArticle.title}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								endIcon={<OpenInNewIcon />}
								size="small"
								onClick={
									() => window.location.replace(thisArticle.link)
								}
							>
								Megnyitás
							</Button>
						</CardActions>
					</Card>
				))
			}
		</div>
	)
}

export default RSS
