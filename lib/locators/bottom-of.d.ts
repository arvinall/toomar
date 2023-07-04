import { rightOf } from './right-of'
import { topOf } from './top-of'
import { rightOf } from './right-of'
import { IUnitValue } from '../units'

/**
 * `bottomOf` used to locate bottom position of DOM element
 * relative to the viewport or another element
 * 
 * @example Relative to the document viewport
 * ```js
 * import { bottomOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const bottomOfSection1Element = bottomOf(section1Element)
 * 
 * bottomOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().bottom +
 * //    document.scrollingElement.scrollTop
 * // )
 * ```
 * 
 * @example Relative to the DOM element
 * ```js
 * import { bottomOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const bottomOfAppSection1Element = bottomOf(section1Element, appElement)
 * 
 * bottomOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().bottom + appElement.scrollTop
 * // )
 * ```
 * 
 * @returns a function that returns bottom position of the target element relative to the viewport argument
 * 
 * @see {@link rightOf}
 * @see {@link topOf}
 * @see {@link rightOf}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element Element}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis globalThis}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document Document}
 * 
 * @category Locators
 */
export function bottomOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element = globalThis
): IUnitValue
