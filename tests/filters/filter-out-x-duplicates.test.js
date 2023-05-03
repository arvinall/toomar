import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

import { filterOutXDuplicates } from '../../lib/filters/filter-out-x-duplicates'

const { Promise } = globalThis

function createPromise () {
  let resolve, reject

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => ([resolve, reject] = args))

  return { promise, resolve, reject }
}

const createWaitForUntilRejectMsg = (delay = 10) => `Did not resolve after ${delay}ms`

async function waitForUntil (promise, delay = 10, msg) {
  if (!msg) msg = createWaitForUntilRejectMsg(delay)

  return new Promise((resolve, reject) => {
    promise.then(resolve, reject)

    setTimeout(() => reject(new Error(msg)), delay)
  })
}

test(
  'filterOutXDuplicates must filter-in non-duplicates listen observable',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(filterOutXDuplicates())

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    for (const idx in Array(50).fill()) {
      eventEmitter.emit('state', { x: idx })

      expect(promise).resolves.toBeTruthy()

      ;({ promise, resolve } = createPromise())
    }

    subscriber.unsubscribe()
  }
)

test(
  'filterOutXDuplicates must filter-out duplicates listen observable',
  async () => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(filterOutXDuplicates())

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    for (let idx in Array(50).fill()) {
      idx = Number(idx)

      eventEmitter.emit('state', { x: (idx % 2) ? (idx - 1) : idx })

      if (idx % 2) {
        await expect(waitForUntil(promise))
          .rejects.toThrowError(createWaitForUntilRejectMsg())
      } else {
        await expect(promise).resolves.toBeTruthy()
      }

      ;({ promise, resolve } = createPromise())
    }

    subscriber.unsubscribe()
  }
)
