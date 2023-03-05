import { IUnitValue } from '../units'

/**
 * @param viewport default value is `globalThis`
 * 
 * @example
 * ```js
 * const section1Element = document.querySelector('.section--1')
 * 
 * const topOfSection1Element = topOf(section1Element)
 * 
 * topOfSection1Element() // -> section1Element.getBoundingClientRect().top + document.scrollingElement.scrollTop
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const topOfAppSection1Element = topOf(section1Element, appElement)
 * 
 * topOfSection1Element() // -> section1Element.getBoundingClientRect().top + appElement.scrollTop
 * ```
 * 
 * @returns a function that returns top of the target element position relative to viewport argument
 */
export function topOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element
): IUnitValue
