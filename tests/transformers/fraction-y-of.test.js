import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

import { fractionYOf } from '../../lib/transformers/fraction-y-of'

const { Promise } = globalThis

function createPromise () {
  let resolve, reject

  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => ([resolve, reject] = args))

  return { promise, resolve, reject }
}

const steps = [[0, 0], [100, 0.25], [200, 0.5], [300, 0.75], [400, 1]]
const maxStep = steps[steps.length - 1][0]

test.each([[100, {}], [1, undefined], [180, {}], [360, false]])(
  'fractionYOf must calc correct fraction of %s based on state',
  async (base, fractionOf) => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(fractionYOf(base))

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    for (const [y, factor] of steps) {
      eventEmitter.emit('state', {
        config: { fromY: () => 200, toY: () => (maxStep + 200) },
        y,
        fractionOf,
        fractionYOf: fractionOf
      })

      const state = await promise

      expect(state.fractionOf).toBe(state.fractionYOf)
      expect(state.fractionYOf[base]).toBe(base * factor)

      ;({ promise, resolve } = createPromise())
    }

    subscriber.unsubscribe()
  }
)
