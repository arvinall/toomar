import {
  unapply, when, pipe, call, apply,
  map, partial, prop, zip, identity,
  append, gt, curryN
} from 'ramda'

import {
  getIfHasScrollingElementIfHasDocument as getScrollingElement
} from '../internals/get-target-element'

const unappliedWhen = pipe(when, unapply)

const mapApplyCall = map(apply(call))

const unappliedPartial = pipe(partial, unapply)

function addTargetTopToViewportScrollTop ([target, viewport]) {
  return target.getBoundingClientRect().top + viewport.scrollTop
}

export const topOf = curryN(
  1,
  pipe(
    unappliedWhen(
      pipe(prop('length'), gt(2)),
      append(globalThis)
    ),
    zip([identity, getScrollingElement]),
    mapApplyCall,
    unappliedPartial(addTargetTopToViewportScrollTop)
  )
)
