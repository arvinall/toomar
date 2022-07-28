import {
  HasEventTargetAddRemove,
  JQueryStyleEventEmitter,
  EventListenerOptions
} from 'rxjs/internal/observable/fromEvent'
import { Observable as RxObservable } from 'rxjs'

/**
 * @example
 * ```js
 * scroll(window) // -> { scroll: rxjs.fromEvent(window, 'scroll') }
 * 
 * const scrollableElement = document.querySelector('.scrollable-element')
 * 
 * scroll(scrollableElement, { capture: true }) // -> {
 *  // scroll: rxjs.fromEvent(scrollableElement, 'scroll', { capture: true })
 * // }
 * ```
 * 
 * @param value object that emits `scroll` event, HTMLElement or window
 * @param eventListenerOptions same as [EventTarget#addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) argument
 * 
 * @returns
 * an object with `scroll` property that is equal to rxjs observable
 * that generates from `scroll` event of `value` argument
 * 
 * @see [rxjs.Observable](https://rxjs.dev/api/index/class/Observable)
 * @see [rxjs.fromEvent](https://rxjs.dev/api/index/function/fromEvent)
 */
export function scroll (
  value: HasEventTargetAddRemove<Event> | ArrayLike<HasEventTargetAddRemove<Event>>,
  eventListenerOptions?: EventListenerOptions
): { scroll: RxObservable<Event> }
export function scroll (
  value: JQueryStyleEventEmitter<any, Event> | ArrayLike<JQueryStyleEventEmitter<any, Event>>
): { scroll: RxObservable<Event> }
