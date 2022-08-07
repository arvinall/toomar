import { test, expect } from '@jest/globals'

import { subtract } from '../../lib/operators/subtract'

const { Function } = globalThis

test(
  'subtract must return a function that returns subtraction of base and value arguments' + ' ' +
    'when those are number',
  () => {
    const base = 500
    const value = 250
    const subtraction = base - value
    const subtractUnit = subtract(base, value)

    expect(subtractUnit).toBeInstanceOf(Function)

    expect(typeof subtractUnit()).toBe('number')

    expect(subtractUnit()).toBe(subtraction)
  }
)

test(
  'subtract must return a function that returns subtraction of base return value and value argument' + ' ' +
    'when base argument is a function that returns number and value argument is a number',
  () => {
    const base = () => 500
    const value = 200
    const subtraction = base() - value
    const subtractUnit = subtract(base, value)

    expect(subtractUnit).toBeInstanceOf(Function)

    expect(typeof subtractUnit()).toBe('number')

    expect(subtractUnit()).toBe(subtraction)
  }
)

test(
  'subtract must return a function that returns subtraction of' + ' ' +
    'base argument and value that value argument returns' + ' ' +
    'when base argument is a number and value argument is a function that returns number',
  () => {
    const base = 1000
    const value = () => 500
    const subtraction = base - value()
    const subtractUnit = subtract(base, value)

    expect(subtractUnit).toBeInstanceOf(Function)

    expect(typeof subtractUnit()).toBe('number')

    expect(subtractUnit()).toBe(subtraction)
  }
)

test(
  'subtract must return a function that returns subtraction of' + ' ' +
    'base return value and value that value argument returns' + ' ' +
    'when those are function that returns number',
  () => {
    const base = () => 500
    const value = () => 300
    const subtraction = base() - value()
    const subtractUnit = subtract(base, value)

    expect(subtractUnit).toBeInstanceOf(Function)

    expect(typeof subtractUnit()).toBe('number')

    expect(subtractUnit()).toBe(subtraction)
  }
)
