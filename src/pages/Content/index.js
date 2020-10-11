import { selectors } from './consts'
import { isRootPage } from './modules/location'
import { copyArticlesIntoGrid } from './modules/article'
import { hightLightText } from './modules/revision'
import { cloudFnGet } from '../../requests'
import { apiEndpoints, telexApiEndpoints } from '../../requests/apiEndpoints'
import { store } from '../../store/configureStore'
import { setThisArticleId } from '../../store/actions/article'
import { setAllRevisions, setApprovedRevisions } from '../../store/actions/reviews'
import { bankCardIcon } from '../../icons'
import { createDarkMode } from './modules/darkmode'

const darkMode = store.getState().misc.darkmode

console.debug('store', store.getState())

chrome.extension.sendMessage({}, () => {
	const readyStateCheckInterval = setInterval(() => {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval)
			if (isRootPage(window.location.pathname)) {
				const aid = document.querySelector('.aid a')
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
					const newArticleAnchor = articleContentNew.querySelectorAll('a')
					const newArticleContent = articleContentNew.querySelector('.article_desc')
					const newArticleImageContainer = articleContentNew.querySelector('.article_img.with-image')
					newArticleAnchor[1].classList.add('article-anchor-new')
					newArticleContent.classList.add('article_desc-new')
					newArticleImageContainer.append(newArticleContent)
					newArticleImageContainer.append(newArticleAnchor[1])
				}, 190)
				const articlesAside = document.querySelector('.articles-block aside')
				const articleAsideArticles = articlesAside.querySelector('ul')

				document.querySelector('.articles-block .main-block div').append(articleAsideArticles)
				articlesAside.remove()
			} else {
				const thisArticleUrl = window.location.pathname
				const thisArticleSlug = thisArticleUrl.split('/').filter((item, index) => index > 4)
				cloudFnGet(`${telexApiEndpoints.getArtileData}/${thisArticleSlug}`)
					.then(articleResult => {
						store.dispatch(setThisArticleId(articleResult.data.id))
						cloudFnGet(`${apiEndpoints.getReviews}/${articleResult.data.id}/true`)
							.then(revisionResult => {
								store.dispatch(setApprovedRevisions(revisionResult.data.revision))
								hightLightText()
							})
						cloudFnGet(`${apiEndpoints.getReviews}/${articleResult.data.id}`)
							.then(allRevisionData => {
								store.dispatch(setAllRevisions(allRevisionData.data.revision))
							})
					})
			}
			if (darkMode) {
				document.body.classList.add('darkmode')
			} else {
				document.body.classList.add('lightmode')
			}
		}
	}, 10)
})
