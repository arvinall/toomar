import { Observable as RxObservable } from 'rxjs'

import { config, Requireds } from './configs/config'
import { toY } from './configs/to-y'
import { toX } from './configs/to-x'

/** @category listen */
type ReturnTypeOfConfig = ReturnType<typeof config>

/** @category listen */
type ToY = ReturnType<typeof toY>
/** @category listen */
type ToX = ReturnType<typeof toX>

/** @category listen */
type ToYAndToX = ToY & ToX

/** @category listen */
type TypeOfRxObservable <T> = (
  T extends RxObservable<Event>
    ? Event
    : T['__T__']
)

/** @category listen */
type TargetOfRxObservable <T> = (
  T extends RxObservable<Event>
    ? HTMLElement
    : T['__T__']['target']
)

/** @category listen */
interface IBaseState <T> {
  config: T,
  event: TypeOfRxObservable<T['scroll']>,
  targetElement: TargetOfRxObservable<T['scroll']>
}

/** @category listen */
interface IYState <T> extends IBaseState <T> { y: number }

/** @category listen */
interface IXState <T> extends IBaseState <T> { x: number }

/** @category listen */
type YStateAndXState <T> = IYState<T> & IXState<T>

/** @category listen */
type State <T> = (
  T extends ToYAndToX
    ? YStateAndXState<T>
    : (
      T extends ToY
        ? IYState<T>
        : IXState<T>
    )
)

/**
 * listen, spy scroll based on {@link config}
 * 
 * @example
 * ```js
 * import { to, config, listen, from, toX, fromX } from 'toomar'
 * 
 * listen(config(to(400))).subscribe(
 *   ({ y }) => y // y is a number between 0 to 400
 * )
 * 
 * listen(config(from(200), to(600))).subscribe(
 *   ({ y }) => y // y is a number between 0 to 400 (600 - 200)
 * )
 * 
 * listen(config(fromX(100), toX(400))).subscribe(
 *   ({ x }) => x // x is a number between 0 to 300 (400 - 100)
 * )
 * 
 * listen(config(
 *   from(200), to(500),
 *   fromX(100), toX(400)
 * )).subscribe(({ y, x }) => {
 *   y; // y is a number between 0 to 300 (500 - 200)
 *   x; // x is a number between 0 to 300 (400 - 100)
 * })
 * ```
 * 
 * @returns
 * an rxjs observable that use config `scroll` observable,
 * with config based filter and mapper,
 * that creates and observe next {@link State}
 * 
 * @see {@link config}
 * 
 * @category listen
 */
export function listen <T extends ReturnTypeOfConfig> (
  config: T & Requireds
): RxObservable<State<T>>
