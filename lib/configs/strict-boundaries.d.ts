import { listen } from '../listen'
import { cleanEdges } from './clean-edges'
import { coverEdges } from './cover-edges'
import { fromY } from './from-y'
import { fromX } from './from-x'
import { toY } from './to-y'
import { toX } from './to-x'
import { looseBoundaries } from './loose-boundaries'
import { config } from './config'

/**
 * `strictBoundaries` config, sets {@link listen}'s boundaries to be strictly
 * (when multiple axes defined)
 * 
 * {@link listen} emits just when both axes are in range
 * 
 * Strict or loose boundaries applied to {@link cleanEdges} and {@link coverEdges} too
 * 
 * > When both {@link fromY}, {@link fromX} are `100`,
 *   and both {@link toY}, {@link toX} are `300`,
 *   then `scrollTop` and `scrollLeft` come to `150`,
 *   {@link listen} emits `50` (`150 - 100`) as both **Y** and **X** axes
 * 
 * > When both {@link fromY}, {@link fromX} are `100`,
 *   and both {@link toY}, {@link toX} are `300`,
 *   then `scrollTop` come to `150` and `scrollLeft` come to `50`,
 *   {@link listen} doesn't emit because `scrollLeft` is not in range
 * 
 * @example
 * ```js
 * import { strictBoundaries } from 'toomar'
 * 
 * strictBoundaries() // -> { strictBoundaries: true }
 * ```
 * 
 * @returns an object with `strictBoundaries` property that is equal to `true`
 * 
 * @see {@link looseBoundaries}
 * @see {@link cleanEdges}
 * @see {@link coverEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function strictBoundaries (): { strictBoundaries: true }
