import type { CSSProperties, ReactNode } from 'react'
import type { Group } from '../data/planograms'
import { groupStyle } from '../data/planograms'

export type GroupView = 'cards' | 'faces'

type Props = {
  group: Group
  view: GroupView
  onViewChange: (view: GroupView) => void
  className?: string
  style?: CSSProperties
}

const views: { id: GroupView; label: string; icon: ReactNode }[] = [
  {
    id: 'cards',
    label: 'Названия',
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path d="M4 6h16M4 12h10M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'faces',
    label: 'Фейсы',
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <rect height="14" rx="1" width="5" x="3" y="5" />
        <rect height="14" rx="1" width="5" x="9.5" y="5" />
        <rect height="14" rx="1" width="5" x="16" y="5" />
      </svg>
    ),
  },
]

export default function GroupHeading({
  group,
  view,
  onViewChange,
  className = '',
  style,
}: Props) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-[2px] border-l-[6px] border-[color:var(--group-accent)] bg-(--group-surface) px-4 py-3 ${className}`}
      style={{ ...groupStyle(group), ...style }}
    >
      <span
        className="size-2.5 shrink-0 rounded-full bg-(--group-accent)"
        aria-hidden="true"
      />
      <h2 className="text-[18px] font-medium leading-tight text-(--group-accent)">
        {group.title}
      </h2>
      <div
        aria-label={`Вид таблицы: ${group.title}`}
        className="flex gap-1 pl-1"
        role="group"
      >
        {views.map((item) => (
          <button
            aria-label={item.label}
            aria-pressed={view === item.id}
            className={`flex size-7 items-center justify-center rounded-[2px] border border-[color:var(--border)] transition-colors ${view === item.id ? 'bg-(--control-active-bg) text-(--control-active-text)' : 'text-(--control-text) hover:bg-(--control-hover)'}`}
            key={item.id}
            onClick={() => onViewChange(item.id)}
            title={item.label}
            type="button"
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
