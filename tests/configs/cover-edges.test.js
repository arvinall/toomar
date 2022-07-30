import { test, expect } from '@jest/globals'

import { coverEdges } from '../../lib/configs/cover-edges'

test(
  'coverEdges must return an object with coverEdges property that is equal to true',
  async () => {
    const coverEdgesConfig = coverEdges()

    expect(coverEdgesConfig).toHaveProperty('coverEdges')

    expect(coverEdgesConfig.coverEdges).toBe(true)

    expect(coverEdgesConfig).not.toBe(coverEdges())
  }
)
