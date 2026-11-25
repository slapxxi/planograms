import type { NumberedShelf, Product } from '~/data/planograms'
import { productImages } from '~/data/productImages'
import { CELL_GAP, FACE_WIDTH, SHELF_PADDING_X } from '~/lib/constants'

export type GroupView = 'cards' | 'faces'

export function firstImage(product: Product) {
  for (const key of product.images ?? []) {
    const image = productImages[key]
    if (image) return image
  }
  return undefined
}

export function cellWidth(product: Product) {
  const span = product.faceSpan ?? product.faces
  return span * FACE_WIDTH + (span - 1) * CELL_GAP
}

export function shelfMetrics(shelf: NumberedShelf) {
  const width =
    shelf.products.reduce((sum, item) => sum + cellWidth(item.product), 0) +
    Math.max(0, shelf.products.length - 1) * CELL_GAP +
    SHELF_PADDING_X

  return { width }
}
