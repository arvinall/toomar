/* @refresh reload */
import { render } from 'solid-js/web'

import { Toomar } from './Toomar'
import { always } from 'ramda'

const { document } = globalThis

export function setupApp (destination = document.body) {
  const toomarRootElement = Object.assign(document.createElement('div'), { className: 'toomar' })

  render(always(<Toomar />), toomarRootElement)

  destination.appendChild(toomarRootElement)
}
