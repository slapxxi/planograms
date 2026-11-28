export function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null
  return (
    element?.tagName === 'INPUT' ||
    element?.tagName === 'TEXTAREA' ||
    Boolean(element?.isContentEditable)
  )
}
