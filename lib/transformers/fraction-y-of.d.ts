import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import { fractionXOf } from './fraction-x-of'
import { listen } from '../listen'

/**
 * `IFractionOf` is an object whose index signature keys and values are both numbers
 * 
 * @category Transformers
 */
export interface IFractionOf { [key: number]: number }

/**
 * `StateWithFractionYOf` is an object that extends listen observable state
 * returned by {@link fractionYOf} with two properties
 * `fractionYOf` and `fractionOf`,
 * both of them are equal to each other and reference to an {@link IFractionOf}
 * 
 * @example
 * ```js
 * import { to, from, config, listen, fractionOf, fractionYOf } from 'toomar'
 * 
 * listen(config(from(400), to(1000)))
 *   .pipe(fractionYOf(100), fractionOf(1), fractionOf(180))
 *   .subscribe(state => {
 *     state.fractionYOf === state.fractionOf
 * 
 *     state.y // -> is a number between 0 and 600
 * 
 *     state.fractionOf[100] // -> is a number between 0 and 100
 *       // when it is 0 state.y is equal to 0
 *       // when it is 50 state.y is equal to 300
 *       // when it is 100 state.y is equal to 600
 * 
 *     state.fractionOf[1] // -> is a number between 0 and 1
 *       // when it is 0 state.y is equal to 0
 *       // when it is 0.5 state.y is equal to 300
 *       // when it is 1 state.y is equal to 600
 * 
 *     state.fractionOf[180] // -> is a number between 0 and 180
 *       // when it is 0 state.y is equal to 0
 *       // when it is 90 state.y is equal to 300
 *       // when it is 180 state.y is equal to 600
 *   })
 * ```
 * 
 * @category Transformers/fractionYOf
 */
export type StateWithFractionYOf <T> = T & {
  fractionYOf: IFractionOf
  fractionOf: IFractionOf
}

/**
 * `fractionYOf` transformer is a rxjs operator
 * used to provide desired value that fulfill your needs,
 * merge {@link listen}'s state with {@link StateWithFractionYOf}
 * that has two properties named `fractionYOf` and `fractionOf`,
 * both of them are equal to each other and reference to an {@link IFractionOf}
 * 
 * > when you call `fractionYOf` by `100`
 *   then {@link IFractionOf} contains a property that its name is `100`,
 *   and its value is a number between `0` and `100`
 * 
 * > when you call `fractionYOf` by `360`
 *   then {@link IFractionOf} contains a property that its name is `360`,
 *   and its value is a number between `0` and `360`
 * 
 * > when you call `fractionYOf` by `.5`
 *   then {@link IFractionOf} contains a property that its name is `.5`,
 *   and its value is a number between `0` and `.5`
 * 
 * @example
 * ```js
 * import { to, from, config, listen, fractionOf, fractionYOf } from 'toomar'
 * 
 * const animationElement = document.querySelector('#animation')
 * 
 * listen(config(from(400), to(1000)))
 *   .pipe(fractionYOf(100), fractionOf(1), fractionOf(180))
 *   .subscribe(({
 *     fractionOf: { 100: percentage },
 *     fractionYOf: { 1: opacity, 180: rotation }
 *   }) => {
 *     animationElement.style.setProperty('opacity', opacity)
 *     animationElement.style.setProperty('transform', `rotate(${rotation}deg)`)
 * 
 *     animationElement.innerText = percentage + '%'
 *   })
 * ```
 * 
 * @returns
 * an rxjs operator that maps listen observable state to {@link StateWithFractionYOf}
 * based on `target` argument
 * 
 * @see {@link fractionXOf}
 * @see {@link listen}
 * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
 * @see {@link https://rxjs.dev/api/index/function/map rxjs.map}
 * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Transformers
 * @category Transformers/fractionYOf
 */
export function fractionYOf <T> (
  target: number
): RxOperatorFunction<T, StateWithFractionYOf<T>>

/**
 * ### Alias for {@link fractionYOf}
 * 
 * @category Transformers
 */
export const fractionOf = fractionYOf
