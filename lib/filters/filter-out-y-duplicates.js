import { filter as rxFilter } from 'rxjs'

import { pipe, always } from 'ramda'

export function createNonYDuplicatesPredicator (lastY) {
  return function yAndLastYInequalityChecker ({ y }) {
    return (function checkYAndLastYInequality (prevY) {
      lastY = y

      return (prevY !== y)
    })(lastY)
  }
}

export const filterOutYDuplicates = pipe(
  always(NaN),
  createNonYDuplicatesPredicator,
  rxFilter
)
