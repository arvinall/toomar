import { test, expect } from '@jest/globals'

import { uncoverEdges } from '../../lib/configs/uncover-edges'

test(
  'uncoverEdges must return an object with coverEdges property that is equal to false',
  async () => {
    const uncoverEdgesConfig = uncoverEdges()

    expect(uncoverEdgesConfig).toHaveProperty('coverEdges')

    expect(uncoverEdgesConfig.coverEdges).toBe(false)

    expect(uncoverEdgesConfig).not.toBe(uncoverEdges())
  }
)
