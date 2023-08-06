/**
 * `IGetElement` is a function that returns an **HTML Element**,
 * useful for **locators** to locate the right element
 * 
 * @category Locators
 */
export interface IGetElement { (): globalThis.Element }

/**
 * `Element` is an **HTML Element** or a function that returns an **HTML Element**
 * 
 * @category Locators
 */
export type Element = IGetElement | ReturnType<IGetElement>

/**
 * `IGetViewport` is a function that returns an object that contains scroll positions
 * (`scrollTop` and `scrollLeft` properties)
 * 
 * @category Locators
 */
export interface IGetViewport { (): typeof globalThis | Document | Element }

/**
 * `Viewport` is an object that contains scroll positions,
 * or a function that returns that object
 * 
 * @category Locators
 */
export type Viewport = IGetViewport | ReturnType<IGetViewport>

export * from './max-scroll-y'

export * from './max-scroll-x'

export * from './top-of'

export * from './left-of'

export * from './bottom-of'

export * from './right-of'
