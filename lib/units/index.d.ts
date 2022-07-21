/** UnitValue is a function that returns a number */
export interface IUnitValue {
  (): number
}

/** Unit is a function that returns a {@link IUnitValue} */
export interface IUnit {
  (...args: unknown[]): IUnitValue
}

/** UnitInput is a number or a function that returns a number */
export type IUnitInput = number | (() => number)

export { px } from './px'
