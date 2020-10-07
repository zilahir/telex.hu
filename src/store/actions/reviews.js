import { SET_APPROVED_REVISIONS } from '../actionTypes'

export const setApprovedRevisions = approvedRevisions => dispatch => {
	dispatch({
		type: SET_APPROVED_REVISIONS,
		payload: {
			approvedRevisions,
		},
	})
}
