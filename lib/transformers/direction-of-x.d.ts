import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import {
  directionOfY,
  IDirection, Backward, Forward
} from './direction-of-y'
import { listen } from '../listen'

/**
 * `StateWithDirectionOfX` is an object that extends listen observable state
 * returned by {@link directionOfX} with `directionOfX` property
 * that its value is `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * import { toX, fromX, config, listen, directionOfX } from 'toomar'
 * 
 * listen(config(fromX(400), toX(1000)))
 *   .pipe(directionOfX())
 *   .subscribe(({ directionOfX, targetElement: { scrollLeft } }) => {
 *     directionOfX // -> is a number, 0 or 1
 *       // when it is 0 it means scrollLeft is less than the previous one
 *       // when it is 1 it means scrollLeft is greater than the previous one (or equal)
 *   })
 * ```
 * 
 * @category Transformers/directionOfX
 */
export type StateWithDirectionOfX <T> = T & { directionOfX: IDirection }

/**
 * `directionOfX` transformer is a rxjs operator
 * used to detect scroll direction in **X** axis,
 * merge {@link listen}'s state with {@link StateWithDirectionOfX}
 * that has a property named `directionOfX` that its value is `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * import { toX, fromX, config, listen, directionOfX } from 'toomar'
 * 
 * const directionElement = document.querySelector('#direction')
 * const gotoLeftElement = document.querySelector('#goto-left')
 * 
 * const directionSymbols = ['←', '→']
 * const gotoLeftOpacities = [1, 0.5]
 * 
 * listen(config(fromX(400), toX(1000)))
 *   .pipe(directionOfX())
 *   .subscribe(({ directionOfX }) => {
 *     directionElement.innerText = directionSymbols[directionOfX]
 * 
 *     gotoLeftElement.style.setProperty('opacity', gotoLeftOpacities[directionOfX])
 *   })
 * ```
 * 
 * @returns an rxjs operator that maps {@link listen} observable state to {@link StateWithDirectionOfX}
 * 
 * @see directionOfY
 * @see listen
 * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
 * @see {@link https://rxjs.dev/api/index/function/map rxjs.map}
 * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Transformers
 * @category Transformers/directionOfX
 */
export function directionOfX <T> (): RxOperatorFunction<T, StateWithDirectionOfX<T>>
