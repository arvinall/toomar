import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import { fractionYOf, IFractionOf } from './fraction-y-of'
import { listen } from '../listen'

/**
 * `StateWithFractionXOf` is an object that extends listen observable state
 * returned by {@link fractionXOf} with `fractionXOf` property
 * that its value is a reference to an {@link IFractionOf}
 * 
 * @example
 * ```js
 * import { toX, fromX, config, listen, fractionXOf } from 'toomar'
 * 
 * listen(config(fromX(400), toX(1000)))
 *   .pipe(fractionXOf(100), fractionXOf(1), fractionXOf(180))
 *   .subscribe(state => {
 *     state.x // -> is a number between 0 and 600
 * 
 *     state.fractionXOf[100] // -> is a number between 0 and 100
 *       // when it is 0 state.x is equal to 0
 *       // when it is 50 state.x is equal to 300
 *       // when it is 100 state.x is equal to 600
 * 
 *     state.fractionXOf[1] // -> is a number between 0 and 1
 *       // when it is 0 state.x is equal to 0
 *       // when it is 0.5 state.x is equal to 300
 *       // when it is 1 state.x is equal to 600
 * 
 *     state.fractionXOf[180] // -> is a number between 0 and 180
 *       // when it is 0 state.x is equal to 0
 *       // when it is 90 state.x is equal to 300
 *       // when it is 180 state.x is equal to 600
 *   })
 * ```
 * 
 * @category Transformers/fractionXOf
 */
export type StateWithFractionXOf <T> = T & { fractionXOf: IFractionOf }

/**
 * `fractionXOf` transformer is a rxjs operator
 * used to provide desired value that fulfill your needs,
 * merge {@link listen}'s state with {@link StateWithFractionXOf},
 * with `fractionXOf` property
 * that its value is a reference to an {@link IFractionOf}
 * 
 * > when you call `fractionXOf` by `100`
 *   then {@link IFractionOf} contains a property that its name is `100`,
 *   and its value is a number between `0` and `100`
 * 
 * > when you call `fractionXOf` by `360`
 *   then {@link IFractionOf} contains a property that its name is `360`,
 *   and its value is a number between `0` and `360`
 * 
 * > when you call `fractionXOf` by `.5`
 *   then {@link IFractionOf} contains a property that its name is `.5`,
 *   and its value is a number between `0` and `.5`
 * 
 * @example
 * ```js
 * import { toX, fromX, config, listen, fractionXOf } from 'toomar'
 * 
 * const animationElement = document.querySelector('#animation')
 * 
 * listen(config(fromX(400), toX(1000)))
 *   .pipe(fractionXOf(100), fractionXOf(1), fractionXOf(180))
 *   .subscribe(({
 *     fractionXOf: { 100: percentage, 1: opacity, 180: rotation }
 *   }) => {
 *     animationElement.style.setProperty('opacity', opacity)
 *     animationElement.style.setProperty('transform', `rotate(${rotation}deg)`)
 * 
 *     animationElement.innerText = percentage + '%'
 *   })
 * ```
 * 
 * @returns
 * an rxjs operator that maps listen observable state to {@link StateWithFractionXOf}
 * based on `target` argument
 * 
 * @see {@link fractionYOf}
 * @see {@link listen}
 * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
 * @see {@link https://rxjs.dev/api/index/function/map rxjs.map}
 * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Transformers
 * @category Transformers/fractionXOf
 */
export function fractionXOf <T> (
  target: number
): RxOperatorFunction<T, T extends StateWithFractionXOf<unknown> ? T : StateWithFractionXOf<T>>
