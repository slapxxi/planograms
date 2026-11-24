import type { Group } from '../data/planograms'
import { groupStyle, numberProducts } from '../data/planograms'
import GroupHeading from './GroupHeading'
import ProductTooltip from './ProductTooltip'

type Props = {
  groups: Group[]
}

export default function VerticalPlanogram({ groups }: Props) {
  const numberedGroups = numberProducts(groups)

  return (
    <div className="mx-auto w-full max-w-[375px]">
      {numberedGroups.map(({ group, shelves }) => {
        return (
          <section className="mb-7" key={group.id} style={groupStyle(group)}>
            <GroupHeading
              className="rounded-[1px] border border-[#e4e7ec]"
              group={group}
            />
            {shelves.length === 0 ? (
              <p className="px-4 py-4 text-sm text-[#98a2b3]">
                Пока нет товаров
              </p>
            ) : (
              shelves.map((shelf, shelfIndex) => (
                <article
                  className="mt-2.5 rounded-[1px] border border-[#e4e7ec] bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                  key={shelfIndex}
                >
                  <div
                    className="mb-2.5 h-1 rounded-[1px] bg-[var(--group-color)]"
                    aria-hidden="true"
                  />
                  <ul className="flex flex-col gap-2">
                    {shelf.products.map(({ product, number }, index) => (
                      <li
                        className="min-h-[120px] rounded-[1px] bg-[var(--group-bg)] px-2.5 pb-2 pt-3 text-sm leading-[1.4]"
                        key={`${product.name}-${index}`}
                      >
                        <ProductTooltip
                          className="flex w-full items-start justify-between gap-3"
                          number={number}
                          product={product}
                        >
                          <span className="min-w-0 flex-1 break-words">
                            {product.name}
                          </span>
                          <span className="shrink-0 whitespace-nowrap text-[13px] font-bold text-[color:var(--group-color)]">
                            {product.faces} ф.
                          </span>
                        </ProductTooltip>
                      </li>
                    ))}
                  </ul>
                </article>
              ))
            )}
          </section>
        )
      })}
    </div>
  )
}
