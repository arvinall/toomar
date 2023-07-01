import { listen } from '../listen'
import { config } from './config'
import { toY } from './to-y'
import { fromX } from './from-x'
import { toX } from './to-x'
import { IUnitInput, IUnitValue } from '../units'

/**
 * `fromY` config, defines {@link listen}'s start point in **Y** axis
 * by {@link IUnitInput}
 * 
 * @example
 * ```js
 * import { percent, fromY } from 'toomar'
 * 
 * const viewportHeight = percent(() => window.innerHeight)
 * 
 * fromY(viewportHeight(150)) // -> {
 * //  fromY: viewportHeight(150),
 * //  from: viewportHeight(150)
 * // }
 * 
 * fromY(500) // -> { fromY: px(500), from: px(500) }
 * ```
 * 
 * @returns
 * an object with `fromY` and `from` properties
 * that both of them are equal to `value` argument
 * 
 * @see {@link toY}
 * @see {@link fromX}
 * @see {@link toX}
 * @see {@link config}
 * 
 * @category Configs
 */
export function fromY (value: IUnitInput): { fromY: IUnitValue, from: IUnitValue }

/**
 * ### Alias for {@link fromY}
 * 
 * @category Configs
 */
export const from = fromY
