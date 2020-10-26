import React from 'react'
import PropTypes from 'prop-types'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import classnames from 'classnames'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import { Button } from '@material-ui/core'

import styles from './ListItem.module.scss'
import { apiEndpoints, telexRoot } from '../../../../requests/apiEndpoints'
import { cloudFnPatch } from '../../../../requests'

/**
 * @author zilahir
 * @function ListItem
 * */

const ListItem = ({
	articleId,
	revision,
	articleUrl,
}) => {
	/**
	 *
	 * @description set a review to approved in the database
	 */
	function handleApproveReview() {
		cloudFnPatch(`${apiEndpoints.resolveReview}/${articleId}`, {
			isApproved: !revision.isApproved,
		})
	}
	return (
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
					<li className={classnames(
						revision.isApproved ? styles.hidden : undefined,
					)}
					>
						<Button
							startIcon={<CheckIcon />}
							onClick={() => handleApproveReview()}
						>
							Elfogad
						</Button>
					</li>
					<li
						className={classnames(
							revision.isApproved ? styles.hidden : undefined,
						)}
					>
						<Button
							startIcon={<DeleteIcon />}
						>
							Elutasít
						</Button>
					</li>
					<li>
						<Button
							onClick={() => window.location.replace(`${telexRoot}${articleUrl}`)}
							startIcon={<OpenInNewIcon htmlColor="#121212" />}
						>
							Cikk megnyitása
						</Button>
					</li>
				</ul>
			</div>
		</div>
	)
}

ListItem.propTypes = {
	articleId: PropTypes.string.isRequired,
	articleUrl: PropTypes.string.isRequired,
	revision: PropTypes.objectOf(
		PropTypes.any,
	).isRequired,
}

export default ListItem
