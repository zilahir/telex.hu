const { selectors } = require("../consts");

const headerSelector = selectors.find(selector => selector.oldClass === 'above-nav')

export const fixHeader = () => (
	document.querySelector(`${headerSelector.tag}.${headerSelector.oldClass}`).classList.add(headerSelector.newClass),
	document.querySelector(`${headerSelector.tag}.${headerSelector.oldClass}`).classList.remove(headerSelector.oldClass)
)