import type { Product } from '~/data/planograms'
import type { CellSize } from '~/lib/constants'
import type { GroupView } from '~/lib/planogram'
import { firstImage } from '~/lib/planogram'

type Props = {
  cellSize: CellSize
  product: Product
  view: GroupView
}

const imageMaxHeight: Record<CellSize, string> = {
  xs: 'max-h-22',
  sm: 'max-h-28',
  md: 'max-h-35',
  lg: 'max-h-42',
}

let ProductContent = (props: Props) => {
  const { cellSize, product, view } = props
  const image = firstImage(product)

  if (view === 'faces' && image) {
    return (
      <span aria-hidden="true" className="flex w-full">
        {Array.from({ length: product.faces }, (_, index) => (
          <span
            className="flex min-w-0 flex-1 items-end justify-center border-r border-(--border-subtle) p-1 last:border-r-0"
            key={index}
          >
            <img
              alt=""
              className={`max-w-full object-contain object-bottom ${imageMaxHeight[cellSize]}`}
              draggable={false}
              src={image.src}
            />
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      <span
        className="line-clamp-6 min-w-0 flex-1 wrap-break-word"
        title={product.name}
      >
        {product.name}
      </span>
      <span className="shrink-0 self-start rounded-xs bg-(--surface) px-1.5 py-0.5 text-[11px] font-bold text-(--group-accent)">
        {product.faces}
      </span>
    </>
  )
}

export default ProductContent
