import { test, expect } from '@jest/globals'

import { toX } from '../../lib/configs/to-x'

const { Function } = globalThis

test(
  'toX must return an object with toX property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const toXConfig = toX(value)

    expect(toXConfig).toHaveProperty('toX')

    expect(toXConfig.toX).toBeInstanceOf(Function)

    expect(typeof toXConfig.toX()).toBe('number')

    expect(toXConfig.toX()).toBe(value)
  }
)

test(
  'toX must return an object with toX property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const toXConfig = toX(value)

    expect(toXConfig).toHaveProperty('toX')

    expect(toXConfig.toX).toBeInstanceOf(Function)

    expect(toXConfig.toX).not.toBe(value)

    expect(typeof toXConfig.toX()).toBe('number')

    expect(toXConfig.toX()).toBe(value())
  }
)
