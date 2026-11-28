import { useState } from 'react'
import { addRecentQuery } from '~/App.config'
import {
  useCellReveal,
  useCellSizeState,
  useCollapsedGroupsState,
  useGroupViewsState,
  useManualSelection,
  useRecentQueriesState,
  useSearchPreview,
  useSearchState,
  useUrlStateSync,
} from '~/App.hooks'
import CellSizeSwitcher from '~/components/CellSizeSwitcher'
import CopyNotification from '~/components/CopyNotification'
import HorizontalPlanogram from '~/components/HorizontalPlanogram'
import SearchBar from '~/components/SearchBar'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import { groups } from '~/data/planograms'
import { DEFAULT_CELL_SIZE } from '~/lib/constants'
import type { SearchResult } from '~/lib/search'
import { findResultByName, searchProducts } from '~/lib/search'
import { useTheme } from '~/theme'

let App = () => {
  const { theme, setTheme } = useTheme()
  const [cellSize, setCellSize] = useCellSizeState()
  const [search, setSearch] = useSearchState()
  const [resultsVisible, setResultsVisible] = useState(false)
  const [collapsedGroups, setCollapsedGroups] = useCollapsedGroupsState()
  const [views, setViews] = useGroupViewsState()
  const [recentQueries, setRecentQueries] = useRecentQueriesState()
  const {
    clear: clearManualSelection,
    numbers: manualSelectedNumbers,
    resetGroup: resetManualGroup,
    setNumbers: setManualSelection,
    toggle: toggleManualSelection,
  } = useManualSelection()

  const { query, selectedNumber } = search
  const results = searchProducts(groups, query)

  const expandGroup = (id: string) => {
    setCollapsedGroups((current) => {
      if (!current.has(id)) return current
      const next = new Set(current)
      next.delete(id)
      return next
    })
  }

  const revealCell = useCellReveal({ collapsedGroups, expandGroup })

  const {
    clearPreview,
    commitPreview,
    handleHoverChange,
    handleQueryPreview,
    hoveredNumber,
    restorePreview,
  } = useSearchPreview({
    collapsedGroups,
    revealCell,
    setCollapsedGroups,
  })

  const activeNumber = hoveredNumber ?? selectedNumber
  const searchMatchedNumbers =
    activeNumber === null
      ? new Set(results.map((result) => result.number))
      : new Set([activeNumber])
  const matchedNumbers = new Set([
    ...searchMatchedNumbers,
    ...manualSelectedNumbers,
  ])
  const products = groups.flatMap((group) =>
    group.shelves.flatMap((shelf) => shelf.products),
  )
  const totalFaces = products.reduce((sum, product) => sum + product.faces, 0)

  const toggleGroup = (id: string) => {
    setCollapsedGroups((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleQueryChange = (next: string) => {
    if (!next.trim()) {
      restorePreview()
      setSearch({ query: next, selectedNumber: null })
      setResultsVisible(false)
      return
    }

    const topResult = searchProducts(groups, next)[0] ?? null
    setSearch({ query: next, selectedNumber: null })
    setResultsVisible(true)
    handleQueryPreview(topResult)
  }

  const handleUrlQueryChange = (next: string) => {
    clearPreview()
    setResultsVisible(Boolean(next.trim()))
  }

  useUrlStateSync({
    onCollapsedGroups: setCollapsedGroups,
    onManualSelection: setManualSelection,
    onQueryChange: handleUrlQueryChange,
    onSearch: setSearch,
    onViews: setViews,
  })

  const handleSelect = (result: SearchResult) => {
    commitPreview(result)
    setSearch({ query: result.name, selectedNumber: result.number })
    setResultsVisible(false)
    setRecentQueries((current) => addRecentQuery(current, result.name))
    revealCell(result, true)
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
    restorePreview()
    clearManualSelection()
    setCellSize(DEFAULT_CELL_SIZE)
    setSearch({ query: '', selectedNumber: null })
    setResultsVisible(false)
    setCollapsedGroups(new Set())
    setViews({})
    setRecentQueries([])
  }

  return (
    <main className="min-h-screen bg-(--app-bg) px-2 pb-2 font-sans text-(--app-text) antialiased md:px-3 md:pb-4">
      <div className="mx-auto">
        <div className="sticky top-0 z-30 bg-(--app-bg) pt-2 pb-2 md:pt-4">
          <SearchBar
            onHoverChange={handleHoverChange}
            onQueryChange={handleQueryChange}
            onRecentHover={handleRecentHover}
            onRecentSelect={handleRecentSelect}
            onSearchBlur={restorePreview}
            onSelect={handleSelect}
            query={query}
            recentQueries={recentQueries}
            results={results}
            showResults={resultsVisible}
          />
        </div>

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

        <p className="mt-3.5 mb-5 text-[13px] text-(--muted-text)">
          Позиций: {products.length} · Фейсов: {totalFaces}
        </p>

        <HorizontalPlanogram
          cellSize={cellSize}
          collapsedGroups={collapsedGroups}
          groups={groups}
          matchedNumbers={matchedNumbers}
          manualSelectedNumbers={manualSelectedNumbers}
          onResetManualSelection={resetManualGroup}
          onToggleManualSelection={toggleManualSelection}
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
