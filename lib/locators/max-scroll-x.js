import {
  call, curryN, flip, map,
  partial, unapply, prop, subtract,
  apply, pipe, ifElse, always, isEmpty
} from 'ramda'

import {
  getIfHasScrollingElementIfHasDocument as getScrollingElement
} from '../internals/get-target-element.js'

const flippedBinaryCall = flip(curryN(2, call))

const flippedMap = flip(map)

const subtractScrollAndClientWidth = pipe(
  flippedBinaryCall,
  flippedMap([
    prop('scrollWidth'),
    prop('clientWidth')
  ]),
  apply(subtract)
)

const unappliedPartial = pipe(partial, unapply)

const unappliedIfElse = pipe(ifElse, unapply)

export const maxScrollX = pipe(
  unappliedIfElse(isEmpty, always(globalThis), prop(0)),
  getScrollingElement,
  unappliedPartial(subtractScrollAndClientWidth)
)
