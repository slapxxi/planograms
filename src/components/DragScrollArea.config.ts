import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from 'react'
import { DRAG_SCROLL_ACTIVE, DRAG_SCROLL_START } from '~/lib/constants'

export const DRAG_THRESHOLD = 4

export type DragScrollController = {
  cleanup: () => void
  handleClickCapture: (event: ReactMouseEvent<HTMLDivElement>) => void
  handlePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void
}

export function hasHorizontalScroll(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth
}

type Options = {
  elementRef: RefObject<HTMLDivElement | null>
  setDragging: (dragging: boolean) => void
}

export function createDragScrollController(
  options: Options,
): DragScrollController {
  let stop: ((notify: boolean) => void) | null = null
  let suppressClick = false

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    stop?.(true)
    suppressClick = false
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const element = options.elementRef.current
    if (!element || !hasHorizontalScroll(element)) return

    const startX = event.clientX
    const startLeft = element.scrollLeft
    let delta = 0
    let frame = 0
    let moved = false

    window.getSelection()?.removeAllRanges()
    window.dispatchEvent(new Event(DRAG_SCROLL_START))
    document.documentElement.setAttribute(DRAG_SCROLL_ACTIVE, '')
    options.setDragging(true)

    const applyScroll = () => {
      frame = 0
      element.scrollLeft = startLeft - delta
    }

    const handleMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerType !== 'mouse') return
      delta = moveEvent.clientX - startX
      if (Math.abs(delta) >= DRAG_THRESHOLD) moved = true
      if (frame === 0) frame = requestAnimationFrame(applyScroll)
    }

    const stopDragging = (notify: boolean) => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleEnd)
      window.removeEventListener('pointercancel', handleEnd)
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
        element.scrollLeft = startLeft - delta
      }
      stop = null
      document.documentElement.removeAttribute(DRAG_SCROLL_ACTIVE)
      if (notify) {
        if (moved) suppressClick = true
        options.setDragging(false)
      }
    }

    const handleEnd = () => stopDragging(true)

    stop = stopDragging
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerup', handleEnd)
    window.addEventListener('pointercancel', handleEnd)
  }

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick) return
    event.preventDefault()
    event.stopPropagation()
    suppressClick = false
  }

  return {
    cleanup: () => stop?.(false),
    handleClickCapture,
    handlePointerDown,
  }
}
