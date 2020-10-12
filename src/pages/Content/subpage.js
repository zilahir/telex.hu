import Fingerprint2 from 'fingerprintjs2'

import { cloudFnGet, cloudFnPost } from '../../requests'
import { apiEndpoints, telexApiEndpoints } from '../../requests/apiEndpoints'
import { subPageSelectors } from './consts'
import { setFingerprint } from '../../store/actions/fingerprint'
import { store } from '../../store/configureStore'
import { setThisArticleId } from '../../store/actions/article'
import { setAllRevisions, setApprovedRevisions } from '../../store/actions/reviews'
import { hightLightText } from './modules/revision'

const { addRateContainer } = require('./modules/rate')

/**
 * @param image
 */
function handleImageClick(image) {
	const thisImageUrl = image.target.getAttribute('src')
	const hightLightImage = document.querySelector('.gallery-hightlight')
	hightLightImage.setAttribute('src', thisImageUrl)
}

chrome.runtime.onMessage.addListener(message => {
	if (message.isArticle) {
		const readyStateCheckInterval = setInterval(() => {
			if (document.readyState === 'complete') {
				clearInterval(readyStateCheckInterval)
				document.querySelector('.article_title').classList.add('telex-article-title')
				document.querySelector('.article_title').classList.remove('article_title')

				const thisArticleUrl = window.location.pathname
				const thisArticleSlug = thisArticleUrl.split('/').filter((item, index) => index > 4)
				cloudFnGet(`${telexApiEndpoints.getArtileData}/${thisArticleSlug}`)
					.then(articleResult => {
						store.dispatch(setThisArticleId(articleResult.data.id))
						cloudFnGet(`${apiEndpoints.getReviews}/${articleResult.data.id}/true`)
						Fingerprint2.get(components => {
							const values = components.map(component => component.value)
							const murmur = Fingerprint2.x64hash128(values.join(''), 31)
							store.dispatch(setFingerprint(murmur))
							cloudFnPost(apiEndpoints.sendArticleAnalytics, {
								articleId: articleResult.data.id,
								visits: 1,
								fingerPrint: murmur,
							})
						})
							.then(revisionResult => {
								store.dispatch(setApprovedRevisions(revisionResult.data.revision))
								hightLightText()
							})
						cloudFnGet(`${apiEndpoints.getReviews}/${articleResult.data.id}`)
							.then(allRevisionData => {
								store.dispatch(setAllRevisions(allRevisionData.data.revision))
							})
					})

				subPageSelectors.forEach(currentSelector => {
					document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
					if (currentSelector.removeOld) {
						document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
					}
				})
				addRateContainer()
				const allImages = document.querySelectorAll('.article_body figure.image')
				const galleryRoot = document.createElement('div')
				galleryRoot.setAttribute('class', 'gallery')
				const imagePreviewContainer = document.createElement('div')
				imagePreviewContainer.setAttribute('class', 'image-preview')
				const imageHighlight = document.createElement('img')
				imageHighlight.setAttribute('class', 'gallery-hightlight')
				const firstImage = allImages[0]
				const firstImageUrl = firstImage.querySelector('img').getAttribute('src')
				imageHighlight.setAttribute('src', firstImageUrl)
				const galleyTitle = document.createElement('h1')
				galleyTitle.innerHTML = 'Galéria'

				if (allImages.length >= 3) {
					[...allImages].forEach(currentImage => {
						imagePreviewContainer.append(currentImage.querySelector('img'))
						currentImage.remove()
					})
					imagePreviewContainer.addEventListener('click', image => {
						handleImageClick(image)
					})
					galleryRoot.append(imagePreviewContainer)
					const articleContainer = document.querySelector('.article-html-content')
					galleryRoot.prepend(imageHighlight)
					galleryRoot.prepend(galleyTitle)
					articleContainer.append(galleryRoot)
				}
			}
		}, 10)
	}
})
