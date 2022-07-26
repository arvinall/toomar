import { test, expect } from '@jest/globals'

import { fromY } from '../../lib/configs/from-y'

const { Function } = globalThis

test(
  'fromY must return an object with fromY property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const fromYConfig = fromY(value)

    expect(fromYConfig).toHaveProperty('fromY')

    expect(fromYConfig.fromY).toBeInstanceOf(Function)

    expect(typeof fromYConfig.fromY()).toBe('number')

    expect(fromYConfig.fromY()).toBe(value)
  }
)

test(
  'fromY must return an object with from property' + ' ' +
    'that is equal to fromY property' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const fromYConfig = fromY(value)

    expect(fromYConfig).toHaveProperty('from')

    expect(fromYConfig.from).toBe(fromYConfig.fromY)
  }
)

test(
  'fromY must return an object with fromY property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const fromYConfig = fromY(value)

    expect(fromYConfig).toHaveProperty('fromY')

    expect(fromYConfig.fromY).toBeInstanceOf(Function)

    expect(fromYConfig.fromY).not.toBe(value)

    expect(typeof fromYConfig.fromY()).toBe('number')

    expect(fromYConfig.fromY()).toBe(value())
  }
)

test(
  'fromY must return an object with from property' + ' ' +
    'that is equal to fromY property' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const fromYConfig = fromY(value)

    expect(fromYConfig.from).toBe(fromYConfig.fromY)
  }
)
