import { OperatorFunction as RxOperatorFunction } from 'rxjs'

/**
 * @example
 * ```js
 * listen(config(toX(600)))
 *   .pipe(filterOutXDuplicates())
 *   .subscribe(({ x }) => (/* x must be different from the previous one (when the y-axis changed) *\/))
 * ```
 * 
 * @returns an rxjs operator that filters duplications of `listen` observable
 */
export function filterOutXDuplicates <T> (): RxOperatorFunction<T, T>
