import { SET_CURRENT_ARTICLE_ID } from '../actionTypes'

export const setThisArticleId = thisArticleId => dispatch => {
	dispatch({
		type: SET_CURRENT_ARTICLE_ID,
		payload: {
			thisArticleId,
		},
	})
}
