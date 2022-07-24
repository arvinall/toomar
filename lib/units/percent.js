import { __, divide, call, pipe, partial, unapply, curryN } from 'ramda'

import { em } from './em'

const divideByOneHundred = divide(__, 100)

const emToPercent = pipe(call, divideByOneHundred)

const partiallyUnapply = pipe(partial, unapply)

const partialEMToPercent = partiallyUnapply(emToPercent)

const _percent = pipe(em, partialEMToPercent)

export const percent = curryN(2, _percent)
