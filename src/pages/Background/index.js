import '../../assets/img/icon-34.png'
import '../../assets/img/icon-128.png'

/**
 * @param url
 */
function isRootPage(thisPageUrl) {
	// console.debug('thisPageUrl', thisPageUrl)
	let url
	if (thisPageUrl.includes('www')) {
		url = thisPageUrl.split('www.')
	} else {
		url = thisPageUrl.split('https://')
	}

	if (Array.isArray(url)) {
		if (url.length > 0) {
			url = url[1]
		} else {
			url = url[0]
		}
	}
	if (url === 'telex.hu/') {
		return true
	}
	return false
}

chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
	if (details.url !== 'https://www.telex.hu/' && details.url.indexOf('https://www.telex.hu/' !== -1)) {
		chrome.tabs.sendMessage(details.tabId, {
			isArticle: true,
		})
	}
})
