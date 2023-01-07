/** UnitValue is a function that returns a number */
export interface IUnitValue { (): number }

/** Unit is a function that returns a {@link IUnitValue} */
export interface IUnit { (...args: unknown[]): IUnitValue }

/** UnitInput is a number or {@link IUnitValue} */
export type IUnitInput = number | IUnitValue

export { px } from './px'

export { em } from './em'

export { percent } from './percent'
