import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

import { directionOfY } from '../../lib/transformers/direction-of-y'

const { Promise } = globalThis

function createPromise () {
  let resolve, reject

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => ([resolve, reject] = args))

  return { promise, resolve, reject }
}

test(
  'directionOfY must be 1 when target element scrollTop is 0 for the first time',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfY())

    const { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    eventEmitter.emit('state', { targetElement: { scrollTop: 0 } })

    const state = await promise

    expect(state.directionOfY).toBe(state.direction)
    expect(state.directionOfY).toBe(1)

    subscriber.unsubscribe()
  }
)

test(
  'directionOfY must be 1 when target element scrollTop is greater than previous one',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfY())

    const { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    eventEmitter.emit('state', { targetElement: { scrollTop: 100 } })

    const state = await promise

    expect(state.directionOfY).toBe(state.direction)
    expect(state.directionOfY).toBe(1)

    subscriber.unsubscribe()
  }
)

test(
  'directionOfY must be 0 when target element scrollTop is less than previous one',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfY())

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    let scrollTop = 100

    eventEmitter.emit('state', { targetElement: { scrollTop } })

    await promise

    ;({ promise, resolve } = createPromise())

    scrollTop = 50

    eventEmitter.emit('state', { targetElement: { scrollTop } })

    const state = await promise

    expect(state.targetElement.scrollTop).toBe(scrollTop)

    expect(state.directionOfY).toBe(state.direction)
    expect(state.directionOfY).toBe(0)

    subscriber.unsubscribe()
  }
)
