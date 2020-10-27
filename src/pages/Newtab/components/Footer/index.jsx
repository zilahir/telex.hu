import React from 'react'
import { AppBar, Toolbar, makeStyles, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import LanguageIcon from '@material-ui/icons/Language'

import { colors } from '../../utils/theme'

const useStyles = makeStyles({
	footer: {
		top: 'auto',
		bottom: 0,
		alignItems: 'flex-end',
		backgroundColor: colors.darkMain,
	},
	root: {
		flexGrow: 1,
	},
})

/**
 * @author zilahir
 * @function Footer
 * */

const Footer = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={classes.footer}
			>
				<Toolbar>
					<IconButton
						onClick={() => window.location.replace('https://richardzilahi.hu')}
					>
						<LanguageIcon htmlColor="#f9f9f9" />
					</IconButton>
					<IconButton
						onClick={() => window.location.replace('https://github.com/zilahir/telex.hu')}
					>
						<GitHubIcon htmlColor="#f9f9f9" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Footer
