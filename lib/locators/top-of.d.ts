import { IUnitValue } from '../units'

/**
 * `topOf` used to locate top position of DOM element
 * relative to the viewport or another element
 * 
 * @example Relative to the document viewport
 * ```js
 * import { topOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const topOfSection1Element = topOf(section1Element)
 * 
 * topOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().top +
 * //    document.scrollingElement.scrollTop
 * // )
 * ```
 * 
 * @example Relative to the DOM element
 * ```js
 * import { topOf } from 'toomar'
 * 
 * const section1Element = document.querySelector('.section--1')
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const topOfAppSection1Element = topOf(section1Element, appElement)
 * 
 * topOfSection1Element() // -> (
 * //  section1Element.getBoundingClientRect().top + appElement.scrollTop
 * // )
 * ```
 * 
 * @returns a function that returns top position of the target element relative to the viewport argument
 * 
 * @category Locators
 */
export function topOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element = globalThis
): IUnitValue
