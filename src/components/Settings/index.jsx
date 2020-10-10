import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DarkModeToggle from 'react-dark-mode-toggle'

import styles from './Settings.module.scss'
import { toggleDarkMode } from '../../store/actions/misc'

/**
 * @author zilahir
 * @function Settings
 * */

const Settings = () => {
	const darkMode = useSelector(state => state.misc.darkmode)
	const [isDarkMode, setIsDarkMode] = useState(darkMode)
	const dispatch = useDispatch()

	function handleDarkMode() {
		const newValue = !isDarkMode
		setIsDarkMode(newValue)
		dispatch(toggleDarkMode)
	}
	return (
		<div className={styles.settingsRootContainer}>
			<div className={styles.oneItem}>
				<p>Dark mód</p>
				<DarkModeToggle
					size={50}
					onChange={() => handleDarkMode()}
					checked={isDarkMode}
				/>
			</div>
		</div>
	)
}

export default Settings
