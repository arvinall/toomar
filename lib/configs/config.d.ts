import { MergeAll } from 'ramda/tools'

import { fromY } from './from-y'
import { toY } from './to-y'
import { fromX } from './from-x'
import { toX } from './to-x'
import { scroll } from './scroll'
import { coverEdges } from './cover-edges'
import { uncoverEdges } from './uncover-edges'
import { strictBoundaries } from './strict-boundaries'
import { looseBoundaries } from './loose-boundaries'

type CoverEdges = ReturnType<typeof coverEdges> | ReturnType<typeof uncoverEdges>

type StrictBoundaries = (
  ReturnType<typeof strictBoundaries> |
  ReturnType<typeof looseBoundaries>
)

type Defaults = ReturnType<typeof scroll> & CoverEdges & StrictBoundaries

type FromX = ReturnType<typeof fromX>

type FromY = ReturnType<typeof fromY>

type OrOptionals = FromY | FromX

type AndOptionals = FromY & FromX

type Requireds = ReturnType<typeof toY> | ReturnType<typeof toX>

type ConfigParameters = Array<Requireds | OrOptionals | Partial<Defaults>>

type Config <T extends ConfigParameters> = MergeAll<[
  Defaults, Partial<AndOptionals>, ...T
]>

/**
 * #### Required Configs (Some or all)
 * - {@link configs/to-y.toY}
 * - {@link configs/to-x.toX}
 * 
 * #### Default Configs
 * ##### Unconditionals
 * - {@link configs/scroll.scroll}`(globalThis)`
 * - {@link configs/cover-edges.coverEdges}`()`
 * - {@link configs/strict-boundaries.strictBoundaries}`()`
 * ##### Conditionals
 * - {@link configs/from-y.fromY}`(0)`
 *   > When {@link configs/to-y.toY} exists
 * - {@link configs/from-x.fromX}`(0)`
 *   > When {@link configs/to-x.toX} exists
 * 
 * @example
 * ```js
 * const basedOnInnerHeight = percent(() => window.innerHeight)
 * 
 * config(to(basedOnInnerHeight(150)))
 * // -> {
 * //  ...to(basedOnInnerHeight(150)),
 * //  ...fromY(0),
 * //  ...scroll(globalThis),
 * //  ...coverEdges()
 * //  ...strictBoundaries()
 * // }
 * 
 * const basedOnInnerWidth = percent(() => window.innerWidth)
 * 
 * config(
 *   toX(basedOnInnerWidth(150)),
 *   scroll(document.querySelector('.scrollable-element')),
 *   uncoverEdges(),
 *   looseBoundaries()
 * )
 * // -> {
 * //  ...toX(basedOnInnerWidth(150)),
 * //  ...fromX(0),
 * //  ...scroll(document.querySelector('.scrollable-element')),
 * //  ...uncoverEdges()
 * //  ...looseBoundaries()
 * // }
 * ```
 * 
 * @returns
 * an object that is equivalent to merge of the configs arguments
 * with some conditional and unconditional defaults
 */
export function config <T extends ConfigParameters> (
  ...configs: T | ConfigParameters
): Config<T>
