import ProductContent from '~/components/ProductContent'
import ProductTooltip from '~/components/ProductTooltip'
import type { NumberedShelf } from '~/data/planograms'
import type { GroupView } from '~/lib/planogram'
import { cellStyle, firstImage, shelfStyle } from '~/lib/planogram'

type Props = {
  shelf: NumberedShelf
  view: GroupView
  disabled: boolean
}

let ShelfRow = (props: Props) => {
  const { shelf, view, disabled } = props

  return (
    <div
      className="flex border-t border-(--border-subtle) py-1"
      style={shelfStyle(shelf)}
    >
      {shelf.products.map(({ product, number }, index) => {
        const showFaces = view === 'faces' && Boolean(firstImage(product))

        return (
          <ProductTooltip
            className={`${showFaces ? 'w-full p-1' : 'items-start leading-[1.35]'} flex min-w-0 items-stretch justify-between gap-1 rounded-[2px] border border-[color:var(--border)] bg-(--group-surface) px-2 pt-2.5 pb-1.5 text-xs`}
            disabled={disabled}
            hideBackground={showFaces}
            key={`${product.name}-${index}`}
            number={number}
            product={product}
            style={cellStyle(product)}
          >
            <ProductContent product={product} view={view} />
          </ProductTooltip>
        )
      })}
    </div>
  )
}

export default ShelfRow
