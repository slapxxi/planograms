import type { Product } from '~/data/planograms'
import { productImages } from '~/data/productImages'
import { DRAG_SCROLL_ACTIVE } from '~/lib/constants'
import { notifyCopy } from '~/lib/notifications'

export type TooltipPosition = {
  top: number
  left: number
  width: number
  maxHeight: number
}

type ViewportBounds = {
  left: number
  top: number
  width: number
  height: number
}

const GAP = 8
const EDGE = 8
const MAX_WIDTH = 320

export function isDragScrollActive() {
  return document.documentElement.hasAttribute(DRAG_SCROLL_ACTIVE)
}

export function tooltipImages(product: Product) {
  return (product.images ?? []).flatMap((key) => {
    const image = productImages[key]
    return image ? [image] : []
  })
}

export function copyProductName(product: Product) {
  const clipboard = navigator.clipboard
  if (!clipboard) {
    notifyCopy({ title: 'Не удалось скопировать' })
    return
  }

  void clipboard
    .writeText(product.name)
    .then(() =>
      notifyCopy({
        title: 'Название скопировано',
        text: product.name,
      }),
    )
    .catch(() => notifyCopy({ title: 'Не удалось скопировать' }))
}

function viewportBounds(): ViewportBounds {
  const viewport = window.visualViewport
  if (!viewport) {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  return {
    left: viewport.offsetLeft,
    top: viewport.offsetTop,
    width: viewport.width,
    height: viewport.height,
  }
}

export function createTooltipPositionUpdater(
  getTrigger: () => HTMLElement | null,
  getTooltip: () => HTMLElement | null,
  setPosition: (position: TooltipPosition) => void,
) {
  return () => {
    const trigger = getTrigger()
    const tooltip = getTooltip()
    if (!trigger || !tooltip) return

    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    const viewport = viewportBounds()
    const width = Math.min(MAX_WIDTH, Math.max(1, viewport.width - EDGE * 2))
    const maxHeight = Math.max(0, viewport.height - EDGE * 2)
    const height = Math.min(tooltipRect.height, maxHeight)

    const centeredLeft = triggerRect.left + triggerRect.width / 2 - width / 2
    const left = Math.max(
      viewport.left + EDGE,
      Math.min(centeredLeft, viewport.left + viewport.width - width - EDGE),
    )

    const below = triggerRect.bottom + GAP
    const above = triggerRect.top - height - GAP
    const preferredTop =
      below + height <= viewport.top + viewport.height - EDGE
        ? below
        : above >= viewport.top + EDGE
          ? above
          : viewport.top + viewport.height - height - EDGE
    const top = Math.max(
      viewport.top + EDGE,
      Math.min(preferredTop, viewport.top + viewport.height - height - EDGE),
    )

    setPosition({ top, left, width, maxHeight })
  }
}
