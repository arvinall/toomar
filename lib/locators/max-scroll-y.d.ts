import { IUnitValue } from '../units'

/**
 * @param source default value is `globalThis`
 * 
 * @returns a function that returns the maximum scroll position of the source argument in Y axis
 */
export function maxScrollY (
  source?: typeof globalThis | Document | Element
): IUnitValue
