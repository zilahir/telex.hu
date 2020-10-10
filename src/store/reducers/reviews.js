import { SET_ALL_REVISIONS, SET_APPROVED_REVISIONS } from '../actionTypes'

const initialState = {
	approvedRevisions: [],
	allRevisions: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_APPROVED_REVISIONS:
		return {
			...state,
			approvedRevisions: action.payload.approvedRevisions,
		}
	case SET_ALL_REVISIONS:
		return {
			...state,
			allRevisions: action.payload.allRevisions,
		}
	default:
		return state
	}
}

export default reducer
