import { map as rxMap } from 'rxjs'
import { pipe, always } from 'ramda'

function createDirectionOfXUpdaterByMutation (lastScrollLeft) {
  return function updateDirectionOfXByMutation (state) {
    ;(function mutateDirectionOfX (scrollLeft) {
      state.directionOfX = (scrollLeft < lastScrollLeft) ? 0 : 1

      lastScrollLeft = scrollLeft
    })(state.targetElement.scrollLeft)

    return state
  }
}

export const directionOfX = pipe(always(0), createDirectionOfXUpdaterByMutation, rxMap)
