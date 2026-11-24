import { useState } from 'react'
import HorizontalPlanogram from './components/HorizontalPlanogram'
import ThemeSwitcher from './components/ThemeSwitcher'
import VerticalPlanogram from './components/VerticalPlanogram'
import { groups } from './data/planograms'
import type { ViewMode } from './data/planograms'
import { useTheme } from './theme'

const modes: { id: ViewMode; label: string }[] = [
  { id: 'horizontal', label: 'Горизонтально' },
  { id: 'vertical', label: 'Вертикально' },
]

export default function App() {
  const [mode, setMode] = useState<ViewMode>('horizontal')
  const { theme, setTheme } = useTheme()

  const products = groups.flatMap((group) =>
    group.shelves.flatMap((shelf) => shelf.products),
  )
  const totalFaces = products.reduce((sum, product) => sum + product.faces, 0)

  return (
    <main className="min-h-screen bg-(--app-bg) px-3 py-4 font-sans text-(--app-text) antialiased sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[calc(100vw-48px)]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] leading-tight font-semibold sm:text-[28px]">
              Планограммы
            </h1>
            <p className="mt-1 text-sm text-(--muted-text)">
              Товары слева направо, полки сверху вниз
            </p>
          </div>
          <div
            className="inline-flex w-full gap-1 rounded-xs bg-(--control-bg) p-1 sm:w-auto"
            role="group"
            aria-label="Режим отображения"
          >
            {modes.map((item) => (
              <button
                className={`${mode === item.id ? 'bg-(--control-active-bg) shadow-sm' : 'text-(--control-text) hover:bg-(--control-hover)'} flex-1 rounded-xs px-3.5 py-2 text-sm font-semibold text-(--control-active-text) transition-colors sm:flex-none`}
                key={item.id}
                onClick={() => setMode(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <ThemeSwitcher onChange={setTheme} theme={theme} />
        </header>

        <p className="mt-3.5 mb-5 text-[13px] text-(--muted-text)">
          Позиций: {products.length} · Фейсов: {totalFaces}
        </p>

        {mode === 'horizontal' ? (
          <HorizontalPlanogram groups={groups} />
        ) : (
          <VerticalPlanogram groups={groups} />
        )}
      </div>
    </main>
  )
}
