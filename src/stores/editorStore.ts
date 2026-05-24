import { create } from 'zustand'
import { OpenFile, EditorTab } from '@types/index'

interface EditorState {
  openFiles: OpenFile[]
  activeTabs: EditorTab[]
  activeTabId: string | null
  splitMode: 'single' | 'horizontal' | 'vertical'
  
  // File operations
  openFile: (file: OpenFile) => void
  closeFile: (fileId: string) => void
  updateFile: (fileId: string, content: string) => void
  markFileAsDirty: (fileId: string, isDirty: boolean) => void
  
  // Tab operations
  setActiveTab: (tabId: string) => void
  closeTab: (tabId: string) => void
  setSplitMode: (mode: 'single' | 'horizontal' | 'vertical') => void
}

export const useEditorStore = create<EditorState>((set) => ({
  openFiles: [],
  activeTabs: [],
  activeTabId: null,
  splitMode: 'single',

  openFile: (file: OpenFile) =>
    set((state) => ({
      openFiles: [...state.openFiles.filter((f) => f.id !== file.id), file],
      activeTabs: [
        ...state.activeTabs.filter((t) => t.fileId !== file.id),
        {
          id: `tab-${file.id}`,
          fileId: file.id,
          path: file.path,
          name: file.name,
          isDirty: false,
        },
      ],
      activeTabId: `tab-${file.id}`,
    })),

  closeFile: (fileId: string) =>
    set((state) => ({
      openFiles: state.openFiles.filter((f) => f.id !== fileId),
      activeTabs: state.activeTabs.filter((t) => t.fileId !== fileId),
      activeTabId:
        state.activeTabId === `tab-${fileId}`
          ? state.activeTabs.find((t) => t.fileId !== fileId)?.id ?? null
          : state.activeTabId,
    })),

  updateFile: (fileId: string, content: string) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === fileId ? { ...f, content, isDirty: true } : f
      ),
    })),

  markFileAsDirty: (fileId: string, isDirty: boolean) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === fileId ? { ...f, isDirty } : f
      ),
    })),

  setActiveTab: (tabId: string) => set({ activeTabId: tabId }),

  closeTab: (tabId: string) => set((state) => ({
    activeTabs: state.activeTabs.filter((t) => t.id !== tabId),
  })),

  setSplitMode: (mode: 'single' | 'horizontal' | 'vertical') =>
    set({ splitMode: mode }),
}))
