import { TOGGLE_DARK_MODE } from '../actionTypes'

const initialState = {
	darkmode: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case TOGGLE_DARK_MODE:
		return {
			...state,
			darkmode: action.payload.darkmode,
		}
	default:
		return state
	}
}

export default reducer
