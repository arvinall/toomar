import { maxScrollX } from './max-scroll-x'
import { IUnitValue } from '../units'

/**
 * `maxScrollY` used to locate maximum scroll position in **Y** axis
 * based on the viewport or another element
 * 
 * @example Based on the document viewport
 * ```js
 * import { maxScrollY } from 'toomar'
 * 
 * const documentMaxScrollY = maxScrollY()
 * 
 * documentMaxScrollY() // -> (
 * //  document.scrollingElement.scrollHeight -
 * //    document.scrollingElement.clientHeight
 * // )
 * ```
 * 
 * @example Based on the DOM element
 * ```js
 * import { maxScrollY } from 'toomar'
 * 
 * const scrollingElement = document.createElement('div')
 * 
 * const scrollingElementMaxScrollY = maxScrollY(scrollingElement)
 * 
 * scrollingElementMaxScrollY() // -> (
 * //  scrollingElement.scrollHeight - scrollingElement.clientHeight
 * // )
 * ```
 * 
 * @returns a function that returns the maximum scroll position of the source argument in Y axis
 * 
 * @see {@link maxScrollX}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element Element}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis globalThis}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document Document}
 * 
 * @category Locators
 */
export function maxScrollY (
  source?: typeof globalThis | Document | Element = globalThis
): IUnitValue

/**
 * ### Alias for {@link maxScrollY}
 * 
 * @category Locators
 */
export const maxScroll = maxScrollY
