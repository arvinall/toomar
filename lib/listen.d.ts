import { Observable as RxObservable } from 'rxjs'

import type { Requireds } from './configs/config'

import { config } from './configs/config'
import { toY } from './configs/to-y'
import { toX } from './configs/to-x'

type Config = ReturnType<typeof config>

type ToY = ReturnType<typeof toY>
type ToX = ReturnType<typeof toX>

type ToYAndToX = ToY & ToX

interface IBaseState <T> {
  config: T,
  event: Event,
  targetElement: HTMLElement
}

interface IYState <T> extends IBaseState <T> { y: number }

interface IXState <T> extends IBaseState <T> { x: number }

type YStateAndXState <T> = IYState<T> & IXState<T>

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
 * listen, spy scroll based on {@link configs/config.config}
 * 
 * @example
 * ```js
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
 * an rxjs observable that is equivalent to
 * config `scroll` observable with config based filter
 * and a mapper that creates and observe next {@link State}
 * 
 * @see {@link configs/config.config}
 */
export function listen <T extends Config> (
  config: T & Requireds
): RxObservable<State<T>>
