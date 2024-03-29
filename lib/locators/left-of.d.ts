import { Element, Viewport } from '.'
import { topOf } from './top-of'
import { rightOf } from './right-of'
import { bottomOf } from './bottom-of'
import { IUnitValue } from '../units'

/**
 * `leftOf` used to locate left position of DOM element
 * relative to the viewport or another element
 * 
 * `leftOf` wraps its arguments in function when they're not functions
 * 
 * @example Relative to the document viewport
 * ```js
 * import { leftOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const leftOfSection1Element = leftOf(section1Element)
 *   // or leftOf(() => section1Element) when section1Element is not constant
 * 
 * leftOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().left +
 * //    document.scrollingElement.scrollLeft
 * // )
 * ```
 * 
 * @example Relative to the DOM element
 * ```js
 * import { leftOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const leftOfAppSection1Element = leftOf(section1Element, appElement)
 *   // or leftOf(() => section1Element, () => appElement)
 *   // when section1Element or appElement are not constant
 * 
 * leftOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().left + appElement.scrollLeft
 * // )
 * ```
 * 
 * @returns a function that returns left position of the target element relative to the viewport argument
 * 
 * @see {@link topOf}
 * @see {@link rightOf}
 * @see {@link bottomOf}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element Element}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis globalThis}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document Document}
 * 
 * @category Locators
 */
export function leftOf (
  target: Element,
  viewport?: Viewport = globalThis
): IUnitValue
