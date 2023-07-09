import {
  HasEventTargetAddRemove,
  JQueryStyleEventEmitter,
  EventListenerOptions
} from 'rxjs/internal/observable/fromEvent'

import { IEventPresenter, IScrollConfig, scroll } from './scroll'
import { listen } from '../listen'
import { config } from './config'

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options EventTarget#addEventListener options}
 *
 * @category Configs/touchScroll
 */
export interface ITouchScrollEventListenersOptions {
  touchOptions?: EventListenerOptions
  scrollOptions?: EventListenerOptions
}

/** @category Configs/touchScroll */
export type ITouchScrollConfig = IScrollConfig<
  IEventPresenter<HTMLElement, TouchEvent | Event>
>

/**
 * `touchScroll` config, sets {@link listen}'s source observable to the DOM `scroll` and `touchmove` events
 * 
 * Useful for some Safari versions that you need to listen to both `scroll` and `touchmove` events
 * 
 * @example
 * ```js
 * import { touchScroll } from 'toomar'
 * 
 * touchScroll(window) // -> {
 * //  scroll: rxjs.merge(
 * //    rxjs.fromEvent(document.scrollingElement, 'touchmove'),
 * //    rxjs.fromEvent(document.scrollingElement, 'scroll')
 * //  ).pipe(rxjs.filter()) // filter duplicates
 * // }
 * ```
 * 
 * @example
 * ```js
 * import { touchScroll } from 'toomar'
 * 
 * const scrollableElement = (
 *   document.querySelector('.scrollable-element')
 * )
 * 
 * touchScroll(
 *   scrollableElement,
 *   {
 *     touchOptions: { passive: false },
 *     scrollOptions: { capture: true }
 *   }
 * ) // -> {
 * //  scroll: rxjs.merge(
 * //    rxjs.fromEvent(
 * //      scrollableElement,
 * //      'touchmove',
 * //      { passive: false }
 * //    ),
 * //    rxjs.fromEvent(
 * //      scrollableElement,
 * //      'scroll',
 * //      { capture: true }
 * //    )
 * //  ).pipe(rxjs.filter()) // filter duplicates
 * // }
 * ```
 * 
 * @param source `EventTarget` that emits `touchmove` and `scroll` events, `HTMLElement` or `window`
 * 
 * @returns
 * an object with `scroll` property that is an rxjs observable
 * that generates from merge of `touchmove` and `scroll` events of `source` argument
 * without duplications
 * 
 * @see [rxjs.Observable](https://rxjs.dev/api/index/class/Observable)
 * @see [rxjs.fromEvent](https://rxjs.dev/api/index/function/fromEvent)
 * @see {@link scroll}
 * @see {@link config}
 * 
 * @category Configs
 * @category Configs/touchScroll
 */
export function touchScroll (
  source: (
    HasEventTargetAddRemove<TouchEvent | Event> |
      ArrayLike<HasEventTargetAddRemove<TouchEvent | Event>>
  ),
  eventListenersOptions?: ITouchScrollEventListenersOptions
): ITouchScrollConfig
export function touchScroll (
  source: (
    JQueryStyleEventEmitter<any, TouchEvent | Event> |
      ArrayLike<JQueryStyleEventEmitter<any, TouchEvent | Event>>
  )
): ITouchScrollConfig
