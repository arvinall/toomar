import { map as rxMap } from 'rxjs'

import { pipe } from 'ramda'

function createFractionYUpdaterByMutation (target) {
  return function updateFractionYByMutation (state) {
    ;(function mutateFractionY ({ toY, fromY }, fractionYOf) {
      if (!fractionYOf) state.fractionOf = state.fractionYOf = fractionYOf = {}

      fractionYOf[target] = (state.y * target) / (toY() - fromY())
    })(state.config, state.fractionYOf)

    return state
  }
}

export const fractionYOf = pipe(createFractionYUpdaterByMutation, rxMap)
