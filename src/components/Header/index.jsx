import React from 'react'
import { useDispatch } from 'react-redux'

import styles from './Header.module.scss'
import telexLogo from '../../assets/img/telex/logo.png'
import { removeUser } from '../../store/actions/user'

const Header = ({ isLoggedIn }) => {
	const dispatch = useDispatch()
	return (
		<div className={styles.logoContainer}>
			{isLoggedIn && (
				<button
					className={styles.logoutBtn}
					type="button"
					onClick={() => dispatch(removeUser())}
				>
					kijelentkezés
				</button>
			)}
			<img src={telexLogo} alt="telex" />
			<p>community</p>
		</div>
	)
}

export default Header
