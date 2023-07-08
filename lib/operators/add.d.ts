import { IUnitInput, IUnitValue, IUnit } from '../units'
import { listen } from '../listen'
import { config } from '../configs/config'
import { from } from '../configs/from-y'
import { to } from '../configs/to-y'

/**
 * `add` operator used to add two {@link IUnitInput}s to each other,
 * useful when you want to make relation between your configs,
 * operators are some kind of {@link IUnit}
 * that used to do operation on other {@link IUnitValue}s
 * 
 * @example
 * ```js
 * import { add, to, config, from, listen } from 'toomar'
 * 
 * const windowInnerHeight = () => window.innerHeight
 * const addToWindowInnerHeight = add(windowInnerHeight)
 * 
 * const section1Config = config(to(windowInnerHeight))
 * const section2Config = config(
 *   from(section1Config.to),
 *   to(addToWindowInnerHeight(section1Config.to))
 * )
 * const section3Config = config(
 *   from(section2Config.to),
 *   to(addToWindowInnerHeight(section2Config.to))
 * )
 * 
 * listen(section1Config).subscribe(({ y }) => console.log(y))
 * listen(section2Config).subscribe(({ y }) => console.log(y))
 * listen(section3Config).subscribe(({ y }) => console.log(y))
 * ```
 *  
 * @example add two numbers
 * ```js
 * import { add } from 'toomar'
 * 
 * add(250, 250) // -> () => (250 + 250)
 * ```
 * 
 * @example add a IUnitValue to another number
 * ```js
 * import { add } from 'toomar'
 * 
 * add(() => window.innerHeight, 200) // -> () => (window.innerHeight + 200)
 * ```
 * 
 * @example add two IUnitValue by curring
 * ```js
 * import { add } from 'toomar'
 * 
 * const addToWindowInnerHeight = add(() => window.innerHeight)
 * 
 * addToWindowInnerHeight(() => window.outerHeight)
 * // -> () => (window.innerHeight + window.outerHeight)
 * ```
 * 
 * @returns a function that returns addition of `base` and `value` arguments
 * 
 * @see {@link listen}
 * @see {@link config}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Operators
 */
export function add (base: IUnitInput, value: IUnitInput): IUnitValue
export function add (base: IUnitInput): (value: IUnitInput) => IUnitValue
