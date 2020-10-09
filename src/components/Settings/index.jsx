import React, { useState } from 'react'
import DarkModeToggle from 'react-dark-mode-toggle'

import styles from './Settings.module.scss'

/**
 * @author zilahir
 * @function Settings
 * */

const Settings = () => {
	const [isDarkMode, setIsDarkMode] = useState(() => false)
	return (
		<div className={styles.settingsRootContainer}>
			<div className={styles.oneItem}>
				<p>Dark mód</p>
				<DarkModeToggle
					size={50}
					onChange={setIsDarkMode}
					checked={isDarkMode}
				/>
			</div>
		</div>
	)
}

export default Settings
