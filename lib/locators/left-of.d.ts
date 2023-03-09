import { IUnitValue } from '../units'

/**
 * @param viewport default value is `globalThis`
 * 
 * @example
 * ```js
 * const section1Element = document.querySelector('.section--1')
 * 
 * const leftOfSection1Element = leftOf(section1Element)
 * 
 * leftOfSection1Element() // -> section1Element.getBoundingClientRect().left + document.scrollingElement.scrollLeft
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const leftOfAppSection1Element = leftOf(section1Element, appElement)
 * 
 * leftOfSection1Element() // -> section1Element.getBoundingClientRect().left + appElement.scrollLeft
 * ```
 * 
 * @returns a function that returns left of the target element position relative to viewport argument
 */
export function leftOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element
): IUnitValue
