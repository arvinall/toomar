import { OperatorFunction as RxOperatorFunction } from 'rxjs'

type Backward = 0
type Forward = 1

type IDirection = Backward | Forward

/**
 * StateWithDirectionOfX is an object that extends listen observable state
 * returned by {@link directionOfX} with `directionOfX` property
 * that its value is `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * listen(config(fromX(400), toX(1000)))
 *   .pipe(directionOfX())
 *   .subscribe(state => {
 *     state.directionOfX // -> is a number, 0 or 1
 *       // when it is 0 it means state.targetElement.scrollLeft is less than the previous one
 *       // when it is 1 it means state.targetElement.scrollLeft is greater than the previous one (or equal)
 *   })
 * ```
 */
type StateWithDirectionOfX <T> = T & { directionOfX: IDirection }

/**
 * @example
 * ```js
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
 * @returns an rxjs operator that maps listen observable state to {@link StateWithDirectionOfX}
 */
export function directionOfX <T> (): RxOperatorFunction<T, StateWithDirectionOfX<T>>
