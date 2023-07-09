import { map as rxMap } from 'rxjs'

import { pipe, always } from 'ramda'

function createDirectionOfYUpdaterByMutation (lastScrollTop) {
  return function updateDirectionOfYByMutation (state) {
    ;(function mutateDirectionOfY (scrollTop) {
      state.direction = state.directionOfY = (scrollTop < lastScrollTop) ? 0 : 1

      lastScrollTop = scrollTop
    })(state.targetElement.scrollTop)

    return state
  }
}

export const directionOfY = pipe(always(0), createDirectionOfYUpdaterByMutation, rxMap)

export const direction = directionOfY
