import ProductContent from '~/components/ProductContent'
import ProductTooltip from '~/components/ProductTooltip'
import {
  getHighlightClass,
  getPaddingClass,
} from '~/components/ShelfRow.config'
import type { NumberedShelf } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import { cellStyle, firstImage, shelfStyle } from '~/lib/planogram'

type Props = {
  cellSize: CellSize
  shelf: NumberedShelf
  view: GroupView
  matchedNumbers: Set<number>
  manualSelectedNumbers: Set<number>
  onToggleManualSelection: (number: number) => void
  searching: boolean
  selectedNumber: number | null
}

let ShelfRow = (props: Props) => {
  const {
    cellSize,
    shelf,
    view,
    matchedNumbers,
    manualSelectedNumbers,
    onToggleManualSelection,
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
        const manualSelected = manualSelectedNumbers.has(number)
        const selected = selectedNumber === number || manualSelected
        const highlightClass = getHighlightClass({
          matched,
          searching,
          selected,
        })
        const paddingClass = getPaddingClass(showFaces, cellSize)

        return (
          <ProductTooltip
            className={`${showFaces ? 'w-full' : 'items-start leading-[1.35]'} ${paddingClass} ${highlightClass} flex min-w-0 items-stretch justify-between gap-1 rounded-xs border border-(--border) bg-(--group-surface) text-xs`}
            hideBackground={showFaces}
            key={`${product.name}-${index}`}
            number={number}
            onManualToggle={() => onToggleManualSelection(number)}
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
