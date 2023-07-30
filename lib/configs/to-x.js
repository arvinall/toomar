import { objOf, pipe } from 'ramda'

import { px } from '../units/px.js'

const objOfToX = objOf('toX')

export const toX = pipe(px, objOfToX)
