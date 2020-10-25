const apiRoot = 'http://localhost:5000'
const covidApiRoot = 'https://disease.sh/v3/covid-19'
export const telexRoot = 'https://telex.hu'

export const apiEndpoints = {
	sendArticleAnalytics: `${apiRoot}/analytics`,
	authUser: `${apiRoot}/auth`,
	insertReview: `${apiRoot}/review`,
	getReviews: `${apiRoot}/review`,
	insertLike: `${apiRoot}/analytics/like`,
	getLikes: `${apiRoot}/analytics/like`,
	getArticleId: `${apiRoot}/article/get-article-id`,
	getAllReviews: `${apiRoot}/reviews`,
}

export const covidApi = {
	getHistoricalData: `${covidApiRoot}/historical/hungary`,
	getSummarizedData: `${covidApiRoot}/countries/hungary`,
}
