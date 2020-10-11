import React from 'react'
import { render } from 'react-dom'

import Root from './root'

export function renderCovidApp() {
	render(
		<div>
			<Root />
		</div>,
		document.querySelector('#covid-app'),
	)
}
