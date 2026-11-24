import { useState } from 'react'
import HorizontalPlanogram from './components/HorizontalPlanogram'
import VerticalPlanogram from './components/VerticalPlanogram'
import { groups } from './data/planograms'
import type { ViewMode } from './data/planograms'

const modes: { id: ViewMode; label: string }[] = [
  { id: 'horizontal', label: 'Горизонтально' },
  { id: 'vertical', label: 'Вертикально' },
]

export default function App() {
  const [mode, setMode] = useState<ViewMode>('horizontal')

  const products = groups.flatMap((group) =>
    group.shelves.flatMap((shelf) => shelf.products),
  )
  const totalFaces = products.reduce((sum, product) => sum + product.faces, 0)

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-3 py-4 font-sans text-[#1f2430] antialiased sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[calc(100vw-48px)]">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-semibold leading-tight sm:text-[28px]">
              Планограммы
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Товары слева направо, полки сверху вниз
            </p>
          </div>
          <div
            className="inline-flex w-full gap-1 rounded-[1px] bg-[#e9ecf1] p-1 sm:w-auto"
            role="group"
            aria-label="Режим отображения"
          >
            {modes.map((item) => (
              <button
                className={`flex-1 rounded-[1px] px-3.5 py-2 text-sm text-[#475467] transition-colors hover:bg-white/60 sm:flex-none ${mode === item.id ? 'bg-white font-semibold text-[#101828] shadow-sm' : ''}`}
                key={item.id}
                onClick={() => setMode(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <p className="mb-5 mt-3.5 text-[13px] text-[#667085]">
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
