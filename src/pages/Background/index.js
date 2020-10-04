import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import { printLine } from '../Content/modules/print';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  printLine(details)
  if (details.url !== 'https://www.telex.hu/' && details.url.indexOf('https://www.telex.hu/' !== - 1)) {
    // chrome.tabs.executeScript(details.tabId, {file: "contentScriptSubPage.bundle.js"});
    printLine(details.tabId)
    chrome.tabs.sendMessage(details.tabId, {
      isArticle: true,
    })
  }
});