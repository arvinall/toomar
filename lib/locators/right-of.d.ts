import { IUnitValue } from '../units'

/**
 * `rightOf` used to locate right position of DOM element
 * relative to the viewport or another element
 * 
 * @example Relative to the document viewport
 * ```js
 * import { rightOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const rightOfSection1Element = rightOf(section1Element)
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
  viewport?: typeof globalThis | Document | Element = globalThis
): IUnitValue
