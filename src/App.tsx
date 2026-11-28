import { useEffect, useState } from 'react'
import type { SearchState } from '~/App.config'
import {
  addRecentQuery,
  readCellSize,
  readCollapsedGroups,
  readRecentQueries,
  readSearchState,
  readViews,
  scrollToCell,
  writeCellSize,
  writeCollapsedGroups,
  writeRecentQueries,
  writeSearchState,
  writeViews,
} from '~/App.config'
import CellSizeSwitcher from '~/components/CellSizeSwitcher'
import CopyNotification from '~/components/CopyNotification'
import HorizontalPlanogram from '~/components/HorizontalPlanogram'
import SearchBar from '~/components/SearchBar'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import { groups } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import { DEFAULT_CELL_SIZE } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import type { SearchResult } from '~/lib/search'
import { findResultByName, searchProducts } from '~/lib/search'
import { useTheme } from '~/theme'

let App = () => {
  const { theme, setTheme } = useTheme()
  const [cellSize, setCellSize] = useState<CellSize>(readCellSize)
  const [search, setSearch] = useState<SearchState>(readSearchState)
  const [resultsVisible, setResultsVisible] = useState(false)
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)
  const [collapsedGroups, setCollapsedGroups] =
    useState<Set<string>>(readCollapsedGroups)
  const [views, setViews] = useState<Record<string, GroupView>>(readViews)
  const [recentQueries, setRecentQueries] =
    useState<string[]>(readRecentQueries)

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
    writeCellSize(cellSize)
  }, [cellSize])

  useEffect(() => {
    writeSearchState(search)
  }, [search])

  useEffect(() => {
    const handlePopState = () => {
      const next = readSearchState()
      setSearch(next)
      setCollapsedGroups(readCollapsedGroups())
      setViews(readViews())
      setResultsVisible(Boolean(next.query.trim()))
      setHoveredNumber(null)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    writeCollapsedGroups(collapsedGroups)
  }, [collapsedGroups])

  useEffect(() => {
    writeViews(views)
  }, [views])

  useEffect(() => {
    writeRecentQueries(recentQueries)
  }, [recentQueries])

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

  const revealCell = (result: SearchResult) => {
    expandGroup(result.groupId)
    window.requestAnimationFrame(() => scrollToCell(result.number))
  }

  const handleQueryChange = (next: string) => {
    const topResult = next.trim() ? searchProducts(groups, next)[0] : undefined
    setSearch({ query: next, selectedNumber: null })
    setResultsVisible(Boolean(next.trim()))
    setHoveredNumber(topResult?.number ?? null)
    if (topResult) revealCell(topResult)
  }

  const handleHoverChange = (result: SearchResult | null) => {
    setHoveredNumber(result?.number ?? null)
    if (result) revealCell(result)
  }

  const handleSelect = (result: SearchResult) => {
    setSearch({ query: result.name, selectedNumber: result.number })
    setResultsVisible(false)
    setHoveredNumber(null)
    setRecentQueries((current) => addRecentQuery(current, result.name))
    revealCell(result)
  }

  const handleRecentHover = (query: string) => {
    const result = findResultByName(groups, query)
    if (result) handleHoverChange(result)
  }

  const handleRecentSelect = (query: string) => {
    const result = findResultByName(groups, query)
    if (result) handleSelect(result)
  }

  const handleClearStorage = () => {
    setCellSize(DEFAULT_CELL_SIZE)
    setSearch({ query: '', selectedNumber: null })
    setResultsVisible(false)
    setHoveredNumber(null)
    setCollapsedGroups(new Set())
    setViews({})
    setRecentQueries([])
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
            onRecentHover={handleRecentHover}
            onRecentSelect={handleRecentSelect}
            onSelect={handleSelect}
            query={query}
            recentQueries={recentQueries}
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
