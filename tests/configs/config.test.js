import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { Observable as RxObservable } from 'rxjs'

import { globalEventEmitter } from './global-this'

import { config } from '../../lib/configs/config'
import { coverEdges } from '../../lib/configs/cover-edges'
import { uncoverEdges } from '../../lib/configs/uncover-edges'
import { scroll } from '../../lib/configs/scroll'
import { toY } from '../../lib/configs/to-y'
import { fromY } from '../../lib/configs/from-y'
import { toX } from '../../lib/configs/to-x'
import { fromX } from '../../lib/configs/from-x'
import { strictBoundaries } from '../../lib/configs/strict-boundaries'
import { looseBoundaries } from '../../lib/configs/loose-boundaries'

const { Promise } = globalThis

test(
  'config must return an object with' + ' ' +
    'coverEdges property that is equal to coverEdges()' + ', ' +
    'strictBoundaries property that is equal to strictBoundaries()' + ' ' +
    'and scroll property that is equal to scroll(globalThis)' + ' ' +
    'by default when has no any argument',
  async () => {
    const configs = config()

    expect(configs).toHaveProperty('coverEdges')

    expect(configs.coverEdges).toBe(true)

    expect(configs).toHaveProperty('strictBoundaries')

    expect(configs.strictBoundaries).toBe(true)

    expect(configs).toHaveProperty('scroll')

    expect(configs.scroll).toBeInstanceOf(RxObservable)

    const scrollEvent = { type: 'scroll' }

    Promise.resolve().then(() => globalEventEmitter.emit('scroll', scrollEvent))

    const receivedEvent = await (new Promise(
      resolve => configs.scroll.subscribe(resolve)
    ))

    expect(receivedEvent).toBe(scrollEvent)
  }
)

test(
  'config must return an object with custom properties and' + ' ' +
    'coverEdges property that is equal to coverEdges()' + ', ' +
    'strictBoundaries property that is equal to strictBoundaries()' + ' ' +
    'and scroll property that is equal to scroll(globalThis)' + ' ' +
    'by default when has any argument that does not affect coverEdges, strictBoundaries and scroll',
  async () => {
    const customConfig1 = { a: 0, b: 1 }
    const customConfig2 = { c: 2, d: 3 }
    const customConfigs = { ...customConfig1, ...customConfig2 }

    const configs = config(customConfig1, customConfig2)

    expect(configs).toEqual({
      ...customConfigs, ...coverEdges(), scroll: configs.scroll, ...strictBoundaries()
    })

    expect(configs.scroll).toBeInstanceOf(RxObservable)

    const scrollEvent = { type: 'scroll' }

    Promise.resolve().then(() => globalEventEmitter.emit('scroll', scrollEvent))

    const receivedEvent = await (new Promise(
      resolve => configs.scroll.subscribe(resolve)
    ))

    expect(receivedEvent).toBe(scrollEvent)
  }
)

test(
  'config must return an object with' + ' ' +
    'coverEdges, strictBoundaries and scroll properties that overridden by config arguments' + ' ' +
    'when has any argument that change coverEdges, strictBoundaries and scroll',
  async () => {
    const eventEmitter = new EventEmitter()

    const uncoverEdgesConfig = uncoverEdges()
    const looseBoundariesConfig = looseBoundaries()
    const scrollConfig = scroll(eventEmitter)

    const configs = config(uncoverEdgesConfig, looseBoundariesConfig, scrollConfig)

    expect(configs).toEqual({
      ...uncoverEdgesConfig,
      ...looseBoundariesConfig,
      ...scrollConfig
    })

    expect(configs.scroll).toBeInstanceOf(RxObservable)

    const scrollEvent = { type: 'scroll' }

    Promise.resolve().then(() => eventEmitter.emit('scroll', scrollEvent))

    const receivedEvent = await (new Promise(
      resolve => configs.scroll.subscribe(resolve)
    ))

    expect(receivedEvent).toBe(scrollEvent)
  }
)

test(
  'config must return an object with' + ' ' +
    'toY and to properties that is equal to its config argument and' + ' ' +
    'fromY and from properties that is equal to fromY(0)' + ' ' +
    'alongside coverEdges, strictBoundaries and scroll properties by default' + ' ' +
    'when toY config is available and fromY is not exists',
  () => {
    const toYConfig = toY(100)

    const configs = config(toYConfig)

    expect(configs).toEqual({ ...configs, ...toYConfig })

    expect(configs).toHaveProperty('fromY')

    expect(typeof configs.fromY).toBe('function')

    expect(configs.fromY()).toBe(0)

    expect(configs).toHaveProperty('from')

    expect(typeof configs.from).toBe('function')

    expect(configs.from()).toBe(0)
  }
)

test(
  'config must return an object with' + ' ' +
    'toY/to and fromY/from properties that is equal to its config arguments and' + ' ' +
    'alongside coverEdges, strictBoundaries and scroll properties by default' + ' ' +
    'when both of toY and fromY configs are available',
  () => {
    const fromYConfig = fromY(100)
    const toYConfig = toY(600)

    const configs = config(fromYConfig, toYConfig)

    expect(configs).toEqual({ ...configs, ...fromYConfig, ...toYConfig })
  }
)

test(
  'config must return an object with' + ' ' +
    'toX property that is equal to its config argument and' + ' ' +
    'fromX property that is equal to fromX(0)' + ' ' +
    'alongside coverEdges, strictBoundaries and scroll properties by default' + ' ' +
    'when toX config is available and fromX is not exists',
  () => {
    const toXConfig = toX(100)

    const configs = config(toXConfig)

    expect(configs).toEqual({ ...configs, ...toXConfig })

    expect(configs).toHaveProperty('fromX')

    expect(typeof configs.fromX).toBe('function')

    expect(configs.fromX()).toBe(0)
  }
)

test(
  'config must return an object with' + ' ' +
    'toX and fromX properties that is equal to its config arguments and' + ' ' +
    'alongside coverEdges, strictBoundaries and scroll properties by default' + ' ' +
    'when both of toX and fromX configs are available',
  () => {
    const fromXConfig = fromX(100)
    const toXConfig = toX(600)

    const configs = config(fromXConfig, toXConfig)

    expect(configs).toEqual({ ...configs, ...fromXConfig, ...toXConfig })
  }
)
