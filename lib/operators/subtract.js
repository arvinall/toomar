import { map, unapply, call, subtract as rSubtract, apply, pipe, partial, curryN } from 'ramda'

import { px } from '../units/px'

const mapPX = map(px)

const unapplyMapPX = unapply(mapPX)

const mapCall = map(call)

const applyRSubtract = apply(rSubtract)

const rSubtractByMapCall = pipe(mapCall, applyRSubtract)

const unapplyPartially = pipe(unapply, partial)

const partialRSubtractByMapCall = unapplyPartially(rSubtractByMapCall)

const _subtract = pipe(unapplyMapPX, partialRSubtractByMapCall)

export const subtract = curryN(2, _subtract)
