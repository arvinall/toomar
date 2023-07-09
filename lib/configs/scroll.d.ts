import {
  HasEventTargetAddRemove,
  JQueryStyleEventEmitter,
  EventListenerOptions
} from 'rxjs/internal/observable/fromEvent'
import { Observable as RxObservable } from 'rxjs'

import { listen } from '../listen'
import { touchScroll } from './touch-scroll'
import { config } from './config'

/**
 * `ITarget` is an object with `scrollTop` and `scrollLeft` properties
 * 
 * that used to describe scroll state frame
 * 
 * @category Configs/scroll
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
 * 
 * @category Configs/scroll
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
 * 
 * @category Configs/scroll
 */
export interface ICastableRxObservable <T> extends RxObservable <T> {
  /** `__T__` type is equal to `T` type argument */
  __T__: T
}

/**
 * `IScrollConfig` is an object with `scroll` property
 * 
 * @typeParam T type of value that scroll observable observe (`Event` or {@link IEventPresenter})
 * 
 * @category Configs/scroll
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
 * `scroll` config, sets {@link listen}'s source observable to the DOM scroll event
 * 
 * For some Safari versions you need to listen to both `scroll` and `touchmove` events,
 * in that case use {@link touchScroll} config instead
 * 
 * @example
 * ```js
 * import { scroll } from 'toomar'
 * 
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
 * @see [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 * @see [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
 * @see {@link touchScroll}
 * @see {@link config}
 * 
 * @category Configs
 * @category Configs/scroll
 */
export function scroll (
  source: HasEventTargetAddRemove<Event> | ArrayLike<HasEventTargetAddRemove<Event>>,
  eventListenerOptions?: EventListenerOptions
): IScrollConfig
export function scroll (
  source: JQueryStyleEventEmitter<any, Event> | ArrayLike<JQueryStyleEventEmitter<any, Event>>
): IScrollConfig
