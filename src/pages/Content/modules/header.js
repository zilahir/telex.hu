import { bankCardIcon } from '../../../icons'
import { headerSelectors } from '../consts'

export function fixHeader() {
	console.debug('fixedHeader', true)
	const aid = document.querySelector('.aid a')
	aid.classList.add('aid-new')
	aid.innerHTML = bankCardIcon
	headerSelectors.forEach(currentSelector => {
		if (currentSelector.oldClass) {
			document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.add(currentSelector.newClass)
		} else {
			document.querySelector(`${currentSelector.tag}`).classList.add(currentSelector.newClass)
		}
		if (currentSelector.removeOld) {
			document.querySelector(`${currentSelector.tag}.${currentSelector.oldClass}`).classList.remove(currentSelector.oldClass)
		}
	})
}
