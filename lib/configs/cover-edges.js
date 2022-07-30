import { objOf, partial, unapply, pipe } from 'ramda'

const objOfCoverEdges = objOf('coverEdges')

const partiallyUnapply = pipe(partial, unapply)

const partialCoverEdges = partiallyUnapply(objOfCoverEdges)

export const coverEdges = partialCoverEdges(true)
