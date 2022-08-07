import type { IUnitInput, IUnitValue, IUnit } from '../units'

/** 
 * @example
 * ```js
 * add(250, 250) // -> () => (250 + 250)
 * 
 * add(() => window.innerHeight, 200) // -> () => (window.innerHeight + 200)
 * 
 * const addToInnerHeight add(() => window.innerHeight)
 * 
 * addToInnerHeight(125) // -> () => (window.innerHeight + 125)
 * ```
 * 
 * @returns a function that returns addition of `base` and `value` arguments
 */
export function add (base: IUnitInput, value: IUnitInput): IUnitValue
export function add (base: IUnitInput): (value: IUnitInput) => IUnitValue
