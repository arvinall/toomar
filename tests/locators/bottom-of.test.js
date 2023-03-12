import { jest, test, expect } from '@jest/globals'

import { bottomOf } from '../../lib/locators/bottom-of'

const { Number } = globalThis

test(
  'bottomOf must return a function' + ' ' +
  'that returns the bottom of the target position relative to the viewport argument',
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

      const bottomOfViewportTarget = bottomOf(target, viewport)

      target.getBoundingClientRect.mockReturnValue({ bottom: 20 })

      expect(bottomOfViewportTarget()).toBe(target.getBoundingClientRect().bottom + scrollTop)

      scrollTop = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ bottom: 35 })

      expect(bottomOfViewportTarget()).toBe(target.getBoundingClientRect().bottom + scrollTop)
    }
  }
)

test(
  'bottomOf must use globalThis as default value for viewport argument' + ' ' +
  'and return a function' + ' ' +
  'that returns the bottom of the target position relative to the viewport argument',
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

      const bottomOfViewportTarget = bottomOf(target)

      target.getBoundingClientRect.mockReturnValue({ bottom: 20 })

      expect(bottomOfViewportTarget()).toBe(target.getBoundingClientRect().bottom + scrollTop)

      scrollTop = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ bottom: 35 })

      expect(bottomOfViewportTarget()).toBe(target.getBoundingClientRect().bottom + scrollTop)
    }
  }
)
