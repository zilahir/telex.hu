import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Button, CardContent, CardActions, Typography, makeStyles } from '@material-ui/core'

import { getRssFeed } from '../../utils/getRssFeed'
import styles from './Rss.module.scss'
import { colors } from '../../utils/theme'

/**
 * @author zilahir
 * @function RSS
 * */

const useStyles = makeStyles({
	root: {
		backgroundColor: colors.pastelYellow,
	},
	articleTitle: {
		color: colors.telexBlue,
		fontSize: 22,
	},
})

const RSS = () => {
	const [telexRss, setTelexRss] = useState([])
	const [isLoading, toggleLoading] = useState(true)
	const [pagination, setPagination] = useState(7)
	const classes = useStyles()
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
					<Card
						role="button"
						tabIndex={-1}
						onKeyDown={undefined}
						className={classes.root}
					>
						<CardContent>
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
