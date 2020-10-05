const { isRootPage } = require("./modules/location");
const { printLine } = require("./modules/print");
const { addRateContainer } = require("./modules/rate");

function handleImageClick(image) {
	const thisImageUrl = image.target.getAttribute('src')
	const hightLightImage = document.querySelector('.gallery-hightlight')
	hightLightImage.setAttribute('src', thisImageUrl)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.isArticle) {
		const readyStateCheckInterval = setInterval(function() {
			if (document.readyState === 'complete') {
				clearInterval(readyStateCheckInterval)
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

				if (allImages.length >= 3) {
					const hasPreview = false
					Array.from(allImages).map((currentImage, index) => {
						console.debug('currentImage', currentImage)
						imagePreviewContainer.append(currentImage.querySelector('img'))
						currentImage.remove()
					})
					imagePreviewContainer.addEventListener('click', image => {
						handleImageClick(image)
					})
					galleryRoot.append(imagePreviewContainer)
					const articleContainer = document.querySelector('.article-html-content')
					galleryRoot.prepend(imageHighlight)
					articleContainer.append(galleryRoot)
				}
				
			}
		}, 10)
	}
})
