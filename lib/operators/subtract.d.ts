import { IUnitInput, IUnitValue, IUnit } from '../units'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { to } from '../configs/to-y'

/**
 * `subtract` operator used to subtract two {@link IUnitInput}s from each other,
 * useful when you want to make relation between your configs,
 * operators are some kind of {@link IUnit}
 * that used to do operation on other {@link IUnitValue}s
 * 
 * @example
 * ```js
 * import { multiply, to, config, subtract, from, listen } from 'toomar'
 * 
 * const windowInnerHeight = () => window.innerHeight
 * const multiplyBy2 = multiply(2)
 * 
 * const section1Config = config(to(multiplyBy2(windowInnerHeight)))
 * const section2Config = config(
 *   from(subtract(section1Config.to, windowInnerHeight)),
 *   to(multiplyBy2(section1Config.to))
 * )
 * 
 * listen(section1Config).subscribe(({ y }) => console.log(y))
 * listen(section2Config).subscribe(({ y }) => console.log(y))
 * ```
 *  
 * @example subtract two numbers
 * ```js
 * import { subtract } from 'toomar'
 * 
 * subtract(500, 250) // -> () => (500 - 250)
 * ```
 * 
 * @example subtract a IUnitValue from another number
 * ```js
 * import { subtract } from 'toomar'
 * 
 * subtract(() => window.innerHeight, 200) // -> () => (window.innerHeight - 200)
 * ```
 * 
 * @example subtract two IUnitValue by curring
 * ```js
 * import { subtract } from 'toomar'
 * 
 * const subtractFromWindowOuterHeight = subtract(() => window.outerHeight)
 * 
 * subtractFromWindowOuterHeight(() => window.innerHeight)
 * // -> () => (window.outerHeight + window.innerHeight)
 * ```
 * 
 * @returns a function that returns subtraction of `base` and `value` arguments
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Operators
 */
export function subtract (base: IUnitInput, value: IUnitInput): IUnitValue
export function subtract (base: IUnitInput): (value: IUnitInput) => IUnitValue
