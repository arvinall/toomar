import { call, curryN, flip } from 'ramda'

export const flippedBinaryCall = flip(curryN(2, call))
