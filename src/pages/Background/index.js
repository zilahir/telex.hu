import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.debug('Put the background scripts here.');

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  //Send message to content Script -> Page was changed
  //or execute parser from here 
  // chrome.tabs.executeScript
});