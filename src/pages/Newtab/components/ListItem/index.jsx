import React from 'react'
import PropTypes from 'prop-types'

import styles from './ListItem.module.scss'
import { telexRoot } from '../../../../requests/apiEndpoints'

/**
 * @author zilahir
 * @function ListItem
 * */

const ListItem = ({
	articleId,
	articleSlug,
	articleUrl,
}) => (
	<div className={styles.listItemContiner}>
		<a
			rel="noopener noreferrer"
			target="_blank"
			href={`${telexRoot}${articleUrl}`}
		>
			<p>
				{
					articleSlug
				}
			</p>
		</a>
	</div>
)

ListItem.propTypes = {
	articleId: PropTypes.string.isRequired,
	articleSlug: PropTypes.string.isRequired,
	articleUrl: PropTypes.string.isRequired,
}

export default ListItem
