import { IUnitValue } from '../units'

/**
 * @param viewport default value is `globalThis`
 * 
 * @example
 * ```js
 * const section1Element = document.querySelector('.section--1')
 * 
 * const rightOfSection1Element = rightOf(section1Element)
 * 
 * rightOfSection1Element() // -> section1Element.getBoundingClientRect().right + document.scrollingElement.scrollLeft
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const rightOfAppSection1Element = rightOf(section1Element, appElement)
 * 
 * rightOfSection1Element() // -> section1Element.getBoundingClientRect().right + appElement.scrollLeft
 * ```
 * 
 * @returns a function that returns right of the target element position relative to viewport argument
 */
export function rightOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element
): IUnitValue
