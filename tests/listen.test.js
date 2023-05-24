import './set-event-emitter-to-global-this'

import { EventEmitter } from 'events'

import { test, expect, describe } from '@jest/globals'

import { toY } from '../lib/configs/to-y'
import { scroll } from '../lib/configs/scroll'
import { config } from '../lib/configs/config'
import { listen } from '../lib/listen'
import { toX } from '../lib/configs/to-x'
import { fromY } from '../lib/configs/from-y'
import { fromX } from '../lib/configs/from-x'
import { looseBoundaries } from '../lib/configs/loose-boundaries'
import { uncoverEdges } from '../lib/configs/uncover-edges'
import { uncleanEdges } from '../lib/configs/unclean-edges'

const { Promise, Error, setTimeout } = globalThis

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

describe('State properties', () => {
  test(
    'listen must return a rxjs observable' + ' ' +
    'that observe an object with config property' + ' ' +
    'that must reference to a copy of config',
    async () => {
      const toYSource = 50
      const eventEmitter = new EventEmitter()
      const to100Config = config(toY(toYSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (const scrollTop of [0, 25, 50]) {
        ;({ promise, resolve } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', scrollTop))

        expect((await promise).config).not.toBe(to100Config)
        expect((await promise).config).toEqual(to100Config)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen must return a rxjs observable' + ' ' +
    'that observe an object with event property' + ' ' +
    'that must reference to the scroll event',
    async () => {
      const toYSource = 50
      const eventEmitter = new EventEmitter()
      const to100Config = config(toY(toYSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (const scrollTop of [0, 25, 50]) {
        ;({ promise, resolve } = createPromise())

        const event = createScrollEvent('top', scrollTop)

        emitScroll(eventEmitter, event)

        expect((await promise).event).toBe(event)
      }

      subscriber.unsubscribe()
    }
  )

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

      const scrollEventTransformers = [
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

        scrollEventTransformers.shift()(event)

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
})

describe('In ranges', () => {
  test(
    'listen must return a rxjs observable' + ' ' +
    'that observe an object with y property' + ' ' +
    'that must be equal to target scrollTop minus fromY config',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (let i = fromYSource; i <= toYSource; i++) {
        ;({ promise, resolve } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i))

        expect((await promise).y).toBe(i - fromYSource)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen must return a rxjs observable' + ' ' +
    'that observe an object with x property' + ' ' +
    'that must be equal to target scrollLeft minus fromX config',
    async () => {
      const fromXSource = 50
      const toXSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (let i = fromXSource; i <= toXSource; i++) {
        ;({ promise, resolve } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('left', i))

        expect((await promise).x).toBe(i - fromXSource)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen must return a rxjs observable' + ' ' +
    'that observe an object with y and x property' + ' ' +
    'that must be equal to target scrollTop minus fromY' + ' ' +
    'and scrollLeft minus fromX configs',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(
        fromY(fromYSource), toY(toYSource),
        fromX(fromYSource), toX(toYSource),
        scroll(eventEmitter)
      )
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (let i = fromYSource; i <= toYSource; i++) {
        ;({ promise, resolve } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i, 'left', i))

        expect((await promise).y).toBe(i - fromYSource)
        expect((await promise).x).toBe(i - fromYSource)
      }

      subscriber.unsubscribe()
    }
  )
})

describe('Out of ranges', () => {
  test(
    'listen returned rxjs observable should not observe' + ' ' +
    'when target scrollTop is out of fromY and toY range',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve
      let reject

      const subscriber = observable.subscribe(state => resolve(state))

      const didNotObserveMessage = 'Did not observe after 10ms'

      for (let i = 0; i < fromYSource; i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i))

        const didNotObserveMessageWithAppendix = didNotObserveMessage + ` scrollTop: ${i}`

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      ;({ promise, resolve, reject } = createPromise())

      emitScroll(eventEmitter, createScrollEvent('top', fromYSource))

      await promise

      for (let i = (toYSource + 1); i < ((toYSource + fromYSource) + 1); i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i))

        const didNotObserveMessageWithAppendix = didNotObserveMessage + ` scrollTop: ${i}`

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen returned rxjs observable should not observe' + ' ' +
    'when target scrollLeft is out of fromX and toX range',
    async () => {
      const fromXSource = 50
      const toXSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
      const observable = listen(to100Config)

      let promise
      let resolve
      let reject

      const subscriber = observable.subscribe(state => resolve(state))

      const didNotObserveMessage = 'Did not observe after 10ms'

      for (let i = 0; i < fromXSource; i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('left', i))

        const didNotObserveMessageWithAppendix = didNotObserveMessage + ` scrollLeft: ${i}`

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      ;({ promise, resolve, reject } = createPromise())

      emitScroll(eventEmitter, createScrollEvent('left', fromXSource))

      await promise

      for (let i = (toXSource + 1); i < ((toXSource + fromXSource) + 1); i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('left', i))

        const didNotObserveMessageWithAppendix = didNotObserveMessage + ` scrollLeft: ${i}`

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen returned rxjs observable should not observe' + ' ' +
    'when target scrollTop and scrollLeft is out of fromY, toY and fromX, toX ranges',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(
        fromY(fromYSource), toY(toYSource),
        fromX(fromYSource), toX(toYSource),
        scroll(eventEmitter)
      )
      const observable = listen(to100Config)

      let promise
      let resolve
      let reject

      const subscriber = observable.subscribe(state => resolve(state))

      const didNotObserveMessage = 'Did not observe after 10ms'

      for (let i = 0; i < fromYSource; i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i, 'left', i))

        const didNotObserveMessageWithAppendix = (
          didNotObserveMessage + ` scrollTop: ${i}, scrollLeft: ${i}`
        )

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      ;({ promise, resolve, reject } = createPromise())

      emitScroll(
        eventEmitter,
        createScrollEvent('top', fromYSource, 'left', fromYSource)
      )

      await promise

      for (let i = (toYSource + 1); i < ((toYSource + fromYSource) + 1); i++) {
        ;({ promise, resolve, reject } = createPromise())

        emitScroll(eventEmitter, createScrollEvent('top', i, 'left', i))

        const didNotObserveMessageWithAppendix = (
          didNotObserveMessage + ` scrollTop: ${i}, scrollLeft: ${i}`
        )

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      subscriber.unsubscribe()
    }
  )
})

describe('Strict/Loose boundaries', () => {
  test(
    'listen returned rxjs observable should not observe' + ' ' +
    'when target scrollTop or scrollLeft is out of fromY, toY or fromX, toX ranges' + ' ' +
    'with strictBoundaries config (default)',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(
        fromY(fromYSource), toY(toYSource),
        fromX(fromYSource), toX(toYSource),
        scroll(eventEmitter)
      )
      const observable = listen(to100Config)

      let promise
      let resolve
      let reject

      const subscriber = observable.subscribe(state => resolve(state))

      const didNotObserveMessage = 'Did not observe after 10ms'

      for (let i = 0; i < fromYSource; i++) {
        ;({ promise, resolve, reject } = createPromise())

        const top = (i + fromYSource)

        emitScroll(eventEmitter, createScrollEvent('top', top, 'left', i))

        const didNotObserveMessageWithAppendix = (
          didNotObserveMessage + ` scrollTop: ${top}, scrollLeft: ${i}`
        )

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      for (let i = (toYSource + 1); i < ((toYSource + fromYSource) + 1); i++) {
        ;({ promise, resolve, reject } = createPromise())

        const left = ((i - 1) - toYSource) + fromYSource

        emitScroll(eventEmitter, createScrollEvent('top', i, 'left', left))

        const didNotObserveMessageWithAppendix = (
          didNotObserveMessage + ` scrollTop: ${i}, scrollLeft: ${left}`
        )

        setTimeout(() => reject(new Error(didNotObserveMessageWithAppendix)), 10)

        await expect(promise).rejects.toThrowError(didNotObserveMessageWithAppendix)
      }

      subscriber.unsubscribe()
    }
  )

  test(
    'listen returned rxjs observable must observe' + ' ' +
    'when one of target scrollTop or scrollLeft' + ' ' +
    'is in fromY, toY or fromX, toX ranges' + ' ' +
    'with looseBoundaries config',
    async () => {
      const fromYSource = 50
      const toYSource = 100
      const eventEmitter = new EventEmitter()
      const to100Config = config(
        fromY(fromYSource), toY(toYSource),
        fromX(fromYSource), toX(toYSource),
        scroll(eventEmitter),
        looseBoundaries()
      )
      const observable = listen(to100Config)

      let promise
      let resolve

      const subscriber = observable.subscribe(state => resolve(state))

      for (let i = 0; i < fromYSource; i++) {
        ;({ promise, resolve } = createPromise())

        const top = (i + fromYSource)

        emitScroll(eventEmitter, createScrollEvent('top', top, 'left', i))

        expect((await promise).y).toBe(i)
      }

      for (let i = (toYSource + 1); i < ((toYSource + fromYSource) + 1); i++) {
        ;({ promise, resolve } = createPromise())

        const left = ((i - 1) - toYSource) + fromYSource

        emitScroll(eventEmitter, createScrollEvent('top', i, 'left', left))

        expect((await promise).x).toBe(left - fromYSource)
      }

      subscriber.unsubscribe()
    }
  )
})

describe('Cover/Uncover edges', () => {
  describe('Cover edges (default)', () => {
    describe('Single axis', () => {
      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollTop is behind of fromY' + ' ' +
        'and previous target scrollTop was in range and after fromY' + ' ' +
        'with y property that its value is 0',
        async () => {
          const fromYSource = 50
          const toYSource = 100
          const eventEmitter = new EventEmitter()
          const to100Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
          const observable = listen(to100Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', fromYSource * 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', fromYSource / 2))

          expect((await promise).y).toBe(0)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollTop is beyond of toY' + ' ' +
        'and previous target scrollTop was in range and before toY' + ' ' +
        'with y property that its value is equal to toY minus fromY',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', toYSource / 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 2))

          expect((await promise).y).toBe(toYSource - fromYSource)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollLeft is behind of fromX' + ' ' +
        'and previous target scrollLeft was in range and after fromX' + ' ' +
        'with x property that its value is 0',
        async () => {
          const fromXSource = 50
          const toXSource = 100
          const eventEmitter = new EventEmitter()
          const to100Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
          const observable = listen(to100Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', fromXSource * 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', fromXSource / 2))

          expect((await promise).x).toBe(0)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollLeft is beyond of toX' + ' ' +
        'and previous target scrollLeft was in range and before toX' + ' ' +
        'with x property that its value is equal to toX minus fromX',
        async () => {
          const fromXSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', toXSource / 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 2))

          expect((await promise).x).toBe(toXSource - fromXSource)

          subscriber.unsubscribe()
        }
      )
    })

    describe('Multiple axes', () => {
      describe(
        'With strictBoundaries config (Default)' + ' ' +
        'when previous target scrollTop and scrollLeft were in range',
        () => {
          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollTop and scrollLeft are behind of fromY and fromX' + ' ' +
            'with y and x property that their values are 0',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource / 2,
                'left', fromYSource / 2
              ))

              expect((await promise).y).toBe(0)
              expect((await promise).x).toBe(0)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollTop is behind of fromY' + ' ' +
            'with y and x property that y value must be 0',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)
              const center = fromYSource * 1.5

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', center
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource / 2,
                'left', center
              ))

              expect((await promise).y).toBe(0)
              expect((await promise).x).toBe(center - fromYSource)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollLeft is behind of fromX' + ' ' +
            'with y and x property that X value must be 0',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)
              const center = fromYSource * 1.5

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', center
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', fromYSource / 2
              ))

              expect((await promise).y).toBe(center - fromYSource)
              expect((await promise).x).toBe(0)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollTop and scrollLeft are beyond of toY and toX' + ' ' +
            'with y and x property that their values are equal to toY/toX minus fromY/fromX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', toYSource * 1.5,
                'left', toYSource * 1.5
              ))

              expect((await promise).y).toBe(toYSource - fromYSource)
              expect((await promise).x).toBe(toYSource - fromYSource)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollTop is beyond of toY' + ' ' +
            'with y and x property that y value must be equal to toY minus fromY',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)
              const center = fromYSource * 1.5

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', center
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', toYSource * 1.5,
                'left', center
              ))

              expect((await promise).y).toBe(toYSource - fromYSource)
              expect((await promise).x).toBe(center - fromYSource)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable must observe' + ' ' +
            'when target scrollLeft is beyond of toX' + ' ' +
            'with y and x property that x value must be equal to toX minus fromX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter)
              )
              const observable = listen(to100Config)
              const center = fromYSource * 1.5

              let { promise, resolve } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', center
              ))

              await promise

              ;({ promise, resolve } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', center,
                'left', toYSource * 1.5
              ))

              expect((await promise).y).toBe(center - fromYSource)
              expect((await promise).x).toBe(toYSource - fromYSource)

              subscriber.unsubscribe()
            }
          )
        }
      )

      describe('With looseBoundaries config', () => {
        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollTop is behind of fromY' + ' ' +
          'with y and x property that y value is 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', 0
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollLeft is behind of fromX' + ' ' +
          'with y and x property that X value is 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource / 2
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollTop is beyond of toY' + ' ' +
          'with y and x property that y value is equal to toY minus fromY',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', 0
            ))

            expect((await promise).y).toBe(toYSource - fromYSource)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollLeft is beyond of toX' + ' ' +
          'with y and x property that x value is equal to toX minus fromX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', toYSource * 1.5
            ))

            expect((await promise).x).toBe(toYSource - fromYSource)
            expect((await promise).y).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollTop is behind of fromY' + ' ' +
          'with y and x property that y value is 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', fromYSource * 1.5
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe((fromYSource * 1.5) - fromYSource)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollLeft is behind of fromX' + ' ' +
          'with y and x property that x value is 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', fromYSource / 2
            ))

            expect((await promise).x).toBe(0)
            expect((await promise).y).toBe((fromYSource * 1.5) - fromYSource)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollTop is beyond of toY' + ' ' +
          'with y and x property that y value is equal to toY minus fromY',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', fromYSource * 1.5
            ))

            expect((await promise).y).toBe(toYSource - fromYSource)
            expect((await promise).x).toBe((fromYSource * 1.5) - fromYSource)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollLeft is beyond of toX' + ' ' +
          'with y and x property that x value is equal to toX minus fromX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', toYSource * 1.5
            ))

            expect((await promise).x).toBe(toYSource - fromYSource)
            expect((await promise).y).toBe((fromYSource * 1.5) - fromYSource)

            subscriber.unsubscribe()
          }
        )
      })
    })
  })

  describe('Uncover edges', () => {
    describe('Single axis', () => {
      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollTop is behind of fromY' + ' ' +
        'and previous target scrollTop was in range and after fromY' + ' ' +
        'with uncoverEdges config',
        async () => {
          const fromYSource = 50
          const toYSource = 100
          const eventEmitter = new EventEmitter()
          const to100Config = config(
            fromY(fromYSource), toY(toYSource),
            scroll(eventEmitter),
            uncoverEdges()
          )
          const observable = listen(to100Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', fromYSource * 1.5))

          await promise

          const didNotObserveMessage = 'Did not observe after 10ms'

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', fromYSource / 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollTop is beyond of toY' + ' ' +
        'and previous target scrollTop was in range and before toY' + ' ' +
        'with uncoverEdges config',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromY(fromYSource), toY(toYSource),
            scroll(eventEmitter),
            uncoverEdges()
          )
          const observable = listen(to125Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', toYSource / 1.5))

          await promise

          const didNotObserveMessage = 'Did not observe after 10ms'

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollLeft is behind of fromX' + ' ' +
        'and previous target scrollLeft was in range and after fromX' + ' ' +
        'with uncoverEdges config',
        async () => {
          const fromXSource = 50
          const toXSource = 100
          const eventEmitter = new EventEmitter()
          const to100Config = config(
            fromX(fromXSource), toX(toXSource),
            scroll(eventEmitter),
            uncoverEdges()
          )
          const observable = listen(to100Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', fromXSource * 1.5))

          await promise

          const didNotObserveMessage = 'Did not observe after 10ms'

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', fromXSource / 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollLeft is beyond of toX' + ' ' +
        'and previous target scrollLeft was in range and before toX' + ' ' +
        'with uncoverEdges config',
        async () => {
          const fromXSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromX(fromXSource), toX(toXSource),
            scroll(eventEmitter),
            uncoverEdges()
          )
          const observable = listen(to125Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', toXSource / 1.5))

          await promise

          const didNotObserveMessage = 'Did not observe after 10ms'

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )
    })

    describe('Multiple axes', () => {
      describe(
        'With strictBoundaries config (Default)' + ' ' +
        'when previous target scrollTop and scrollLeft were in range',
        () => {
          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollTop and scrollLeft are behind of fromY and fromX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource / 2,
                'left', fromYSource / 2
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollTop is behind of fromY',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource / 2,
                'left', fromYSource * 1.5
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollLeft is behind of fromX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource / 2
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollTop and scrollLeft are beyond of toY and toX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', toYSource * 1.5,
                'left', toYSource * 1.5
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollTop is beyond of toY',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', toYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )

          test(
            'listen returned rxjs observable should not observe' + ' ' +
            'when target scrollLeft is beyond of toX',
            async () => {
              const fromYSource = 50
              const toYSource = 100
              const eventEmitter = new EventEmitter()
              const to100Config = config(
                fromY(fromYSource), toY(toYSource),
                fromX(fromYSource), toX(toYSource),
                scroll(eventEmitter),
                uncoverEdges()
              )
              const observable = listen(to100Config)

              let { promise, resolve, reject } = createPromise()

              const subscriber = observable.subscribe(state => resolve(state))

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', fromYSource * 1.5
              ))

              await promise

              const didNotObserveMessage = 'Did not observe after 10ms'

              ;({ promise, resolve, reject } = createPromise())

              emitScroll(eventEmitter, createScrollEvent(
                'top', fromYSource * 1.5,
                'left', toYSource * 1.5
              ))

              setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

              await expect(promise).rejects.toThrowError(didNotObserveMessage)

              subscriber.unsubscribe()
            }
          )
        }
      )

      describe('With looseBoundaries config', () => {
        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when target scrollTop and scrollLeft are behind of fromY and fromX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', fromYSource * 1.5
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', fromYSource / 2
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollTop is behind of fromY',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', 0
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollLeft is behind of fromX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource / 2
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when target scrollTop and scrollLeft are beyond of toY and toX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', fromYSource * 1.5
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', toYSource * 1.5
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when previous target scrollTop was in range' + ' ' +
          'and target scrollTop is beyond of toY',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource * 1.5,
              'left', 0
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', 0
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable should not observe' + ' ' +
          'when previous target scrollLeft was in range' + ' ' +
          'and target scrollLeft is beyond of toX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              uncoverEdges(),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve, reject } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromYSource * 1.5
            ))

            await promise

            const didNotObserveMessage = 'Did not observe after 10ms'

            ;({ promise, resolve, reject } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', toYSource * 1.5
            ))

            setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

            await expect(promise).rejects.toThrowError(didNotObserveMessage)

            subscriber.unsubscribe()
          }
        )
      })
    })
  })
})

