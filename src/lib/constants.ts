export const CELL_GAP = 2
export const SHELF_PADDING_X = 2
export const CELL_SIZES = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg'] as const
export type CellSize = (typeof CELL_SIZES)[number]
export const DEFAULT_CELL_SIZE: CellSize = 'md'
export const FACE_WIDTH_BY_SIZE: Record<CellSize, number> = {
  '3xs': 28,
  '2xs': 36,
  xs: 44,
  sm: 56,
  md: 68,
  lg: 84,
}
export const DRAG_SCROLL_START = 'dragscroll-start'
export const COPY_NOTIFICATION = 'copy-notification'
export const STORAGE_KEYS = {
  cellSize: 'planogram-cell-size',
  collapsed: 'planogram-collapsed',
} as const
