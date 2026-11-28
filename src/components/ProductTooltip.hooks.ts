import { useEffect, useEffectEvent, useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import { createTooltipPositionUpdater } from '~/components/ProductTooltip.config'
import type { TooltipPosition } from '~/components/ProductTooltip.config'
import { DRAG_SCROLL_START } from '~/lib/constants'

type PositionOptions = {
  imageCount: number
  maxHeight?: number
  open: boolean
  setPosition: (position: TooltipPosition) => void
  tooltipRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
  width?: number
}

export function useTooltipPosition(options: PositionOptions) {
  const {
    imageCount,
    maxHeight,
    open,
    setPosition,
    tooltipRef,
    triggerRef,
    width,
  } = options

  useLayoutEffect(() => {
    if (!open) return

    const updatePosition = createTooltipPositionUpdater(
      () => triggerRef.current,
      () => tooltipRef.current,
      setPosition,
    )

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    window.visualViewport?.addEventListener('resize', updatePosition)
    window.visualViewport?.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      window.visualViewport?.removeEventListener('resize', updatePosition)
      window.visualViewport?.removeEventListener('scroll', updatePosition)
    }
  }, [open, imageCount, width, maxHeight, setPosition, tooltipRef, triggerRef])
}

type DismissOptions = {
  close: () => void
  open: boolean
  tooltipRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
}

export function useTooltipDismiss(options: DismissOptions) {
  const { close, open, tooltipRef, triggerRef } = options
  const closeOnDrag = useEffectEvent(() => close())
  const closeOnOutsidePointerDown = useEffectEvent((event: PointerEvent) => {
    const target = event.target as Node
    if (
      triggerRef.current?.contains(target) ||
      tooltipRef.current?.contains(target)
    ) {
      return
    }
    close()
  })
  const closeOnEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  })

  useEffect(() => {
    window.addEventListener(DRAG_SCROLL_START, closeOnDrag)
    return () => window.removeEventListener(DRAG_SCROLL_START, closeOnDrag)
  }, [])

  useEffect(() => {
    if (!open) return

    document.addEventListener('pointerdown', closeOnOutsidePointerDown)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointerDown)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])
}
