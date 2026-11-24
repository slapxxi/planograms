import { useEffect, useRef, useState } from 'react'
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'

type Props = {
  children: ReactNode
  className?: string
  onDraggingChange?: (dragging: boolean) => void
}

const THRESHOLD = 4

export const DRAG_SCROLL_START = 'dragscroll-start'

export default function DragScrollArea({
  children,
  className = '',
  onDraggingChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const stopRef = useRef<((notify: boolean) => void) | null>(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)

  useEffect(() => () => stopRef.current?.(false), [])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    stopRef.current?.(true)
    suppressClick.current = false
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const element = ref.current
    if (!element) return

    const startX = event.clientX
    const startLeft = element.scrollLeft
    let moved = false

    const handleMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerType !== 'mouse') return
      const delta = moveEvent.clientX - startX
      if (!moved && Math.abs(delta) <= THRESHOLD) return
      if (!moved) {
        moved = true
        window.getSelection()?.removeAllRanges()
        window.dispatchEvent(new Event(DRAG_SCROLL_START))
        setDragging(true)
        onDraggingChange?.(true)
      }
      element.scrollLeft = startLeft - delta
    }

    const stop = (notify: boolean) => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleEnd)
      window.removeEventListener('pointercancel', handleEnd)
      stopRef.current = null
      if (moved && notify) {
        suppressClick.current = true
        setDragging(false)
        onDraggingChange?.(false)
      }
    }

    const handleEnd = () => stop(true)

    stopRef.current = stop
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleEnd)
    window.addEventListener('pointercancel', handleEnd)
  }

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return
    event.preventDefault()
    event.stopPropagation()
    suppressClick.current = false
  }

  return (
    <div
      className={`drag-scroll overflow-x-auto ${dragging ? 'is-dragging' : ''} ${className}`}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={handlePointerDown}
      ref={ref}
    >
      {children}
    </div>
  )
}
