import type { CopyNotice } from '~/lib/notifications'

export const NOTICE_DURATION = 2200

export function readCopyNotice(event: Event): CopyNotice {
  return (event as CustomEvent<CopyNotice>).detail
}
