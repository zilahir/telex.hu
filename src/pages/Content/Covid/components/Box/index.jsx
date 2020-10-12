import React from 'react'

import styles from './Box.module.scss'

/**
 * @author zilahi
 * @function Box
 * */

const Box = () => (
	<div className={styles.boxContainer}>
		<p>
			Ez egy kis hely szabad. Ha van egy funkcióötleted, nyiss egy{' '}
			<a
				className={styles.ghUrl}
				href="https://github.com/zilahir/telex.hu/issues"
			>
				github
			</a>{' '}
			issue-t, és tárgyaljuk meg!
		</p>
	</div>
)

export default Box
