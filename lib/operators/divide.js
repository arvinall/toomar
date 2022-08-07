import { map, unapply, call, divide as rDivide, apply, pipe, partial, curryN } from 'ramda'

import { px } from '../units/px'

const mapPX = map(px)

const unapplyMapPX = unapply(mapPX)

const mapCall = map(call)

const applyRDivide = apply(rDivide)

const rDivideByMapCall = pipe(mapCall, applyRDivide)

const unapplyPartially = pipe(unapply, partial)

const partialRDivideByMapCall = unapplyPartially(rDivideByMapCall)

const _divide = pipe(unapplyMapPX, partialRDivideByMapCall)

export const divide = curryN(2, _divide)
