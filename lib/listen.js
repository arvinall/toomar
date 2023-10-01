import {
  __, map, flip, pipe, prop, filter, zip,
  always, call, curryN, apply, pathEq, ifElse,
  invoker, objOf, when, assoc, unary, flatten
} from 'ramda'

import { filter as rxFilter, map as rxMap } from 'rxjs'

import {
  getIfHasScrollingElementIfHasDocument as getTargetElement
} from './internals/get-target-element.js'

function createYAxisFilter ({ fromY, toY }) {
  return function yAxisFilter ({ scrollTop }) {
    return (scrollTop >= fromY()) && (scrollTop <= toY())
  }
}

function createXAxisFilter ({ fromX, toX }) {
  return function xAxisFilter ({ scrollLeft }) {
    return (scrollLeft >= fromX()) && (scrollLeft <= toX())
  }
}

const flippedMap = flip(map)

const flippedProp = flip(prop)

const createFiltersCreatorList = pipe(
  flippedProp,
  flippedMap(['toY', 'toX']),
  zip(__, [createYAxisFilter, createXAxisFilter]),
  filter(prop(0)),
  map(prop(1))
)

function duplicate (x) { return [x, x] }

const flippedBinaryCall = flip(curryN(2, call))

const createFiltersList = pipe(
  flippedBinaryCall,
  flippedMap([createFiltersCreatorList, duplicate]),
  apply(zip),
  map(apply(call))
)

function createStrictFilter (yPredicator, xPredicator) {
  return function strictFilter (target) {
    return (yPredicator(target) && xPredicator(target))
  }
}

function createLooseFilter (leftPredicator, rightPredicator) {
  return function looseFilter (target) {
    return (leftPredicator(target) || rightPredicator(target))
  }
}

const createAxesFilter = pipe(
  prop('config'),
  flippedBinaryCall,
  flippedMap([prop('strictBoundaries'), createFiltersList]),
  ifElse(
    pathEq(1, [1, 'length']),
    pipe(prop(1), prop(0)),
    ifElse(
      prop(0),
      pipe(prop(1), apply(createStrictFilter)),
      pipe(prop(1), apply(createLooseFilter))
    )
  )
)

function createTargetElementCaller (fn) {
  return function callByTargetElement (event) {
    return fn(getTargetElement(event.target))
  }
}

function createYAxisCoverEdgesFilter (state) {
  return function yAxisCoverEdgesFilter () {
    return (
      (state.y > 0) &&
      (state.y < (state.config.toY() - state.config.fromY()))
    )
  }
}

function createXAxisCoverEdgesFilter (state) {
  return function xAxisCoverEdgesFilter () {
    return (
      (state.x > 0) &&
      (state.x < (state.config.toX() - state.config.fromX()))
    )
  }
}

const createCoverEdgesFiltersCreatorList = pipe(
  flippedBinaryCall,
  flippedMap([
    pipe(prop('config'), prop('toY')),
    pipe(prop('config'), prop('toX'))
  ]),
  zip(__, [createYAxisCoverEdgesFilter, createXAxisCoverEdgesFilter]),
  filter(prop(0)),
  map(prop(1))
)

const createCoverEdgesFiltersList = pipe(
  flippedBinaryCall,
  flippedMap([createCoverEdgesFiltersCreatorList, duplicate]),
  apply(zip),
  map(apply(call))
)

const createCoverEdgesFilter = pipe(
  flippedBinaryCall,
  flippedMap([
    pipe(prop('config'), prop('strictBoundaries')),
    createCoverEdgesFiltersList
  ]),
  ifElse(
    pathEq(1, [1, 'length']),
    pipe(prop(1), prop(0)),
    ifElse(
      prop(0),
      pipe(prop(1), apply(createStrictFilter)),
      pipe(prop(1), apply(createLooseFilter))
    )
  )
)

const createFilterBasedOnCoverEdges = ifElse(
  pipe(prop('config'), prop('coverEdges')),
  pipe(
    unary(flippedBinaryCall),
    flippedMap([createAxesFilter, createCoverEdgesFilter]),
    apply(createLooseFilter)
  ),
  createAxesFilter
)

function createYAxisCleanEdgesFilterCreator (lastScrollTop = 0) {
  return function createYAxisCleanEdgesFilter ({ fromY, toY }) {
    return function yAxisCleanEdgesFilter ({ scrollTop }) {
      return (prevScrollTop => {
        lastScrollTop = scrollTop

        return (
          (prevScrollTop < fromY() && scrollTop > toY()) ||
          (prevScrollTop > toY() && scrollTop < fromY())
        )
      })(lastScrollTop)
    }
  }
}

