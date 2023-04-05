import { EventEmitter } from 'events'

import { jest, test, expect } from '@jest/globals'
import { fromEvent as rxFromEvent } from 'rxjs'

globalThis.requestAnimationFrame = jest.fn()

const { Promise, requestAnimationFrame } = globalThis

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

const auditAnimationFramePromise = import('../../lib/schedulers/audit-animation-frame')

test('auditAnimationFrame must call subscriber in animation frame', async () => {
  const { auditAnimationFrame } = await auditAnimationFramePromise

  const eventEmitter = new EventEmitter()
  const { promise, resolve } = createPromise()

  const subscription = rxFromEvent(eventEmitter, 'scroll')
    .pipe(auditAnimationFrame())
    .subscribe(resolve)

  const event = { event: 'test' }

  eventEmitter.emit('scroll', event)

  await expect(waitForUntil(promise)).rejects.toThrowError(createWaitForUntilRejectMsg())

  requestAnimationFrame.mock.calls[0][0]()

  expect(await promise).toBe(event)

  subscription.unsubscribe()
})
