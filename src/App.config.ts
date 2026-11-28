import { groups, numberProducts } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import { CELL_SIZES, DEFAULT_CELL_SIZE, STORAGE_KEYS } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import { readStorage, removeStorage, writeStorage } from '~/lib/storage'

export type SearchState = {
  query: string
  selectedNumber: number | null
}

const SEARCH_QUERY_PARAM = 'q'
const SEARCH_CELL_PARAM = 'cell'
const VIEW_PARAM_PREFIX = 'view.'
const EXPANDED_PARAM_PREFIX = 'expanded.'
const COLLAPSED_EXPANDED_VALUE = '0'
const RECENT_QUERY_LIMIT = 3
const FOCUS_VIEWPORT_RATIO = 0.42

export function updateUrlParams(update: (params: URLSearchParams) => void) {
  const params = new URLSearchParams(window.location.search)
  update(params)

  const queryString = params.toString()
  const nextUrl =
    window.location.pathname +
    (queryString ? `?${queryString}` : '') +
    window.location.hash
  window.history.replaceState(window.history.state, '', nextUrl)
}

export function readSearchState(): SearchState {
  const params = new URLSearchParams(window.location.search)
  const rawNumber = params.get(SEARCH_CELL_PARAM)
  const parsedNumber =
    rawNumber !== null && /^\d+$/.test(rawNumber) ? Number(rawNumber) : null
  const numbers = new Set(
    numberProducts(groups).flatMap(({ shelves }) =>
      shelves.flatMap((shelf) => shelf.products.map(({ number }) => number)),
    ),
  )

  return {
    query: params.get(SEARCH_QUERY_PARAM) ?? '',
    selectedNumber:
      parsedNumber !== null && numbers.has(parsedNumber) ? parsedNumber : null,
  }
}

export function writeSearchState(search: SearchState) {
  updateUrlParams((params) => {
    if (search.query) params.set(SEARCH_QUERY_PARAM, search.query)
    else params.delete(SEARCH_QUERY_PARAM)
    if (search.selectedNumber !== null)
      params.set(SEARCH_CELL_PARAM, String(search.selectedNumber))
    else params.delete(SEARCH_CELL_PARAM)
  })
}

export function readCellSize(): CellSize {
  const saved = readStorage<string>(STORAGE_KEYS.cellSize, DEFAULT_CELL_SIZE)
  return CELL_SIZES.find((size) => size === saved) ?? DEFAULT_CELL_SIZE
}

export function writeCellSize(cellSize: CellSize) {
  if (cellSize === DEFAULT_CELL_SIZE) removeStorage(STORAGE_KEYS.cellSize)
  else writeStorage(STORAGE_KEYS.cellSize, cellSize)
}

function cleanRecentQueries(queries: string[]) {
  const seen = new Set<string>()
  return queries
    .map((query) => query.trim())
    .filter((query) => {
      if (!query || seen.has(query)) return false
      seen.add(query)
      return true
    })
    .slice(0, RECENT_QUERY_LIMIT)
}

export function readRecentQueries() {
  const saved = readStorage<unknown>(STORAGE_KEYS.recentQueries, [])
  return Array.isArray(saved)
    ? cleanRecentQueries(saved.filter((query) => typeof query === 'string'))
    : []
}

export function writeRecentQueries(queries: string[]) {
  writeStorage(STORAGE_KEYS.recentQueries, queries)
}

export function addRecentQuery(queries: string[], value: string) {
  return cleanRecentQueries([value, ...queries])
}

export function readCollapsedGroups() {
  const params = new URLSearchParams(window.location.search)
  const ids = new Set(groups.map((group) => group.id))

  return new Set(
    Array.from(params.entries())
      .filter(
        ([key, value]) =>
          key.startsWith(EXPANDED_PARAM_PREFIX) &&
          ids.has(key.slice(EXPANDED_PARAM_PREFIX.length)) &&
          value === COLLAPSED_EXPANDED_VALUE,
      )
      .map(([key]) => key.slice(EXPANDED_PARAM_PREFIX.length)),
  )
}

export function writeCollapsedGroups(collapsedGroups: Set<string>) {
  updateUrlParams((params) => {
    for (const key of Array.from(params.keys())) {
      if (key.startsWith(EXPANDED_PARAM_PREFIX)) params.delete(key)
    }
    for (const id of collapsedGroups) {
      params.set(`${EXPANDED_PARAM_PREFIX}${id}`, COLLAPSED_EXPANDED_VALUE)
    }
  })
}

export function readViews() {
  const params = new URLSearchParams(window.location.search)
  const ids = new Set(groups.map((group) => group.id))

  return Object.fromEntries(
    Array.from(params.entries())
      .filter(
        ([key, view]) =>
          key.startsWith(VIEW_PARAM_PREFIX) &&
          ids.has(key.slice(VIEW_PARAM_PREFIX.length)) &&
          (view === 'cards' || view === 'faces') &&
          view !== 'cards',
      )
      .map(
        ([key, view]) => [key.slice(VIEW_PARAM_PREFIX.length), view] as const,
      ),
  ) as Record<string, GroupView>
}

export function writeViews(views: Record<string, GroupView>) {
  updateUrlParams((params) => {
    for (const key of Array.from(params.keys())) {
      if (key.startsWith(VIEW_PARAM_PREFIX)) params.delete(key)
    }
    for (const [id, view] of Object.entries(views)) {
      if (view !== 'cards') params.set(`${VIEW_PARAM_PREFIX}${id}`, view)
    }
  })
}

export function scrollToCell(number: number, focus = false) {
  const cell = document.querySelector<HTMLElement>(
    `[data-cell-number="${number}"]`,
  )
  if (!cell) return
  if (focus) cell.focus({ preventScroll: true })

  const viewport = window.visualViewport
  const visibleTop = viewport?.offsetTop ?? 0
  const visibleHeight = viewport?.height ?? window.innerHeight
  const targetTop = visibleTop + visibleHeight * FOCUS_VIEWPORT_RATIO
  window.scrollTo({
    top: window.scrollY + cell.getBoundingClientRect().top - targetTop,
    behavior: 'smooth',
  })

  const scroller = cell.closest<HTMLElement>('.drag-scroll')
  if (!scroller) return
  const cellRect = cell.getBoundingClientRect()
  const scrollerRect = scroller.getBoundingClientRect()
  scroller.scrollTo({
    left:
      scroller.scrollLeft +
      cellRect.left -
      scrollerRect.left -
      (scroller.clientWidth - cellRect.width) / 2,
    behavior: 'smooth',
  })
}
