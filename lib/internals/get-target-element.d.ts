import { ITarget, IEventPresenter } from '../configs/scroll'

/** @returns `_document?.scrollingElement` */
export function getIfHasScrollingElement (_document): HTMLElement

/** @returns `target?.document?.scrollingElement` */
export function getIfHasScrollingElementIfHasDocument (
  target: ITarget | EventTarget
): ReturnType<typeof getIfHasScrollingElement>

/** @returns real HTMLElement target from events */
export function getTargetElement (
  event: IEventPresenter<unknown, unknown> | Event
): ReturnType<typeof getIfHasScrollingElementIfHasDocument>
