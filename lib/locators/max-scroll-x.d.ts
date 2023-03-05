import { IUnitValue } from '../units'

/**
 * @param source default value is `globalThis`
 * 
 * @example
 * ```js
 * const documentMaxScrollX = maxScrollX()
 * 
 * documentMaxScrollX() // -> document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth
 * 
 * const scrollingElement = document.createElement('div')
 * 
 * const scrollingElementMaxScrollX = maxScrollX(scrollingElement)
 * 
 * scrollingElementMaxScrollX() // -> scrollingElement.scrollWidth - scrollingElement.clientWidth
 * ```
 * 
 * @returns a function that returns the maximum scroll position of the source argument in X axis
 */
export function maxScrollX (
  source?: typeof globalThis | Document | Element
): IUnitValue
