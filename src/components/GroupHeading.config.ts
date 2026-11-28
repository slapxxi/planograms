import { createElement } from 'react'
import type { ReactNode } from 'react'
import type { GroupView } from '~/lib/planogram'

export type GroupViewOption = {
  id: GroupView
  label: string
  icon: ReactNode
}

export const views: GroupViewOption[] = [
  {
    id: 'cards',
    label: 'Названия',
    icon: createElement(
      'svg',
      {
        'aria-hidden': true,
        className: 'size-4',
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeWidth: '1.6',
        viewBox: '0 0 24 24',
      },
      createElement('path', { d: 'M4 6h16M4 12h10M4 18h16' }),
    ),
  },
  {
    id: 'faces',
    label: 'Фейсы',
    icon: createElement(
      'svg',
      {
        'aria-hidden': true,
        className: 'size-4',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '1.6',
        viewBox: '0 0 24 24',
      },
      createElement('rect', {
        height: '14',
        rx: '1',
        width: '5',
        x: '3',
        y: '5',
      }),
      createElement('rect', {
        height: '14',
        rx: '1',
        width: '5',
        x: '9.5',
        y: '5',
      }),
      createElement('rect', {
        height: '14',
        rx: '1',
        width: '5',
        x: '16',
        y: '5',
      }),
    ),
  },
]
