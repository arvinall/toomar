import { concat } from 'ramda'

export const resolvePath = concat(import.meta.env.BASE_URL)
