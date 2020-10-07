const apiRoot = 'http://localhost:5000'
const telexHu = 'https://www.telex.hu'

export const apiEndpoints = {
	sendArticleAnalytics: `${apiRoot}/analytics`,
	authUser: `${apiRoot}/auth`,
	insertReview: `${apiRoot}/review`,
	getReviews: `${apiRoot}/review`,
}

export const telexApiEndpoints = {
	getArtileData: `${telexHu}/api/articles`,
}
