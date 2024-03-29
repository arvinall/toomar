import { jest, test, expect } from '@jest/globals'

import { leftOf } from '../../lib/locators/left-of'

const { Number } = globalThis

test(
  'leftOf must return a function' + ' ' +
  'that returns the left of the target position relative to the viewport argument',
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

      const leftOfViewportTarget = leftOf(target, viewport)

      target.getBoundingClientRect.mockReturnValue({ left: 20 })

      expect(leftOfViewportTarget()).toBe(target.getBoundingClientRect().left + scrollLeft)

      scrollLeft = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ left: 35 })

      expect(leftOfViewportTarget()).toBe(target.getBoundingClientRect().left + scrollLeft)
    }
  }
)

test(
  'leftOf must use globalThis as default value for viewport argument' + ' ' +
  'and returns a function' + ' ' +
  'that returns the left of the target position relative to the viewport argument',
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

      const leftOfViewportTarget = leftOf(target)

      target.getBoundingClientRect.mockReturnValue({ left: 20 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)

      scrollLeft = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ left: 35 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)

      cleanup()
    }
  }
)

test(
  'leftOf must return a function' + ' ' +
  'that returns the left of the target position relative to the viewport argument,' + ' ' +
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

      const leftOfViewportTarget = [
        leftOf(() => target, viewport),
        leftOf(() => target, () => viewport)
      ][Number(!!(idx % 2))]

      target.getBoundingClientRect.mockReturnValue({ left: 20 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)

      scrollLeft = 15

      if (!idx) assigner()

      target.getBoundingClientRect.mockReturnValue({ left: 35 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)
    }
  }
)

test(
  'leftOf must use globalThis as default value for viewport argument' + ' ' +
  'and returns a function' + ' ' +
  'that returns the left of the target position relative to the viewport argument' + ' ' +
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

      const leftOfViewportTarget = leftOf(() => target)

      target.getBoundingClientRect.mockReturnValue({ left: 20 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)

      scrollLeft = 15

      if (!idx) {
        cleanup()
        cleanup = assigner()
      }

      target.getBoundingClientRect.mockReturnValue({ left: 35 })

      expect(leftOfViewportTarget())
        .toBe(target.getBoundingClientRect().left + scrollLeft)

      cleanup()
    }
  }
)
