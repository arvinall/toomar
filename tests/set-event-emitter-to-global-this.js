import { EventEmitter } from 'events'

export const globalEventEmitter = new EventEmitter()

Object.setPrototypeOf(globalThis, globalEventEmitter)
