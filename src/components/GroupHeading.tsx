import type { CSSProperties } from 'react'
import type { Group } from '../data/planograms'
import { groupStyle } from '../data/planograms'

type Props = {
  group: Group
  className?: string
  style?: CSSProperties
}

export default function GroupHeading({ group, className = '', style }: Props) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-[1px] border-l-[6px] border-[color:var(--group-color)] bg-[var(--group-bg)] px-4 py-3 ${className}`}
      style={{ ...groupStyle(group), ...style }}
    >
      <span
        className="size-2.5 shrink-0 rounded-full bg-[var(--group-color)]"
        aria-hidden="true"
      />
      <h2 className="text-[18px] font-medium leading-tight text-[color:var(--group-color)]">
        {group.title}
      </h2>
    </div>
  )
}
