import { useState } from 'react'
import CopyNotification from '~/components/CopyNotification'
import HorizontalPlanogram from '~/components/HorizontalPlanogram'
import SearchBar from '~/components/SearchBar'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import { groups } from '~/data/planograms'
import type { SearchResult } from '~/lib/search'
import { searchProducts } from '~/lib/search'
import { useTheme } from '~/theme'

let App = () => {
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [resultsVisible, setResultsVisible] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)

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

  const handleQueryChange = (next: string) => {
    setQuery(next)
    setResultsVisible(Boolean(next.trim()))
    setSelectedNumber(null)
    setHoveredNumber(null)
  }

  const scrollToCell = (number: number) => {
    document
      .querySelector(`[data-cell-number="${number}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' })
  }

  const handleHoverChange = (number: number | null) => {
    setHoveredNumber(number)
    if (number !== null) scrollToCell(number)
  }

  const handleSelect = (result: SearchResult) => {
    setQuery(result.name)
    setResultsVisible(false)
    setSelectedNumber(result.number)
    setHoveredNumber(null)
    scrollToCell(result.number)
  }

  return (
    <main className="min-h-screen bg-(--app-bg) px-3 py-4 font-sans text-(--app-text) antialiased sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[calc(100vw-48px)]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] leading-tight font-semibold sm:text-[28px]">
              Планограммы
            </h1>
            <p className="mt-1 text-sm text-(--muted-text)">
              Товары слева направо, полки сверху вниз
            </p>
          </div>
          <ThemeSwitcher onChange={setTheme} theme={theme} />
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
          groups={groups}
          matchedNumbers={matchedNumbers}
          searching={query.trim().length > 0}
          selectedNumber={activeNumber}
        />
      </div>

      <CopyNotification />
    </main>
  )
}

export default App
