import { is, always, unless, call, pipe, partial, unapply } from 'ramda'

const { Function, Number } = globalThis

const isFunction = is(Function)

const wrapNonFunction = unless(isFunction, always)

const toNumber = pipe(call, Number)

const partiallyUnapply = pipe(partial, unapply)

const partialToNumber = partiallyUnapply(toNumber)

export const px = pipe(wrapNonFunction, partialToNumber)