function createXAxisCleanEdgesFilterCreator (lastScrollLeft = 0) {
  return function createXAxisCleanEdgesFilter ({ fromX, toX }) {
    return function xAxisCleanEdgesFilter ({ scrollLeft }) {
      return (prevScrollLeft => {
        lastScrollLeft = scrollLeft

        return (
          (prevScrollLeft < fromX() && scrollLeft > toX()) ||
          (prevScrollLeft > toX() && scrollLeft < fromX())
        )
      })(lastScrollLeft)
    }
  }
}

const createCleanEdgesFiltersCreatorList = pipe(
  flippedProp,
  flippedMap(['toY', 'toX']),
  zip(__, [createYAxisCleanEdgesFilterCreator, createXAxisCleanEdgesFilterCreator]),
  filter(prop(0)),
  map(pipe(prop(1), call))
)

const createCleanEdgesFiltersList = pipe(
  flippedBinaryCall,
  flippedMap([createCleanEdgesFiltersCreatorList, duplicate]),
  apply(zip),
  map(apply(call))
)

const createCleanEdgesFilter = pipe(
  prop('config'),
  flippedBinaryCall,
  flippedMap([prop('strictBoundaries'), createCleanEdgesFiltersList]),
  ifElse(
    pathEq(1, [1, 'length']),
    pipe(prop(1), prop(0)),
    ifElse(
      prop(0),
      pipe(prop(1), apply(createStrictFilter)),
      pipe(prop(1), apply(createLooseFilter))
    )
  )
)

function createLooseComputeFilter (leftPredicator, rightPredicator) {
  return function looseComputeFilter (target) {
    return (function filterLooselyCompute (left, right) {
      return (left || right)
    })(leftPredicator(target), rightPredicator(target))
  }
}

const createFilterBasedOnCleanEdges = ifElse(
  pipe(prop('config'), prop('cleanEdges')),
  pipe(
    unary(flippedBinaryCall),
    flippedMap([createFilterBasedOnCoverEdges, createCleanEdgesFilter]),
    apply(createLooseComputeFilter)
  ),
  createFilterBasedOnCoverEdges
)

function copyObject (object) { return { ...object } }

const createState = pipe(
  copyObject,
  objOf('config'),
  when(pipe(prop('config'), prop('toY')), assoc('y', 0)),
  when(pipe(prop('config'), prop('toX')), assoc('x', 0))
)

function createBaseStateUpdaterByMutation (state) {
  return function updateBaseStateByMutation (event) {
    state.event = event
    state.targetElement = getTargetElement(event.target)

    return state
  }
}

function updateYState (scrollTop, computedFromY, computedToY) {
  return (scrollTop < computedFromY)
    ? 0
    : (scrollTop < computedToY)
        ? (scrollTop - computedFromY)
        : (computedToY - computedFromY)
}

function updateYStateByMutation (state) {
  state.y = updateYState(
    state.targetElement.scrollTop,
    state.config.fromY(),
    state.config.toY()
  )

  return state
}

function updateXState (scrollLeft, computedFromX, computedToX) {
  return (scrollLeft < computedFromX)
    ? 0
    : (scrollLeft < computedToX)
        ? (scrollLeft - computedFromX)
        : (computedToX - computedFromX)
}

function updateXStateByMutation (state) {
  state.x = updateXState(
    state.targetElement.scrollLeft,
    state.config.fromX(),
    state.config.toX()
  )

  return state
}

function pipe3 (fn1, fn2, fn3) {
  return function callPipe3 (argument) {
    return fn3(fn2(fn1(argument)))
  }
}

function pipe4 (fn1, fn2, fn3, fn4) {
  return function callPipe4 (argument) {
    return fn4(fn3(fn2(fn1(argument))))
  }
}

const createStateUpdatersList = pipe(
  flippedBinaryCall,
  flippedMap([
    pipe(prop('config'), prop('toY')),
    pipe(prop('config'), prop('toX'))
  ]),
  zip(__, [updateYStateByMutation, updateXStateByMutation]),
  filter(prop(0)),
  map(prop(1))
)

const createStateUpdaterByMutation = pipe(
  flippedBinaryCall,
  flippedMap([
    createBaseStateUpdaterByMutation,
    createStateUpdatersList,
    always(copyObject)
  ]),
  flatten,
  ifElse(
    pathEq(3, ['length']),
    apply(pipe3),
    apply(pipe4)
  )
)

export const listen = pipe(
  createState,
  flippedBinaryCall,
  flippedMap([
    pipe(createFilterBasedOnCleanEdges, createTargetElementCaller, rxFilter),
    pipe(createStateUpdaterByMutation, rxMap),
    pipe(prop('config'), prop('scroll'))
  ]),
  apply(invoker(2, 'pipe'))
)
