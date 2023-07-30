import {
  objOf, curryN, __, call, map,
  flip, invoker, repeat, pipe, unapply,
  prop, modifyPath, prepend, slice, apply
} from 'ramda'
import {
  fromEvent as rxFromEvent,
  merge as rxMerge,
  distinctUntilChanged as rxDistinctUntilChanged,
  map as rxMap
} from 'rxjs'

import {
  getIfHasScrollingElementIfHasDocument as getScrollingElement
} from '../internals/get-target-element.js'

const rxDistinctUntilSelectedKeyChanged = curryN(2, rxDistinctUntilChanged)(undefined)

const objOfScroll = objOf('scroll')

const curriedRxFromEvent = curryN(2, rxFromEvent)

const rxFromTouchmove = curriedRxFromEvent(__, 'touchmove')

const rxFromScroll = curriedRxFromEvent(__, 'scroll')

const flippedBinaryCall = flip(curryN(2, call))

const flippedMap = flip(map)

const rxPipe = invoker(2, 'pipe')

const flippedRepeat = flip(repeat)

const createMergeOfScrollAndTouchScroll = pipe(
  unapply(flippedRepeat(3)),
  modifyPath([0], prop(0)),
  modifyPath([1, 1], prop('touchOptions')),
  modifyPath([2, 1], prop('scrollOptions')),
  modifyPath([1], prepend(rxFromTouchmove)),
  modifyPath([2], prepend(rxFromScroll)),
  flippedBinaryCall,
  flippedMap([
    prop(0),
    pipe(
      slice(1, Infinity), map(apply(call)), apply(rxMerge)
    )
  ])
)

function createDistinctKeySelector (targetElement) {
  return () => `${targetElement.scrollLeft}, ${targetElement.scrollTop}`
}

function createEventToEventPresenterMapper (source) {
  return event => ({ target: source, realEvent: event })
}

const createFilterOutDuplications = pipe(
  prop(0), getScrollingElement, createDistinctKeySelector, rxDistinctUntilSelectedKeyChanged
)

const createEventPresenterMapper = pipe(
  prop(0), createEventToEventPresenterMapper, rxMap
)

export const touchScroll = pipe(
  createMergeOfScrollAndTouchScroll,
  flippedBinaryCall,
  flippedMap([
    createFilterOutDuplications,
    createEventPresenterMapper,
    prop(1)
  ]),
  apply(rxPipe),
  objOfScroll
)
