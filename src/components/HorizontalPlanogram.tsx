import type { Group, Shelf } from '../data/planograms'
import { groupStyle } from '../data/planograms'
import GroupHeading from './GroupHeading'

type Props = {
  groups: Group[]
}

function ShelfRow({ shelf }: { shelf: Shelf }) {
  const facings = shelf.products.reduce(
    (sum, product) => sum + product.faces,
    0,
  )

  return (
    <div
      className="grid gap-1 border-t border-[#eef0f3] px-3 py-2"
      style={{
        gridTemplateColumns: `repeat(${facings}, minmax(96px, 1fr))`,
        minWidth: `${facings * 96}px`,
      }}
    >
      {shelf.products.map((product, index) => (
        <div
          className="flex min-h-14 items-center justify-between gap-2 rounded-[1px] border border-[#e4e7ec] bg-[var(--group-bg)] px-2.5 py-2 text-[13px] leading-[1.35]"
          key={`${product.name}-${index}`}
          style={{ gridColumn: `span ${product.faces}` }}
        >
          <span className="break-words">{product.name}</span>
          <span className="shrink-0 rounded-[1px] bg-white px-1.5 py-0.5 text-xs font-bold text-[color:var(--group-color)]">
            {product.faces}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HorizontalPlanogram({ groups }: Props) {
  return (
    <div>
      {groups.map((group) => {
        const shelves = group.shelves.filter(
          (shelf) => shelf.products.length > 0,
        )

        return (
          <section
            className="mb-6 overflow-x-auto rounded-[1px] border border-[#e4e7ec] bg-white"
            key={group.id}
            style={groupStyle(group)}
          >
            <GroupHeading group={group} />
            {shelves.length === 0 ? (
              <p className="px-4 py-4 text-sm text-[#98a2b3]">
                Пока нет товаров
              </p>
            ) : (
              shelves.map((shelf, index) => (
                <ShelfRow key={index} shelf={shelf} />
              ))
            )}
          </section>
        )
      })}
    </div>
  )
}
