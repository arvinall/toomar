import { test, expect } from '@jest/globals'

import { em } from '../../lib/units/em'

const { Function } = globalThis

test(
  'em must return a function that returns multiply of base and value arguments' + ' ' +
    'when those are number',
  () => {
    const base = 250
    const value = 2
    const multiply = base * value
    const emUnit = em(base, value)

    expect(emUnit).toBeInstanceOf(Function)

    expect(typeof emUnit()).toBe('number')

    expect(emUnit()).toBe(multiply)
  }
)

test(
  'em must return a function that returns multiply of base return value and value argument' + ' ' +
    'when base argument is a function that returns number and value argument is a number',
  () => {
    const base = () => 500
    const value = 0.5
    const multiply = base() * value
    const emUnit = em(base, value)

    expect(emUnit).toBeInstanceOf(Function)

    expect(typeof emUnit()).toBe('number')

    expect(emUnit()).toBe(multiply)
  }
)

test(
  'em must return a function that returns multiply of' + ' ' +
    'base argument and value that value argument returns' + ' ' +
    'when base argument is a number and value argument is a function that returns number',
  () => {
    const base = 1000
    const value = () => 0.75
    const multiply = base * value()
    const emUnit = em(base, value)

    expect(emUnit).toBeInstanceOf(Function)

    expect(typeof emUnit()).toBe('number')

    expect(emUnit()).toBe(multiply)
  }
)

test(
  'em must return a function that returns multiply of' + ' ' +
    'base return value and value that value argument returns' + ' ' +
    'when those are function that returns number',
  () => {
    const base = () => 500
    const value = () => 1.5
    const multiply = base() * value()
    const emUnit = em(base, value)

    expect(emUnit).toBeInstanceOf(Function)

    expect(typeof emUnit()).toBe('number')

    expect(emUnit()).toBe(multiply)
  }
)
