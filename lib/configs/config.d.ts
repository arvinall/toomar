import { MergeAll } from 'ramda/tools'

import type { IScrollConfig } from './scroll'

import { fromY } from './from-y'
import { toY } from './to-y'
import { fromX } from './from-x'
import { toX } from './to-x'
import { scroll } from './scroll'
import { coverEdges } from './cover-edges'
import { uncoverEdges } from './uncover-edges'
import { strictBoundaries } from './strict-boundaries'
import { looseBoundaries } from './loose-boundaries'
import { cleanEdges } from './clean-edges'
import { uncleanEdges } from './unclean-edges'

type CoverEdges = ReturnType<typeof coverEdges> | ReturnType<typeof uncoverEdges>

type StrictBoundaries = (
  ReturnType<typeof strictBoundaries> |
  ReturnType<typeof looseBoundaries>
)

type CleanEdges = ReturnType<typeof cleanEdges> | ReturnType<typeof uncleanEdges>

type Defaults = ReturnType<typeof scroll> & CoverEdges & StrictBoundaries & CleanEdges

type FromX = ReturnType<typeof fromX>

type FromY = ReturnType<typeof fromY>

type OrOptionals = FromY | FromX | IScrollConfig<unknown>

type AndOptionals = FromY & FromX & IScrollConfig

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
 * - {@link configs/clean-edges.cleanEdges}`()`
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
 * //  ...coverEdges(),
 * //  ...strictBoundaries(),
 * //  ...cleanEdges()
 * // }
 * 
 * const basedOnInnerWidth = percent(() => window.innerWidth)
 * 
 * config(
 *   toX(basedOnInnerWidth(150)),
 *   scroll(document.querySelector('.scrollable-element')),
 *   uncoverEdges(),
 *   looseBoundaries(),
 *   uncleanEdges()
 * )
 * // -> {
 * //  ...toX(basedOnInnerWidth(150)),
 * //  ...fromX(0),
 * //  ...scroll(document.querySelector('.scrollable-element')),
 * //  ...uncoverEdges(),
 * //  ...looseBoundaries(),
 * //  ...uncleanEdges()
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
