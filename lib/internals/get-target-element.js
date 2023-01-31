export function getIfHasScrollingElement (_document) {
  return _document.scrollingElement || _document
}

export function getIfHasScrollingElementIfHasDocument (target) {
  return getIfHasScrollingElement(target.document || target)
}

export function getTargetElement (event) {
  return getIfHasScrollingElementIfHasDocument(event.target || event)
}
