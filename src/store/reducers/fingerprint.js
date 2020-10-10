import { SET_FINGERPRINT } from '../actionTypes'

const initialState = {
	fingerprint: undefined,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_FINGERPRINT:
		return {
			...state,
			fingerprint: action.payload.fingerprint,
		}
	default:
		return state
	}
}

export default reducer
