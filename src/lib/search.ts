import type { Group } from '~/data/planograms'
import { numberProducts } from '~/data/planograms'

export type SearchResult = {
  number: number
  name: string
  groupId: string
  groupTitle: string
}

function normalize(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('ru-RU')
    .replaceAll('ё', 'е')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

function editDistance(left: string, right: string) {
  const width = right.length + 1
  let previous = Array.from({ length: width }, (_, index) => index)
  let previousPrevious: number[] = []

  for (let i = 1; i <= left.length; i++) {
    const current = [i]

    for (let j = 1; j < width; j++) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1
      let value = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      )

      if (
        i > 1 &&
        j > 1 &&
        left[i - 1] === right[j - 2] &&
        left[i - 2] === right[j - 1]
      ) {
        value = Math.min(value, previousPrevious[j - 2] + 1)
      }

      current[j] = value
    }

    previousPrevious = previous
    previous = current
  }

  return previous[width - 1]
}

function tokenScore(needle: string, token: string) {
  if (token === needle) return 0
  if (token.startsWith(needle)) return 1
  if (token.includes(needle)) return 2
  if (!/\p{L}/u.test(needle)) return Infinity

  const maxDistance = needle.length >= 7 ? 2 : needle.length >= 4 ? 1 : 0
  const distance = editDistance(needle, token)
  return distance <= maxDistance ? 3 + distance : Infinity
}

function sequenceScore(needles: string[], tokens: string[]) {
  let score = 0
  let start = 0

  for (const needle of needles) {
    let best = Infinity
    let bestIndex = -1

    for (let index = start; index < tokens.length; index++) {
      const current = tokenScore(needle, tokens[index])
      if (current < best) {
        best = current
        bestIndex = index
      }
      if (best === 0) break
    }

    if (!Number.isFinite(best)) return Infinity

    score += best
    start = bestIndex + 1
  }

  return score
}

function fieldScore(query: string, needles: string[], value: string) {
  const normalized = normalize(value)
  if (!normalized) return Infinity
  if (normalized.includes(query)) return 0

  return sequenceScore(needles, normalized.split(' ').filter(Boolean))
}

export function searchProducts(groups: Group[], query: string) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  const needles = normalizedQuery.split(' ').filter(Boolean)

  return numberProducts(groups)
    .flatMap(({ group, shelves }) =>
      shelves.flatMap((shelf) =>
        shelf.products.map(({ product, number }) => ({
          number,
          name: product.name,
          groupId: group.id,
          groupTitle: group.title,
          score: fieldScore(normalizedQuery, needles, product.name),
        })),
      ),
    )
    .filter((result) => Number.isFinite(result.score))
    .sort((left, right) => left.score - right.score)
    .map(({ score: _score, ...result }) => result)
}
