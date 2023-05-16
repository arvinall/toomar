import { test, expect } from '@jest/globals'

import { uncleanEdges } from '../../lib/configs/unclean-edges'

test(
  'uncleanEdges must return an object with cleanEdges property that is equal to false',
  async () => {
    const uncleanEdgesConfig = uncleanEdges()

    expect(uncleanEdgesConfig).toHaveProperty('cleanEdges')

    expect(uncleanEdgesConfig.cleanEdges).toBe(false)

    expect(uncleanEdgesConfig).not.toBe(uncleanEdges())
  }
)
