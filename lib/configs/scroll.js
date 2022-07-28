import { objOf, curryN, __, pipe } from 'ramda'
import { fromEvent as rxFromEvent } from 'rxjs'

const objOfScroll = objOf('scroll')

const curriedRxFromEvent = curryN(2, rxFromEvent)

const rxFromScroll = curriedRxFromEvent(__, 'scroll')

export const scroll = pipe(rxFromScroll, objOfScroll)
