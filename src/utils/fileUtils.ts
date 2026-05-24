import { FileNode } from '@types/index'

export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

export const getLanguageFromExtension = (ext: string): string => {
  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    rs: 'rust',
    go: 'go',
    rb: 'ruby',
    php: 'php',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    html: 'html',
    json: 'json',
    xml: 'xml',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    sh: 'shell',
    bash: 'shell',
  }
  return languageMap[ext] || 'plaintext'
}

export const createFileNode = (
  path: string,
  name: string,
  type: 'file' | 'folder'
): FileNode => ({
  id: `${path}-${Date.now()}`,
  path,
  name,
  type,
  children: type === 'folder' ? [] : undefined,
  isExpanded: false,
})

export const findNodeById = (nodes: FileNode[], id: string): FileNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

export const getFileIcon = (filename: string): string => {
  const ext = getFileExtension(filename).toLowerCase()
  const iconMap: Record<string, string> = {
    js: '󰌞',
    ts: '󰛦',
    tsx: '󰛦',
    jsx: '󰌞',
    py: '󰌠',
    json: '{}',
    html: '󰌝',
    css: '󰌜',
    md: '󰍔',
    git: '󰊢',
  }
  return iconMap[ext] || '󰈔'
}
