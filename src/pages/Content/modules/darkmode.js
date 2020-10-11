import { moonIcon, sunIcon } from '../../../icons'
import { store } from '../../../store/configureStore'
import { toggleDarkMode } from '../../../store/actions/misc'

export function createDarkMode() {
	const socialListWrapper = document.querySelector('.social-list-wrapper ul')
	const darkModeLiElement = document.createElement('li')
	const darkModeSpanElement = document.createElement('span')

	darkModeLiElement.setAttribute('id', 'toggle-darkmode')
	darkModeSpanElement.innerHTML = moonIcon
	darkModeLiElement.addEventListener('click', () => {
		if (document.body.classList.contains('lightmode')) {
			document.body.classList.remove('lightmode')
			document.body.classList.add('darkmode')
			darkModeLiElement.setAttribute('class', 'darkmode')
			darkModeSpanElement.innerHTML = sunIcon
			store.dispatch(toggleDarkMode(true))
		} else if (document.body.classList.contains('darkmode')) {
			document.body.classList.remove('darkmode')
			document.body.classList.add('lightmode')
			darkModeLiElement.classList.remove('darkmode')
			darkModeSpanElement.innerHTML = moonIcon
			store.dispatch(toggleDarkMode(false))
		}
	})
	darkModeLiElement.append(darkModeSpanElement)
	socialListWrapper.append(darkModeLiElement)
}
