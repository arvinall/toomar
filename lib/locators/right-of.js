import {
  unapply, when, pipe, call, apply,
  map, partial, prop, zip, identity,
  append, gt, curryN, is, unless, always
} from 'ramda'

import {
  getIfHasScrollingElementIfHasDocument as getScrollingElement
} from '../internals/get-target-element.js'

const { Function } = globalThis

const unappliedWhen = pipe(when, unapply)

const mapApplyCall = map(apply(call))

const unappliedPartial = pipe(partial, unapply)

const isFunction = is(Function)

const wrapNonFunction = unless(isFunction, always)

const getScrollingElementPartially = unappliedPartial(
  pipe(call, getScrollingElement)
)

function addTargetRightToViewportScrollLeft ([target, viewport]) {
  return target().getBoundingClientRect().right + viewport().scrollLeft
}

export const rightOf = curryN(
  1,
  pipe(
    unappliedWhen(
      pipe(prop('length'), gt(2)),
      append(globalThis)
    ),
    map(wrapNonFunction),
    zip([identity, getScrollingElementPartially]),
    mapApplyCall,
    unappliedPartial(addTargetRightToViewportScrollLeft)
  )
)
