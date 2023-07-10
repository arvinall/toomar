import { listen } from '../listen'
import { from } from '../configs/from-y'
import { fromX } from '../configs/from-x'
import { to } from '../configs/to-y'
import { toX } from '../configs/to-x'

/**
 * `unitValue` is a function that returns a `number`,
 * used as {@link IUnit}'s returned value,
 * or used as {@link IUnit}'s arguments
 * when you want to compute position on each iteration
 * 
 * @see {@link listen}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Units
 */
export interface IUnitValue { (): number }

/**
 * `unitInput` is a `number` or a {@link IUnitValue}
 * (function that returns `number`),
 * that used as {@link IUnit}'s arguments
 * 
 * @see {@link listen}
 * @see {@link from}
 * @see {@link to}
 * 
 * @category Units
 */
export type IUnitInput = number | IUnitValue

/**
 * `unit` is a function that accepts one or more {@link IUnitInput}s
 * and returns a {@link IUnitValue}
 * 
 * units are used to specify beginning and end of {@link listen}'s edges
 * via {@link from}/{@link fromX} and {@link to}/{@link toX}
 * 
 * @see {@link listen}
 * @see {@link from}
 * @see {@link fromX}
 * @see {@link to}
 * @see {@link toX}
 * 
 * @category Units
 */
export interface IUnit { (...args: IUnitInput[]): IUnitValue }

export { px } from './px'

export { em } from './em'

export { percent } from './percent'
