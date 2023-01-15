import {
  HasEventTargetAddRemove,
  JQueryStyleEventEmitter,
  EventListenerOptions
} from 'rxjs/internal/observable/fromEvent'
import { Observable as RxObservable } from 'rxjs'

/**
 * `ITarget` is an object with `scrollTop` and `scrollLeft` properties
 * 
 * that used to describe scroll state frame
 */
export interface ITarget {
  scrollTop: number
  scrollLeft: number
}

/**
 * `IEventPresenter` is an object with `target` property
 * 
 * that can used instead of scroll event when source of scroll is not an `EventTarget`
 * 
 * @typeParam T `target`
 * @typeParam E `realEvent`
 */
export interface IEventPresenter <T extends ITarget = ITarget, E = undefined> {
  target: T

  /** `realEvent` optional property used when source of scroll is another event */
  realEvent: E
}

/**
 * `ICastableRxObservable` is equivalent to `rxjs.Observable`
 * 
 * with just one more special typescript-only property
 * 
 * @see [rxjs.Observable](https://rxjs.dev/api/index/class/Observable)
 */
interface ICastableRxObservable <T> extends RxObservable <T> {
  /** `__T__` type is equal to `T` type argument */
  __T__: T
}

/**
 * `IScrollConfig` is an object with `scroll` property
 * 
 * @typeParam T type of value that scroll observable observe (`Event` or {@link IEventPresenter})
 */
export interface IScrollConfig <
  T extends Event | IEventPresenter<unknown, unknown> = Event
> {
  /**
   * `scroll` is an `rxjs.Observable` when `T` is `Event`
   * or a `ICastableRxObservable` when it is not
  */
  scroll: T extends Event ? RxObservable<Event> : ICastableRxObservable<T>
}

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
 * @param source `EventTarget` that emits `scroll` event, `HTMLElement` or `window`
 * @param eventListenerOptions same as [EventTarget#addEventListener options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) argument
 * 
 * @returns
 * an object with `scroll` property that is equal to rxjs observable
 * that generates from `scroll` event of `source` argument
 * 
 * @see [rxjs.Observable](https://rxjs.dev/api/index/class/Observable)
 * @see [rxjs.fromEvent](https://rxjs.dev/api/index/function/fromEvent)
 */
export function scroll (
  source: HasEventTargetAddRemove<Event> | ArrayLike<HasEventTargetAddRemove<Event>>,
  eventListenerOptions?: EventListenerOptions
): IScrollConfig
export function scroll (
  source: JQueryStyleEventEmitter<any, Event> | ArrayLike<JQueryStyleEventEmitter<any, Event>>
): IScrollConfig
