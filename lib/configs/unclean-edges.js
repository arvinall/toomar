import { objOf, partial, unapply, pipe } from 'ramda'

const objOfCleanEdges = objOf('cleanEdges')

const partiallyUnapply = pipe(partial, unapply)

const partialCleanEdges = partiallyUnapply(objOfCleanEdges)

export const uncleanEdges = partialCleanEdges(false)
