import { createElement } from 'react'
import type { ReactNode } from 'react'
import type { Theme } from '~/theme'

export const options: { id: Theme; label: string }[] = [
  { id: 'dark', label: 'Тёмная' },
  { id: 'light', label: 'Светлая' },
  { id: 'system', label: 'Система' },
]

export const icons: Record<Theme, ReactNode> = {
  dark: createElement(
    'svg',
    {
      'aria-hidden': true,
      className: 'size-4',
      fill: 'none',
      stroke: 'currentColor',
      strokeLinejoin: 'round',
      strokeWidth: '1.6',
      viewBox: '0 0 24 24',
    },
    createElement('path', {
      d: 'M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z',
    }),
  ),
  light: createElement(
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
    createElement('circle', { cx: '12', cy: '12', r: '4' }),
    createElement('path', {
      d: 'M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    }),
  ),
  system: createElement(
    'svg',
    {
      'aria-hidden': true,
      className: 'size-4',
      fill: 'none',
      stroke: 'currentColor',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '1.6',
      viewBox: '0 0 24 24',
    },
    createElement('rect', {
      height: '13',
      rx: '1.5',
      width: '18',
      x: '3',
      y: '4',
    }),
    createElement('path', { d: 'M8 21h8m-4-4v4' }),
  ),
}
