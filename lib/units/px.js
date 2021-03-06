import { is, always, unless, call, pipe, partial, unapply } from 'ramda'

const { Function, Number } = globalThis

const isFunction = is(Function)

const wrapNonFunction = unless(isFunction, always)

const toNumber = pipe(wrapNonFunction, call, Number)

const partiallyUnapply = pipe(partial, unapply)

export const px = partiallyUnapply(toNumber)
