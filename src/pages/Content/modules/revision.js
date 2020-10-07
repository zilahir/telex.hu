/* eslint-disable no-console */

// import { format } from 'date-fns'

import { checkIcon, crossIcon } from '../../../icons'
import { cloudFnPost } from '../../../requests'
import { apiEndpoints } from '../../../requests/apiEndpoints'
import { store } from '../../../store/configureStore'

/**
 *
 */
function getSelectedText() {
	let text = ''
	if (window.getSelection) {
		text = window.getSelection().toString()
	} else if (document.selection && document.selection.type !== 'Control') {
		text = document.selection.createRange().text
	}
	return text
}

/**
 * @param coordinates
 */
function createRevisionBox({
	x,
	y,
	selectedText,
	paragraphIndex
}) {
	console.debug('selectedText', selectedText)
	const revisionBox = document.createElement('div')
	revisionBox.setAttribute('class', 'revision-box')
	const revisionTextInputField = document.createElement('input')
	const revisionMeta = document.createElement('p')
	revisionMeta.innerHTML = 'ma, 23:14'
	revisionBox.append(revisionTextInputField)
	document.body.append(revisionBox)

	const actionButtonContainer = document.createElement('div')
	actionButtonContainer.setAttribute('class', 'action-btn-container')

	const approveButton = document.createElement('p')
	approveButton.innerHTML = checkIcon
	const cancelButton = document.createElement('p')
	cancelButton.innerHTML = crossIcon
	actionButtonContainer.prepend(cancelButton)
	actionButtonContainer.append(approveButton)
	actionButtonContainer.append(revisionMeta)
	revisionBox.append(actionButtonContainer)
	revisionBox.style.left = `${x}px`
	revisionBox.style.top = `${y}px`
	cancelButton.addEventListener('click', () => {
		revisionBox.remove()
	})
	approveButton.addEventListener('click', () => {
		cloudFnPost(apiEndpoints.insertReview, {
			articleId: store.getState().article.thisArticleId,
			originalText: selectedText,
			fixedText: 'new text',
			userId: '5f7d0674ff34216a731967bf',
			paragraphIndex,
		}).then(() => {
			revisionBox.remove()
		})
	})
}

/**
 *
 */
export function hightLightText() {
	const allParagraph = document.querySelectorAll('.article_body p')
	allParagraph.forEach((paragraph, paragraphIndex) => (
		paragraph.addEventListener('mouseup', event => {
			const thisEvent = event
			console.debug('event', thisEvent)
			const thisParagraph = paragraph
			const selectedText = getSelectedText()
			if (selectedText.length > 4) {
				const selectedTextRegexp = new RegExp(selectedText, 'g')
				const newText = thisEvent.target.innerHTML.replace(selectedTextRegexp, `<span class="highlight">${selectedText}</span>`)
				thisParagraph.innerHTML = newText
				createRevisionBox({ x: thisEvent.screenX, y: thisEvent.screenY - 80, selectedText, paragraphIndex })
			}
		})
	))
}
