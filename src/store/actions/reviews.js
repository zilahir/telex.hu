import { SET_ALL_REVISIONS, SET_APPROVED_REVISIONS } from '../actionTypes'

export const setApprovedRevisions = approvedRevisions => dispatch => {
	dispatch({
		type: SET_APPROVED_REVISIONS,
		payload: {
			approvedRevisions,
		},
	})
}

export const setAllRevisions = allRevisions => dispatch => {
	dispatch({
		type: SET_ALL_REVISIONS,
		payload: {
			allRevisions,
		},
	})
}
