/* eslint-disable no-console */

import { revisionIcon, thumbsDownIcon, thumbsUpIcon } from '../../../icons'
import { cloudFnGet, cloudFnPost } from '../../../requests'
import { apiEndpoints } from '../../../requests/apiEndpoints'
import { store } from '../../../store/configureStore'
import { DISLIKE, LIKE } from '../consts'

/**
 *
 */
export function addRateContainer() {
	let likeCount = 0
	let disLikeCount = 0
	cloudFnGet(`${apiEndpoints.getLikes}/${store.getState().article.thisArticleId}`)
		.then(result => {
			const temporaryResult = result.data
			if (result.data.length > 0) {
				likeCount = temporaryResult.filter(rate => rate.type === LIKE).length
				disLikeCount = temporaryResult.filter(rate => rate.type === DISLIKE).length
			}
		})
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
			type: DISLIKE,
			articleId: store.getState().article.thisArticleId,
			fingerPrint: store.getState().fingerprint.fingerprint,
		})
	))
	leftContainer.addEventListener('click', () => (
		cloudFnPost(`${apiEndpoints.insertLike}`, {
			type: LIKE,
			articleId: store.getState().article.thisArticleId,
			fingerPrint: store.getState().fingerprint.fingerprint,
		})
	))

	rateOuterContainer.append(container)
	articleRootContainer.append(rateOuterContainer)

	const thumbsUpMeta = document.createElement('span')
	const thumbsDownMeta = document.createElement('span')
	const revisionCountMeta = document.createElement('span')
	thumbsUpMeta.innerHTML = `${thumbsUpIcon} ${likeCount}`
	thumbsDownMeta.innerHTML = `${thumbsDownIcon} ${disLikeCount}`
	revisionCountMeta.innerHTML = `${revisionIcon} ${store.getState().revisions.allRevisions.length} felülvizsgálat`

	const articleMetaContainer = document.querySelector('.article_title-bottom-new')
	articleMetaContainer.querySelector('div').parentNode.append(socialContainer)
	socialContainer.remove()
	articleMetaContainer.append(thumbsUpMeta)
	articleMetaContainer.append(thumbsDownMeta)
	articleMetaContainer.append(revisionCountMeta)
}
