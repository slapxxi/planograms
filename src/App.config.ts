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
const SEARCH_CELL_PARAM = 'c'
const VIEW_PARAM = 'v'
const COLLAPSED_PARAM = 'e'
const MANUAL_SELECTION_PARAM = 'm'
const STATE_SEPARATOR = '.'
const STATE_RADIX = 36
const STATE_TOKEN_PATTERN = /^[0-9a-z]+$/i
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

function encodeStateList(values: Iterable<number>) {
  return Array.from(new Set(values))
    .sort((a, b) => a - b)
    .map((value) => value.toString(STATE_RADIX))
    .join(STATE_SEPARATOR)
}

function decodeStateList(raw: string | null) {
  if (!raw) return []
  return raw
    .split(STATE_SEPARATOR)
    .filter((token) => STATE_TOKEN_PATTERN.test(token))
    .map((token) => Number.parseInt(token, STATE_RADIX))
    .filter((value) => Number.isSafeInteger(value))
}

function encodeGroupIds(ids: Iterable<string>) {
  return encodeStateList(
    Array.from(ids).map((id) => groups.findIndex((group) => group.id === id)),
  )
}

function decodeGroupIds(raw: string | null) {
  return decodeStateList(raw)
    .filter((index) => index >= 0 && index < groups.length)
    .map((index) => groups[index].id)
}

function knownProductNumbers() {
  return new Set(
    numberProducts(groups).flatMap(({ shelves }) =>
      shelves.flatMap((shelf) => shelf.products.map(({ number }) => number)),
    ),
  )
}

export function readSearchState(): SearchState {
  const params = new URLSearchParams(window.location.search)
  const rawNumber = params.get(SEARCH_CELL_PARAM)
  const parsedNumber =
    rawNumber && STATE_TOKEN_PATTERN.test(rawNumber)
      ? Number.parseInt(rawNumber, STATE_RADIX)
      : null
  const numbers = knownProductNumbers()

  return {
    query: params.get(SEARCH_QUERY_PARAM) ?? '',
    selectedNumber:
      parsedNumber !== null &&
      Number.isSafeInteger(parsedNumber) &&
      numbers.has(parsedNumber)
        ? parsedNumber
        : null,
  }
}

export function writeSearchState(search: SearchState) {
  updateUrlParams((params) => {
    if (search.query) params.set(SEARCH_QUERY_PARAM, search.query)
    else params.delete(SEARCH_QUERY_PARAM)
    if (search.selectedNumber !== null)
      params.set(SEARCH_CELL_PARAM, search.selectedNumber.toString(STATE_RADIX))
    else params.delete(SEARCH_CELL_PARAM)
  })
}

export function readManualSelection() {
  const raw = new URLSearchParams(window.location.search).get(
    MANUAL_SELECTION_PARAM,
  )
  const knownNumbers = knownProductNumbers()

  return new Set(
    decodeStateList(raw).filter((number) => knownNumbers.has(number)),
  )
}

export function writeManualSelection(numbers: Set<number>) {
  updateUrlParams((params) => {
    const encoded = encodeStateList(numbers)
    if (encoded) params.set(MANUAL_SELECTION_PARAM, encoded)
    else params.delete(MANUAL_SELECTION_PARAM)
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
  const raw = new URLSearchParams(window.location.search).get(COLLAPSED_PARAM)
  return new Set(decodeGroupIds(raw))
}

export function writeCollapsedGroups(collapsedGroups: Set<string>) {
  updateUrlParams((params) => {
    const encoded = encodeGroupIds(collapsedGroups)
    if (encoded) params.set(COLLAPSED_PARAM, encoded)
    else params.delete(COLLAPSED_PARAM)
  })
}

export function readViews() {
  const raw = new URLSearchParams(window.location.search).get(VIEW_PARAM)
  return Object.fromEntries(
    decodeGroupIds(raw).map((id) => [id, 'faces' as const]),
  ) as Record<string, GroupView>
}

export function writeViews(views: Record<string, GroupView>) {
  updateUrlParams((params) => {
    const encoded = encodeGroupIds(
      Object.entries(views)
        .filter(([, view]) => view === 'faces')
        .map(([id]) => id),
    )
    if (encoded) params.set(VIEW_PARAM, encoded)
    else params.delete(VIEW_PARAM)
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
