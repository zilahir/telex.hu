import { selectors } from './consts';
import { isRootPage } from './modules/location';
import { printLine } from './modules/print';
import { addRateContainer } from './modules/rate'
import { fixHeader } from './modules/header'
import { copyArticlesIntoGrid } from './modules/article';

const bankCardIcon = '<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="translate(2 5)"><path d="m2.5.5h12c1.1045695 0 2 .8954305 2 2v7c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-7c0-1.1045695.8954305-2 2-2z" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round"/><path d="m0 4h17v2h-17z" fill="#2a2e3b"/></g></svg>'

chrome.extension.sendMessage({}, function(response) {
	const readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
    if (isRootPage(location.pathname)) {
			const aid = document.querySelector('.aid a')
			aid.classList.add('aid-new')
			aid.innerHTML = bankCardIcon
			selectors.map(currentSelector => {
				document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
				if (currentSelector.removeOld) {
					document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
				}
			})
			new Array(2).fill().map((_, index) => {
				copyArticlesIntoGrid(index)
			})
		}
	}
	}, 10);
});