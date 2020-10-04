import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  //Send message to content Script -> Page was changed
  //or execute parser from here 
  // chrome.tabs.executeScript
});