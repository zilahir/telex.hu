const { isRootPage } = require("./modules/location");
const { printLine } = require("./modules/print");
const { addRateContainer } = require("./modules/rate");

/* chrome.extension.sendMessage({}, function(response) {
	const readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
    if (!isRootPage(location.pathname)) {
			fixHeader()
			addRateContainer()
		}
	}
	}, 10);
});*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.isArticle) {
		const readyStateCheckInterval = setInterval(function() {
			if (document.readyState === 'complete') {
				clearInterval(readyStateCheckInterval)
				addRateContainer()
				const allImages = document.querySelectorAll('.article_body figure.image')
				const galleryRoot = document.createElement('div')
				console.debug('allImage', allImages)
				galleryRoot.setAttribute('class', 'gallery')
				const imagePreviewContainer = document.createElement('div')
				imagePreviewContainer.setAttribute('class', 'image-preview')
				const imageHighlight = document.createElement('img')
				imageHighlight.setAttribute('class', 'gallery-hightlight')
				if (allImages.length >= 3) {
					const hasPreview = false
					Array.from(allImages).map((currentImage, index) => {
						console.debug('currentImage', currentImage)
						imagePreviewContainer.append(currentImage.querySelector('img'))
						currentImage.remove()
					})
					galleryRoot.append(imagePreviewContainer)
					const articleContainer = document.querySelector('.article-html-content')
					articleContainer.prepend(galleryRoot)
				}
			}
		}, 10)
	}
})
