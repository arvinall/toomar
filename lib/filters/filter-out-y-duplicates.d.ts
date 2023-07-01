import { OperatorFunction as RxOperatorFunction } from 'rxjs'

import { listen } from '../listen'
import { filterOutXDuplicates } from './filter-out-x-duplicates'

/**
 * `filterOutYDuplicates` is a rxjs operator
 * that used to filter-out **Y** axis duplications
 * of the {@link listen}'s observable
 * when scroll has multiple axes,
 * but you want to listen to just **Y** axis
 * 
 * @example
 * ```js
 * import { toX, config, listen, filterOutDuplicates } from 'toomar'
 * 
 * listen(config(to(600)))
 *   .pipe(filterOutDuplicates())
 *   .subscribe(({ y }) => (
 *     // y must be different from the previous one (when the x-axis changed)
 *   ))
 * ```
 * 
 * @returns a rxjs operator that filters duplications of `listen` observable
 * 
 * @see {@link filterOutXDuplicates}
 * @see {@link https://rxjs.dev/api/index/interface/OperatorFunction rxjs.OperatorFunction}
 * @see {@link https://rxjs.dev/api/index/function/filter rxjs.filter}
 * @see {@link https://rxjs.dev/guide/operators rxjs operators guide}
 * 
 * @category Filters
 */
export function filterOutYDuplicates <T> (): RxOperatorFunction<T, T>
