import { Observable as RxObservable } from 'rxjs'

import { config, Requireds } from './configs/config'
import { toY, to } from './configs/to-y'
import { toX } from './configs/to-x'
import { scroll, IEventPresenter, IScrollConfig } from './configs/scroll'
import { touchScroll } from './configs/touch-scroll'
import { from } from './configs/from-y'
import { fromX } from './configs/from-x'
import { looseBoundaries } from './configs/loose-boundaries'
import { strictBoundaries } from './configs/strict-boundaries'
import { coverEdges } from './configs/cover-edges'
import { uncoverEdges } from './configs/uncover-edges'
import { cleanEdges } from './configs/clean-edges'
import { uncleanEdges } from './configs/unclean-edges'
import { auditAnimationFrame } from './schedulers/audit-animation-frame'
import { fractionOf } from './transformers/fraction-y-of'
import { fractionXOf } from './transformers/fraction-x-of'

/** @category listen */
export type ReturnTypeOfConfig = ReturnType<typeof config>

/** @category listen */
export type ToY = ReturnType<typeof toY>
/** @category listen */
export type ToX = ReturnType<typeof toX>

/** @category listen */
export type ToYAndToX = ToY & ToX

/** @category listen */
export type TypeOfRxObservable <T> = (
  T extends RxObservable<Event>
    ? Event
    : T['__T__']
)

/** @category listen */
export type TargetOfRxObservable <T> = (
  T extends RxObservable<Event>
    ? HTMLElement
    : T['__T__']['target']
)

/** @category listen */
export interface IBaseState <T> {
  config: T,
  event: TypeOfRxObservable<T['scroll']>,
  targetElement: TargetOfRxObservable<T['scroll']>
}

/** @category listen */
export interface IYState <T> extends IBaseState <T> { y: number }

/** @category listen */
export interface IXState <T> extends IBaseState <T> { x: number }

/** @category listen */
export type YStateAndXState <T> = IYState<T> & IXState<T>

/** @category listen */
export type State <T> = (
  T extends ToYAndToX
    ? YStateAndXState<T>
    : (
      T extends ToY
        ? IYState<T>
        : IXState<T>
    )
)

/**
 * `listen` standalone, used to spy scroll based on its {@link config},
 * `listen` use rxjs observable as its scroll source
 * 
 * `listen` filters the source observable
 * to ensure you get it just when its in the range,
 * beginning of the range defines by {@link from} and {@link fromX},
 * and end of the range defines by {@link to} and {@link toX},
 * 
 * `listen` emits an object as state on each iteration
 * that contains `y` and/or `x` properties,
 * which their values are `number`,
 * that is between `0` and maximum scroll position
 * (({@link to} or {@link toX}) - ({@link from} or {@link fromX}))
 * 
 * To get the data that satisfy your needs,
 * for example a number between `0` and `1` to change a element opacity,
 * or `0` to `180` to rotate a element,
 * or `0` to `100` to show progress bar,
 * use {@link fractionOf} or {@link fractionXOf} transformers
 * 
 * You can define ranges in both **Y** and **X** axes,
 * `listen` handles ranges strictly by {@link strictBoundaries} config,
 * with configs like {@link looseBoundaries} you can define
 * how `listen` should handle the ranges
 * 
 * By default `listen` covers its edges by {@link coverEdges} config,
 * and cleans the edges by {@link cleanEdges} config,
 * you can disable it by {@link uncoverEdges} and {@link uncleanEdges}
 * 
 * Highly recommended to use {@link auditAnimationFrame} scheduler,
 * when animating elements
 * 
 * @remarks
 * To spy scroll of a DOM element
 * you can pass that element to the {@link scroll} config
 * 
 * For better positioning of the ranges, use
 * **Units**, **Operators** and **Locators**
 * 
 * To get the right data that satisfy your needs use **Transformers**
 * 
 * To organize your subscriber calls use **Schedulers**
 * 
 * To avoid duplications or other customizations use **Filters**
 * 
 * For more advanced usages
 * create custom observables like {@link touchScroll},
 * `listen` is not limited to the DOM `scroll` event,
 * you can do anything that you want
 * by just make observables that follows scroll event model
 * by {@link IEventPresenter} and {@link IScrollConfig}
 * 
 * @example rotate by 90deg an element in Y axis
 * ```js
 * import {
 *   topOf, from,
 *   bottomOf, to,
 *   config, listen,
 *   fractionOf, auditAnimationFrame
 * } from 'toomar'
 * 
 * const section1 = document.querySelector('.section--1')
 * const rotatableElement = document.querySelector('.rotatable-element')
 * 
 * listen(config(
 *   from(topOf(section1)), to(bottomOf(section1))
 * )).pipe(
 *   fractionOf(90), auditAnimationFrame()
 * ).subscribe(({
 *   fractionOf: { 90: rotate }
 * }) => {
 *   rotatableElement.style.transform = `rotate(${rotate}deg)`
 * })
 * ```
 * 
 * @example 0 to 400 in Y axis
 * ```js
 * import { to, config, listen } from 'toomar'
 * 
 * listen(config(to(400))).subscribe(
 *   ({ y }) => y // y is a number between 0 and 400
 * )
 * ```
 * 
 * @example 200 to 600 in Y axis
 * ```js
 * import { to, from, config, listen } from 'toomar'
 * 
 * listen(config(from(200), to(600))).subscribe(
 *   ({ y }) => y // y is a number between 0 and 400 (600 - 200)
 * )
 * ```
 * 
 * @example 100 to 500 in X axis
 * ```js
 * import { toX, fromX, config, listen } from 'toomar'
 * 
 * listen(config(fromX(100), toX(500))).subscribe(
 *   ({ x }) => x // x is a number between 0 and 400 (500 - 100)
 * )
 * ```
 * 
 * @example 100 to 500 in X axis
 * ```js
 * import { toX, fromX, to, from, config, listen } from 'toomar'
 * 
 * listen(config(
 *   from(100), to(500),
 *   fromX(100), toX(500)
 * )).subscribe(({ y, x }) => {
 *   y // y is a number between 0 and 400 (500 - 100)
 *   x // x is a number between 0 and 400 (500 - 100)
 * })
 * ```
 * 
 * @returns
 * an rxjs observable that use config `scroll` observable,
 * with config based filter and mapper,
 * that creates and observe next {@link State}
 * 
 * @see {@link config}
 * @see [rxjs.Observable](https://rxjs.dev/api/index/class/Observable)
 * 
 * @category listen
 */
export function listen <T extends ReturnTypeOfConfig> (
  _config: T & Requireds
): RxObservable<State<T>>
