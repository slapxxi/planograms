import type { Group, NumberedShelf, Product } from '../data/planograms'
import { groupStyle, numberProducts } from '../data/planograms'
import GroupHeading from './GroupHeading'
import ProductTooltip from './ProductTooltip'

type Props = {
  groups: Group[]
}

const FACE_WIDTH = 120
const GAP = 4
const PADDING_X = 24

function cellWidth(product: Product) {
  const span = product.faceSpan ?? product.faces
  return span * FACE_WIDTH + (span - 1) * GAP
}

function shelfMetrics(shelf: NumberedShelf) {
  const width =
    shelf.products.reduce((sum, item) => sum + cellWidth(item.product), 0) +
    Math.max(0, shelf.products.length - 1) * GAP +
    PADDING_X

  return { width }
}

function ShelfRow({ shelf }: { shelf: NumberedShelf }) {
  const { width } = shelfMetrics(shelf)

  return (
    <div
      className="flex gap-1 border-t border-[#eef0f3] px-3 py-2"
      style={{ width: `${width}px` }}
    >
      {shelf.products.map(({ product, number }, index) => (
        <ProductTooltip
          className="flex min-h-30 min-w-0 items-start justify-between gap-2 
          rounded-[1px] border border-[#e4e7ec] bg-(--group-bg) px-2.5 pt-3 pb-2 text-xs leading-[1.35]"
          key={`${product.name}-${index}`}
          number={number}
          product={product}
          style={{ flex: '0 0 auto', width: `${cellWidth(product)}px` }}
        >
          <span className="min-w-0 flex-1 wrap-break-word">{product.name}</span>
          <span className="shrink-0 self-start rounded-[1px] bg-white px-1.5 py-0.5 text-xs font-bold text-(--group-color)">
            {product.faces}
          </span>
        </ProductTooltip>
      ))}
    </div>
  )
}

export default function HorizontalPlanogram({ groups }: Props) {
  const numberedGroups = numberProducts(groups)

  return (
    <div>
      {numberedGroups.map(({ group, shelves }) => {
        const tableWidth = Math.max(
          0,
          ...shelves.map((shelf) => shelfMetrics(shelf).width),
        )

        return (
          <section
            className="mb-6 overflow-x-auto rounded-[1px] border border-[#e4e7ec] bg-white"
            key={group.id}
            style={groupStyle(group)}
          >
            <GroupHeading
              className="sticky left-0 z-10 min-w-full"
              group={group}
              style={tableWidth > 0 ? { width: `${tableWidth}px` } : undefined}
            />
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
