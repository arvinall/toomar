import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

import { fractionXOf } from '../../lib/transformers/fraction-x-of'

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
  'fractionXOf must calc correct fraction of %s based on state',
  async (base, fractionOf) => {
    const eventEmitter = new EventEmitter()

    const observable = rxFromEvent(eventEmitter, 'state')
      .pipe(fractionXOf(base))

    let { promise, resolve } = createPromise()

    const subscriber = observable.subscribe(state => resolve(state))

    for (const [x, factor] of steps) {
      eventEmitter.emit('state', {
        config: { fromX: () => 200, toX: () => (maxStep + 200) },
        x,
        fractionXOf: fractionOf
      })

      const state = await promise

      expect(state.fractionXOf[base]).toBe(base * factor)

      ;({ promise, resolve } = createPromise())
    }

    subscriber.unsubscribe()
  }
)
