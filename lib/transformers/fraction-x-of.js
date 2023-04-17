import { map as rxMap } from 'rxjs'

import { pipe } from 'ramda'

function createFractionXUpdaterByMutation (target) {
  return function updateFractionXByMutation (state) {
    ;(function mutateFractionX ({ toX, fromX }, fractionXOf) {
      if (!fractionXOf) state.fractionXOf = fractionXOf = {}

      fractionXOf[target] = (state.x * target) / (toX() - fromX())
    })(state.config, state.fractionXOf)

    return state
  }
}

export const fractionXOf = pipe(createFractionXUpdaterByMutation, rxMap)
