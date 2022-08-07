import { test, expect } from '@jest/globals'

import { add } from '../../lib/operators/add'

const { Function } = globalThis

test(
  'add must return a function that returns addition of base and value arguments' + ' ' +
    'when those are number',
  () => {
    const base = 250
    const value = 250
    const addition = base + value
    const addUnit = add(base, value)

    expect(addUnit).toBeInstanceOf(Function)

    expect(typeof addUnit()).toBe('number')

    expect(addUnit()).toBe(addition)
  }
)

test(
  'add must return a function that returns addition of base return value and value argument' + ' ' +
    'when base argument is a function that returns number and value argument is a number',
  () => {
    const base = () => 500
    const value = 200
    const addition = base() + value
    const addUnit = add(base, value)

    expect(addUnit).toBeInstanceOf(Function)

    expect(typeof addUnit()).toBe('number')

    expect(addUnit()).toBe(addition)
  }
)

test(
  'add must return a function that returns addition of' + ' ' +
    'base argument and value that value argument returns' + ' ' +
    'when base argument is a number and value argument is a function that returns number',
  () => {
    const base = 1000
    const value = () => 500
    const addition = base + value()
    const addUnit = add(base, value)

    expect(addUnit).toBeInstanceOf(Function)

    expect(typeof addUnit()).toBe('number')

    expect(addUnit()).toBe(addition)
  }
)

test(
  'add must return a function that returns addition of' + ' ' +
    'base return value and value that value argument returns' + ' ' +
    'when those are function that returns number',
  () => {
    const base = () => 500
    const value = () => 300
    const addition = base() + value()
    const addUnit = add(base, value)

    expect(addUnit).toBeInstanceOf(Function)

    expect(typeof addUnit()).toBe('number')

    expect(addUnit()).toBe(addition)
  }
)
