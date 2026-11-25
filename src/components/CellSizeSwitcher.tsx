import type { CellSize } from '~/lib/constants'
import { CELL_SIZES } from '~/lib/constants'

type Props = {
  size: CellSize
  onChange: (size: CellSize) => void
}

let CellSizeSwitcher = (props: Props) => {
  const { size, onChange } = props

  return (
    <div
      aria-label="Размер ячеек"
      className="inline-flex w-full gap-1 rounded-[2px] bg-(--control-bg) p-1 sm:w-auto"
      role="group"
    >
      {CELL_SIZES.map((item) => (
        <button
          aria-label={`Размер ячеек: ${item.toUpperCase()}`}
          aria-pressed={size === item}
          className={`flex flex-1 items-center justify-center rounded-[2px] px-2.5 py-2 text-xs font-medium uppercase transition-colors sm:flex-none ${size === item ? 'bg-(--control-active-bg) text-(--control-active-text) shadow-sm' : 'text-(--control-text) hover:bg-(--control-hover)'}`}
          key={item}
          onClick={() => onChange(item)}
          title={`Размер ячеек: ${item.toUpperCase()}`}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default CellSizeSwitcher
