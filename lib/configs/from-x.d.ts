import { listen } from '../listen'
import { config } from './config'
import { toX } from './to-x'
import { fromY } from './from-y'
import { toY } from './to-y'
import { IUnitInput, IUnitValue } from '../units'

/**
 * `fromX` config, defines {@link listen}'s start point in **X** axis
 * by {@link IUnitInput}
 * 
 * @example
 * ```js
 * import { percent, fromX } from 'toomar'
 * 
 * const viewportWidth = percent(() => window.innerWidth)
 * 
 * fromX(viewportWidth(150)) // -> { fromX: viewportWidth(150) }
 * 
 * fromX(500) // -> { fromX: px(500) }
 * ```
 * 
 * @returns an object with `fromX` property that is equal to `value` argument
 * 
 * @see {@link toX}
 * @see {@link fromY}
 * @see {@link toY}
 * @see {@link config}
 * 
 * @category Configs
 */
export function fromX (value: IUnitInput): { fromX: IUnitValue }
