import { OperatorFunction as RxOperatorFunction } from 'rxjs'

/** IFractionXOf is an object whose index signature keys and values are both numbers */
interface IFractionXOf { [key: number]: number }

/**
 * StateWithFractionXOf is an object that extends listen observable state
 * returned by {@link fractionXOf} with `fractionXOf` property
 * that its value is a reference to an {@link IFractionXOf}
 * 
 * @example
 * ```js
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
 */
type StateWithFractionXOf <T> = T & { fractionXOf: IFractionXOf }

/**
 * @example
 * ```js
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
 *  based on `target` argument
 */
export function fractionXOf <T> (
  target: number
): RxOperatorFunction<T, StateWithFractionXOf<T>>
