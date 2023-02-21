import { test, expect } from '@jest/globals'

import { maxScrollY } from '../../lib/locators/max-scroll-y'

const { Number } = globalThis

test(
  'maxScrollY must return a function' + ' ' +
  'that returns difference of the source argument scrollHeight and clientHeight',
  () => {
    const scrollableElement = { scrollHeight: 10, clientHeight: 6 }

    const scrollableElementMaxScrollY = maxScrollY(scrollableElement)

    expect(scrollableElementMaxScrollY()).toBe(
      scrollableElement.scrollHeight - scrollableElement.clientHeight
    )

    scrollableElement.scrollHeight = 20
    scrollableElement.clientHeight = 6

    expect(scrollableElementMaxScrollY()).toBe(
      scrollableElement.scrollHeight - scrollableElement.clientHeight
    )
  }
)

test(
  'maxScrollY must use globalThis as default value for source argument',
  () => {
    let localScrollHeight = 10
    let localClientHeight = 6

    Object.assign(globalThis, {
      scrollHeight: localScrollHeight,
      clientHeight: localClientHeight
    })

    const globalThisMaxScrollY = maxScrollY()

    expect(globalThisMaxScrollY()).toBe(localScrollHeight - localClientHeight)

    localScrollHeight = 20
    localClientHeight = 6

    Object.assign(globalThis, {
      scrollHeight: localScrollHeight,
      clientHeight: localClientHeight
    })

    expect(globalThisMaxScrollY()).toBe(localScrollHeight - localClientHeight)

    delete globalThis.scrollHeight
    delete globalThis.clientHeight
  }
)

test(
  'maxScrollY must return a function' + ' ' +
  'that returns difference of the source argument scrollHeight and clientHeight' + ' ' +
  'with different source structures (document, document.scrollingElement)',
  () => {
    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      const scrollableElement = {}

      let scrollHeight = 10
      let clientHeight = 6

      const scrollingElement = {
        get scrollHeight () { return scrollHeight },
        get clientHeight () { return clientHeight }
      }

      const assigner = [
        () => Object.assign(scrollableElement, scrollingElement),
        () => Object.assign(scrollableElement, { scrollingElement }),
        () => Object.assign(scrollableElement, { document: { scrollingElement } })
      ][idx]

      assigner()

      const scrollableElementMaxScrollY = maxScrollY(scrollableElement)

      expect(scrollableElementMaxScrollY()).toBe(scrollHeight - clientHeight)

      scrollHeight = 20
      clientHeight = 6

      if (!idx) assigner()

      expect(scrollableElementMaxScrollY()).toBe(scrollHeight - clientHeight)
    }
  }
)

test(
  'maxScrollY must use globalThis as default value for source argument' + ' ' +
  'and return a function' + ' ' +
  'that returns difference of the source argument scrollHeight and clientHeight' + ' ' +
  'with different source structures (document, document.scrollingElement)',
  () => {
    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollHeight = 10
      let clientHeight = 6

      const scrollingElement = {
        get scrollHeight () { return scrollHeight },
        get clientHeight () { return clientHeight }
      }

      const assigner = [
        () => Object.assign(globalThis, scrollingElement),
        () => Object.assign(globalThis, { scrollingElement }),
        () => Object.assign(globalThis, { document: { scrollingElement } })
      ][idx]

      assigner()

      const scrollingElementMaxScrollY = maxScrollY()

      expect(scrollingElementMaxScrollY()).toBe(scrollHeight - clientHeight)

      scrollHeight = 20
      clientHeight = 6

      if (!idx) assigner()

      expect(scrollingElementMaxScrollY()).toBe(scrollHeight - clientHeight)

      delete globalThis.scrollHeight
      delete globalThis.clientHeight

      delete globalThis.scrollingElement

      delete globalThis.document
    }
  }
)
