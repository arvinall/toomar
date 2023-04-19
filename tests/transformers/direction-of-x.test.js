import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

import { directionOfX } from '../../lib/transformers/direction-of-x'

const { Promise } = globalThis

function createPromise () {
  let resolve, reject

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => ([resolve, reject] = args))

  return { promise, resolve, reject }
}

test(
  'directionOfX must be 1 when target element scrollLeft is 0 for the first time',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfX())

    const { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    eventEmitter.emit('state', { targetElement: { scrollLeft: 0 } })

    const state = await promise

    expect(state.directionOfX).toBe(1)

    subscriber.unsubscribe()
  }
)

test(
  'directionOfX must be 1 when target element scrollLeft is greater than previous one',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfX())

    const { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    eventEmitter.emit('state', { targetElement: { scrollLeft: 100 } })

    const state = await promise

    expect(state.directionOfX).toBe(1)

    subscriber.unsubscribe()
  }
)

test(
  'directionOfX must be 0 when target element scrollLeft is less than previous one',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(directionOfX())

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    let scrollLeft = 100

    eventEmitter.emit('state', { targetElement: { scrollLeft } })

    await promise

    ;({ promise, resolve } = createPromise())

    scrollLeft = 50

    eventEmitter.emit('state', { targetElement: { scrollLeft } })

    const state = await promise

    expect(state.targetElement.scrollLeft).toBe(scrollLeft)

    expect(state.directionOfX).toBe(0)

    subscriber.unsubscribe()
  }
)
