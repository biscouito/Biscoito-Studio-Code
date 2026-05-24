import { create } from 'zustand'
import { FileNode } from '@types/index'

interface FileExplorerState {
  rootNodes: FileNode[]
  expandedFolders: Set<string>
  selectedNode: FileNode | null
  
  setRootNodes: (nodes: FileNode[]) => void
  toggleFolder: (nodeId: string) => void
  selectNode: (node: FileNode | null) => void
  updateFileTree: (nodes: FileNode[]) => void
}

export const useFileExplorerStore = create<FileExplorerState>((set) => ({
  rootNodes: [],
  expandedFolders: new Set(),
  selectedNode: null,

  setRootNodes: (nodes: FileNode[]) => set({ rootNodes: nodes }),

  toggleFolder: (nodeId: string) =>
    set((state) => {
      const newExpanded = new Set(state.expandedFolders)
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId)
      } else {
        newExpanded.add(nodeId)
      }
      return { expandedFolders: newExpanded }
    }),

  selectNode: (node: FileNode | null) => set({ selectedNode: node }),

  updateFileTree: (nodes: FileNode[]) => set({ rootNodes: nodes }),
}))
