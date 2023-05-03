import { filter as rxFilter } from 'rxjs'

import { pipe, always } from 'ramda'

export function createNonXDuplicatesPredicator (lastX) {
  return function xAndLastXInequalityChecker ({ x }) {
    return (function checkXAndLastXInequality (prevX) {
      lastX = x

      return (prevX !== x)
    })(lastX)
  }
}

export const filterOutXDuplicates = pipe(
  always(NaN),
  createNonXDuplicatesPredicator,
  rxFilter
)
