import { listen } from '../listen'
import { fromY as from } from './from-y'
import { toY as to } from './to-y'
import { cleanEdges } from './clean-edges'
import { config } from './config'

/**
 * `uncleanEdges` config tells {@link listen} to not cover the edges
 * when scroll is not in range, in both axis
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is behind `100` for example `50`,
 *   and then it's come to beyond `300` for example `350`,
 *   {@link listen} doesn't emit because scroll is not in range
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `300` for example `350`,
 *   and then it's come to behind `100` for example `50`,
 *   {@link listen} doesn't emit because scroll is not in range
 * 
 * @example
 * ```js
 * import { uncleanEdges } from 'toomar'
 * 
 * uncleanEdges() // -> { cleanEdges: false }
 * ```
 * 
 * @returns an object with `cleanEdges` property that is equal to `false`
 * 
 * @see {@link cleanEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function uncleanEdges (): { cleanEdges: false }
