import HorizontalPlanogram from '~/components/HorizontalPlanogram'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import { groups } from '~/data/planograms'
import { useTheme } from '~/theme'

export default function App() {
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
          <ThemeSwitcher onChange={setTheme} theme={theme} />
        </header>

        <p className="mt-3.5 mb-5 text-[13px] text-(--muted-text)">
          Позиций: {products.length} · Фейсов: {totalFaces}
        </p>

        <HorizontalPlanogram groups={groups} />
      </div>
    </main>
  )
}
