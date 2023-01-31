import { test, expect } from '@jest/globals'

import { getTargetElement } from '../../lib/internals/get-target-element'

test(
  'getTargetElement must return scrollingElement property from event.target.document' + ' ' +
  'when it is exists',
  () => {
    const scrollingElement = 'scrollingElement'

    expect(
      getTargetElement({ target: { document: { scrollingElement } } })
    ).toBe(scrollingElement)
  }
)

test(
  'getTargetElement must return document itself when event.target.document is present' + ' ' +
  'but has no scrollingElement property',
  () => {
    const document = 'document'

    expect(
      getTargetElement({ target: { document } })
    ).toBe(document)
  }
)

test(
  'getTargetElement must return target itself when event.target is present' + ' ' +
  'but has no document property',
  () => {
    const target = 'target'

    expect(
      getTargetElement({ target })
    ).toBe(target)
  }
)

test(
  'getTargetElement must return event itself when event is present' + ' ' +
  'but has no target property',
  () => {
    const event = 'event'

    expect(
      getTargetElement(event)
    ).toBe(event)
  }
)
