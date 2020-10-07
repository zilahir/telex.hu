import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../../components/Header/index'
import Login from '../../components/Login'

import './index.css'
import styles from './Popup.module.scss'

const Popup = () => {
	const user = useSelector(state => state.user.user)
	return (
		<div className={styles.rootContainer}>
			<Header isLoggedIn={user} />
			{!user && <Login isLoggedIn={user} />}
		</div>
	)
}

export default Popup
