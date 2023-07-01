import { listen } from '../listen'
import { fromY as from } from './from-y'
import { toY as to } from './to-y'
import { coverEdges } from './cover-edges'
import { config } from './config'

/**
 * `uncoverEdges` config tells {@link listen} to not cover the edges
 * when scroll is in range, in both axis
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `100` and behind `300` for example `150`,
 *   and then it's come to beyond `300` for example `350`,
 *   {@link listen} doesn't emit because scroll is not in range
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `100` and behind `300` for example `250`,
 *   and then it's come to behind `100` for example `50`,
 *   {@link listen} doesn't emit because scroll is not in range
 * 
 * @example
 * ```js
 * import { uncoverEdges } from 'toomar'
 * 
 * uncoverEdges() // -> { coverEdges: false }
 * ```
 * 
 * @returns an object with `coverEdges` property that is equal to `false`
 * 
 * @see {@link coverEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function uncoverEdges (): { coverEdges: false }
