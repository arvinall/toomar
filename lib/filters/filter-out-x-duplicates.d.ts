import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import { listen } from '../listen'
import { filterOutYDuplicates } from './filter-out-y-duplicates'

/**
 * `filterOutXDuplicates` is a rxjs operator
 * that used to filter-out **X** axis duplications
 * of the {@link listen}'s observable
 * when scroll has multiple axes,
 * but you want to listen to just **X** axis
 * 
 * @example
 * ```js
 * import { toX, config, listen, filterOutXDuplicates } from 'toomar'
 * 
 * listen(config(toX(600)))
 *   .pipe(filterOutXDuplicates())
 *   .subscribe(({ x }) => (
 *     // x must be different from the previous one (when the y-axis changed)
 *   ))
 * ```
 * 
 * @returns a rxjs operator that filters-out duplications of `listen` observable
 * 
  * @see {@link filterOutYDuplicates}
  * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
  * @see {@link https://rxjs.dev/api/index/function/filter rxjs.filter}
  * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Filters
 */
export function filterOutXDuplicates <T> (): RxOperatorFunction<T, T>
