import { test, expect } from '@jest/globals'

import { px } from '../../lib/units/px'

const { Function, Number } = globalThis

test('px must act as a constant when its value is a number', () => {
  const value = 42
  const pxUnit = px(value)

  expect(pxUnit).toBeInstanceOf(Function)

  expect(typeof pxUnit()).toBe('number')

  expect(pxUnit()).toBe(value)
})

test(
  'px must convert its value to number and act as a constant' + ' ' +
    'when its value is not a number or function',
  () => {
    const value = '42'
    const pxUnit = px(value)

    expect(pxUnit).toBeInstanceOf(Function)

    expect(typeof pxUnit()).toBe('number')

    expect(pxUnit()).toBe(Number(value))
  }
)

test(
  'px must act as the same as its value' + ' ' +
    'when its value is a function that returns a number value',
  () => {
    const value = () => 42
    const pxUnit = px(value)

    expect(pxUnit).toBeInstanceOf(Function)

    expect(typeof pxUnit()).toBe('number')

    expect(pxUnit()).toBe(value())
  }
)

test(
  'px must wrap its value and convert its return value to number on call' + ' ' +
    'when its value is a function that returns a non-number value',
  () => {
    const value = () => '42'
    const pxUnit = px(value)

    expect(pxUnit).toBeInstanceOf(Function)

    expect(typeof pxUnit()).toBe('number')

    expect(pxUnit()).toBe(Number(value()))
  }
)
