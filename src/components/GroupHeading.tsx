import type { CSSProperties } from 'react'
import { views } from '~/components/GroupHeading.config'
import type { Group } from '~/data/planograms'
import { groupStyle } from '~/data/planograms'
import type { GroupView } from '~/lib/planogram'

type Props = {
  group: Group
  view: GroupView
  onViewChange: (view: GroupView) => void
  onToggle: () => void
  collapsed: boolean
  className?: string
  style?: CSSProperties
}

let GroupHeading = (props: Props) => {
  const {
    group,
    view,
    onViewChange,
    onToggle,
    collapsed,
    className = '',
    style,
  } = props
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
      <button
        aria-expanded={!collapsed}
        aria-label={`${collapsed ? 'Развернуть' : 'Свернуть'} таблицу: ${group.title}`}
        className={`flex size-7 items-center justify-center rounded-[2px] border border-[color:var(--border)] transition-colors ${collapsed ? 'bg-(--control-active-bg) text-(--control-active-text)' : 'text-(--control-text) hover:bg-(--control-hover)'}`}
        onClick={onToggle}
        title={`${collapsed ? 'Развернуть' : 'Свернуть'} таблицу: ${group.title}`}
        type="button"
      >
        <svg
          aria-hidden="true"
          className={`size-4 transition-transform ${collapsed ? '-rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
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

export default GroupHeading
