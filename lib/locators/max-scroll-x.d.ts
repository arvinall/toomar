import { maxScrollY } from './max-scroll-y'
import { IUnitValue } from '../units'

/**
 * `maxScrollX` used to locate maximum scroll position in **X** axis
 * based on the viewport or another element
 * 
 * @example Based on the document viewport
 * ```js
 * import { maxScrollX } from 'toomar'
 * 
 * const documentMaxScrollX = maxScrollX()
 * 
 * documentMaxScrollX() // -> (
 * //  document.scrollingElement.scrollWidth -
 * //    document.scrollingElement.clientWidth
 * // )
 * ```
 * 
 * @example Based on the DOM element
 * ```js
 * import { maxScrollX } from 'toomar'
 * 
 * const scrollingElement = document.createElement('div')
 * 
 * const scrollingElementMaxScrollX = maxScrollX(scrollingElement)
 * 
 * scrollingElementMaxScrollX() // -> (
 * //  scrollingElement.scrollWidth - scrollingElement.clientWidth
 * // )
 * ```
 * 
 * @returns a function that returns the maximum scroll position of the source argument in X axis
 * 
 * @see {@link maxScrollY}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element Element}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis globalThis}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document Document}
 * 
 * @category Locators
 */
export function maxScrollX (
  source?: typeof globalThis | Document | Element = globalThis
): IUnitValue
