import type { Group } from '~/data/planograms'
import { numberProducts } from '~/data/planograms'

export type SearchResult = {
  number: number
  name: string
  groupId: string
  groupTitle: string
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase('ru-RU').replaceAll('ё', 'е')
}

export function searchProducts(groups: Group[], query: string) {
  const needle = normalize(query)
  if (!needle) return []

  return numberProducts(groups).flatMap(({ group, shelves }) =>
    shelves.flatMap((shelf) =>
      shelf.products
        .map(({ product, number }) => ({
          number,
          name: product.name,
          groupId: group.id,
          groupTitle: group.title,
        }))
        .filter((result) =>
          [result.name, String(result.number), result.groupTitle].some((value) =>
            normalize(value).includes(needle),
          ),
        ),
    ),
  )
}
