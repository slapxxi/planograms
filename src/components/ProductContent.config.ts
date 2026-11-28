import type { CellSize } from '~/lib/constants'

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
