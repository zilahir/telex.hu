import { selectors } from './consts'
import { isRootPage } from './modules/location'
import { copyArticlesIntoGrid } from './modules/article'
import { hightLightText } from './modules/revision'
import { cloudFnGet } from '../../requests'
import { apiEndpoints, telexApiEndpoints } from '../../requests/apiEndpoints'
import { store } from '../../store/configureStore'
import { setThisArticleId } from '../../store/actions/article'
import { setApprovedRevisions } from '../../store/actions/reviews'

const bankCardIcon = '<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(2 5)"><path d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v7c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-7c0-1.1045695.8954305-2 2-2z" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round"/><path d="m0 4h17v2h-17z" fill="#2a2e3b"/></g></svg>'

chrome.extension.sendMessage({}, () => {
	const readyStateCheckInterval = setInterval(() => {
		if (document.readyState === 'complete') {
			clearInterval(readyStateCheckInterval)
			if (isRootPage(window.location.pathname)) {
				const aid = document.querySelector('.aid a')
				aid.classList.add('aid-new')
				aid.innerHTML = bankCardIcon
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
				new Array(2).fill().forEach((_, index) => {
					copyArticlesIntoGrid(index)
				})
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
					})
			}
		}
	}, 10)
})
