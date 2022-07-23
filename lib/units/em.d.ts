import type { IUnitInput, IUnitValue, IUnit } from '.'

/** 
 * @example
 * ```js
 * em(250, 2) // -> () => (250 * 2)
 * 
 * em(() => window.innerHeight, .75) // -> () => (window.innerHeight * .75)
 * 
 * const innerHeightBasedEM em(() => window.innerHeight)
 * 
 * innerHeightBasedEM(.25) // -> () => (window.innerHeight * .25)
 * ```
 * 
 * @returns a function that returns multiply of `base` and `value` arguments
 */
export function em (base: IUnitInput, value: IUnitInput): IUnitValue
export function em (base: IUnitInput): (value: IUnitInput) => IUnitValue
