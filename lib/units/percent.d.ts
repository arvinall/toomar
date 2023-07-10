import { IUnitInput, IUnitValue, IUnit } from '.'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { fromX } from '../configs/from-x'
import { to } from '../configs/to-y'
import { toX } from '../configs/to-x'

/**
 * `percent` unit is a {@link IUnit},
 * that works just like **CSS** `%` unit,
 * units used to specify beginning and end of {@link listen}'s edges
 * via {@link from}/{@link fromX} and {@link to}/{@link toX}
 * 
 * @example
 * ```js
 * import { percent, to, config, from, add, listen } from 'toomar'
 * 
 * const percentOfInnerHeight = percent(() => window.innerHeight)
 * 
 * const section1Config = config(to(percentOfInnerHeight(100)))
 * const section2Config = config(
 *   from(section1Config.to),
 *   to(add(section1Config.to, percentOfInnerHeight(150)))
 * )
 * 
 * listen(section1Config).subscribe(({ y }) => console.log(y))
 * listen(section2Config).subscribe(({ y }) => console.log(y))
 * ```
 *  
 * @example percentage based on number
 * ```js
 * import { percent } from 'toomar'
 * 
 * percent(850, 50) // -> () => ((850 * 50) / 100)
 * ```
 * 
 * @example percentage based on IUnitValue
 * ```js
 * import { percent } from 'toomar'
 * 
 * percent(() => window.innerHeight, 150) // -> () => ((window.innerHeight * 150) / 100)
 * ```
 * 
 * @example percentage based on IUnitValue by curring
 * ```js
 * import { percent } from 'toomar'
 * 
 * let progress = 50
 * 
 * const percentOfInnerHeight = percent(() => window.innerHeight)
 * 
 * percentOfInnerHeight(() => progress) // -> () => ((window.innerHeight * progress) / 100)
 * ```
 * 
 * @returns a function that returns percentage of `base` argument based on `value` argument
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Units
 */
export function percent (base: IUnitInput, value: IUnitInput): IUnitValue
export function percent (base: IUnitInput): (value: IUnitInput) => IUnitValue
