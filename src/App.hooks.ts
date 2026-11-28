import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  readCellSize,
  readCollapsedGroups,
  readManualSelection,
  readRecentQueries,
  readSearchState,
  readViews,
  writeCellSize,
  writeCollapsedGroups,
  writeManualSelection,
  writeRecentQueries,
  writeSearchState,
  writeViews,
  scrollToCell,
} from '~/App.config'
import type { SearchState } from '~/App.config'
import { groups, numberProducts } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import type { SearchResult } from '~/lib/search'

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

export function useManualSelection() {
  const [numbers, setNumbers] = useState<Set<number>>(readManualSelection)
  useEffect(() => writeManualSelection(numbers), [numbers])

  const toggle = (number: number) => {
    setNumbers((current) => {
      const next = new Set(current)
      if (next.has(number)) next.delete(number)
      else next.add(number)
      return next
    })
  }

  const resetGroup = (groupId: string) => {
    setNumbers((current) => {
      if (current.size === 0) return current
      const numberedGroup = numberProducts(groups).find(
        ({ group }) => group.id === groupId,
      )
      if (!numberedGroup) return current
      const groupNumbers = new Set(
        numberedGroup.shelves.flatMap((shelf) =>
          shelf.products.map(({ number }) => number),
        ),
      )
      const next = new Set(current)
      let changed = false
      for (const number of groupNumbers) {
        if (next.delete(number)) changed = true
      }
      return changed ? next : current
    })
  }

  const clear = () => setNumbers(new Set<number>())

  return { clear, numbers, resetGroup, setNumbers, toggle }
}

type UrlStateSyncHandlers = {
  onCollapsedGroups: (groups: Set<string>) => void
  onManualSelection: (numbers: Set<number>) => void
  onQueryChange: (query: string) => void
  onSearch: (search: SearchState) => void
  onViews: (views: Record<string, GroupView>) => void
}

export function useUrlStateSync(handlers: UrlStateSyncHandlers) {
  const handlePopState = useEffectEvent(() => {
    const next = readSearchState()
    handlers.onSearch(next)
    handlers.onCollapsedGroups(readCollapsedGroups())
    handlers.onManualSelection(readManualSelection())
    handlers.onViews(readViews())
    handlers.onQueryChange(next.query)
  })

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
}

type CellRevealOptions = {
  collapsedGroups: Set<string>
  expandGroup: (id: string) => void
}

export function useCellReveal(options: CellRevealOptions) {
  const { collapsedGroups, expandGroup } = options
  const pendingRef = useRef<{ focusElement: boolean; number: number } | null>(
    null,
  )

  useLayoutEffect(() => {
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    scrollToCell(pending.number, pending.focusElement)
  }, [collapsedGroups])

  return (result: SearchResult, focusElement = false) => {
    if (!collapsedGroups.has(result.groupId)) {
      pendingRef.current = null
      scrollToCell(result.number, focusElement)
      return
    }

    pendingRef.current = { focusElement, number: result.number }
    expandGroup(result.groupId)
  }
}

type SearchPreviewOptions = {
  collapsedGroups: Set<string>
  revealCell: (result: SearchResult, focus?: boolean) => void
  setCollapsedGroups: Dispatch<SetStateAction<Set<string>>>
}

export function useSearchPreview(options: SearchPreviewOptions) {
  const { collapsedGroups, revealCell, setCollapsedGroups } = options
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)
  const snapshotRef = useRef<Set<string> | null>(null)

  const capturePreview = () => {
    if (!snapshotRef.current) snapshotRef.current = new Set(collapsedGroups)
  }

  const showPreview = (result: SearchResult) => {
    capturePreview()
    setHoveredNumber(result.number)
    revealCell(result)
  }

  const restorePreview = () => {
    setHoveredNumber(null)
    const snapshot = snapshotRef.current
    snapshotRef.current = null
    if (snapshot) setCollapsedGroups(snapshot)
  }

  const clearPreview = () => {
    snapshotRef.current = null
    setHoveredNumber(null)
  }

  const commitPreview = (result: SearchResult) => {
    const snapshot = snapshotRef.current
    snapshotRef.current = null
    setHoveredNumber(null)
    if (!snapshot) return
    const next = new Set(snapshot)
    next.delete(result.groupId)
    setCollapsedGroups(next)
  }

  const handleHoverChange = (result: SearchResult | null) => {
    if (result) showPreview(result)
  }

  const handleQueryPreview = (result: SearchResult | null) => {
    if (result) showPreview(result)
    else setHoveredNumber(null)
  }

  return {
    clearPreview,
    commitPreview,
    handleHoverChange,
    handleQueryPreview,
    hoveredNumber,
    restorePreview,
  }
}
