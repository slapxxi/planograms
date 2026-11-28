import { useEffect, useEffectEvent, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { createDragScrollController } from '~/components/DragScrollArea.config'
import type { DragScrollController } from '~/components/DragScrollArea.config'

export function useDragScroll(
  elementRef: RefObject<HTMLDivElement | null>,
  onDraggingChange?: (dragging: boolean) => void,
) {
  const controllerRef = useRef<DragScrollController | null>(null)
  const [dragging, setDragging] = useState(false)
  const notifyDraggingChange = useEffectEvent((dragging: boolean) =>
    onDraggingChange?.(dragging),
  )

  useEffect(() => {
    controllerRef.current = createDragScrollController({
      elementRef,
      onDraggingChange: notifyDraggingChange,
      setDragging,
    })
    return () => {
      controllerRef.current?.cleanup()
      controllerRef.current = null
    }
  }, [elementRef])

  return { controllerRef, dragging }
}
