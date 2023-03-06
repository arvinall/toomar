import { jest, test, expect } from '@jest/globals'

import { topOf } from '../../lib/locators/top-of'

const { Number } = globalThis

test(
  'topOf must return a function' + ' ' +
  'that returns the top of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      const viewport = {}

      let scrollTop = 10

      const scrollingElement = { get scrollTop () { return scrollTop } }

      const assigner = [
        () => Object.assign(viewport, scrollingElement),
        () => Object.assign(viewport, { scrollingElement }),
        () => Object.assign(viewport, { document: { scrollingElement } })
      ][idx]

      assigner()

      const topOfViewportTarget = topOf(target, viewport)

      target.getBoundingClientRect.mockReturnValue({ top: 20 })

      expect(topOfViewportTarget()).toBe(target.getBoundingClientRect().top + scrollTop)

      scrollTop = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ top: 35 })

      expect(topOfViewportTarget()).toBe(target.getBoundingClientRect().top + scrollTop)
    }
  }
)

test(
  'topOf must use globalThis as default value for viewport argument' + ' ' +
  'and return a function' + ' ' +
  'that returns the top of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollTop = 10

      const scrollingElement = { get scrollTop () { return scrollTop } }

      const assigner = [
        () => Object.assign(globalThis, scrollingElement),
        () => Object.assign(globalThis, { scrollingElement }),
        () => Object.assign(globalThis, { document: { scrollingElement } })
      ][idx]

      assigner()

      const topOfViewportTarget = topOf(target)

      target.getBoundingClientRect.mockReturnValue({ top: 20 })

      expect(topOfViewportTarget()).toBe(target.getBoundingClientRect().top + scrollTop)

      scrollTop = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ top: 35 })

      expect(topOfViewportTarget()).toBe(target.getBoundingClientRect().top + scrollTop)
    }
  }
)
