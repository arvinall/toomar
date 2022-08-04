import { mergeAll, unapply, partial, pipe, has, when } from 'ramda'

import { fromY } from './from-y'
import { fromX } from './from-x'
import { scroll } from './scroll'
import { coverEdges } from './cover-edges'

const merge = unapply(mergeAll)

const partiallyUnapply = pipe(partial, unapply)

const partialMerge = partiallyUnapply(merge)

const mergeDefaults = partialMerge(
  scroll(globalThis),
  coverEdges()
)

const mergeConditionalDefaults = pipe(
  when(has('toY'), partialMerge(fromY(0))),
  when(has('toX'), partialMerge(fromX(0)))
)

export const config = pipe(mergeDefaults, mergeConditionalDefaults)
