import { EventEmitter } from 'events'

import { test, expect } from '@jest/globals'
import { Observable as RxObservable } from 'rxjs'

import { scroll } from '../../lib/configs/scroll'

test(
  'scroll must return an object with scroll property' + ' ' +
    'that is equal to rxjs observable that generates from scroll event of value argument',
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
