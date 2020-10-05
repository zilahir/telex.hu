import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if (details.url !== 'https://www.telex.hu/' && details.url.indexOf('https://www.telex.hu/' !== - 1)) {
    chrome.tabs.sendMessage(details.tabId, {
      isArticle: true,
    })
    console.debug('sending message')
  }
});