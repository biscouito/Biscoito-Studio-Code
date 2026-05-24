import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WorkspaceConfig } from '@types/index'

interface WorkspaceState {
  workspaces: Map<string, WorkspaceConfig>
  activeWorkspace: WorkspaceConfig | null
  
  initializeWorkspace: () => void
  setActiveWorkspace: (workspace: WorkspaceConfig) => void
  createWorkspace: (config: WorkspaceConfig) => void
  saveWorkspace: (config: WorkspaceConfig) => void
}

export const useWorkspaceStore = create<WorkspaceState>(
  persist(
    (set) => ({
      workspaces: new Map(),
      activeWorkspace: null,

      initializeWorkspace: () => {
        set((state) => {
          const workspaces = Array.from(state.workspaces.values())
          const first = workspaces[0]
          return { activeWorkspace: first || null }
        })
      },

      setActiveWorkspace: (workspace: WorkspaceConfig) => set({ activeWorkspace: workspace }),

      createWorkspace: (config: WorkspaceConfig) =>
        set((state) => {
          const newWorkspaces = new Map(state.workspaces)
          newWorkspaces.set(config.name, config)
          return { workspaces: newWorkspaces, activeWorkspace: config }
        }),

      saveWorkspace: (config: WorkspaceConfig) =>
        set((state) => {
          const newWorkspaces = new Map(state.workspaces)
          newWorkspaces.set(config.name, config)
          return { workspaces: newWorkspaces }
        }),
    }),
    {
      name: 'workspace-storage',
    }
  )
)
