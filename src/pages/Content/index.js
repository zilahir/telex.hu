import { selectors } from './consts'
import { isRootPage } from './modules/location'
import { copyArticlesIntoGrid } from './modules/article'
import { createDarkMode } from './modules/darkmode'
import { renderReactApp } from './Covid'
import { fixHeader } from './modules/header'

chrome.runtime.onMessage.addListener(message => {
	const readyStateCheckInterval = setInterval(() => {
		if (document.readyState === 'complete' && !message.isArticle) {
			clearInterval(readyStateCheckInterval)
			if (isRootPage(window.location.pathname)) {
				setTimeout(() => {
					selectors.forEach(currentSelector => {
						if (currentSelector.oldClass) {
							document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
						} else {
							document.querySelector(`${currentSelector.tag}`).classList.add(currentSelector.newClass)
						}
						if (currentSelector.removeOld) {
							document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
						}
					})
				}, 1000)
				setTimeout(() => {
					new Array(2).fill().forEach((_, index) => {
						copyArticlesIntoGrid(index)
					})
					const covidAppContainer = document.createElement('div')
					covidAppContainer.setAttribute('id', 'covid-app')
					createDarkMode()
					fixHeader()
					const articleContentNew = document.querySelector('.middle-content-new')
					articleContentNew.append(covidAppContainer)
					const newArticleAnchor = articleContentNew.querySelectorAll('a')
					const newArticleContent = articleContentNew.querySelector('.article_desc')
					const newArticleImageContainer = articleContentNew.querySelector('.article_img.with-image')
					newArticleAnchor[1].classList.add('article-anchor-new')
					newArticleContent.classList.add('article_desc-new')
					newArticleImageContainer.append(newArticleContent)
					newArticleImageContainer.append(newArticleAnchor[1])
					renderReactApp()
				}, 1000)
				const articlesAside = document.querySelector('.articles-block aside')
				const articleAsideArticles = articlesAside.querySelector('ul')

				document.querySelector('.articles-block .main-block div').append(articleAsideArticles)
				articlesAside.remove()
			}
		}
	}, 10)
})
