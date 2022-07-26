import { map, unapply, call, multiply, apply, pipe, partial, curryN } from 'ramda'

import { px } from './px'

const mapPX = map(px)

const unapplyMapPX = unapply(mapPX)

const mapCall = map(call)

const applyMultiply = apply(multiply)

const multiplyByMapCall = pipe(mapCall, applyMultiply)

const unapplyPartially = pipe(unapply, partial)

const partialMultiplyByMapCall = unapplyPartially(multiplyByMapCall)

const _em = pipe(unapplyMapPX, partialMultiplyByMapCall)

export const em = curryN(2, _em)
