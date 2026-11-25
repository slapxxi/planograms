import type { Product } from '~/data/planograms'
import type { GroupView } from '~/lib/planogram'
import { firstImage } from '~/lib/planogram'

type Props = {
  product: Product
  view: GroupView
}

export default function ProductContent({ product, view }: Props) {
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
              className="size-10 max-w-full object-contain object-bottom"
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
        className="line-clamp-2 min-w-0 flex-1 wrap-break-word"
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
