import type { IUnitInput, IUnitValue, IUnit } from '../units'

/** 
 * @example
 * ```js
 * subtract(750, 250) // -> () => (750 - 250)
 * 
 * subtract(() => window.innerHeight, 250) // -> () => (window.innerHeight - 250)
 * 
 * const subtractFromInnerHeight subtract(() => window.innerHeight)
 * 
 * subtractFromInnerHeight(125) // -> () => (window.innerHeight - 125)
 * ```
 * 
 * @returns a function that returns subtraction of `base` and `value` arguments
 */
export function subtract (base: IUnitInput, value: IUnitInput): IUnitValue
export function subtract (base: IUnitInput): (value: IUnitInput) => IUnitValue
