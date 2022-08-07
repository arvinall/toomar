import type { IUnitInput, IUnitValue, IUnit } from '../units'

/** 
 * @example
 * ```js
 * divide(500, 2) // -> () => (500 / 2)
 * 
 * divide(() => window.innerHeight, 1.5) // -> () => (window.innerHeight / 1.5)
 * 
 * const divideWithInnerHeight divide(() => window.innerHeight)
 * 
 * divideWithInnerHeight(2) // -> () => (window.innerHeight / 2)
 * ```
 * 
 * @returns a function that returns division of `base` and `value` arguments
 */
export function divide (base: IUnitInput, value: IUnitInput): IUnitValue
export function divide (base: IUnitInput): (value: IUnitInput) => IUnitValue
