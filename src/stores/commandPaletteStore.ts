import { create } from 'zustand'
import { Command } from '@types/index'

interface CommandPaletteState {
  commands: Map<string, Command>
  isOpen: boolean
  searchQuery: string
  
  registerCommand: (command: Command) => void
  unregisterCommand: (commandId: string) => void
  getCommand: (id: string) => Command | undefined
  getAllCommands: () => Command[]
  searchCommands: (query: string) => Command[]
  setIsOpen: (isOpen: boolean) => void
  setSearchQuery: (query: string) => void
}

export const useCommandPaletteStore = create<CommandPaletteState>((set, get) => ({
  commands: new Map(),
  isOpen: false,
  searchQuery: '',

  registerCommand: (command: Command) =>
    set((state) => {
      const newCommands = new Map(state.commands)
      newCommands.set(command.id, command)
      return { commands: newCommands }
    }),

  unregisterCommand: (commandId: string) =>
    set((state) => {
      const newCommands = new Map(state.commands)
      newCommands.delete(commandId)
      return { commands: newCommands }
    }),

  getCommand: (id: string) => get().commands.get(id),

  getAllCommands: () => Array.from(get().commands.values()),

  searchCommands: (query: string) => {
    const commands = Array.from(get().commands.values())
    const lower = query.toLowerCase()
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(lower) ||
        cmd.category.toLowerCase().includes(lower) ||
        cmd.description?.toLowerCase().includes(lower)
    )
  },

  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))
