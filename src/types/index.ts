// Editor Types
export interface OpenFile {
  id: string
  path: string
  name: string
  content: string
  isDirty: boolean
  language: string
  encoding: string
}

export interface FileNode {
  id: string
  path: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  isExpanded?: boolean
}

export interface WorkspaceConfig {
  rootPath: string
  folders: string[]
  name: string
  settings: Record<string, any>
}

export interface EditorTab {
  id: string
  fileId: string
  path: string
  name: string
  isDirty: boolean
}

export interface Command {
  id: string
  title: string
  description?: string
  category: string
  keybinding?: string
  execute: () => void | Promise<void>
}

export interface Theme {
  name: string
  type: 'dark' | 'light'
  colors: Record<string, string>
  tokenColors: Record<string, any>
}

export interface Extension {
  id: string
  name: string
  version: string
  author: string
  description: string
  activate: (context: ExtensionContext) => void
  deactivate?: () => void
}

export interface ExtensionContext {
  extensionPath: string
  registerCommand: (id: string, command: Command) => void
  registerTheme: (theme: Theme) => void
}

export interface TerminalSession {
  id: string
  name: string
  pid?: number
  shell: string
}

export interface GitStatus {
  branch: string
  modified: string[]
  staged: string[]
  untracked: string[]
  ahead: number
  behind: number
}
