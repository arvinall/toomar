import {
  HasEventTargetAddRemove,
  JQueryStyleEventEmitter,
  EventListenerOptions
} from 'rxjs/internal/observable/fromEvent'

import type { ITarget, IEventPresenter, IScrollConfig } from './scroll'

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options EventTarget#addEventListener options} */
interface ITouchScrollEventListenersOptions {
  touchOptions?: EventListenerOptions
  scrollOptions?: EventListenerOptions
}

type ITouchScrollConfig = IScrollConfig<
  IEventPresenter<HTMLElement, TouchEvent | Event>
>

/**
 * @example
 * ```js
 * touchScroll(window) // -> {
 * //  scroll: rxjs.merge(
 * //    rxjs.fromEvent(window, 'touchmove'),
 * //    rxjs.fromEvent(window, 'scroll')
 * //  ).pipe(
 * //    rxjs.filter(// filter duplicates)
 * //  )
 * // }
 * 
 * const scrollableElement = document.querySelector('.scrollable-element')
 * 
 * touchScroll(
 *   scrollableElement,
 *   { touchOptions: { passive: false }, scrollOptions: { capture: true } }
 * ) // -> {
 * //  scroll: rxjs.merge(
 * //    rxjs.fromEvent(scrollableElement, 'touchmove', { passive: false }),
 * //    rxjs.fromEvent(scrollableElement, 'scroll', { capture: true })
 * //  ).pipe(
 * //    rxjs.filter(// filter duplicates)
 * //  )
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
