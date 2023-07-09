import { MonoTypeOperatorFunction as RxMonoTypeOperatorFunction } from 'rxjs'

import { listen } from '../listen'

/**
 * `auditAnimationFrame` scheduler
 * runs your `rxjs.Subscriber` in `requestAnimationFrame`
 * 
 * @example
 * ```js
 * import { to, config, listen, auditAnimationFrame } from 'toomar'
 * 
 * listen(config(to(500)))
 *   .pipe(
 *     auditAnimationFrame() // -> rx.auditTime(0, rx.animationFrameScheduler)
 *   )
 *   .subscribe(({ y }) => {
 *     // Do heavy animation operations with GPU acceleration (when available)
 *   })
 * ```
 * 
 * @returns
 * combination of `rxjs.animationFrameScheduler` and `rxjs.auditTime`
 * with duration `0`, monotype operator function
 * 
 * @see {@link listen}
 * @see [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
 * @see [rxjs.Subscriber](https://rxjs.dev/api/index/class/Subscriber)
 * @see [rxjs.animationFrameScheduler](https://rxjs.dev/api/index/const/animationFrameScheduler)
 * @see [rxjs.auditTime](https://rxjs.dev/api/index/function/auditTime)
 * 
 * @category Schedulers
 */
export function auditAnimationFrame <T> (): RxMonoTypeOperatorFunction<T>
