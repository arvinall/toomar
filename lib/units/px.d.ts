import type { IUnitInput, IUnitValue, IUnit } from '.'

/** 
 * @example
 * ```js
 * px(500) // -> () => 500
 * px(() => window.innerHeight) // -> () => window.innerHeight
 * ```
 * 
 * @returns
 *   a constant when its value is a number,
 *   and a simple wrapper when its value is a function that returns a number
 */
export function px (value: IUnitInput): IUnitValue
