import { OperatorFunction as RxOperatorFunction } from 'rxjs'

/**
 * @example
 * ```js
 * listen(config(to(600)))
 *   .pipe(filterOutDuplicates())
 *   .subscribe(({ y }) => (/* y must be different from the previous one (when the x-axis changed) *\/))
 * ```
 * 
 * @returns an rxjs operator that filters duplications of `listen` observable
 */
export function filterOutYDuplicates <T> (): RxOperatorFunction<T, T>
