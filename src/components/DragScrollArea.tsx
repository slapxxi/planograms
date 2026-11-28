import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createDragScrollController } from '~/components/DragScrollArea.config'
import type { DragScrollController } from '~/components/DragScrollArea.config'

type Props = {
  children: ReactNode
  className?: string
  onDraggingChange?: (dragging: boolean) => void
}

let DragScrollArea = (props: Props) => {
  const { children, className = '', onDraggingChange } = props
  const ref = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<DragScrollController | null>(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    controllerRef.current = createDragScrollController({
      elementRef: ref,
      onDraggingChange,
      setDragging,
    })
    return () => {
      controllerRef.current?.cleanup()
      controllerRef.current = null
    }
  }, [onDraggingChange])

  return (
    <div
      className={`drag-scroll grid auto-rows-fr overflow-x-auto ${dragging ? 'is-dragging' : ''} ${className}`}
      data-name="DragScrollArea"
      onClickCapture={(event) =>
        controllerRef.current?.handleClickCapture(event)
      }
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={(event) => controllerRef.current?.handlePointerDown(event)}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default DragScrollArea
