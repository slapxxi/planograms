import { useCopyNotice } from '~/components/CopyNotification.hooks'

let CopyNotification = () => {
  const notice = useCopyNotice()

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
