import { useState } from 'react'
import DragScrollArea from '~/components/DragScrollArea'
import GroupHeading from '~/components/GroupHeading'
import ShelfRow from '~/components/ShelfRow'
import type { Group } from '~/data/planograms'
import { groupStyle, numberProducts } from '~/data/planograms'
import type { GroupView } from '~/lib/planogram'

type Props = {
  groups: Group[]
}

export default function HorizontalPlanogram({ groups }: Props) {
  const [views, setViews] = useState<Record<string, GroupView>>({})
  const [draggingGroup, setDraggingGroup] = useState<string | null>(null)
  const numberedGroups = numberProducts(groups)

  return (
    <div>
      {numberedGroups.map(({ group, shelves }) => {
        const view = views[group.id] ?? 'cards'

        return (
          <section
            className="planogram-group mb-6 overflow-x-clip rounded-xs border border-(--border) bg-(--surface)"
            key={group.id}
            style={groupStyle(group)}
          >
            <GroupHeading
              className="sticky top-0 z-20"
              group={group}
              onViewChange={(next) =>
                setViews((current) => ({ ...current, [group.id]: next }))
              }
              view={view}
            />
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
                    disabled={draggingGroup === group.id}
                    key={index}
                    shelf={shelf}
                    view={view}
                  />
                ))
              )}
            </DragScrollArea>
          </section>
        )
      })}
    </div>
  )
}
