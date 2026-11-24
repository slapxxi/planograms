import type { CSSProperties } from 'react'

export type ViewMode = 'horizontal' | 'vertical'

export type Product = {
  name: string
  faces: number
}

export type Shelf = {
  products: Product[]
}

export type Group = {
  id: string
  title: string
  color: string
  background: string
  shelves: Shelf[]
}

export const groups: Group[] = [
  {
    id: 'milk',
    title: 'Молоко',
    color: '#1565c0',
    background: '#e8f2ff',
    shelves: [
      {
        products: [
          { name: 'Сливки Эрманн/Альпенгурт 100г', faces: 1 },
          { name: 'Сливки Молочный мир 0.5л', faces: 1 },
        ],
      },
    ],
  },
  {
    id: 'kefir',
    title: 'Кефиры',
    color: '#6a1b9a',
    background: '#f3e9fb',
    shelves: [],
  },
  {
    id: 'tvorog',
    title: 'Сметана и творог',
    color: '#2e7d32',
    background: '#e8f6e9',
    shelves: [],
  },
  {
    id: 'yogurt',
    title: 'Йогурты',
    color: '#e65100',
    background: '#fff1e3',
    shelves: [],
  },
  {
    id: 'health',
    title: 'ЗОЖ (здоровое питание)',
    color: '#827717',
    background: '#f6f4dc',
    shelves: [],
  },
  {
    id: 'baby',
    title: 'Детское питание',
    color: '#c2185b',
    background: '#fce8ef',
    shelves: [],
  },
]

export function groupStyle(group: Group): CSSProperties {
  return {
    '--group-color': group.color,
    '--group-bg': group.background,
  } as CSSProperties
}
