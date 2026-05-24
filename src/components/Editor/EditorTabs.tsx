import React from 'react'
import { X } from 'lucide-react'
import { useEditorStore } from '@stores/editorStore'

const EditorTabs: React.FC = () => {
  const { activeTabs, activeTabId, setActiveTab, closeTab, openFiles } = useEditorStore()

  return (
    <div className="flex gap-0 border-b border-biscoito-border bg-biscoito-darker overflow-x-auto">
      {activeTabs.map((tab) => {
        const file = openFiles.find((f) => f.id === tab.fileId)
        const isActive = activeTabId === tab.id
        return (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 cursor-pointer transition-colors ${
              isActive
                ? 'border-biscoito-accent text-biscoito-text bg-biscoito-bg'
                : 'border-transparent text-biscoito-text-dim hover:text-biscoito-text hover:bg-biscoito-hover'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm">{tab.name}</span>
            {file?.isDirty && <span className="text-biscoito-warning">●</span>}
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
              className="p-0 hover:bg-biscoito-border rounded"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default EditorTabs
