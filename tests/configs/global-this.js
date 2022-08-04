import { EventEmitter } from 'events'

if (!globalThis) globalThis = global // eslint-disable-line no-global-assign

export const globalEventEmitter = new EventEmitter()

globalThis.addListener = (...args) => globalEventEmitter.addListener(...args)
globalThis.removeListener = (...args) => globalEventEmitter.removeListener(...args)
