import { EventEmitter } from 'events'

Object.setPrototypeOf(globalThis, new EventEmitter())
