import ProductContent from '~/components/ProductContent'
import ProductTooltip from '~/components/ProductTooltip'
import type { NumberedShelf } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import { cellStyle, firstImage, shelfStyle } from '~/lib/planogram'

type Props = {
  cellSize: CellSize
  shelf: NumberedShelf
  view: GroupView
  disabled: boolean
  matchedNumbers: Set<number>
  searching: boolean
  selectedNumber: number | null
}

let ShelfRow = (props: Props) => {
  const {
    cellSize,
    shelf,
    view,
    disabled,
    matchedNumbers,
    searching,
    selectedNumber,
  } = props

  return (
    <div
      className="flex border-t border-(--border-subtle) py-1"
      style={shelfStyle(shelf, cellSize)}
    >
      {shelf.products.map(({ product, number }, index) => {
        const showFaces = view === 'faces' && Boolean(firstImage(product))
        const matched = matchedNumbers.has(number)
        const selected = selectedNumber === number
        const highlightClass = matched
          ? selected
            ? 'z-10 outline-2 outline-(--group-accent) outline-offset-2'
            : 'outline-1 outline-(--group-accent) outline-offset-2'
          : searching
            ? 'opacity-40'
            : ''

        return (
          <ProductTooltip
            className={`${showFaces ? 'w-full p-1' : 'items-start leading-[1.35]'} ${highlightClass} flex min-w-0 items-stretch justify-between gap-1 rounded-xs border border-(--border) bg-(--group-surface) px-2 pt-2.5 pb-1.5 text-xs`}
            disabled={disabled}
            hideBackground={showFaces}
            key={`${product.name}-${index}`}
            number={number}
            product={product}
            style={cellStyle(product, cellSize)}
          >
            <ProductContent cellSize={cellSize} product={product} view={view} />
          </ProductTooltip>
        )
      })}
    </div>
  )
}

export default ShelfRow
