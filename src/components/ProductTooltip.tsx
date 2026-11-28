import { useId, useRef, useState } from 'react'
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import {
  copyProductName,
  isDragScrollActive,
  tooltipImages,
} from '~/components/ProductTooltip.config'
import type { TooltipPosition } from '~/components/ProductTooltip.config'
import {
  useTooltipDismiss,
  useTooltipPosition,
} from '~/components/ProductTooltip.hooks'
import type { Product } from '~/data/planograms'
import { faceSpanToCm, formatCm } from '~/data/planograms'

type Props = {
  product: Product
  children: ReactNode
  number?: number
  className?: string
  style?: CSSProperties
  hideBackground?: boolean
}

let ProductTooltip = (props: Props) => {
  const {
    product,
    children,
    number,
    className = '',
    style,
    hideBackground = false,
  } = props
  const [opened, setOpened] = useState(false)
  const open = opened
  const [position, setPosition] = useState<TooltipPosition | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const pointerType = useRef('')
  const tooltipId = useId()

  const images = tooltipImages(product)

  useTooltipPosition({
    imageCount: images.length,
    maxHeight: position?.maxHeight,
    open,
    setPosition,
    tooltipRef,
    triggerRef,
    width: position?.width,
  })
  useTooltipDismiss({
    close: () => setOpened(false),
    open,
    tooltipRef,
    triggerRef,
  })

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerType.current = event.pointerType
  }

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerType.current = event.pointerType
    if (event.pointerType === 'mouse' && !isDragScrollActive()) setOpened(true)
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

  const handleClick = () => {
    copyProductName(product)
    if (hasTooltip && pointerType.current !== 'mouse') {
      setOpened((value) => !value)
    }
  }

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
        className={`relative isolate scroll-mt-16 overflow-hidden text-left ${hasTooltip ? 'cursor-help' : ''} ${className}`}
        data-cell-number={number}
        onClick={handleClick}
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
            className="pointer-events-none fixed z-50 w-[min(320px,calc(100vw-16px))] overflow-y-auto rounded-[2px] border border-[color:var(--border)] bg-(--surface) p-3 shadow-lg"
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              width: position?.width,
              maxHeight: position?.maxHeight,
              visibility: position ? 'visible' : 'hidden',
            }}
          >
            <p className="mb-2 text-xs font-medium leading-snug text-(--app-text)">
              {product.name}
            </p>
            <p className="mb-2 text-[11px] leading-none text-(--muted-text)">
              Фейсы: {product.faces} · {formatCm(faceSpanToCm(span))} см
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

export default ProductTooltip
