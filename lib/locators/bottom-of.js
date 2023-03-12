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

function addTargetBottomToViewportScrollTop ([target, viewport]) {
  return target.getBoundingClientRect().bottom + viewport.scrollTop
}

export const bottomOf = curryN(
  1,
  pipe(
    unappliedWhen(
      pipe(prop('length'), gt(2)),
      append(globalThis)
    ),
    zip([identity, getScrollingElement]),
    mapApplyCall,
    unappliedPartial(addTargetBottomToViewportScrollTop)
  )
)
