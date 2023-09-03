import { Element, Viewport } from '.'
import { IUnitValue } from '../units'

/**
 * `rightOf` used to locate right position of DOM element
 * relative to the viewport or another element
 * 
 * `rightOf` wraps its arguments in function when they're not functions
 * 
 * @example Relative to the document viewport
 * ```js
 * import { rightOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const rightOfSection1Element = rightOf(section1Element)
 *   // or rightOf(() => section1Element) when section1Element is not constant
 * 
 * rightOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().right +
 * //    document.scrollingElement.scrollLeft
 * // )
 * ```
 * 
 * @example Relative to the DOM element
 * ```js
 * import { rightOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const rightOfAppSection1Element = rightOf(section1Element, appElement)
 *   // or rightOf(() => section1Element, () => appElement)
 *   // when section1Element or appElement are not constant
 * 
 * rightOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().right + appElement.scrollLeft
 * // )
 * ```
 * 
 * @returns a function that returns right position of the target element relative to the viewport argument
 * 
 * @category Locators
 */
export function rightOf (
  target: Element,
  viewport?: Viewport = globalThis
): IUnitValue
