import { test, expect } from '@jest/globals'

import { strictBoundaries } from '../../lib/configs/strict-boundaries'

test(
  'strictBoundaries must return an object with strictBoundaries property that is equal to true',
  async () => {
    const strictBoundariesConfig = strictBoundaries()

    expect(strictBoundariesConfig).toHaveProperty('strictBoundaries')

    expect(strictBoundariesConfig.strictBoundaries).toBe(true)

    expect(strictBoundariesConfig).not.toBe(strictBoundaries())
  }
)
