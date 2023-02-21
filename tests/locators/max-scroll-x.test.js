import { test, expect } from '@jest/globals'

import { maxScrollX } from '../../lib/locators/max-scroll-x'

const { Number } = globalThis

test(
  'maxScrollX must return a function' + ' ' +
  'that returns difference of the source argument scrollWidth and clientWidth',
  () => {
    const scrollableElement = { scrollWidth: 10, clientWidth: 6 }

    const scrollableElementMaxScrollX = maxScrollX(scrollableElement)

    expect(scrollableElementMaxScrollX()).toBe(
      scrollableElement.scrollWidth - scrollableElement.clientWidth
    )

    scrollableElement.scrollWidth = 20
    scrollableElement.clientWidth = 6

    expect(scrollableElementMaxScrollX()).toBe(
      scrollableElement.scrollWidth - scrollableElement.clientWidth
    )
  }
)

test(
  'maxScrollX must use globalThis as default value for source argument',
  () => {
    let localScrollWidth = 10
    let localClientWidth = 6

    Object.assign(globalThis, {
      scrollWidth: localScrollWidth,
      clientWidth: localClientWidth
    })

    const globalThisMaxScrollX = maxScrollX()

    expect(globalThisMaxScrollX()).toBe(localScrollWidth - localClientWidth)

    localScrollWidth = 20
    localClientWidth = 6

    Object.assign(globalThis, {
      scrollWidth: localScrollWidth,
      clientWidth: localClientWidth
    })

    expect(globalThisMaxScrollX()).toBe(localScrollWidth - localClientWidth)

    delete globalThis.scrollWidth
    delete globalThis.clientWidth
  }
)

test(
  'maxScrollX must return a function' + ' ' +
  'that returns difference of the source argument scrollWidth and clientWidth' + ' ' +
  'with different source structures (document, document.scrollingElement)',
  () => {
    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      const scrollableElement = {}

      let scrollWidth = 10
      let clientWidth = 6

      const scrollingElement = {
        get scrollWidth () { return scrollWidth },
        get clientWidth () { return clientWidth }
      }

      const assigner = [
        () => Object.assign(scrollableElement, scrollingElement),
        () => Object.assign(scrollableElement, { scrollingElement }),
        () => Object.assign(scrollableElement, { document: { scrollingElement } })
      ][idx]

      assigner()

      const scrollableElementMaxScrollX = maxScrollX(scrollableElement)

      expect(scrollableElementMaxScrollX()).toBe(scrollWidth - clientWidth)

      scrollWidth = 20
      clientWidth = 6

      if (!idx) assigner()

      expect(scrollableElementMaxScrollX()).toBe(scrollWidth - clientWidth)
    }
  }
)

test(
  'maxScrollX must use globalThis as default value for source argument' + ' ' +
  'and return a function' + ' ' +
  'that returns difference of the source argument scrollWidth and clientWidth' + ' ' +
  'with different source structures (document, document.scrollingElement)',
  () => {
    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollWidth = 10
      let clientWidth = 6

      const scrollingElement = {
        get scrollWidth () { return scrollWidth },
        get clientWidth () { return clientWidth }
      }

      const assigner = [
        () => Object.assign(globalThis, scrollingElement),
        () => Object.assign(globalThis, { scrollingElement }),
        () => Object.assign(globalThis, { document: { scrollingElement } })
      ][idx]

      assigner()

      const scrollingElementMaxScrollX = maxScrollX()

      expect(scrollingElementMaxScrollX()).toBe(scrollWidth - clientWidth)

      scrollWidth = 20
      clientWidth = 6

      if (!idx) assigner()

      expect(scrollingElementMaxScrollX()).toBe(scrollWidth - clientWidth)

      delete globalThis.scrollWidth
      delete globalThis.clientWidth

      delete globalThis.scrollingElement

      delete globalThis.document
    }
  }
)
