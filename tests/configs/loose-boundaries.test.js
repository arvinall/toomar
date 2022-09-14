import { test, expect } from '@jest/globals'

import { looseBoundaries } from '../../lib/configs/loose-boundaries'

test(
  'looseBoundaries must return an object with strictBoundaries property that is equal to false',
  async () => {
    const looseBoundariesConfig = looseBoundaries()

    expect(looseBoundariesConfig).toHaveProperty('strictBoundaries')

    expect(looseBoundariesConfig.strictBoundaries).toBe(false)

    expect(looseBoundariesConfig).not.toBe(looseBoundaries())
  }
)
