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
  'and returns a function' + ' ' +
  'that returns the top of the target position relative to the viewport argument',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollTop = 10

      const scrollingElement = { get scrollTop () { return scrollTop } }

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

      const topOfViewportTarget = topOf(target)

      target.getBoundingClientRect.mockReturnValue({ top: 20 })

      expect(topOfViewportTarget())
        .toBe(target.getBoundingClientRect().top + scrollTop)

      scrollTop = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ top: 35 })

      expect(topOfViewportTarget())
        .toBe(target.getBoundingClientRect().top + scrollTop)

      cleanup()
    }
  }
)

test(
  'topOf must return a function' + ' ' +
  'that returns the top of the target position relative to the viewport argument,' + ' ' +
  'which its target or viewport are functions',
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

      const topOfViewportTarget = [
        topOf(() => target, viewport),
        topOf(() => target, () => viewport)
      ][Number(!!(idx % 2))]

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
  'and returns a function' + ' ' +
  'that returns the top of the target position relative to the viewport argument' + ' ' +
  'which its target is a function',
  () => {
    const target = { getBoundingClientRect: jest.fn() }

    for (let idx in Array(3).fill()) {
      idx = Number(idx)

      let scrollTop = 10

      const scrollingElement = { get scrollTop () { return scrollTop } }

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

      const topOfViewportTarget = topOf(() => target)

      target.getBoundingClientRect.mockReturnValue({ top: 20 })

      expect(topOfViewportTarget())
        .toBe(target.getBoundingClientRect().top + scrollTop)

      scrollTop = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ top: 35 })

      expect(topOfViewportTarget())
        .toBe(target.getBoundingClientRect().top + scrollTop)

      cleanup()
    }
  }
)
