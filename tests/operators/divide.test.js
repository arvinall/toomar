import { test, expect } from '@jest/globals'

import { divide } from '../../lib/operators/divide'

const { Function } = globalThis

test(
  'divide must return a function that returns division of base and value arguments' + ' ' +
    'when those are number',
  () => {
    const base = 250
    const value = 2
    const division = base / value
    const divideUnit = divide(base, value)

    expect(divideUnit).toBeInstanceOf(Function)

    expect(typeof divideUnit()).toBe('number')

    expect(divideUnit()).toBe(division)
  }
)

test(
  'divide must return a function that returns division of base return value and value argument' + ' ' +
    'when base argument is a function that returns number and value argument is a number',
  () => {
    const base = () => 500
    const value = 0.5
    const division = base() / value
    const divideUnit = divide(base, value)

    expect(divideUnit).toBeInstanceOf(Function)

    expect(typeof divideUnit()).toBe('number')

    expect(divideUnit()).toBe(division)
  }
)

test(
  'divide must return a function that returns division of' + ' ' +
    'base argument and value that value argument returns' + ' ' +
    'when base argument is a number and value argument is a function that returns number',
  () => {
    const base = 1000
    const value = () => 0.75
    const division = base / value()
    const divideUnit = divide(base, value)

    expect(divideUnit).toBeInstanceOf(Function)

    expect(typeof divideUnit()).toBe('number')

    expect(divideUnit()).toBe(division)
  }
)

test(
  'divide must return a function that returns division of' + ' ' +
    'base return value and value that value argument returns' + ' ' +
    'when those are function that returns number',
  () => {
    const base = () => 500
    const value = () => 1.5
    const division = base() / value()
    const divideUnit = divide(base, value)

    expect(divideUnit).toBeInstanceOf(Function)

    expect(typeof divideUnit()).toBe('number')

    expect(divideUnit()).toBe(division)
  }
)
