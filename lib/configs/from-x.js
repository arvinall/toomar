import { objOf, pipe } from 'ramda'

import { px } from '../units/px.js'

const objOfFromX = objOf('fromX')

export const fromX = pipe(px, objOfFromX)
