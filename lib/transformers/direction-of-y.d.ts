import { OperatorFunction as RxOperatorFunction } from 'rxjs'

type Backward = 0
type Forward = 1

type IDirection = Backward | Forward

/**
 * StateWithDirectionOfY is an object that extends listen observable state
 * returned by {@link directionOfY} with two properties `directionOfY` and `direction`
 * 
 * both of them are equal to each other and their values are `0` or `1`
 * 
 * * `0` means **{@link Backward}**
 * * `1` means **{@link Forward}**
 * 
 * @example
 * ```js
 * listen(config(from(400), to(1000)))
 *   .pipe(direction())
 *   .subscribe(state => {
 *     state.directionOfY === state.direction
 * 
 *     state.direction // -> is a number, 0 or 1
 *       // when it is 0 it means state.targetElement.scrollTop is less than the previous one
 *       // when it is 1 it means state.targetElement.scrollTop is greater than the previous one (or equal)
 *   })
 * ```
 */
type StateWithDirectionOfY <T> = T & {
  directionOfY: IDirection
  direction: IDirection
}

/**
 * @example
 * ```js
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
 */
export function directionOfY <T> (): RxOperatorFunction<T, StateWithDirectionOfY<T>>
