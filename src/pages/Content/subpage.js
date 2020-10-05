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
		addRateContainer()
		const allImages = document.querySelectorAll('.article_body figure')
		console.debug('allImages', allImages)
		const roomGallery = document.createElement('div')
		roomGallery.setAttribute('class', 'gallery')
		const imagePreviewContainer = document.createElement('div')
		imagePreviewContainer.setAttribute('class', 'image-preview')
		const imageHighlight = document.createElement('img')
		imageHighlight.setAttribute('class', 'gallery-hightlight')
		Array.from(allImages).map((currentImage, index) => {
			console.debug('index', index)
			imagePreviewContainer.append(currentImage.querySelector('img'))
			if (index === 0) {
				imageHighlight.setAttribute('src', currentImage.getAttribute('src'))
				roomGallery.append(imageHighlight)
			}
			console.debug('image')
			currentImage.remove()
		})
		roomGallery.append(imagePreviewContainer)
		const articleContainer = document.querySelector('.article-html-content')
		articleContainer.prepend(roomGallery)
	}
})
