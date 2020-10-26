import React from 'react'
import { WiDayShowers, WiCloudy } from 'weather-icons-react'

import styles from './Weather.module.scss'

/**
 * @param {object} weatherData the weather object returned by the API
 * @returns {object} the result object
 */
export const createWeather = weatherData => {
	const result = { icon: '', text: '' }
	if (weatherData && weatherData.main.toLowerCase() === 'rain') {
		result.text = 'esős'
		result.icon = (
			<span className={styles.weatherIcon}>
				<WiDayShowers size={44} />
			</span>
		)
	} else if (weatherData && weatherData.main.toLowerCase() === 'clouds') {
		result.text = 'felhős'
		result.icon = (
			<span className={styles.weatherIcon}>
				<WiCloudy size={44} />
			</span>
		)
	}
	return result
}
