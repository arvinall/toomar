import { listen } from '../listen'
import { fromY as from } from './from-y'
import { toY as to } from './to-y'
import { uncleanEdges } from './unclean-edges'
import { config } from './config'

/**
 * `cleanEdges` config tells {@link listen} to cover the edges
 * when scroll is not in range, in both axis
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is behind `100` for example `50`,
 *   and then it's come to beyond `300` for example `350`,
 *   {@link listen} emits `200` (`300 - 100`)
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `300` for example `350`,
 *   and then it's come to behind `100` for example `50`,
 *   {@link listen} emits `0`
 * 
 * @example
 * ```js
 * import { cleanEdges } from 'toomar'
 * 
 * cleanEdges() // -> { cleanEdges: true }
 * ```
 * 
 * @returns an object with `cleanEdges` property that is equal to `true`
 * 
 * @see {@link uncleanEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function cleanEdges (): { cleanEdges: true }
