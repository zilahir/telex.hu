import { AUTH_USER, REMOVE_USER } from '../actionTypes'

export const setUser = user => dispatch => {
	dispatch({
		type: AUTH_USER,
		payload: {
			user,
		},
	})
}

export const removeUser = () => dispatch => {
	dispatch({
		type: REMOVE_USER,
		payload: undefined,
	})
}
