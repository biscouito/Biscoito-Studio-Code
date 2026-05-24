import { useEffect } from 'react'
import { useCommandPaletteStore } from '@stores/commandPaletteStore'
import { Command } from '@types/index'

export const useCommandSystem = () => {
  const { registerCommand, unregisterCommand } = useCommandPaletteStore()

  const register = (command: Command) => {
    registerCommand(command)
    return () => unregisterCommand(command.id)
  }

  return { register }
}
