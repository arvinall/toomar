import { test, expect } from '@jest/globals'

import { toY } from '../../lib/configs/to-y'

const { Function } = globalThis

test(
  'toY must return an object with toY property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const toYConfig = toY(value)

    expect(toYConfig).toHaveProperty('toY')

    expect(toYConfig.toY).toBeInstanceOf(Function)

    expect(typeof toYConfig.toY()).toBe('number')

    expect(toYConfig.toY()).toBe(value)
  }
)

test(
  'toY must return an object with to property' + ' ' +
    'that is equal to toY property' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const toYConfig = toY(value)

    expect(toYConfig).toHaveProperty('to')

    expect(toYConfig.to).toBe(toYConfig.toY)
  }
)

test(
  'toY must return an object with toY property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const toYConfig = toY(value)

    expect(toYConfig).toHaveProperty('toY')

    expect(toYConfig.toY).toBeInstanceOf(Function)

    expect(toYConfig.toY).not.toBe(value)

    expect(typeof toYConfig.toY()).toBe('number')

    expect(toYConfig.toY()).toBe(value())
  }
)

test(
  'toY must return an object with to property' + ' ' +
    'that is equal to toY property' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const toYConfig = toY(value)

    expect(toYConfig.to).toBe(toYConfig.toY)
  }
)
