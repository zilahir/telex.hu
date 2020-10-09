import { TOGGLE_DARK_MODE } from '../actionTypes'

export const toggleDarkMode = darkmode => dispatch => {
	dispatch({
		type: TOGGLE_DARK_MODE,
		payload: {
			darkmode,
		},
	})
}
