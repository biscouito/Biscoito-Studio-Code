import React, { useEffect } from 'react'
import { useFileExplorerStore } from '@stores/fileExplorerStore'
import FileTreeNode from '@components/FileExplorer/FileTreeNode'
import { createFileNode } from '@utils/fileUtils'

const FileExplorer: React.FC = () => {
  const { rootNodes, setRootNodes } = useFileExplorerStore()

  useEffect(() => {
    // Initialize with sample structure
    const sampleNodes = [
      createFileNode('/src', 'src', 'folder'),
      createFileNode('/public', 'public', 'folder'),
      createFileNode('/package.json', 'package.json', 'file'),
    ]
    setRootNodes(sampleNodes)
  }, [])

  return (
    <div className="flex-1 overflow-y-auto">
      {rootNodes.map((node) => (
        <FileTreeNode key={node.id} node={node} level={0} />
      ))}
    </div>
  )
}

export default FileExplorer
