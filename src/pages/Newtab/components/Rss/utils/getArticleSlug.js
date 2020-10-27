export const getArticleSlug = articleUrl => (
	articleUrl.split('/').find((_, index) => index === 7)
)
