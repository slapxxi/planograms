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

function readSearchState(): SearchState {
  const saved = readStorage<{ query?: unknown; selectedNumber?: unknown }>(
    STORAGE_KEYS.search,
    {},
  )
  const numbers = new Set(
    numberProducts(groups).flatMap(({ shelves }) =>
      shelves.flatMap((shelf) => shelf.products.map(({ number }) => number)),
    ),
  )

  return {
    query: typeof saved.query === 'string' ? saved.query : '',
    selectedNumber:
      typeof saved.selectedNumber === 'number' &&
      numbers.has(saved.selectedNumber)
        ? saved.selectedNumber
        : null,
  }
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
  const saved = readStorage<Record<string, unknown>>(STORAGE_KEYS.views, {})
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {}
  const ids = new Set(groups.map((group) => group.id))

  return Object.fromEntries(
    Object.entries(saved).filter(
      ([id, view]) => ids.has(id) && (view === 'cards' || view === 'faces'),
    ),
  ) as Record<string, GroupView>
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
    if (!search.query && search.selectedNumber === null)
      removeStorage(STORAGE_KEYS.search)
    else writeStorage(STORAGE_KEYS.search, search)
  }, [search])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.collapsed, [...collapsedGroups])
  }, [collapsedGroups])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.views, views)
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
