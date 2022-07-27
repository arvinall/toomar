import { test, expect } from '@jest/globals'

import { fromX } from '../../lib/configs/from-x'

const { Function } = globalThis

test(
  'fromX must return an object with fromX property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a number',
  () => {
    const value = 42
    const fromXConfig = fromX(value)

    expect(fromXConfig).toHaveProperty('fromX')

    expect(fromXConfig.fromX).toBeInstanceOf(Function)

    expect(typeof fromXConfig.fromX()).toBe('number')

    expect(fromXConfig.fromX()).toBe(value)
  }
)

test(
  'fromX must return an object with fromX property' + ' ' +
    'that is equal to px version of value argument' + ' ' +
    'when value argument is a function',
  () => {
    const value = () => 42
    const fromXConfig = fromX(value)

    expect(fromXConfig).toHaveProperty('fromX')

    expect(fromXConfig.fromX).toBeInstanceOf(Function)

    expect(fromXConfig.fromX).not.toBe(value)

    expect(typeof fromXConfig.fromX()).toBe('number')

    expect(fromXConfig.fromX()).toBe(value())
  }
)
