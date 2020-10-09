import { SET_FINGERPRINT } from '../actionTypes'

export const setAllRevisions = fingerprint => dispatch => {
	dispatch({
		type: SET_FINGERPRINT,
		payload: {
			fingerprint,
		},
	})
}
