import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useDragScroll } from '~/components/DragScrollArea.hooks'

type Props = {
  children: ReactNode
  className?: string
  onDraggingChange?: (dragging: boolean) => void
}

let DragScrollArea = (props: Props) => {
  const { children, className = '', onDraggingChange } = props
  const ref = useRef<HTMLDivElement>(null)
  const { controllerRef, dragging } = useDragScroll(ref, onDraggingChange)

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
