import { useEffect, useEffectEvent } from 'react'
import type { RefObject } from 'react'
import { isTypingTarget } from '~/components/SearchBar.config'

export function useSearchShortcuts(
  inputRef: RefObject<HTMLInputElement | null>,
  onQueryChange: (query: string) => void,
) {
  const clearQuery = useEffectEvent(() => onQueryChange(''))

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault()
        inputRef.current?.focus()
      }

      if (
        event.key === 'Escape' &&
        document.activeElement === inputRef.current
      ) {
        clearQuery()
        inputRef.current?.blur()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputRef])
}
