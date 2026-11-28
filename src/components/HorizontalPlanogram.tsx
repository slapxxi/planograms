import { useState } from 'react'
import DragScrollArea from '~/components/DragScrollArea'
import GroupHeading from '~/components/GroupHeading'
import {
  getGroupView,
  isGroupCollapsed,
} from '~/components/HorizontalPlanogram.config'
import ShelfRow from '~/components/ShelfRow'
import type { Group } from '~/data/planograms'
import { groupStyle, numberProducts } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'

type Props = {
  cellSize: CellSize
  groups: Group[]
  collapsedGroups: Set<string>
  matchedNumbers: Set<number>
  onToggleGroup: (id: string) => void
  onViewChange: (id: string, view: GroupView) => void
  searching: boolean
  selectedNumber: number | null
  views: Record<string, GroupView>
}

let HorizontalPlanogram = (props: Props) => {
  const {
    cellSize,
    groups,
    collapsedGroups,
    matchedNumbers,
    onToggleGroup,
    onViewChange,
    searching,
    selectedNumber,
    views,
  } = props
  const [draggingGroup, setDraggingGroup] = useState<string | null>(null)
  const numberedGroups = numberProducts(groups)

  return (
    <div>
      {numberedGroups.map(({ group, shelves }) => {
        const view = getGroupView(views, group.id)
        const collapsed = isGroupCollapsed(collapsedGroups, group.id)

        return (
          <section
            className="planogram-group mb-6 overflow-x-clip rounded-xs border border-(--border) bg-(--surface)"
            data-group-id={group.id}
            key={group.id}
            style={groupStyle(group)}
          >
            <GroupHeading
              className="sticky top-0 z-20"
              collapsed={collapsed}
              group={group}
              onToggle={() => onToggleGroup(group.id)}
              onViewChange={(next) => onViewChange(group.id, next)}
              view={view}
            />
            {collapsed ? null : (
              <DragScrollArea
                onDraggingChange={(next) =>
                  setDraggingGroup(next ? group.id : null)
                }
              >
                {shelves.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-(--empty-text)">
                    Пока нет товаров
                  </p>
                ) : (
                  shelves.map((shelf, index) => (
                    <ShelfRow
                      cellSize={cellSize}
                      disabled={draggingGroup === group.id}
                      key={index}
                      matchedNumbers={matchedNumbers}
                      searching={searching}
                      selectedNumber={selectedNumber}
                      shelf={shelf}
                      view={view}
                    />
                  ))
                )}
              </DragScrollArea>
            )}
          </section>
        )
      })}
    </div>
  )
}

export default HorizontalPlanogram
