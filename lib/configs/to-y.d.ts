import { listen } from '../listen'
import { config } from './config'
import { fromY } from './from-y'
import { toX } from './to-x'
import { fromX } from './from-x'
import { IUnitInput, IUnitValue } from '../units'

/**
 * `toY` config, defines {@link listen}'s destination point in **Y** axis
 * by {@link IUnitInput}
 * 
 * @example
 * ```js
 * import { percent, toY } from 'toomar'
 * 
 * const viewPortSize = percent(() => window.innerHeight)
 * 
 * toY(viewPortSize(150)) // -> { toY: viewPortSize(150), to: viewPortSize(150) }
 * 
 * toY(500) // -> { toY: px(500), to: px(500) }
 * ```
 * 
 * @returns
 * an object with `toY` and `to` properties
 * that both of them are equal to `value` argument
 * 
 * @see {@link fromY}
 * @see {@link toX}
 * @see {@link fromX}
 * @see {@link config}
 * 
 * @category Configs
 */
export function toY (value: IUnitInput): { toY: IUnitValue, to: IUnitValue }
