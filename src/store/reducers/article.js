import { SET_CURRENT_ARTICLE_ID } from '../actionTypes'

const initialState = {
	thisArticleId: undefined,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_CURRENT_ARTICLE_ID:
		return {
			...state,
			thisArticleId: action.payload.thisArticleId,
		}
	default:
		return state
	}
}

export default reducer
