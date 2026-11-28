import { useEffect, useState } from 'react'
import CellSizeSwitcher from '~/components/CellSizeSwitcher'
import CopyNotification from '~/components/CopyNotification'
import HorizontalPlanogram from '~/components/HorizontalPlanogram'
import SearchBar from '~/components/SearchBar'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import { groups, numberProducts } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import { CELL_SIZES, DEFAULT_CELL_SIZE, STORAGE_KEYS } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import type { SearchResult } from '~/lib/search'
import { searchProducts } from '~/lib/search'
import { readStorage, removeStorage, writeStorage } from '~/lib/storage'
import { useTheme } from '~/theme'

type SearchState = {
  query: string
  selectedNumber: number | null
}

const SEARCH_QUERY_PARAM = 'q'
const SEARCH_CELL_PARAM = 'cell'
const VIEW_PARAM_PREFIX = 'view.'

function updateUrlParams(update: (params: URLSearchParams) => void) {
  const params = new URLSearchParams(window.location.search)
  update(params)

  const queryString = params.toString()
  const nextUrl =
    window.location.pathname +
    (queryString ? `?${queryString}` : '') +
    window.location.hash
  window.history.replaceState(window.history.state, '', nextUrl)
}

function readSearchState(): SearchState {
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

function writeSearchState(search: SearchState) {
  updateUrlParams((params) => {
    if (search.query) params.set(SEARCH_QUERY_PARAM, search.query)
    else params.delete(SEARCH_QUERY_PARAM)
    if (search.selectedNumber !== null)
      params.set(SEARCH_CELL_PARAM, String(search.selectedNumber))
    else params.delete(SEARCH_CELL_PARAM)
  })
}

function readCellSize(): CellSize {
  const saved = readStorage<string>(STORAGE_KEYS.cellSize, DEFAULT_CELL_SIZE)
  return CELL_SIZES.find((size) => size === saved) ?? DEFAULT_CELL_SIZE
}

function readCollapsedGroups() {
  const saved = readStorage<string[]>(STORAGE_KEYS.collapsed, [])
  const ids = new Set(groups.map((group) => group.id))
  return new Set(saved.filter((id) => ids.has(id)))
}

function readViews() {
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

function writeViews(views: Record<string, GroupView>) {
  updateUrlParams((params) => {
    for (const key of Array.from(params.keys())) {
      if (key.startsWith(VIEW_PARAM_PREFIX)) params.delete(key)
    }
    for (const [id, view] of Object.entries(views)) {
      if (view !== 'cards') params.set(`${VIEW_PARAM_PREFIX}${id}`, view)
    }
  })
}

let App = () => {
  const { theme, setTheme } = useTheme()
  const [cellSize, setCellSize] = useState<CellSize>(readCellSize)
  const [search, setSearch] = useState<SearchState>(readSearchState)
  const [resultsVisible, setResultsVisible] = useState(false)
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)
  const [collapsedGroups, setCollapsedGroups] =
    useState<Set<string>>(readCollapsedGroups)
  const [views, setViews] = useState<Record<string, GroupView>>(readViews)

  const { query, selectedNumber } = search
  const results = searchProducts(groups, query)
  const activeNumber = hoveredNumber ?? selectedNumber
  const matchedNumbers =
    activeNumber === null
      ? new Set(results.map((result) => result.number))
      : new Set([activeNumber])
  const products = groups.flatMap((group) =>
    group.shelves.flatMap((shelf) => shelf.products),
  )
  const totalFaces = products.reduce((sum, product) => sum + product.faces, 0)

  useEffect(() => {
    if (cellSize === DEFAULT_CELL_SIZE) removeStorage(STORAGE_KEYS.cellSize)
    else writeStorage(STORAGE_KEYS.cellSize, cellSize)
  }, [cellSize])

  useEffect(() => {
    writeSearchState(search)
  }, [search])

  useEffect(() => {
    const handlePopState = () => {
      const next = readSearchState()
      setSearch(next)
      setViews(readViews())
      setResultsVisible(Boolean(next.query.trim()))
      setHoveredNumber(null)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.collapsed, [...collapsedGroups])
  }, [collapsedGroups])

  useEffect(() => {
    writeViews(views)
  }, [views])

  const toggleGroup = (id: string) => {
    setCollapsedGroups((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandGroup = (id: string) => {
    setCollapsedGroups((current) => {
      if (!current.has(id)) return current
      const next = new Set(current)
      next.delete(id)
      return next
    })
  }

  const handleQueryChange = (next: string) => {
    setSearch({ query: next, selectedNumber: null })
    setResultsVisible(Boolean(next.trim()))
    setHoveredNumber(null)
  }

  const scrollToCell = (number: number) => {
    document
      .querySelector(`[data-cell-number="${number}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
  }

  const revealCell = (result: SearchResult) => {
    expandGroup(result.groupId)
    window.requestAnimationFrame(() => scrollToCell(result.number))
  }

  const handleHoverChange = (result: SearchResult | null) => {
    setHoveredNumber(result?.number ?? null)
    if (result) revealCell(result)
  }

  const handleSelect = (result: SearchResult) => {
    setSearch({ query: result.name, selectedNumber: result.number })
    setResultsVisible(false)
    setHoveredNumber(null)
    revealCell(result)
  }

  const handleClearStorage = () => {
    setCellSize(DEFAULT_CELL_SIZE)
    setSearch({ query: '', selectedNumber: null })
    setResultsVisible(false)
    setHoveredNumber(null)
    setCollapsedGroups(new Set())
    setViews({})
  }

  return (
    <main className="min-h-screen bg-(--app-bg) p-2 font-sans text-(--app-text) antialiased md:px-3 md:py-4">
      <div className="mx-auto">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] leading-tight font-semibold sm:text-[28px]">
              Планограммы
            </h1>
            <p className="mt-1 text-sm text-(--muted-text)">
              Товары слева направо, полки сверху вниз
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CellSizeSwitcher onChange={setCellSize} size={cellSize} />
            <button
              className="rounded-xs border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--control-text) transition-colors hover:bg-(--control-hover)"
              onClick={handleClearStorage}
              title="Удалить сохранённые настройки интерфейса"
              type="button"
            >
              Очистить хранилище
            </button>
            <ThemeSwitcher onChange={setTheme} theme={theme} />
          </div>
        </header>

        <div className="sticky top-0 z-30 bg-(--app-bg) pt-4 pb-2">
          <SearchBar
            onHoverChange={handleHoverChange}
            onQueryChange={handleQueryChange}
            onSelect={handleSelect}
            query={query}
            results={results}
            showResults={resultsVisible}
          />
        </div>

        <p className="mt-3.5 mb-5 text-[13px] text-(--muted-text)">
          Позиций: {products.length} · Фейсов: {totalFaces}
        </p>

        <HorizontalPlanogram
          cellSize={cellSize}
          collapsedGroups={collapsedGroups}
          groups={groups}
          matchedNumbers={matchedNumbers}
          onToggleGroup={toggleGroup}
          onViewChange={(id, view) =>
            setViews((current) => ({ ...current, [id]: view }))
          }
          searching={query.trim().length > 0}
          selectedNumber={activeNumber}
          views={views}
        />
      </div>

      <CopyNotification />
    </main>
  )
}

export default App
