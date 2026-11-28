import type { CellSize } from '~/lib/constants'

export const cardPadding: Record<CellSize, string> = {
  '3xs': 'px-0.5 pt-3.5 pb-0.5',
  '2xs': 'px-1 pt-3.5 pb-0.5',
  xs: 'px-1 pt-3.5 pb-1',
  sm: 'px-1.5 pt-4 pb-1',
  md: 'px-2 pt-4 pb-1.5',
  lg: 'px-2 pt-4 pb-1.5',
}

export const facePadding: Record<CellSize, string> = {
  '3xs': 'px-0.5 pt-3.5 pb-0.5',
  '2xs': 'px-1 pt-3.5 pb-0.5',
  xs: 'px-1 pt-3.5 pb-1',
  sm: 'px-1 pt-4 pb-1',
  md: 'px-1 pt-4 pb-1',
  lg: 'px-1 pt-4 pb-1',
}

export function getHighlightClass(args: {
  matched: boolean
  searching: boolean
  selected: boolean
}) {
  if (!args.matched) return args.searching ? 'opacity-40' : ''
  return args.selected
    ? 'z-10 outline-2 outline-(--group-accent) outline-offset-2'
    : 'outline-1 outline-(--group-accent) outline-offset-2'
}

export function getPaddingClass(showFaces: boolean, cellSize: CellSize) {
  return showFaces ? facePadding[cellSize] : cardPadding[cellSize]
}
