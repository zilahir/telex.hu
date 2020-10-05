/**
 *
 */
export function imageGallery() {
	const highlight = document.querySelector('.gallery-hightlight')
	const previews = document.querySelectorAll('.room-preview img')

	previews.forEach(preview => {
		preview.addEventListener('click', () => {
			const smallSource = this.src
			const bigSource = smallSource.replace('small', 'big')
			previews.forEach(thisPreview => thisPreview.classList.remove('room-active'))
			highlight.src = bigSource
			preview.classList.add('room-active')
		})
	})
}

imageGallery()
