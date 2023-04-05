import {
  animationFrameScheduler as rxAnimationFrameScheduler,
  auditTime as rxAuditTime
} from 'rxjs'

import { always } from 'ramda'

export const auditAnimationFrame = always(rxAuditTime(0, rxAnimationFrameScheduler))
