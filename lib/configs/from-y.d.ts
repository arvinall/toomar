import { IUnitInput, IUnitValue } from '../units'

/**
 * @example
 * ```js
 * const viewPortSize = percent(() => window.innerHeight)
 * 
 * fromY(viewPortSize(150)) // -> { fromY: viewPortSize(150), from: viewPortSize(150) }
 * 
 * fromY(500) // -> { fromY: px(500), from: px(500) }
 * ```
 * 
 * @returns
 * an object with `fromY` and `from` properties
 * that both of them are equal to `value` argument
 */
export function fromY (value: IUnitInput): { fromY: IUnitValue, from: IUnitValue }
