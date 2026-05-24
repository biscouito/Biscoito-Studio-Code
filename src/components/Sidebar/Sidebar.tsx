import React from 'react'
import FileExplorer from '@components/FileExplorer/FileExplorer'

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-biscoito-dark border-r border-biscoito-border flex flex-col overflow-hidden">
      <div className="p-4 border-b border-biscoito-border">
        <h2 className="text-lg font-semibold text-biscoito-text">Explorer</h2>
      </div>
      <FileExplorer />
    </div>
  )
}

export default Sidebar
