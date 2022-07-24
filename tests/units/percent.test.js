import { test, expect } from '@jest/globals'

import { percent } from '../../lib/units/percent'

const { Function } = globalThis

test(
  'percent must return a function that returns' + ' ' +
    'percentage of base argument based on value argument' + ' ' +
    'when those are number',
  () => {
    const base = 250
    const value = 200
    const percentage = (base * value) / 100
    const pctUnit = percent(base, value)

    expect(pctUnit).toBeInstanceOf(Function)

    expect(typeof pctUnit()).toBe('number')

    expect(pctUnit()).toBe(percentage)
  }
)

test(
  'percent must return a function that returns' + ' ' +
    'percentage of base return value based on value argument' + ' ' +
    'when base argument is a function that returns number and value argument is a number',
  () => {
    const base = () => 500
    const value = 50
    const percentage = (base() * value) / 100
    const pctUnit = percent(base, value)

    expect(pctUnit).toBeInstanceOf(Function)

    expect(typeof pctUnit()).toBe('number')

    expect(pctUnit()).toBe(percentage)
  }
)

test(
  'percent must return a function that returns' + ' ' +
    'percentage of base argument based on value return value' + ' ' +
    'when base argument is a number and value argument is a function that returns number',
  () => {
    const base = 1000
    const value = () => 75
    const percentage = (base * value()) / 100
    const pctUnit = percent(base, value)

    expect(pctUnit).toBeInstanceOf(Function)

    expect(typeof pctUnit()).toBe('number')

    expect(pctUnit()).toBe(percentage)
  }
)

test(
  'percent must return a function that returns' + ' ' +
    'percentage of base return value and value that value argument returns' + ' ' +
    'when those are function that returns number',
  () => {
    const base = () => 500
    const value = () => 150
    const percentage = (base() * value()) / 100
    const pctUnit = percent(base, value)

    expect(pctUnit).toBeInstanceOf(Function)

    expect(typeof pctUnit()).toBe('number')

    expect(pctUnit()).toBe(percentage)
  }
)
