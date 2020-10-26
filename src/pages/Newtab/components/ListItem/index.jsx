import React from 'react'
import PropTypes from 'prop-types'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import { Button } from '@material-ui/core'

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
	revision,
}) => (
	<div className={styles.listItemContiner}>
		<div className={styles.reviewContainer}>
			<p className={styles.old}>
				{
					revision.originalText
				}
			</p>
			<p className={styles.new}>
				{revision.fixedText}
			</p>
		</div>
		<div className={styles.iconsContainer}>
			<ul>
				<li>
					<Button
						startIcon={<CheckIcon />}
					>
						Elfogad
					</Button>
				</li>
				<li>
					<Button
						startIcon={<DeleteIcon />}
					>
						Elutasít
					</Button>
				</li>
				<li>
					<Button
						startIcon={<OpenInNewIcon htmlColor="#121212" />}
					>
						Cikk megnyitása
					</Button>
				</li>
			</ul>
		</div>
	</div>
)

ListItem.propTypes = {
	articleId: PropTypes.string.isRequired,
	articleSlug: PropTypes.string.isRequired,
	articleUrl: PropTypes.string.isRequired,
	revision: PropTypes.objectOf(
		PropTypes.any,
	).isRequired,
}

export default ListItem
