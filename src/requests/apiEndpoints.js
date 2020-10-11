const apiRoot = 'http://localhost:5000'
const telexHu = 'https://www.telex.hu'
const covidApiRoot = 'https://disease.sh/v3/covid-19'

export const apiEndpoints = {
	sendArticleAnalytics: `${apiRoot}/analytics`,
	authUser: `${apiRoot}/auth`,
	insertReview: `${apiRoot}/review`,
	getReviews: `${apiRoot}/review`,
	insertLike: `${apiRoot}/analytics/like`,
	getLikes: `${apiRoot}/analytics/like`,
}

export const telexApiEndpoints = {
	getArtileData: `${telexHu}/api/articles`,
}

export const covidApi = {
	getHistoricalData: `${covidApiRoot}/historical/hungary`,
	getSummarizedData: `${covidApiRoot}/countries/hungary`,
}
