import { IUnitInput, IUnitValue, IUnit } from '../units'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { to } from '../configs/to-y'

/**
 * `divide` operator used to divide two {@link IUnitInput}s by each other,
 * useful when you want to make relation between your configs,
 * operators are some kind of {@link IUnit}
 * that used to do operation on other {@link IUnitValue}s
 * 
 * @example
 * ```js
 * import { to, config, divide, from, multiply, listen } from 'toomar'
 * 
 * const windowInnerHeight = () => window.innerHeight
 * 
 * const section1Config = config(to(windowInnerHeight))
 * const section2Config = config(
 *   from(divide(section1Config.to, 2)),
 *   to(multiply(section1Config.to, 2))
 * )
 * 
 * listen(section1Config).subscribe(({ y }) => console.log(y))
 * listen(section2Config).subscribe(({ y }) => console.log(y))
 * ```
 *  
 * @example divide two numbers
 * ```js
 * import { divide } from 'toomar'
 * 
 * divide(1080, 2) // -> () => (1080 / 2)
 * ```
 * 
 * @example divide a IUnitValue by another number
 * ```js
 * import { divide } from 'toomar'
 * 
 * divide(() => window.innerHeight, 4) // -> () => (window.innerHeight / 4)
 * ```
 * 
 * @example divide two IUnitValue by curring
 * ```js
 * import { divide } from 'toomar'
 * 
 * const divideByWindowOuterHeight = divide(() => window.outerHeight)
 * 
 * divideByWindowOuterHeight(() => window.innerHeight)
 * // -> () => (window.outerHeight / window.innerHeight)
 * ```
 * 
 * @returns a function that returns division of `base` and `value` arguments
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Operators
 */
export function divide (base: IUnitInput, value: IUnitInput): IUnitValue
export function divide (base: IUnitInput): (value: IUnitInput) => IUnitValue
