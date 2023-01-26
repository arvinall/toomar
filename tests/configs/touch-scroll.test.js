import { EventEmitter } from 'events'

import { test, expect, jest } from '@jest/globals'
import { Observable as RxObservable } from 'rxjs'

import { touchScroll } from '../../lib/configs/touch-scroll'

const { Promise, Error, setTimeout } = globalThis

function createPromise () {
  let resolve
  let reject

  const promise = new Promise((...args) => { // eslint-disable-line promise/param-names
    [resolve, reject] = args
  })

  return { promise, resolve, reject }
}

test.each(['touchmove', 'scroll'])(
  'touchScroll must return an object with scroll property' + ' ' +
  'that is an rxjs observable that observe an eventPresenter' + ' ' +
  'that presents %s event of source argument',
  async type => {
    const event = { type }
    const eventEmitter = new EventEmitter()
    const touchScrollConfig = touchScroll(eventEmitter)

    expect(touchScrollConfig).toHaveProperty('scroll')

    expect(touchScrollConfig.scroll).toBeInstanceOf(RxObservable)

    Promise.resolve().then(() => eventEmitter.emit(type, event))

    const observableValue = await (new Promise(
      resolve => touchScrollConfig.scroll.subscribe(resolve)
    ))

    expect(observableValue.target).toBe(eventEmitter)
    expect(observableValue.realEvent).toBe(event)
  }
)

test(
  'touchScroll must pass touchOptions property of eventListenersOptions (second) argument' + ' ' +
  'just to target EventTarget touchmove event on subscription',
  async () => {
    const touchOptions = { capture: true }

    const eventTarget = {
      addEventListener: jest.fn(() => {}),
      removeEventListener () {}
    }

    const scrollConfig = touchScroll(eventTarget, { touchOptions })

    scrollConfig.scroll.subscribe(() => {})

    expect(eventTarget.addEventListener.mock.calls.length).toBe(2)

    expect(eventTarget.addEventListener.mock.calls[0].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[0][2]).toBe(touchOptions)

    expect(eventTarget.addEventListener.mock.calls[1].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[1][2]).toBeUndefined()
  }
)

test(
  'touchScroll must pass scrollOptions property of eventListenersOptions (second) argument' + ' ' +
  'just to target EventTarget scroll event on subscription',
  async () => {
    const scrollOptions = { capture: true }

    const eventTarget = {
      addEventListener: jest.fn(() => {}),
      removeEventListener () {}
    }

    const scrollConfig = touchScroll(eventTarget, { scrollOptions })

    scrollConfig.scroll.subscribe(() => {})

    expect(eventTarget.addEventListener.mock.calls.length).toBe(2)

    expect(eventTarget.addEventListener.mock.calls[0].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[0][2]).toBeUndefined()

    expect(eventTarget.addEventListener.mock.calls[1].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[1][2]).toBe(scrollOptions)
  }
)

test(
  'touchScroll must pass touchOptions and scrollOptions properties' + ' ' +
  'of eventListenersOptions (second) argument' + ' ' +
  'to target EventTarget events on subscription',
  async () => {
    const touchOptions = { passive: true }
    const scrollOptions = { capture: true }

    const eventTarget = {
      addEventListener: jest.fn(() => {}),
      removeEventListener () {}
    }

    const scrollConfig = touchScroll(eventTarget, { touchOptions, scrollOptions })

    scrollConfig.scroll.subscribe(() => {})

    expect(eventTarget.addEventListener.mock.calls.length).toBe(2)

    expect(eventTarget.addEventListener.mock.calls[0].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[0][2]).toBe(touchOptions)

    expect(eventTarget.addEventListener.mock.calls[1].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[1][2]).toBe(scrollOptions)
  }
)

test('touchScroll scroll observable must filter-out duplications', async () => {
  const eventEmitter = new EventEmitter()
  const touchScrollConfig = touchScroll(eventEmitter)
  const scrollTop = 100
  const scrollLeft = 350
  const didNotObserveMessage = 'Did not observe after 10ms'

  let { promise, resolve, reject } = createPromise()

  touchScrollConfig.scroll.subscribe(eventPresenter => resolve(eventPresenter))

  // New Position (scrollTop)
  Object.assign(eventEmitter, { scrollTop })

  Promise.resolve().then(() => eventEmitter.emit('touchmove'))

  expect((await promise).target).toEqual(eventEmitter)

  // Duplication (scrollTop)
  ;({ promise, resolve, reject } = createPromise())

  Promise.resolve().then(() => eventEmitter.emit('scroll'))

  setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

  await expect(promise).rejects.toThrowError(didNotObserveMessage)

  // New Position (scrollTop, scrollLeft)
  ;({ promise, resolve, reject } = createPromise())

  Object.assign(eventEmitter, { scrollTop, scrollLeft })

  Promise.resolve().then(() => eventEmitter.emit('scroll'))

  expect((await promise).target).toBe(eventEmitter)

  // Duplication (scrollTop, scrollLeft)
  ;({ promise, resolve, reject } = createPromise())

  Promise.resolve().then(() => eventEmitter.emit('touchmove'))

  setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

  await expect(promise).rejects.toThrowError(didNotObserveMessage)

  // New Position (scrollTop + 1, scrollLeft)
  ;({ promise, resolve, reject } = createPromise())

  Object.assign(eventEmitter, { scrollTop: scrollTop + 1, scrollLeft })

  Promise.resolve().then(() => eventEmitter.emit('touchmove'))

  expect((await promise).target).toBe(eventEmitter)

  // Duplication (scrollTop + 1, scrollLeft)
  ;({ promise, resolve, reject } = createPromise())

  Promise.resolve().then(() => eventEmitter.emit('scroll'))

  setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

  await expect(promise).rejects.toThrowError(didNotObserveMessage)

  // New Position (scrollTop + 1, scrollLeft + 1)
  ;({ promise, resolve, reject } = createPromise())

  Object.assign(eventEmitter, { scrollTop: scrollTop + 1, scrollLeft: scrollLeft + 1 })

  Promise.resolve().then(() => eventEmitter.emit('scroll'))

  expect((await promise).target).toBe(eventEmitter)

  // Duplication (scrollTop + 1, scrollLeft + 1)
  ;({ promise, resolve, reject } = createPromise())

  Promise.resolve().then(() => eventEmitter.emit('touchmove'))

  setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

  await expect(promise).rejects.toThrowError(didNotObserveMessage)

  // New Position (scrollTop + 2, scrollLeft + 2)
  ;({ promise, resolve, reject } = createPromise())

  Object.assign(eventEmitter, { scrollTop: scrollTop + 2, scrollLeft: scrollLeft + 2 })

  Promise.resolve().then(() => eventEmitter.emit('touchmove'))

  expect((await promise).target).toBe(eventEmitter)

  // Duplication (scrollTop + 2, scrollLeft + 2)
  ;({ promise, resolve, reject } = createPromise())

  Promise.resolve().then(() => eventEmitter.emit('scroll'))

  setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

  await expect(promise).rejects.toThrowError(didNotObserveMessage)
})
