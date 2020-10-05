import { printLine } from "./print"

const thumbsUp = '<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 3)"><path d="m11.602322 13.7410886-3.10337429-1.2410885h-4v-7.00000002h2l2.80105246-5.5c.57989907 0 1.07487363.2050252 1.48492373.61507546.4100508.41005058.6150761.90502516.6150755 1.48492425l-.8999994 2.40000029 4.0310597 1.34368655c1.0478866.34929555 1.6142066 1.48193549 1.264911 2.52982213-.0078047.02341425-.0160422.04668201-.0247082.06979135l-1.5536355 4.14302809c-.3878403 1.0342407-1.5406646 1.5582517-2.5749053 1.1704115-.0135227-.005071-.02699-.0102884-.0403997-.0156511z"/><path d="m1.5 4.5h2c.55228475 0 1 .44771525 1 1v8c0 .5522847-.44771525 1-1 1h-2c-.55228475 0-1-.4477153-1-1v-8c0-.55228475.44771525-1 1-1z"/></g></svg>'
const thumbsDown = '<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 3)"><path d="m11.602322 13.7410886-3.10337429-1.2410885h-4v-7.00000002h2l2.80105246-5.5c.57989907 0 1.07487363.2050252 1.48492373.61507546.4100508.41005058.6150761.90502516.6150755 1.48492425l-.8999994 2.40000029 4.0310597 1.34368655c1.0478866.34929555 1.6142066 1.48193549 1.264911 2.52982213-.0078047.02341425-.0160422.04668201-.0247082.06979135l-1.5536355 4.14302809c-.3878403 1.0342407-1.5406646 1.5582517-2.5749053 1.1704115-.0135227-.005071-.02699-.0102884-.0403997-.0156511z"/><path d="m1.5 4.5h2c.55228475 0 1 .44771525 1 1v8c0 .5522847-.44771525 1-1 1h-2c-.55228475 0-1-.4477153-1-1v-8c0-.55228475.44771525-1 1-1z"/></g></svg>'

export function addRateContainer() {
  const articleRootContainer = document.querySelector('.article_body')
  console.debug('articleRootContainer', articleRootContainer)
  const container = document.createElement('div')
  const rateOuterContainer = document.createElement('div')
  rateOuterContainer.setAttribute('class', 'rate-outer')
  container.setAttribute('class', 'rate-container')
  const leftContainer = document.createElement('div')
  const rightContainer = document.createElement('div')
  const ratetitle = document.createElement('h1')
  ratetitle.innerHTML = 'Értékelés'
  const rateDesc = document.createElement('p')
  rateDesc.innerHTML = 'Hogyan tetszett ez a cikk?'

  rateOuterContainer.prepend(rateDesc)
  rateOuterContainer.prepend(ratetitle)

  leftContainer.innerHTML = thumbsUp
  rightContainer.innerHTML = thumbsDown
  container.append(leftContainer)
  container.append(rightContainer)

  rightContainer.addEventListener('click', () => (
    console.debug('clicked DOWN')
  ))
  leftContainer.addEventListener('click', () => (
    console.debug('clicked UP')
  ))
  
  rateOuterContainer.append(container)
  articleRootContainer.append(rateOuterContainer)

  const thumbsUpMeta = document.createElement('span')
  const thumbsDownMeta = document.createElement('span')
  thumbsUpMeta.innerHTML = thumbsUp
  thumbsDownMeta.innerHTML = thumbsDown

  const articleMetaContainer = document.querySelector('.article_title-bottom-new')
  articleMetaContainer.append(thumbsUpMeta)
  articleMetaContainer.append(thumbsDownMeta)
}