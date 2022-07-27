import { IUnitValue } from '../units'

/**
 * @example
 * ```js
 * const viewPortWidth = percent(() => window.innerWidth)
 * 
 * toX(viewPortWidth(150)) // -> { toX: viewPortWidth(150) }
 * 
 * toX(500) // -> { toX: px(500) }
 * ```
 * 
 * @returns an object with `toX` property that is equal to `value` argument
 */
export function toX (value: IUnitValue): { toX: IUnitValue }
