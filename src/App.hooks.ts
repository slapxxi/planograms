import { useEffect, useEffectEvent, useState } from 'react'
import {
  readCellSize,
  readCollapsedGroups,
  readRecentQueries,
  readSearchState,
  readViews,
  writeCellSize,
  writeCollapsedGroups,
  writeRecentQueries,
  writeSearchState,
  writeViews,
} from '~/App.config'
import type { SearchState } from '~/App.config'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'

export function useCellSizeState() {
  const [cellSize, setCellSize] = useState<CellSize>(readCellSize)
  useEffect(() => writeCellSize(cellSize), [cellSize])
  return [cellSize, setCellSize] as const
}

export function useSearchState() {
  const [search, setSearch] = useState<SearchState>(readSearchState)
  useEffect(() => writeSearchState(search), [search])
  return [search, setSearch] as const
}

export function useCollapsedGroupsState() {
  const [collapsedGroups, setCollapsedGroups] =
    useState<Set<string>>(readCollapsedGroups)
  useEffect(() => writeCollapsedGroups(collapsedGroups), [collapsedGroups])
  return [collapsedGroups, setCollapsedGroups] as const
}

export function useGroupViewsState() {
  const [views, setViews] = useState<Record<string, GroupView>>(readViews)
  useEffect(() => writeViews(views), [views])
  return [views, setViews] as const
}

export function useRecentQueriesState() {
  const [recentQueries, setRecentQueries] =
    useState<string[]>(readRecentQueries)
  useEffect(() => writeRecentQueries(recentQueries), [recentQueries])
  return [recentQueries, setRecentQueries] as const
}

type UrlStateSyncHandlers = {
  onCollapsedGroups: (groups: Set<string>) => void
  onQueryChange: (query: string) => void
  onSearch: (search: SearchState) => void
  onViews: (views: Record<string, GroupView>) => void
}

export function useUrlStateSync(handlers: UrlStateSyncHandlers) {
  const handlePopState = useEffectEvent(() => {
    const next = readSearchState()
    handlers.onSearch(next)
    handlers.onCollapsedGroups(readCollapsedGroups())
    handlers.onViews(readViews())
    handlers.onQueryChange(next.query)
  })

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
}
