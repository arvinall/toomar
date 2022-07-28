import { IUnitInput, IUnitValue } from '../units'

/**
 * @example
 * ```js
 * const viewPortSize = percent(() => window.innerHeight)
 * 
 * toY(viewPortSize(150)) // -> { toY: viewPortSize(150), to: viewPortSize(150) }
 * 
 * toY(500) // -> { toY: px(500), to: px(500) }
 * ```
 * 
 * @returns
 * an object with `toY` and `to` properties
 * that both of them are equal to `value` argument
 */
export function toY (value: IUnitInput): { toY: IUnitValue, to: IUnitValue }
