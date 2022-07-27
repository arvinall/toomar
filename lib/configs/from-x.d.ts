import { IUnitValue } from '../units'

/**
 * @example
 * ```js
 * const viewPortWidth = percent(() => window.innerWidth)
 * 
 * fromX(viewPortWidth(150)) // -> { fromX: viewPortWidth(150) }
 * 
 * fromX(500) // -> { fromX: px(500) }
 * ```
 * 
 * @returns an object with `fromX` property that is equal to `value` argument
 */
export function fromX (value: IUnitValue): { fromX: IUnitValue }
