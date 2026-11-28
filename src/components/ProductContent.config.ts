import type { Product } from '~/data/planograms'
import type { ProductImage } from '~/data/productImages'
import { productImages } from '~/data/productImages'
import type { CellSize } from '~/lib/constants'

export function faceImages(product: Product, height: number): ProductImage[] {
  const images = (product.images ?? [])
    .map((key) => productImages[key])
    .filter((image): image is ProductImage => Boolean(image))

  if (images.length > 1 && product.name.includes('/') && height > 1) {
    return images
  }

  return images.slice(0, 1)
}

export const imageMaxHeight: Record<CellSize, string> = {
  '3xs': 'max-h-14',
  '2xs': 'max-h-18',
  xs: 'max-h-22',
  sm: 'max-h-28',
  md: 'max-h-35',
  lg: 'max-h-42',
}

export const facePadding: Record<CellSize, string> = {
  '3xs': 'p-0.5',
  '2xs': 'p-0.5',
  xs: 'p-0.5',
  sm: 'p-1',
  md: 'p-1',
  lg: 'p-1',
}

export const nameFontSize: Record<CellSize, string> = {
  '3xs': 'text-[9px]',
  '2xs': 'text-[10px]',
  xs: 'text-[11px]',
  sm: 'text-[11px]',
  md: 'text-xs',
  lg: 'text-sm',
}
