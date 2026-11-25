import { useEffect, useState } from 'react'
import { COPY_NOTIFICATION } from '~/lib/constants'
import type { CopyNotice } from '~/lib/notifications'

let CopyNotification = () => {
  const [notice, setNotice] = useState<CopyNotice | null>(null)

  useEffect(() => {
    let timer: number | undefined

    const handleNotice = (event: Event) => {
      setNotice((event as CustomEvent<CopyNotice>).detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setNotice(null), 2200)
    }

    window.addEventListener(COPY_NOTIFICATION, handleNotice)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(COPY_NOTIFICATION, handleNotice)
    }
  }, [])

  if (!notice) return null

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 left-1/2 z-50 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 rounded-[2px] border border-(--border) bg-(--surface) px-3 py-2 text-xs text-(--app-text) shadow-lg"
      role="status"
    >
      <p className="font-medium">{notice.title}</p>
      {notice.text ? (
        <p className="mt-0.5 truncate text-(--muted-text)" title={notice.text}>
          {notice.text}
        </p>
      ) : null}
    </div>
  )
}

export default CopyNotification
