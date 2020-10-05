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
    const allImages = document.querySelectorAll('.article_body figure img')
    console.debug('allImages', allImages)
  }
})
