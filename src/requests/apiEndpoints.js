// const apiRoot = 'http://localhost:5000'
const apiProduction = 'https://bddpeqrf9e.execute-api.eu-west-1.amazonaws.com/prod'
const apiRoot = apiProduction
const covidApiRoot = 'https://disease.sh/v3/covid-19'
export const telexRoot = 'https://telex.hu'
export const weatherApiRoot = 'https://api.openweathermap.org/data/2.5/weather'

export const apiEndpoints = {
	sendArticleAnalytics: `${apiRoot}/analytics`,
	authUser: `${apiRoot}/auth`,
	insertReview: `${apiRoot}/review`,
	getReviews: `${apiRoot}/review`,
	insertLike: `${apiRoot}/analytics/like`,
	getLikes: `${apiRoot}/analytics/like`,
	getArticleId: `${apiRoot}/article/get-article-id`,
	getAllReviews: `${apiRoot}/reviews`,
	telexArticles: `${telexRoot}/api/articles`,
	resolveReview: `${apiRoot}/review`,
}

export const covidApi = {
	getHistoricalData: `${covidApiRoot}/historical/hungary`,
	getSummarizedData: `${covidApiRoot}/countries/hungary`,
}
