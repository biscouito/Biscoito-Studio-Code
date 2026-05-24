import { useEffect } from 'react'
import { useCommandPaletteStore } from '@stores/commandPaletteStore'

const keyBindings: Record<string, string> = {
  'ctrl+shift+p': 'command-palette.open',
  'ctrl+k ctrl+w': 'editor.closeActiveEditor',
  'ctrl+tab': 'editor.nextTab',
  'ctrl+shift+tab': 'editor.previousTab',
  'ctrl+`': 'terminal.toggleTerminal',
  'ctrl+b': 'sidebar.toggleVisibility',
  'ctrl+f': 'editor.find',
  'ctrl+h': 'editor.replace',
  'ctrl+g': 'editor.goToLine',
  'ctrl+shift+f': 'search.global',
}

export const useKeyboardShortcuts = () => {
  const { setIsOpen, getCommand } = useCommandPaletteStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const ctrlKey = event.ctrlKey || event.metaKey
      const shiftKey = event.shiftKey
      const altKey = event.altKey

      // Command Palette
      if (ctrlKey && shiftKey && event.key === 'p') {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      // Terminal Toggle
      if (ctrlKey && event.key === '`') {
        event.preventDefault()
        const cmd = getCommand('terminal.toggleTerminal')
        cmd?.execute()
        return
      }

      // Sidebar Toggle
      if (ctrlKey && event.key === 'b') {
        event.preventDefault()
        const cmd = getCommand('sidebar.toggleVisibility')
        cmd?.execute()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsOpen, getCommand])
}
