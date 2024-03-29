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
  'and returns a function' + ' ' +
  'that returns the right of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollLeft = 10

      const scrollingElement = { get scrollLeft () { return scrollLeft } }

      const assigner = [
        () => {
          Object.assign(globalThis, scrollingElement)

          return () => delete globalThis.scrollTop
        },
        () => {
          Object.assign(globalThis, { scrollingElement })

          return () => delete globalThis.scrollingElement
        },
        () => {
          Object.assign(globalThis, { document: { scrollingElement } })

          return () => delete globalThis.document
        }
      ][idx]

      let cleanup = assigner()

      const rightOfViewportTarget = rightOf(target)

      target.getBoundingClientRect.mockReturnValue({ right: 20 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)

      scrollLeft = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ right: 35 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)

      cleanup()
    }
  }
)

test(
  'rightOf must return a function' + ' ' +
  'that returns the right of the target position relative to the viewport argument,' + ' ' +
  'which its target or viewport are functions',
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

      const rightOfViewportTarget = [
        rightOf(() => target, viewport),
        rightOf(() => target, () => viewport)
      ][Number(!!(idx % 2))]

      target.getBoundingClientRect.mockReturnValue({ right: 20 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)

      scrollLeft = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ right: 35 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)
    }
  }
)

test(
  'rightOf must use globalThis as default value for viewport argument' + ' ' +
  'and returns a function' + ' ' +
  'that returns the right of the target position relative to the viewport argument' + ' ' +
  'which its target is a function',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollLeft = 10

      const scrollingElement = { get scrollLeft () { return scrollLeft } }

      const assigner = [
        () => {
          Object.assign(globalThis, scrollingElement)

          return () => delete globalThis.scrollTop
        },
        () => {
          Object.assign(globalThis, { scrollingElement })

          return () => delete globalThis.scrollingElement
        },
        () => {
          Object.assign(globalThis, { document: { scrollingElement } })

          return () => delete globalThis.document
        }
      ][idx]

      let cleanup = assigner()

      const rightOfViewportTarget = rightOf(() => target)

      target.getBoundingClientRect.mockReturnValue({ right: 20 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)

      scrollLeft = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ right: 35 })

      expect(rightOfViewportTarget())
        .toBe(target.getBoundingClientRect().right + scrollLeft)

      cleanup()
    }
  }
)
