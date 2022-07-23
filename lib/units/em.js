import { map, unapply, multiply, apply, call, pipe, partial, compose, curryN } from 'ramda'

import { px } from './px'

const mapPX = map(px)

const unapplyMapPX = unapply(mapPX)

const mapCall = map(call)

const applyMultiply = apply(multiply)

const multiplyByMapCall = pipe(mapCall, applyMultiply)

const unapplyPartially = compose(partial, unapply)

const partialMultiplyByMapCall = unapplyPartially(multiplyByMapCall)

const _em = pipe(unapplyMapPX, partialMultiplyByMapCall)

export const em = curryN(2, _em)
