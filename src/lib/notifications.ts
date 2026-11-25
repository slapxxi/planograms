import { COPY_NOTIFICATION } from '~/lib/constants'

export type CopyNotice = {
  title: string
  text?: string
}

export function notifyCopy(detail: CopyNotice) {
  window.dispatchEvent(new CustomEvent<CopyNotice>(COPY_NOTIFICATION, { detail }))
}
