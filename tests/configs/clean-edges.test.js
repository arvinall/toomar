import { test, expect } from '@jest/globals'

import { cleanEdges } from '../../lib/configs/clean-edges'

test(
  'cleanEdges must return an object with cleanEdges property that is equal to true',
  async () => {
    const cleanEdgesConfig = cleanEdges()

    expect(cleanEdgesConfig).toHaveProperty('cleanEdges')

    expect(cleanEdgesConfig.cleanEdges).toBe(true)

    expect(cleanEdgesConfig).not.toBe(cleanEdges())
  }
)
