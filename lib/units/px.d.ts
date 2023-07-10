import { IUnitInput, IUnitValue, IUnit } from '.'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { fromX } from '../configs/from-x'
import { to } from '../configs/to-y'
import { toX } from '../configs/to-x'

/**
 * `px` unit is a {@link IUnit},
 * that works just like **CSS** `px` unit,
 * units used to specify beginning and end of {@link listen}'s edges
 * via {@link from}/{@link fromX} and {@link to}/{@link toX}
 *  
 * @example warp a number
 * ```js
 * import { px } from 'toomar'
 * 
 * px(500) // -> () => 500
 * ```
 * 
 * @example warp a function
 * ```js
 * import { px } from 'toomar'
 * 
 * px(() => window.innerHeight) // -> () => window.innerHeight
 * ```
 * 
 * @returns
 * a constant when its value is a number,
 * and a simple wrapper when its value is a {@link IUnitValue}
 * (function that returns a number)
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Units
 */
export function px (value: IUnitInput): IUnitValue
