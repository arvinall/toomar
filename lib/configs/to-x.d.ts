import { listen } from '../listen'
import { config } from './config'
import { fromX } from './from-x'
import { toY } from './to-y'
import { fromY } from './from-y'
import { IUnitInput, IUnitValue } from '../units'

/**
 * `toX` config, defines {@link listen}'s destination point in **X** axis
 * by {@link IUnitInput}
 * 
 * @example
 * ```js
 * import { percent, toX } from 'toomar'
 * 
 * const viewPortWidth = percent(() => window.innerWidth)
 * 
 * toX(viewPortWidth(150)) // -> { toX: viewPortWidth(150) }
 * 
 * toX(500) // -> { toX: px(500) }
 * ```
 * 
 * @returns an object with `toX` property that is equal to `value` argument
 * 
 * @see {@link fromX}
 * @see {@link toY}
 * @see {@link fromY}
 * @see {@link config}
 * 
 * @category Configs
 */
export function toX (value: IUnitInput): { toX: IUnitValue }
