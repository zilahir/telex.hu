import { AUTH_USER, REMOVE_USER } from '../actionTypes'

const initialState = {
	user: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH_USER:
		return {
			...state,
			user: action.payload.user,
		}
	case REMOVE_USER:
		return {
			...state,
			user: initialState.user,
		}
	default:
		return state
	}
}

export default reducer
