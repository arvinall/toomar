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

import { listen } from '../listen'

/** @category Configs/config */
type CoverEdges = ReturnType<typeof coverEdges> | ReturnType<typeof uncoverEdges>

/** @category Configs/config */
type StrictBoundaries = (
  ReturnType<typeof strictBoundaries> |
  ReturnType<typeof looseBoundaries>
)

/** @category Configs/config */
type CleanEdges = ReturnType<typeof cleanEdges> | ReturnType<typeof uncleanEdges>

/** @category Configs/config */
type Defaults = ReturnType<typeof scroll> & CoverEdges & StrictBoundaries & CleanEdges

/** @category Configs/config */
type FromX = ReturnType<typeof fromX>

/** @category Configs/config */
type FromY = ReturnType<typeof fromY>

/** @category Configs/config */
type OrOptionals = FromY | FromX | IScrollConfig<unknown>

/** @category Configs/config */
type AndOptionals = FromY & FromX & IScrollConfig

/** @category Configs/config */
type Requireds = ReturnType<typeof toY> | ReturnType<typeof toX>

/** @category Configs/config */
type ConfigParameters = Array<Requireds | OrOptionals | Partial<Defaults>>

/** @category Configs/config */
type Config <T extends ConfigParameters> = MergeAll<[
  Defaults, Partial<AndOptionals>, ...T
]>

/**
 * `config` used to create {@link listen}'s config object,
 * similar to `Object.assign` used to merge object arguments
 * with some conditional and unconditional defaults
 * 
 * ### Required Configs (Some or all)
 * - {@link toY}
 * - {@link toX}
 * 
 * ### Default Configs
 * #### Unconditionals
 * - {@link scroll}`(globalThis)`
 * - {@link coverEdges}`()`
 * - {@link strictBoundaries}`()`
 * - {@link cleanEdges}`()`
 * 
 * #### Conditionals
 * - {@link fromY}`(0)`
 *   > When {@link toY} exists
 * - {@link fromX}`(0)`
 *   > When {@link toX} exists
 * 
 * @example
 * ```js
 * import { percent, to, config } from 'toomar'
 * 
 * const basedOnInnerHeight = percent(() => window.innerHeight)
 * 
 * config(to(basedOnInnerHeight(150))) // -> {
 * //  ...to(basedOnInnerHeight(150)),
 * //  ...fromY(0),
 * //  ...scroll(globalThis),
 * //  ...coverEdges(),
 * //  ...strictBoundaries(),
 * //  ...cleanEdges()
 * // }
 * ```
 * 
 * @example
 * ```js
 * import {
 *   percent, toX, scroll,
 *   uncoverEdges, looseBoundaries,
 *   uncleanEdges, config
 * } from 'toomar'
 * 
 * const basedOnInnerWidth = percent(() => window.innerWidth)
 * 
 * config(
 *   toX(basedOnInnerWidth(150)),
 *   scroll(document.querySelector('.scrollable-element')),
 *   uncoverEdges(),
 *   looseBoundaries(),
 *   uncleanEdges()
 * ) // -> {
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
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign Object.assign}
 * @see {@link listen}
 * 
 * @category Configs
 * @category Configs/config
 */
export function config <T extends ConfigParameters> (
  ...configs: T | ConfigParameters
): Config<T>
