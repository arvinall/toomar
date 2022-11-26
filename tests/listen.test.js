import './set-event-emitter-to-global-this'

import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'

import { toY } from '../lib/configs/to-y'
import { scroll } from '../lib/configs/scroll'
import { config } from '../lib/configs/config'
import { listen } from '../lib/listen'
import { toX } from '../lib/configs/to-x'

const { Promise } = globalThis

function createPromise () {
  let resolve
  let reject

  const promise = new Promise((...args) => { // eslint-disable-line promise/param-names
    [resolve, reject] = args
  })

  return { promise, resolve, reject }
}

function createScrollEvent (...args) {
  const target = Object.assign(
    ...(
      ([args.slice(0, 2), args.slice(2)])
        .filter(arr => arr.length)
        .map(arr => (arr[0] = arr[0][0].toUpperCase() + arr[0].slice(1), arr)) // eslint-disable-line no-return-assign, no-sequences
        .map(([name, value]) => ({ [`scroll${name}`]: value }))
    )
  )

  return { target }
}

async function emitScroll (eventEmitter, event) {
  await Promise.resolve()

  return eventEmitter.emit('scroll', event)
}

test(
  'listen must return a rxjs observable' + ' ' +
  'that observe an object with targetElement property' + ' ' +
  'that must reference to the real target HTMLElement',
  async () => {
    const toYSource = 50
    const eventEmitter = new EventEmitter()
    const to100Config = config(toY(toYSource), scroll(eventEmitter))
    const observable = listen(to100Config)

    let promise
    let resolve

    const subscriber = observable.subscribe(state => resolve(state))

    const scrollEventCreators = [
      x => x,
      x => (x.target = { document: x.target }),
      x => (
        (x.target = { document: x.target }), // eslint-disable-line no-sequences
        (x.target.document = { scrollingElement: x.target.document })
      )
    ]

    for (const scrollTop of [0, 25, 50]) {
      ;({ promise, resolve } = createPromise())

      const baseEvent = createScrollEvent('top', scrollTop)
      const event = createScrollEvent('top', scrollTop)

      scrollEventCreators.shift()(event)

      emitScroll(eventEmitter, event)

      expect((await promise).targetElement).toEqual(baseEvent.target)
    }

    subscriber.unsubscribe()
  }
)

test(
  'listen must return a rxjs observable' + ' ' +
  'that observe an object with y property' + ' ' +
  'that must be equal to target scrollTop when fromY config is 0 (default)',
  async () => {
    const toYSource = 50
    const eventEmitter = new EventEmitter()
    const to100Config = config(toY(toYSource), scroll(eventEmitter))
    const observable = listen(to100Config)

    let promise
    let resolve

    const subscriber = observable.subscribe(state => resolve(state))

    for (let i = 0; i <= toYSource; i++) {
      ;({ promise, resolve } = createPromise())

      emitScroll(eventEmitter, createScrollEvent('top', i))

      expect((await promise).y).toBe(i)
    }

    subscriber.unsubscribe()
  }
)

test(
  'listen must return a rxjs observable' + ' ' +
  'that observe an object with x property' + ' ' +
  'that must be equal to target scrollLeft when fromX config is 0 (default)',
  async () => {
    const toXSource = 50
    const eventEmitter = new EventEmitter()
    const to100Config = config(toX(toXSource), scroll(eventEmitter))
    const observable = listen(to100Config)

    let promise
    let resolve

    const subscriber = observable.subscribe(state => resolve(state))

    for (let i = 0; i <= toXSource; i++) {
      ;({ promise, resolve } = createPromise())

      emitScroll(eventEmitter, createScrollEvent('left', i))

      expect((await promise).x).toBe(i)
    }

    subscriber.unsubscribe()
  }
)

test(
  'listen must return a rxjs observable' + ' ' +
  'that observe an object with y and x property' + ' ' +
  'that must be equal to target scrollTop and scrollLeft' + ' ' +
  'when fromY and fromX configs are 0 (default)',
  async () => {
    const toSource = 50
    const eventEmitter = new EventEmitter()
    const to100Config = config(toY(toSource), toX(toSource), scroll(eventEmitter))
    const observable = listen(to100Config)

    let promise
    let resolve

    const subscriber = observable.subscribe(state => resolve(state))

    for (let i = 0; i <= toSource; i++) {
      ;({ promise, resolve } = createPromise())

      emitScroll(eventEmitter, createScrollEvent('top', i, 'left', i))

      expect((await promise).y).toBe(i)
      expect((await promise).x).toBe(i)
    }

    subscriber.unsubscribe()
  }
)
