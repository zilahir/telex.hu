import { selectors } from './consts';
import { printLine } from './modules/print';

printLine("__START___");

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
    selectors.map(currentSelector => {
      console.debug(currentSelector)
			document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
			if (currentSelector.removeOld) {
				document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
			}
    })
	}
	}, 10);
});