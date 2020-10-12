import { selectors } from './consts'
import { isRootPage } from './modules/location'
import { copyArticlesIntoGrid } from './modules/article'
import { store } from '../../store/configureStore'
import { bankCardIcon } from '../../icons'
import { createDarkMode } from './modules/darkmode'
import { renderCovidApp } from './Covid'

const darkMode = store.getState().misc.darkmode

chrome.extension.sendMessage({}, () => {
	const readyStateCheckInterval = setInterval(() => {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval)
			if (isRootPage(window.location.pathname)) {
				const aid = document.querySelector('.aid a')
				const covidAppContainer = document.createElement('div')
				covidAppContainer.setAttribute('id', 'covid-app')
				aid.classList.add('aid-new')
				aid.innerHTML = bankCardIcon
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
				}, 180)
				setTimeout(() => {
					new Array(2).fill().forEach((_, index) => {
						copyArticlesIntoGrid(index)
					})
					createDarkMode()
					const articleContentNew = document.querySelector('.middle-content-new')
					articleContentNew.append(covidAppContainer)
					const newArticleAnchor = articleContentNew.querySelectorAll('a')
					const newArticleContent = articleContentNew.querySelector('.article_desc')
					const newArticleImageContainer = articleContentNew.querySelector('.article_img.with-image')
					newArticleAnchor[1].classList.add('article-anchor-new')
					newArticleContent.classList.add('article_desc-new')
					newArticleImageContainer.append(newArticleContent)
					newArticleImageContainer.append(newArticleAnchor[1])
					renderCovidApp()
				}, 190)
				const articlesAside = document.querySelector('.articles-block aside')
				const articleAsideArticles = articlesAside.querySelector('ul')

				document.querySelector('.articles-block .main-block div').append(articleAsideArticles)
				articlesAside.remove()
			}
			if (darkMode) {
				document.body.classList.add('darkmode')
			} else {
				document.body.classList.add('lightmode')
			}
		}
	}, 10)
})
