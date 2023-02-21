import { IUnitValue } from '../units'

/**
 * @param source default value is `globalThis`
 * 
 * @returns a function that returns the maximum scroll position of the source argument in X axis
 */
export function maxScrollX (
  source?: typeof globalThis | Document | Element
): IUnitValue
