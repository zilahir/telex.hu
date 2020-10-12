import React from 'react'
import { render } from 'react-dom'

import Root from './root'
import styles from './root.module.scss'

export function renderCovidApp() {
	render(
		<div className={styles.rootContainer}>
			<Root />
		</div>,
		document.querySelector('#covid-app'),
	)
}
