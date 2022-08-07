import { map, unapply, call, add as rAdd, apply, pipe, partial, curryN } from 'ramda'

import { px } from '../units/px'

const mapPX = map(px)

const unapplyMapPX = unapply(mapPX)

const mapCall = map(call)

const applyRAdd = apply(rAdd)

const rAddByMapCall = pipe(mapCall, applyRAdd)

const unapplyPartially = pipe(unapply, partial)

const partialRAddByMapCall = unapplyPartially(rAddByMapCall)

const _add = pipe(unapplyMapPX, partialRAddByMapCall)

export const add = curryN(2, _add)
