import type { NumberedShelf, Product } from '~/data/planograms'
import { CM_PER_FACE, faceSpanToCm } from '~/data/planograms'
import { productImages } from '~/data/productImages'
import type { CellSize } from '~/lib/constants'
import {
  CELL_GAP,
  DEFAULT_CELL_SIZE,
  FACE_WIDTH_BY_SIZE,
  SHELF_PADDING_X,
} from '~/lib/constants'

export type GroupView = 'cards' | 'faces'

export function unitWidth(cellSize: CellSize = DEFAULT_CELL_SIZE) {
  return (FACE_WIDTH_BY_SIZE[cellSize] + CELL_GAP) / CM_PER_FACE - CELL_GAP
}

export function firstImage(product: Product) {
  for (const key of product.images ?? []) {
    const image = productImages[key]
    if (image) return image
  }
  return undefined
}

export function productUnits(product: Product) {
  return Math.round(faceSpanToCm(product.faceSpan ?? product.faces))
}

export function shelfUnits(shelf: NumberedShelf) {
  return shelf.products.reduce(
    (sum, item) => sum + productUnits(item.product),
    0,
  )
}

export function cellWidth(
  product: Product,
  cellSize: CellSize = DEFAULT_CELL_SIZE,
) {
  const units = productUnits(product)
  return units * unitWidth(cellSize) + (units - 1) * CELL_GAP
}

export function cellStyle(
  product: Product,
  cellSize: CellSize = DEFAULT_CELL_SIZE,
) {
  return { flex: '0 0 auto', width: cellWidth(product, cellSize) }
}

export function shelfStyle(
  shelf: NumberedShelf,
  cellSize: CellSize = DEFAULT_CELL_SIZE,
) {
  const units = shelfUnits(shelf)
  return {
    width:
      units * unitWidth(cellSize) +
      (units - 1) * CELL_GAP +
      SHELF_PADDING_X * 2,
    gap: CELL_GAP,
    paddingInline: SHELF_PADDING_X,
  }
}
