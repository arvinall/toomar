/* @refresh reload */
import { render } from 'solid-js/web'

import {
  invoker, flip, curryN, apply, always, head,
  pipe, pair, prop, append, identity, unapply
} from 'ramda'

import { flippedMap, flippedBinaryCall } from '../utilities'

import { Toomar } from './Toomar'

const { document } = globalThis

const bodyElement = prop('body', document)

const setDefaultDestination = pipe(unapply(identity), append(bodyElement), head)

const createElement = flip(invoker(1, 'createElement'))(document)

const appElement = createElement('div')

const renderApp = curryN(2, render)

const appendChild = invoker(1, 'appendChild')

export const setupApp = pipe(
  setDefaultDestination,
  pair(appElement),
  flippedBinaryCall,
  flippedMap([
    pipe(head, renderApp(always(<Toomar />))),
    apply(appendChild)
  ])
)