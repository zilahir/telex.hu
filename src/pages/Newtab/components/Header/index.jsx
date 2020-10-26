import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { usePosition } from 'use-position'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { colors } from '../../utils/theme'
import { cloudFnGet } from '../../../../requests'
import { weatherApiRoot } from '../../../../requests/apiEndpoints'
import { createWeather } from './Weather'
import styles from './Header.modules.scss'

const WEATHER_API_KEY = '04b9eb1d8c5a27b96f2a06c0f6997bdf'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: colors.darkMain,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	container: {
		justifyContent: 'flex-end',
	},
	weatherText: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 16,
		color: '#f9f9f9',
	},
}))

const Header = () => {
	const classes = useStyles()
	const [weatherData, setWeatherData] = useState()
	const {
		latitude,
		longitude,
	} = usePosition()

	useEffect(() => {
		if (latitude && longitude) {
			cloudFnGet(`${weatherApiRoot}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
				.then(result => {
					setWeatherData(result.data)
				})
		}
	}, [latitude])
	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position="static">
				<Toolbar className={classes.container}>
					{
						weatherData && (
							<Typography className={classes.weatherText}>
								<span className={styles.cityName}>
									{
										`${weatherData.name},`
									}
								</span>
								{
									`${createWeather(weatherData.weather[0]).text}, ${weatherData.main.temp} °c`
								}
								{
									createWeather(weatherData.weather[0]).icon
								}
							</Typography>
						)
					}
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
