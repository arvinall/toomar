import { EventEmitter } from 'events'

import { test, expect, jest } from '@jest/globals'
import { Observable as RxObservable } from 'rxjs'

import { scroll } from '../../lib/configs/scroll'

test(
  'scroll must return an object with scroll property' + ' ' +
    'that is equal to rxjs observable that generates from scroll event of source argument',
  async () => {
    const event = { type: 'scroll' }
    const eventEmitter = new EventEmitter()
    const scrollConfig = scroll(eventEmitter)

    expect(scrollConfig).toHaveProperty('scroll')

    expect(scrollConfig.scroll).toBeInstanceOf(RxObservable)

    Promise.resolve().then(() => eventEmitter.emit('scroll', event))

    const observableValue = await (new Promise(
      resolve => scrollConfig.scroll.subscribe(resolve)
    ))

    expect(observableValue).toBe(event)
  }
)

test(
  'scroll must pass eventListenerOptions (second) argument' + ' ' +
  'to target EventTarget on subscription',
  async () => {
    const eventListenerOptions = { capture: true }

    const eventTarget = {
      addEventListener: jest.fn(() => {}),
      removeEventListener () {}
    }

    const scrollConfig = scroll(eventTarget, eventListenerOptions)

    scrollConfig.scroll.subscribe(() => {})

    expect(eventTarget.addEventListener.mock.calls.length).toBe(1)
    expect(eventTarget.addEventListener.mock.calls[0].length).toBe(3)
    expect(eventTarget.addEventListener.mock.calls[0][2]).toBe(eventListenerOptions)
  }
)
