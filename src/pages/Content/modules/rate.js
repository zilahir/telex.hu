/* eslint-disable no-console */

import { revisionIcon, thumbsDownIcon, thumbsUpIcon } from '../../../icons'
import { store } from '../../../store/configureStore'

/**
 *
 */
export function addRateContainer() {
	const articleRootContainer = document.querySelector('.article_body')
	console.debug('articleRootContainer', articleRootContainer)
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
		console.debug('clicked DOWN')
	))
	leftContainer.addEventListener('click', () => (
		console.debug('clicked UP')
	))

	rateOuterContainer.append(container)
	articleRootContainer.append(rateOuterContainer)

	const thumbsUpMeta = document.createElement('span')
	const thumbsDownMeta = document.createElement('span')
	const revisionCountMeta = document.createElement('span')
	thumbsUpMeta.innerHTML = `${thumbsUpIcon}797`
	thumbsDownMeta.innerHTML = `${thumbsDownIcon} 18`
	revisionCountMeta.innerHTML = `${revisionIcon} ${store.getState().revisions.allRevisions.length} revisions`

	const articleMetaContainer = document.querySelector('.article_title-bottom-new')
	articleMetaContainer.append(thumbsUpMeta)
	articleMetaContainer.append(thumbsDownMeta)
	articleMetaContainer.append(revisionCountMeta)
}
