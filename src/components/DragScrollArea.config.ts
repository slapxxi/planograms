import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from 'react'
import { DRAG_SCROLL_START } from '~/lib/constants'

export const DRAG_THRESHOLD = 4

export type DragScrollController = {
  cleanup: () => void
  handleClickCapture: (event: ReactMouseEvent<HTMLDivElement>) => void
  handlePointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void
}

type Options = {
  elementRef: RefObject<HTMLDivElement | null>
  onDraggingChange?: (dragging: boolean) => void
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
    if (!element) return

    const startX = event.clientX
    const startLeft = element.scrollLeft
    let moved = false

    const handleMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerType !== 'mouse') return
      const delta = moveEvent.clientX - startX
      if (!moved && Math.abs(delta) <= DRAG_THRESHOLD) return
      if (!moved) {
        moved = true
        window.getSelection()?.removeAllRanges()
        window.dispatchEvent(new Event(DRAG_SCROLL_START))
        options.setDragging(true)
        options.onDraggingChange?.(true)
      }
      element.scrollLeft = startLeft - delta
    }

    const stopDragging = (notify: boolean) => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleEnd)
      window.removeEventListener('pointercancel', handleEnd)
      stop = null
      if (moved && notify) {
        suppressClick = true
        options.setDragging(false)
        options.onDraggingChange?.(false)
      }
    }

    const handleEnd = () => stopDragging(true)

    stop = stopDragging
    window.addEventListener('pointermove', handleMove)
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
