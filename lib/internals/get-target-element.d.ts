import { ITarget, IEventPresenter } from '../configs/scroll'

/**
 * @returns `_document?.scrollingElement`
 * 
 * @category Internals
 */
export function getIfHasScrollingElement (_document): HTMLElement

/**
 * @returns `target?.document?.scrollingElement`
 * 
 * @category Internals
 */
export function getIfHasScrollingElementIfHasDocument (
  target: ITarget | EventTarget
): ReturnType<typeof getIfHasScrollingElement>

/**
 * @returns real HTMLElement target from events
 * 
 * @category Internals
 */
export function getTargetElement (
  event: IEventPresenter<unknown, unknown> | Event
): ReturnType<typeof getIfHasScrollingElementIfHasDocument>
