import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import { directionOfX } from './direction-of-x'
import { listen } from '../listen'

/** @category Transformers */
export type Backward = 0
/** @category Transformers */
export type Forward = 1

/** @category Transformers */
export type IDirection = Backward | Forward

/**
 * `StateWithDirectionOfY` is an object that extends listen observable state
 * returned by {@link directionOfY} with two properties
 * `directionOfY` and `direction`,
 * both of them are equal to each other and their values are `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * import { to, from, config, listen, direction } from 'toomar'
 * 
 * listen(config(from(400), to(1000)))
 *   .pipe(direction())
 *   .subscribe(({ directionOfY, direction, targetElement: { scrollTop } }) => {
 *     directionOfY === direction
 * 
 *     direction // -> is a number, 0 or 1
 *       // when it is 0 it means scrollTop is less than the previous one
 *       // when it is 1 it means scrollTop is greater than the previous one (or equal)
 *   })
 * ```
 * 
 * @category Transformers
 * @category Transformers/directionOfY
 */
export type StateWithDirectionOfY <T> = T & {
  directionOfY: IDirection
  direction: IDirection
}

/**
 * `directionOfY` transformer is a rxjs operator
 * used to detect scroll direction in **Y** axis,
 * merge {@link listen}'s state with {@link StateWithDirectionOfY}
 * that has two properties named `directionOfY` and `direction`,
 * both of them are equal to each other and their values are `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * import { to, from, config, listen, directionOfY } from 'toomar'
 * 
 * const directionElement = document.querySelector('#direction')
 * const gotoTopElement = document.querySelector('#goto-top')
 * 
 * const directionSymbols = ['↑', '↓']
 * const gotoTopOpacities = [1, 0.5]
 * 
 * listen(config(from(400), to(1000)))
 *   .pipe(directionOfY()) // or use direction() alias
 *   .subscribe(({ directionOfY }) => {
 *     directionElement.innerText = directionSymbols[directionOfY]
 * 
 *     gotoTopElement.style.setProperty('opacity', gotoTopOpacities[directionOfY])
 *   })
 * ```
 * 
 * @returns an rxjs operator that maps listen observable state to {@link StateWithDirectionOfY}
 * 
 * @see directionOfX
 * @see listen
 * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
 * @see {@link https://rxjs.dev/api/index/function/map rxjs.map}
 * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Transformers
 * @category Transformers/directionOfY
 */
export function directionOfY <T> (): RxOperatorFunction<T, StateWithDirectionOfY<T>>

/**
 * ### Alias for {@link directionOfY}
 * 
 * @category Transformers
 */
export const direction = directionOfY
