import { format } from 'date-fns'

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
	paragraphIndex,
}) {
	const revisionBox = document.createElement('div')
	revisionBox.setAttribute('class', 'revision-box')
	const revisionTextInputField = document.createElement('input')
	const revisionMeta = document.createElement('p')
	revisionMeta.innerHTML = `ma, ${format(new Date(), 'HH:mm')}`
	revisionBox.append(revisionTextInputField)
	console.debug('revisionBox', x, y)
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
	revisionBox.style.left = `${Math.abs(x)}px`
	revisionBox.style.top = `${y}px`
	cancelButton.addEventListener('click', () => {
		revisionBox.remove()
	})
	approveButton.addEventListener('click', () => {
		const fixedText = revisionBox.querySelector('input').value
		cloudFnPost(apiEndpoints.insertReview, {
			articleId: store.getState().article.thisArticleId,
			originalText: selectedText,
			fixedText,
			userId: store.getState().fingerprint.fingerprint,
			paragraphIndex,
		}).then(() => {
			revisionBox.remove()
		})
	})
}

function removeAllRevisionBox() {
	const revisionBoxes = document.querySelectorAll('.revision-box');
	[...revisionBoxes].forEach(revision => (
		revision.remove()
	))
}

/**
 *
 */
export function hightLightText() {
	const allParagraph = document.querySelectorAll('.article_body p')
	const allApprovedRevisions = store.getState().revisions.approvedRevisions
	allParagraph.forEach((paragraph, paragraphIndex) => {
		const hasFixedText = allApprovedRevisions.find(
			revision => revision.paragraphIndex === paragraphIndex,
		)
		if (hasFixedText) {
			const thisParagraph = paragraph
			const selectedTextRegexp = new RegExp(hasFixedText.originalText, 'g')
			const newText = paragraph.innerHTML.replace(selectedTextRegexp, `<span class="approved">${hasFixedText.fixedText}</span>`)
			thisParagraph.innerHTML = newText
		}
		paragraph.addEventListener('mouseup', event => {
			const thisEvent = event
			const thisParagraph = paragraph
			const selectedText = getSelectedText()
			if (selectedText.length > 4) {
				const selectedTextRegexp = new RegExp(selectedText, 'g')
				const newText = thisEvent.target.innerHTML.replace(selectedTextRegexp, `<span class="highlight">${selectedText}</span>`)
				thisParagraph.innerHTML = newText
				removeAllRevisionBox()
				createRevisionBox({
					x: thisEvent.screenX, y: thisEvent.screenY - 80, selectedText, paragraphIndex,
				})
			}
		})
	})
}
