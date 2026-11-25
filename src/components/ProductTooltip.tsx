import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import type { Product } from '~/data/planograms'
import { faceSpanToCm, formatCm } from '~/data/planograms'
import { productImages } from '~/data/productImages'
import { DRAG_SCROLL_START } from '~/lib/constants'

type Props = {
  product: Product
  children: ReactNode
  number?: number
  className?: string
  style?: CSSProperties
  hideBackground?: boolean
  disabled?: boolean
}

type TooltipPosition = {
  top: number
  left: number
}

const GAP = 8
const EDGE = 8

export default function ProductTooltip({
  product,
  children,
  number,
  className = '',
  style,
  hideBackground = false,
  disabled = false,
}: Props) {
  const [opened, setOpened] = useState(false)
  const open = opened && !disabled
  const [position, setPosition] = useState<TooltipPosition | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const pointerType = useRef('')
  const tooltipId = useId()

  const images = (product.images ?? []).flatMap((key) => {
    const image = productImages[key]
    return image ? [image] : []
  })

  useLayoutEffect(() => {
    if (!open) return

    const updatePosition = () => {
      const trigger = triggerRef.current
      const tooltip = tooltipRef.current
      if (!trigger || !tooltip) return

      const triggerRect = trigger.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const centeredLeft =
        triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      const left = Math.max(
        EDGE,
        Math.min(centeredLeft, viewportWidth - tooltipRect.width - EDGE),
      )

      const below = triggerRect.bottom + GAP
      const above = triggerRect.top - tooltipRect.height - GAP
      const top =
        below + tooltipRect.height <= viewportHeight - EDGE
          ? below
          : above >= EDGE
            ? above
            : Math.max(EDGE, viewportHeight - tooltipRect.height - EDGE)

      setPosition({ top, left })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, images.length])

  useEffect(() => {
    const close = () => setOpened(false)
    window.addEventListener(DRAG_SCROLL_START, close)
    return () => window.removeEventListener(DRAG_SCROLL_START, close)
  }, [])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (
        triggerRef.current?.contains(target) ||
        tooltipRef.current?.contains(target)
      ) {
        return
      }
      setOpened(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpened(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerType.current = event.pointerType
  }

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerType.current = event.pointerType
    if (event.pointerType === 'mouse' && !disabled) setOpened(true)
  }

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') setOpened(false)
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      pointerType.current = 'keyboard'
    }
  }

  const hasTooltip = images.length > 0
  const backgroundSrc = images[0]?.src
  const span = product.faceSpan ?? product.faces
  if (!hasTooltip && number === undefined) return <>{children}</>

  const numberLabel = number === undefined ? '' : `${number}. `

  return (
    <>
      <button
        aria-describedby={hasTooltip && open ? tooltipId : undefined}
        aria-expanded={hasTooltip ? open : undefined}
        aria-label={
          hasTooltip
            ? `${numberLabel}Показать фото: ${product.name}`
            : `Ячейка ${number}`
        }
        className={`relative isolate overflow-hidden text-left ${hasTooltip ? 'cursor-help' : ''} ${className}`}
        onClick={() => {
          if (hasTooltip && pointerType.current !== 'mouse' && !disabled) {
            setOpened((value) => !value)
          }
        }}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        ref={triggerRef}
        style={style}
        title={product.name}
        type="button"
      >
        {backgroundSrc && !hideBackground ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-1 -z-10 m-auto size-16 bg-contain bg-no-repeat bg-right opacity-20"
            style={{ backgroundImage: `url("${backgroundSrc}")` }}
          />
        ) : null}
        {number === undefined ? null : (
          <span className="pointer-events-none absolute left-1 top-0.5 z-10 select-none text-[10px] font-semibold leading-none text-(--number-text)">
            {number}
            <span className="opacity-70">
              /{span} · {formatCm(faceSpanToCm(span))}см
            </span>
          </span>
        )}
        {children}
      </button>

      {hasTooltip &&
        open &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 w-[min(320px,calc(100vw-16px))] rounded-[2px] border border-[color:var(--border)] bg-(--surface) p-3 shadow-lg"
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              visibility: position ? 'visible' : 'hidden',
            }}
          >
            <p className="mb-2 text-xs font-medium leading-snug text-(--app-text)">
              {product.name}
            </p>
            <div className="flex flex-wrap gap-3">
              {images.map((image) => (
                <figure
                  className="m-0 flex min-w-0 flex-1 basis-32 flex-col items-center gap-2"
                  key={image.src}
                >
                  <img
                    alt={image.name}
                    className="max-h-40 w-full rounded-[2px] border border-[color:var(--border-subtle)] object-contain"
                    draggable={false}
                    src={image.src}
                  />
                  <figcaption className="text-center text-xs leading-snug text-(--muted-text)">
                    {image.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
