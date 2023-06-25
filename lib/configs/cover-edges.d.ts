import { listen } from '../listen'
import { fromY as from } from './from-y'
import { toY as to } from './to-y'
import { uncoverEdges } from './uncover-edges'
import { config } from './config'

/**
 * `coverEdges` config tells {@link listen} to cover the edges
 * when scroll is in range, in both axis
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `100` and behind `300` for example `150`,
 *   and then it's come to beyond `300` for example `350`,
 *   {@link listen} emits `200` (`300 - 100`)
 * 
 * > When {@link from} is `100` and {@link to} is `300`,
 *   and scroll is beyond `100` and behind `300` for example `250`,
 *   and then it's come to behind `100` for example `50`,
 *   {@link listen} emits `0`
 * 
 * @example
 * ```js
 * import { coverEdges } from 'toomar'
 * 
 * coverEdges() // -> { coverEdges: true }
 * ```
 * 
 * @returns an object with `coverEdges` property that is equal to `true`
 * 
 * @see {@link uncoverEdges}
 * @see {@link config}
 * 
 * @category Configs
 */
export function coverEdges (): { coverEdges: true }
