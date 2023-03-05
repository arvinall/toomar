import { IUnitValue } from '../units'

/**
 * @param source default value is `globalThis`
 * 
 * @example
 * ```js
 * const documentMaxScrollY = maxScrollY()
 * 
 * documentMaxScrollY() // -> document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight
 * 
 * const scrollingElement = document.createElement('div')
 * 
 * const scrollingElementMaxScrollY = maxScrollY(scrollingElement)
 * 
 * scrollingElementMaxScrollY() // -> scrollingElement.scrollHeight - scrollingElement.clientHeight
 * ```
 * 
 * @returns a function that returns the maximum scroll position of the source argument in Y axis
 */
export function maxScrollY (
  source?: typeof globalThis | Document | Element
): IUnitValue
