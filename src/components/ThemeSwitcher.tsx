import type { ReactNode } from 'react'
import type { Theme } from '~/theme'

type Props = {
  theme: Theme
  onChange: (theme: Theme) => void
}

const options: { id: Theme; label: string }[] = [
  { id: 'dark', label: 'Тёмная' },
  { id: 'light', label: 'Светлая' },
  { id: 'system', label: 'Система' },
]

const icons: Record<Theme, ReactNode> = {
  dark: (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
    </svg>
  ),
  light: (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  system: (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <rect height="13" rx="1.5" width="18" x="3" y="4" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  ),
}

let ThemeSwitcher = (props: Props) => {
  const { theme, onChange } = props
  return (
    <div
      aria-label="Тема оформления"
      className="inline-flex w-full gap-1 rounded-[2px] bg-(--control-bg) p-1 sm:w-auto"
      role="group"
    >
      {options.map((item) => (
        <button
          aria-label={item.label}
          aria-pressed={theme === item.id}
          className={`flex flex-1 items-center justify-center rounded-[2px] px-3 py-2 transition-colors sm:flex-none ${theme === item.id ? 'bg-(--control-active-bg) text-(--control-active-text) shadow-sm' : 'text-(--control-text) hover:bg-(--control-hover)'}`}
          key={item.id}
          onClick={() => onChange(item.id)}
          title={item.label}
          type="button"
        >
          {icons[item.id]}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
