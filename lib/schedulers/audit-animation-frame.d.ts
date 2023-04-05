import { MonoTypeOperatorFunction as RxMonoTypeOperatorFunction } from 'rxjs'

/**
 * @example
 * ```js
 * listen(config(to(500)))
 *   .pipe(
 *     auditAnimationFrame() // -> rxAuditTime(0, rxAnimationFrameScheduler)
 *   )
 *   .subscribe(({ y }) => { // Do heavy animation operations with GPU acceleration })
 * ```
 * 
 * @returns
 * combination of [rxjs.animationFrameScheduler](https://rxjs.dev/api/index/const/animationFrameScheduler)
 * and [rxjs.auditTime](https://rxjs.dev/api/index/function/auditTime) with duration `0`
 * monotype operator function
 * 
 * @see [rxjs.animationFrameScheduler](https://rxjs.dev/api/index/const/animationFrameScheduler)
 * @see [rxjs.auditTime](https://rxjs.dev/api/index/function/auditTime)
 */
export function auditAnimationFrame <T> (): RxMonoTypeOperatorFunction<T>
