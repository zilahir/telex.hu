/* eslint-disable no-console */

import { revisionIcon, thumbsDownIcon, thumbsUpIcon } from '../../../icons'
import { cloudFnPost } from '../../../requests'
import { apiEndpoints } from '../../../requests/apiEndpoints'
import { store } from '../../../store/configureStore'

/**
 *
 */
export function addRateContainer() {
	const socialContainer = document.querySelector('.social-wrapper')
	const articleContentWrapper = document.querySelector('.article-content-wrapper')
	articleContentWrapper.classList.add('article-content-wrapper-new')
	articleContentWrapper.classList.remove('article-content-wrapper')
	const articleRootContainer = document.querySelector('.article_body')
	const container = document.createElement('div')
	const rateOuterContainer = document.createElement('div')
	rateOuterContainer.setAttribute('class', 'rate-outer')
	container.setAttribute('class', 'rate-container')
	const leftContainer = document.createElement('div')
	const rightContainer = document.createElement('div')
	const ratetitle = document.createElement('h1')
	ratetitle.innerHTML = 'Értékelés'
	const rateDesc = document.createElement('p')
	rateDesc.innerHTML = 'Hogyan tetszett ez a cikk?'

	rateOuterContainer.prepend(rateDesc)
	rateOuterContainer.prepend(ratetitle)

	leftContainer.innerHTML = thumbsUpIcon
	rightContainer.innerHTML = thumbsDownIcon
	container.append(leftContainer)
	container.append(rightContainer)

	rightContainer.addEventListener('click', () => (
		cloudFnPost(`${apiEndpoints.insertLike}`, {
			type: 'DISLIKE',
			articleId: store.getState().article.thisArticleId,
			fingerPrint: store.getState().fingerprint.fingerprint,
		})
	))
	leftContainer.addEventListener('click', () => (
		cloudFnPost(`${apiEndpoints.insertLike}`, {
			type: 'LIKE',
			articleId: store.getState().article.thisArticleId,
			fingerPrint: store.getState().fingerprint.fingerprint,
		})
	))

	rateOuterContainer.append(container)
	articleRootContainer.append(rateOuterContainer)

	const thumbsUpMeta = document.createElement('span')
	const thumbsDownMeta = document.createElement('span')
	const revisionCountMeta = document.createElement('span')
	thumbsUpMeta.innerHTML = `${thumbsUpIcon}797`
	thumbsDownMeta.innerHTML = `${thumbsDownIcon} 18`
	revisionCountMeta.innerHTML = `${revisionIcon} ${store.getState().revisions.allRevisions.length} felülvizsgálat`

	const articleMetaContainer = document.querySelector('.article_title-bottom-new')
	articleMetaContainer.querySelector('div').parentNode.append(socialContainer)
	socialContainer.remove()
	articleMetaContainer.append(thumbsUpMeta)
	articleMetaContainer.append(thumbsDownMeta)
	articleMetaContainer.append(revisionCountMeta)
}
