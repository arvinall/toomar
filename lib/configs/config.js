import { mergeAll, unapply, partial, pipe, has, when } from 'ramda'

import { fromY } from './from-y.js'
import { fromX } from './from-x.js'
import { scroll } from './scroll.js'
import { coverEdges } from './cover-edges.js'
import { strictBoundaries } from './strict-boundaries.js'
import { cleanEdges } from './clean-edges.js'

const merge = unapply(mergeAll)

const partiallyUnapply = pipe(partial, unapply)

const partialMerge = partiallyUnapply(merge)

const mergeDefaults = partialMerge(
  scroll(globalThis),
  coverEdges(),
  strictBoundaries(),
  cleanEdges()
)

const mergeConditionalDefaults = pipe(
  when(has('toY'), partialMerge(fromY(0))),
  when(has('toX'), partialMerge(fromX(0)))
)

export const config = pipe(mergeDefaults, mergeConditionalDefaults)
