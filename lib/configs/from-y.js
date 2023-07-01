import { objOf, juxt, unapply, mergeRight, apply, pipe } from 'ramda'

import { px } from '../units/px'

const objOfFromY = objOf('fromY')

const objOfFrom = objOf('from')

const unapplyJuxt = unapply(juxt)

const objOfsJuxt = unapplyJuxt(objOfFromY, objOfFrom)

const applyMergeRight = apply(mergeRight)

export const fromY = pipe(px, objOfsJuxt, applyMergeRight)

export const from = fromY
