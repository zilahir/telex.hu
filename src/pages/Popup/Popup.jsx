import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux'

import Header from '../../components/Header/index'
import Login from '../../components/Login'

import './index.css'
import styles from './Popup.module.scss'

const Popup = () => {
	const [isLoggedIn, toggleLoggedIn] = useState(
		useSelector(state => state.user.user),
	)
	const reduxStore = useStore()
	console.debug('store', reduxStore.getState())
	console.debug('isLoggedIn', isLoggedIn)
	return (
		<div className={styles.rootContainer}>
			<Header isLoggedIn={isLoggedIn} />
			{!isLoggedIn && <Login />}
		</div>
	)
}

export default Popup
