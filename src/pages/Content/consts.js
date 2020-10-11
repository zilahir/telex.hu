export const selectors = [
	{ tag: 'main', oldClass: 'container', newClass: 'container-new', removeOld: false },
	{ tag: 'div', oldClass: 'above-nav', newClass: 'above-nav-new', removeOld: true },
	{ tag: 'div', oldClass: 'middle-content', newClass: 'middle-content-new', removeOld: true },
	{ tag: 'div', oldClass: 'left-content', newClass: 'left-content-new', removeOld: false },
	{ tag: 'div', oldClass: 'right-content', newClass: 'right-content-new', removeOld: false },
	{ tag: 'section', oldClass: 'articles-row', newClass: 'articles-row-new', removeOld: false },
	{ tag: 'section', oldClass: 'articles-block', newClass: 'articles-block-new', removeOld: false },
	{ tag: 'div', oldClass: 'articles-row-wrapper', newClass: 'articles-row-wrapper-nww', removeOld: false },
	{ tag: 'footer', oldClass: undefined, newClass: 'footer-new', remvoeOld: false },
	{ tag: 'header', oldClass: undefined, newClass: 'header-new', removeOld: false },
]

export const subPageSelectors = [
	{ tag: 'div', oldClass: 'article_title-bottom', newClass: 'article_title-bottom-new', removeOld: true },
]

export const LIKE = 'LIKE'
export const DISLIKE = 'DISLIKE'

export const LIGHT = 'LIGHT'.toLowerCase()
export const DARK = 'DARK'.toLowerCase()
