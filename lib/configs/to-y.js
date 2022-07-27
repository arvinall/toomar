import { objOf, juxt, unapply, mergeRight, apply, pipe } from 'ramda'

import { px } from '../units/px'

const objOfToY = objOf('toY')

const objOfTo = objOf('to')

const unapplyJuxt = unapply(juxt)

const objOfsJuxt = unapplyJuxt(objOfToY, objOfTo)

const applyMergeRight = apply(mergeRight)

export const toY = pipe(px, objOfsJuxt, applyMergeRight)
