import { SET_FINGERPRINT } from '../actionTypes'

export const setFingerprint = fingerprint => dispatch => {
	dispatch({
		type: SET_FINGERPRINT,
		payload: {
			fingerprint,
		},
	})
}
