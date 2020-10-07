import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from '../../store/configureStore'

import Popup from './popup'

render(
	<Provider store={store}>
		<Popup />
	</Provider>,
	window.document.querySelector('#app-container'),
)
