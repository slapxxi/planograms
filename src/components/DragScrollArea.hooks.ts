import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { createDragScrollController } from '~/components/DragScrollArea.config'
import type { DragScrollController } from '~/components/DragScrollArea.config'

export function useDragScroll(elementRef: RefObject<HTMLDivElement | null>) {
  const controllerRef = useRef<DragScrollController | null>(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    controllerRef.current = createDragScrollController({
      elementRef,
      setDragging,
    })
    return () => {
      controllerRef.current?.cleanup()
      controllerRef.current = null
    }
  }, [elementRef])

  return { controllerRef, dragging }
}
