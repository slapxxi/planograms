import { icons, options } from '~/components/ThemeSwitcher.config'
import type { Theme } from '~/theme'

type Props = {
  theme: Theme
  onChange: (theme: Theme) => void
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
