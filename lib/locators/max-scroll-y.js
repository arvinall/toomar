import {
  call, curryN, flip, map,
  partial, unapply, prop, subtract,
  apply, pipe, ifElse, always, isEmpty
} from 'ramda'

import {
  getIfHasScrollingElementIfHasDocument as getScrollingElement
} from '../internals/get-target-element'

const flippedBinaryCall = flip(curryN(2, call))

const flippedMap = flip(map)

const subtractScrollAndClientHeight = pipe(
  flippedBinaryCall,
  flippedMap([
    prop('scrollHeight'),
    prop('clientHeight')
  ]),
  apply(subtract)
)

const unappliedPartial = pipe(partial, unapply)

const unappliedIfElse = pipe(ifElse, unapply)

export const maxScrollY = pipe(
  unappliedIfElse(isEmpty, always(globalThis), prop(0)),
  getScrollingElement,
  unappliedPartial(subtractScrollAndClientHeight)
)
