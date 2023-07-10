import { IUnitInput, IUnitValue, IUnit } from '.'
import { multiply } from '../operators/multiply'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { fromX } from '../configs/from-x'
import { to } from '../configs/to-y'
import { toX } from '../configs/to-x'

/**
 * `em` unit is a {@link IUnit}, equivalent to {@link multiply} operator,
 * works just like **CSS** `em` unit,
 * units used to specify beginning and end of {@link listen}'s edges
 * via {@link from}/{@link fromX} and {@link to}/{@link toX}
 * 
 * @example
 * ```js
 * import { em, to, config, from, add, listen } from 'toomar'
 * 
 * const rem = em(
 *   () => getComputedStyle(document.documentElement).fontSize.slice(0, -2)
 * )
 * 
 * const windowInnerHeight = () => window.innerHeight
 * 
 * const section1Config = config(to(windowInnerHeight))
 * const section2Config = config(
 *   from(section1Config.to),
 *   to(add(section1Config.to, rem(66)))
 * )
 * 
 * listen(section1Config).subscribe(({ y }) => console.log(y))
 * listen(section2Config).subscribe(({ y }) => console.log(y))
 * ```
 *  
 * @example multiply two numbers
 * ```js
 * import { em } from 'toomar'
 * 
 * em(2, 250) // -> () => (2 * 250)
 * ```
 * 
 * @example multiply a IUnitValue by another number
 * ```js
 * import { em } from 'toomar'
 * 
 * em(() => window.innerHeight, 2) // -> () => (window.innerHeight * 2)
 * ```
 * 
 * @example multiply two IUnitValue by curring
 * ```js
 * import { em } from 'toomar'
 * 
 * const rem = em(
 *   () => getComputedStyle(document.documentElement).fontSize.slice(0, -2)
 * )
 * 
 * rem(() => window.innerHeight) // -> () => (
 * //  Number(getComputedStyle(document.documentElement).fontSize.slice(0, -2)) *
 * //    window.innerHeight
 * // )
 * ```
 * 
 * @returns a function that returns multiply of `base` and `value` arguments
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Units
 */
export function em (base: IUnitInput, value: IUnitInput): IUnitValue
export function em (base: IUnitInput): (value: IUnitInput) => IUnitValue
