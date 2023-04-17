import { OperatorFunction as RxOperatorFunction } from 'rxjs'

/** IFractionYOf is an object whose index signature keys and values are both numbers */
interface IFractionYOf { [key: number]: number }

/**
 * StateWithFractionYOf is an object that extends listen observable state
 * returned by {@link fractionYOf} with two properties `fractionYOf` and `fractionOf`
 * 
 * both of them are equal to each other and reference to an {@link IFractionYOf}
 * 
 * @example
 * ```js
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
 */
type StateWithFractionYOf <T> = T & {
  fractionYOf: IFractionYOf
  fractionOf: IFractionYOf
}

/**
 * @example
 * ```js
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
 *  based on `target` argument
 */
export function fractionYOf <T> (
  target: number
): RxOperatorFunction<T, StateWithFractionYOf<T>>
