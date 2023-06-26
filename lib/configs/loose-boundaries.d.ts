import { listen } from '../listen'
import { cleanEdges } from './clean-edges'
import { coverEdges } from './cover-edges'
import { fromY } from './from-y'
import { fromX } from './from-x'
import { toY } from './to-y'
import { toX } from './to-x'
import { strictBoundaries } from './strict-boundaries'
import { config } from './config'

/**
 * `looseBoundaries` config, sets {@link listen}'s boundaries to be loosely
 * (when multiple axes defined)
 * 
 * {@link listen} emits when one of the axis is in range at least
 * 
 * Strict or loose boundaries applied to {@link cleanEdges} and {@link coverEdges} too
 * 
 * > When both {@link fromY}, {@link fromX} are `100`,
 *   and both {@link toY}, {@link toX} are `300`,
 *   then `scrollTop` come to `150` and `scrollLeft` come to `50`,
 *   {@link listen} emits `50` (`150 - 100`) as **Y** axis and `0` as **X** axis
 * 
 * > When both {@link fromY}, {@link fromX} are `100`,
 *   and both {@link toY}, {@link toX} are `300`,
 *   then `scrollTop` and `scrollLeft` come to `150`,
 *   {@link listen} emits `50` (`150 - 100`) as both **Y** and **X** axes
 * 
 * @example
 * ```js
 * import { looseBoundaries } from 'toomar'
 * 
 * looseBoundaries() // -> { strictBoundaries: false }
 * ```
 * 
 * @returns an object with `strictBoundaries` property that is equal to `false`
 * 
 * @see {@link strictBoundaries}
 * @see {@link cleanEdges}
 * @see {@link coverEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function looseBoundaries (): { strictBoundaries: false }
