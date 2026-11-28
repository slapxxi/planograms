import { useEffect, useEffectEvent, useRef, useState } from 'react'
import {
  NOTICE_DURATION,
  readCopyNotice,
} from '~/components/CopyNotification.config'
import { COPY_NOTIFICATION } from '~/lib/constants'
import type { CopyNotice } from '~/lib/notifications'

export function useCopyNotice() {
  const [notice, setNotice] = useState<CopyNotice | null>(null)
  const timerRef = useRef<number | undefined>(undefined)

  const showNotice = useEffectEvent((event: Event) => {
    setNotice(readCopyNotice(event))
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setNotice(null), NOTICE_DURATION)
  })

  useEffect(() => {
    window.addEventListener(COPY_NOTIFICATION, showNotice)
    return () => {
      window.clearTimeout(timerRef.current)
      window.removeEventListener(COPY_NOTIFICATION, showNotice)
    }
  }, [])

  return notice
}
