import { selectors } from './consts';
import { isRootPage } from './modules/location';
import { printLine } from './modules/print';
import { addRateContainer } from './modules/rate'
import { fixHeader } from './modules/header'

printLine("__START__");

chrome.extension.sendMessage({}, function(response) {
	const readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
    if (isRootPage(location.pathname)) {
			printLine("__ROOTPAGE__");
			selectors.map(currentSelector => {
				document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
				if (currentSelector.removeOld) {
					document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
				}
			})
		}
	}
	}, 10);
});