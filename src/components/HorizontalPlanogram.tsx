import { useState } from 'react'
import type { Group, NumberedShelf, Product } from '../data/planograms'
import { groupStyle, numberProducts } from '../data/planograms'
import { productImages } from '../data/productImages'
import GroupHeading from './GroupHeading'
import type { GroupView } from './GroupHeading'
import ProductTooltip from './ProductTooltip'

type Props = {
  groups: Group[]
}

const FACE_WIDTH = 120
const GAP = 4
const PADDING_X = 24

function firstImage(product: Product) {
  for (const key of product.images ?? []) {
    const image = productImages[key]
    if (image) return image
  }
  return undefined
}

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

function ProductContent({
  product,
  view,
}: {
  product: Product
  view: GroupView
}) {
  const image = firstImage(product)
  if (view === 'faces' && image) {
    return (
      <span aria-hidden="true" className="flex min-h-25 w-full items-stretch">
        {Array.from({ length: product.faces }, (_, index) => (
          <span
            className="flex min-w-0 flex-1 items-end justify-center border-r border-[color:var(--border-subtle)] p-1 last:border-r-0"
            key={index}
          >
            <img
              alt=""
              className="max-h-full max-w-full object-contain"
              src={image.src}
            />
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      <span className="min-w-0 flex-1 wrap-break-word">{product.name}</span>
      <span className="shrink-0 self-start rounded-xs bg-(--surface) px-1.5 py-0.5 text-xs font-bold text-(--group-accent)">
        {product.faces}
      </span>
    </>
  )
}

function ShelfRow({ shelf, view }: { shelf: NumberedShelf; view: GroupView }) {
  const { width } = shelfMetrics(shelf)

  return (
    <div
      className="flex gap-1 border-t border-[color:var(--border-subtle)] px-3 py-2"
      style={{ width: `${width}px` }}
    >
      {shelf.products.map(({ product, number }, index) => {
        const showFaces = view === 'faces' && Boolean(firstImage(product))
        return (
          <ProductTooltip
            className={`${showFaces ? 'w-full p-1' : 'items-start leading-[1.35]'} flex min-h-25 min-w-0 items-stretch justify-between gap-2 rounded-[2px] border border-[color:var(--border)] bg-(--group-surface) px-2.5 pt-3 pb-2 text-xs`}
            hideBackground={showFaces}
            key={`${product.name}-${index}`}
            number={number}
            product={product}
            style={{ flex: '0 0 auto', width: `${cellWidth(product)}px` }}
          >
            <ProductContent product={product} view={view} />
          </ProductTooltip>
        )
      })}
    </div>
  )
}

export default function HorizontalPlanogram({ groups }: Props) {
  const [views, setViews] = useState<Record<string, GroupView>>({})
  const numberedGroups = numberProducts(groups)

  return (
    <div>
      {numberedGroups.map(({ group, shelves }) => {
        const view = views[group.id] ?? 'cards'

        return (
          <section
            className="planogram-group mb-6 overflow-x-clip rounded-[2px] border border-[color:var(--border)] bg-(--surface)"
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
            <div className="overflow-x-auto">
              {shelves.length === 0 ? (
                <p className="px-4 py-4 text-sm text-(--empty-text)">
                  Пока нет товаров
                </p>
              ) : (
                shelves.map((shelf, index) => (
                  <ShelfRow key={index} shelf={shelf} view={view} />
                ))
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
