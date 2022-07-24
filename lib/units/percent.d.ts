import type { IUnitInput, IUnitValue, IUnit } from '.'

/** 
 * @example
 * ```js
 * percent(250, 200) // -> () => ((250 * 200) / 100)
 * 
 * percent(() => window.innerHeight, 75) // -> () => ((window.innerHeight * 75) / 100)
 * 
 * const innerHeightBasedPCT percent(() => window.innerHeight)
 * 
 * innerHeightBasedPCT(25) // -> () => ((window.innerHeight * 25) / 100)
 * ```
 * 
 * @returns a function that returns percentage of `base` argument based on `value` argument
 */
export function percent (base: IUnitInput, value: IUnitInput): IUnitValue
export function percent (base: IUnitInput): (value: IUnitInput) => IUnitValue
