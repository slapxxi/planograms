import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { RECENT_QUERIES_LABEL } from '~/components/SearchBar.config'
import { useSearchShortcuts } from '~/components/SearchBar.hooks'
import type { SearchResult } from '~/lib/search'

type Props = {
  query: string
  onQueryChange: (query: string) => void
  results: SearchResult[]
  onSelect: (result: SearchResult) => void
  onHoverChange: (result: SearchResult | null) => void
  onRecentHover: (query: string) => void
  onRecentSelect: (query: string) => void
  recentQueries: string[]
  showResults: boolean
}

let SearchBar = (props: Props) => {
  const {
    query,
    onQueryChange,
    results,
    onSelect,
    onHoverChange,
    onRecentHover,
    onRecentSelect,
    recentQueries,
    showResults,
  } = props
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useSearchShortcuts(inputRef, onQueryChange)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = results[0]
    if (result) onSelect(result)
  }

  return (
    <div className="relative w-full sm:max-w-xl">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[2px] border border-(--border) bg-(--surface) px-2 py-1.5">
          <svg
            aria-hidden="true"
            className="size-4 shrink-0 text-(--muted-text)"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            aria-label="Поиск по планограммам"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-(--empty-text)"
            onChange={(event) => onQueryChange(event.target.value)}
            onBlur={() => {
              setFocused(false)
              onHoverChange(null)
            }}
            onFocus={() => setFocused(true)}
            placeholder="Название товара"
            ref={inputRef}
            value={query}
          />
        </div>
        {query ? (
          <button
            aria-label="Очистить поиск"
            className="shrink-0 rounded-[2px] border border-(--border) bg-(--surface) px-2.5 py-1.5 text-xs text-(--muted-text) hover:bg-(--control-hover)"
            onClick={() => onQueryChange('')}
            onMouseDown={(event) => event.preventDefault()}
            type="button"
          >
            Очистить
          </button>
        ) : null}
      </form>

      {focused &&
      ((query.trim() && showResults) ||
        (!query.trim() && recentQueries.length > 0)) ? (
        <div className="absolute top-full right-0 left-0 z-40 mt-1 rounded-[2px] border border-(--border) bg-(--surface) p-1.5 text-xs shadow-lg">
          {query.trim() ? (
            <>
              <p className="px-1 pb-1 text-(--muted-text)">
                Найдено: {results.length}
              </p>
              {results.length === 0 ? (
                <p className="px-1 py-2 text-(--empty-text)">
                  Ничего не найдено
                </p>
              ) : (
                <ul className="max-h-60 overflow-y-auto">
                  {results.map((result) => (
                    <li key={result.number}>
                      <button
                        className="flex w-full items-center gap-2 rounded-[2px] px-1 py-1.5 text-left hover:bg-(--control-hover)"
                        onClick={() => onSelect(result)}
                        onBlur={() => onHoverChange(null)}
                        onFocus={() => onHoverChange(result)}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => onHoverChange(result)}
                        onMouseLeave={() => onHoverChange(null)}
                        type="button"
                      >
                        <span className="shrink-0 font-semibold text-(--app-text)">
                          {result.number}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {result.name}
                        </span>
                        <span className="shrink-0 text-(--muted-text)">
                          {result.groupTitle}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <p className="px-1 pb-1 text-(--muted-text)">
                {RECENT_QUERIES_LABEL}
              </p>
              <ul className="max-h-60 overflow-y-auto">
                {recentQueries.map((recentQuery) => (
                  <li key={recentQuery}>
                    <button
                      className="flex w-full items-center gap-2 rounded-[2px] px-1 py-1.5 text-left hover:bg-(--control-hover)"
                      onClick={() => onRecentSelect(recentQuery)}
                      onBlur={() => onHoverChange(null)}
                      onFocus={() => onRecentHover(recentQuery)}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => onRecentHover(recentQuery)}
                      onMouseLeave={() => onHoverChange(null)}
                      type="button"
                    >
                      <span className="min-w-0 flex-1 truncate">
                        {recentQuery}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
