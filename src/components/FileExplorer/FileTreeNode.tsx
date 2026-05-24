import React from 'react'
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react'
import { useFileExplorerStore } from '@stores/fileExplorerStore'
import { useEditorStore } from '@stores/editorStore'
import { FileNode } from '@types/index'
import { getFileIcon } from '@utils/fileUtils'

interface FileTreeNodeProps {
  node: FileNode
  level: number
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, level }) => {
  const { expandedFolders, toggleFolder, selectNode } = useFileExplorerStore()
  const { openFile } = useEditorStore()
  const isExpanded = expandedFolders.has(node.id)

  const handleToggle = () => {
    if (node.type === 'folder') {
      toggleFolder(node.id)
    }
  }

  const handleClick = () => {
    selectNode(node)
    if (node.type === 'file') {
      openFile({
        id: node.id,
        path: node.path,
        name: node.name,
        content: '',
        isDirty: false,
        language: 'plaintext',
        encoding: 'utf8',
      })
    }
  }

  return (
    <div>
      <div
        className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-biscoito-hover text-biscoito-text-dim hover:text-biscoito-text transition-colors"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' ? (
          <>
            <button onClick={handleToggle} className="p-0">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            <Folder size={16} />
          </>
        ) : (
          <>
            <div className="w-4" />
            <File size={16} />
          </>
        )}
        <span className="text-sm flex-1">{node.name}</span>
      </div>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FileTreeNode
