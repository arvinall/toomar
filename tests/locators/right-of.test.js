import { jest, test, expect } from '@jest/globals'

import { rightOf } from '../../lib/locators/right-of'

const { Number } = globalThis

test(
  'rightOf must return a function' + ' ' +
  'that returns the right of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      const viewport = {}

      let scrollLeft = 10

      const scrollingElement = { get scrollLeft () { return scrollLeft } }

      const assigner = [
        () => Object.assign(viewport, scrollingElement),
        () => Object.assign(viewport, { scrollingElement }),
        () => Object.assign(viewport, { document: { scrollingElement } })
      ][idx]

      assigner()

      const rightOfViewportTarget = rightOf(target, viewport)

      target.getBoundingClientRect.mockReturnValue({ right: 20 })

      expect(rightOfViewportTarget()).toBe(target.getBoundingClientRect().right + scrollLeft)

      scrollLeft = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ right: 35 })

      expect(rightOfViewportTarget()).toBe(target.getBoundingClientRect().right + scrollLeft)
    }
  }
)

test(
  'rightOf must use globalThis as default value for viewport argument' + ' ' +
  'and return a function' + ' ' +
  'that returns the right of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollLeft = 10

      const scrollingElement = { get scrollLeft () { return scrollLeft } }

      const assigner = [
        () => Object.assign(globalThis, scrollingElement),
        () => Object.assign(globalThis, { scrollingElement }),
        () => Object.assign(globalThis, { document: { scrollingElement } })
      ][idx]

      assigner()

      const rightOfViewportTarget = rightOf(target)

      target.getBoundingClientRect.mockReturnValue({ right: 20 })

      expect(rightOfViewportTarget()).toBe(target.getBoundingClientRect().right + scrollLeft)

      scrollLeft = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ right: 35 })

      expect(rightOfViewportTarget()).toBe(target.getBoundingClientRect().right + scrollLeft)
    }
  }
)
