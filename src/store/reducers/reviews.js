import { SET_APPROVED_REVISIONS } from '../actionTypes'

const initialState = {
	approvedRevisions: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_APPROVED_REVISIONS:
		return {
			...state,
			approvedRevisions: action.payload.approvedRevisions,
		}
	default:
		return state
	}
}

export default reducer
