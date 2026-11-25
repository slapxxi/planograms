import ProductContent from '~/components/ProductContent'
import ProductTooltip from '~/components/ProductTooltip'
import type { NumberedShelf } from '~/data/planograms'
import type { GroupView } from '~/lib/planogram'
import { cellWidth, firstImage, shelfMetrics } from '~/lib/planogram'

type Props = {
  shelf: NumberedShelf
  view: GroupView
  disabled: boolean
}

export default function ShelfRow({ shelf, view, disabled }: Props) {
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
            className={`${showFaces ? 'w-full p-1' : 'items-start leading-[1.35]'} flex min-h-25 min-w-0 items-stretch justify-between gap-1 rounded-[2px] border border-[color:var(--border)] bg-(--group-surface) px-2 pt-2.5 pb-1.5 text-xs`}
            disabled={disabled}
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
