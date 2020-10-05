import { addRateContainer } from "./rate"

export function copyArticlesIntoGrid(order) {
	const gridArticleListContainer = document.querySelector('.articles-row-new')
	let article = document.querySelectorAll('.articles-block-new .main-block .article-list')[order]
	article = article.querySelector('li')
	console.debug('article', article)
	const originalAnchorUrl = article.querySelector('a')
	console.debug('originalAnchor', originalAnchorUrl)
	const originalImageUrl = article.querySelector('img').getAttribute('src')
	console.debug('originalImageUrl', originalImageUrl)
	const originalArticleDesc = article.querySelector('.article_title').innerHTML
	console.debug('originalArticleDesc', originalArticleDesc)
	const originalArticleCategory = article.querySelector('.article_cat').innerHTML
	console.debug('originalArticleCategory', originalArticleCategory)
	const newArticle = document.createElement('div')
	const newArticleWrapper = document.createElement('div')
	newArticleWrapper.setAttribute('class', 'article')
	newArticle.setAttribute('class', 'article-wrapper')
	const newArticleAnchor = document.createElement('a')
	newArticleAnchor.setAttribute('href', originalAnchorUrl.getAttribute('href'))
	newArticleAnchor.setAttribute('class', 'article_title')
	const newImage = document.createElement('img')
	newImage.setAttribute('src', originalImageUrl)
	const newArticleCategory = document.createElement('div')
	newArticleCategory.setAttribute('class', 'article_cat')
	newArticleCategory.innerHTML = originalArticleCategory
	const articleImageWrapper = document.createElement('div')
	articleImageWrapper.setAttribute('class', 'article_img with-image')
	const newArticleTextAnchor = document.createElement('a')
	newArticleTextAnchor.setAttribute('href', originalAnchorUrl)
	newArticleTextAnchor.setAttribute('class', 'article_title')
	console.debug('originalAnchorUrl', originalAnchorUrl.innerText)
	const newArticleTextAnchorText = article.querySelectorAll('.article_title')
	console.debug('newArticleTextAnchorText', newArticleTextAnchorText[1].innerHTML)
	newArticleTextAnchor.textContent = newArticleTextAnchorText[1].innerHTML
	const articleDesc = document.createElement('div')
	articleDesc.setAttribute('class', 'article_desc')


	newArticleAnchor.append(newImage)
	articleImageWrapper.append(newArticleAnchor)
	articleImageWrapper.append(newArticleCategory)
	newArticle.append(articleImageWrapper)
	newArticle.append(newArticleTextAnchor)
	newArticle.append(articleDesc)
	newArticleWrapper.append(newArticle)
	gridArticleListContainer.append(newArticleWrapper)
	article.remove()
}