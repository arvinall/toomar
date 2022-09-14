import { objOf, partial, unapply, pipe } from 'ramda'

const objOfStrictBoundaries = objOf('strictBoundaries')

const partiallyUnapply = pipe(partial, unapply)

const partialStrictBoundaries = partiallyUnapply(objOfStrictBoundaries)

export const strictBoundaries = partialStrictBoundaries(true)