describe('Clean/Unclean edges', () => {
  describe('Clean edges (default)', () => {
    describe('Single axis', () => {
      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollTop is beyond of toY' + ' ' +
        'and previous target scrollTop was before fromY' + ' ' +
        'with y property that its value is equal to toY minus fromY',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          const { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 2))

          expect((await promise).y).toBe(toYSource - fromYSource)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollTop is behind of fromY' + ' ' +
        'and previous target scrollTop was after toY' + ' ' +
        'with y property that its value is 0',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromY(fromYSource), toY(toYSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', fromYSource / 2))

          expect((await promise).y).toBe(0)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollLeft is beyond of toX' + ' ' +
        'and previous target scrollLeft was before fromX' + ' ' +
        'with x property that its value is equal to toX minus fromX',
        async () => {
          const fromXSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          const { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 2))

          expect((await promise).x).toBe(toXSource - fromXSource)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable must observe' + ' ' +
        'when target scrollLeft is behind of fromX' + ' ' +
        'and previous target scrollLeft was after toX' + ' ' +
        'with x property that its value is 0',
        async () => {
          const fromXSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(fromX(fromXSource), toX(toXSource), scroll(eventEmitter))
          const observable = listen(to125Config)

          let { promise, resolve } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 1.5))

          await promise

          ;({ promise, resolve } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', fromXSource / 2))

          expect((await promise).x).toBe(0)

          subscriber.unsubscribe()
        }
      )
    })

    describe('Multiple axes', () => {
      describe('With strictBoundaries config (Default)', () => {
        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when target scrollTop and scrollLeft are beyond of toY and toX' + ' ' +
          'when previous target scrollTop and scrollLeft were before fromY and fromX' + ' ' +
          'with y and x property that their values are equal to toY/toX minus fromY/fromX',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter)
            )
            const observable = listen(to100Config)

            const { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', toYSource * 1.5
            ))

            expect((await promise).y).toBe(toYSource - fromYSource)
            expect((await promise).x).toBe(toYSource - fromYSource)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when target scrollTop and scrollLeft are behind of fromY and fromX' + ' ' +
          'when previous target scrollTop and scrollLeft were after toY and toX' + ' ' +
          'with y and x property that their values are 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter)
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', toYSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', fromYSource / 2
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )
      })

      describe('With looseBoundaries config', () => {
        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was behind of fromY' + ' ' +
          'and target scrollTop is beyond of toY' + ' ' +
          'with y and x property that y value is equal to toY minus fromY',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            const { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', 0
            ))

            expect((await promise).y).toBe(toYSource - fromYSource)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollTop was beyond of toY' + ' ' +
          'and target scrollTop is behind of fromY' + ' ' +
          'with y and x property that y value is 0',
          async () => {
            const fromYSource = 50
            const toYSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromYSource), toY(toYSource),
              fromX(fromYSource), toX(toYSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', toYSource * 1.5,
              'left', 0
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', fromYSource / 2,
              'left', 0
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was behind of fromX' + ' ' +
          'and target scrollLeft is beyond of toX' + ' ' +
          'with y and x property that x value is equal to toX minus fromX',
          async () => {
            const fromXSource = 50
            const toXSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromXSource), toY(toXSource),
              fromX(fromXSource), toX(toXSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            const { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', toXSource * 1.5
            ))

            expect((await promise).x).toBe(toXSource - fromXSource)
            expect((await promise).y).toBe(0)

            subscriber.unsubscribe()
          }
        )

        test(
          'listen returned rxjs observable must observe' + ' ' +
          'when previous target scrollLeft was beyond of toX' + ' ' +
          'and target scrollLeft is behind of fromX' + ' ' +
          'with y and x property that x value is 0',
          async () => {
            const fromXSource = 50
            const toXSource = 100
            const eventEmitter = new EventEmitter()
            const to100Config = config(
              fromY(fromXSource), toY(toXSource),
              fromX(fromXSource), toX(toXSource),
              scroll(eventEmitter),
              looseBoundaries()
            )
            const observable = listen(to100Config)

            let { promise, resolve } = createPromise()

            const subscriber = observable.subscribe(state => resolve(state))

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', toXSource * 1.5
            ))

            await promise

            ;({ promise, resolve } = createPromise())

            emitScroll(eventEmitter, createScrollEvent(
              'top', 0,
              'left', fromXSource / 2
            ))

            expect((await promise).y).toBe(0)
            expect((await promise).x).toBe(0)

            subscriber.unsubscribe()
          }
        )
      })
    })
  })

  describe('Unclean edges', () => {
    describe('Single axis', () => {
      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollTop is beyond of toY' + ' ' +
        'and previous target scrollTop was before fromY' + ' ' +
        'with uncleanEdges config',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromY(fromYSource), toY(toYSource),
            scroll(eventEmitter),
            uncleanEdges()
          )
          const observable = listen(to125Config)

          const { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          const didNotObserveMessage = 'Did not observe after 10ms'

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollTop is behind of fromY' + ' ' +
        'and previous target scrollTop was after toY' + ' ' +
        'with uncleanEdges config',
        async () => {
          const fromYSource = 75
          const toYSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromY(fromYSource), toY(toYSource),
            scroll(eventEmitter),
            uncleanEdges()
          )
          const observable = listen(to125Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          const didNotObserveMessage = 'Did not observe after 10ms'

          emitScroll(eventEmitter, createScrollEvent('top', toYSource * 1.5))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await promise.catch(() => {})

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('top', toYSource / 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollLeft is beyond of toX' + ' ' +
        'and previous target scrollLeft was before fromX' + ' ' +
        'with uncleanEdges config',
        async () => {
          const fromXSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromX(fromXSource), toX(toXSource),
            scroll(eventEmitter),
            uncleanEdges()
          )
          const observable = listen(to125Config)

          const { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          const didNotObserveMessage = 'Did not observe after 10ms'

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )

      test(
        'listen returned rxjs observable should not observe' + ' ' +
        'when target scrollLeft is behind of fromX' + ' ' +
        'and previous target scrollLeft was after toX' + ' ' +
        'with uncleanEdges config',
        async () => {
          const fromYSource = 75
          const toXSource = 125
          const eventEmitter = new EventEmitter()
          const to125Config = config(
            fromY(fromYSource), toY(toXSource),
            scroll(eventEmitter),
            uncleanEdges()
          )
          const observable = listen(to125Config)

          let { promise, resolve, reject } = createPromise()

          const subscriber = observable.subscribe(state => resolve(state))

          const didNotObserveMessage = 'Did not observe after 10ms'

          emitScroll(eventEmitter, createScrollEvent('left', toXSource * 1.5))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await promise.catch(() => {})

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          ;({ promise, resolve, reject } = createPromise())

          emitScroll(eventEmitter, createScrollEvent('left', toXSource / 2))

          setTimeout(() => reject(new Error(didNotObserveMessage)), 10)

          await expect(promise).rejects.toThrowError(didNotObserveMessage)

          subscriber.unsubscribe()
        }
      )
    })
  })
})
