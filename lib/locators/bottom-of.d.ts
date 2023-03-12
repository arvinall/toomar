import { IUnitValue } from '../units'

/**
 * @param viewport default value is `globalThis`
 * 
 * @example
 * ```js
 * const section1Element = document.querySelector('.section--1')
 * 
 * const bottomOfSection1Element = bottomOf(section1Element)
 * 
 * bottomOfSection1Element() // -> section1Element.getBoundingClientRect().bottom + document.scrollingElement.scrollTop
 * 
 * const appElement = document.querySelector('.app')
 * 
 * const bottomOfAppSection1Element = bottomOf(section1Element, appElement)
 * 
 * bottomOfSection1Element() // -> section1Element.getBoundingClientRect().bottom + appElement.scrollTop
 * ```
 * 
 * @returns a function that returns bottom of the target element position relative to viewport argument
 */
export function bottomOf (
  target: Element,
  viewport?: typeof globalThis | Document | Element
): IUnitValue
