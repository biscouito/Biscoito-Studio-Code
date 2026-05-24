import React from 'react'
import { useEditorStore } from '@stores/editorStore'
import { FileText, AlertCircle } from 'lucide-react'

const StatusBar: React.FC = () => {
  const { activeTabId, activeTabs, openFiles } = useEditorStore()
  const activeTab = activeTabs.find((t) => t.id === activeTabId)
  const activeFile = activeTab ? openFiles.find((f) => f.id === activeTab.fileId) : null

  return (
    <div className="fixed bottom-0 right-0 left-14 h-6 bg-biscoito-darker border-t border-biscoito-border flex items-center justify-between px-4 text-xs text-biscoito-text-dim">
      <div className="flex items-center gap-4">
        {activeFile && (
          <>
            <span>{activeFile.language}</span>
            <span>UTF-8</span>
            <span>CRLF</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <span>Line 1, Col 1</span>
        <button className="hover:text-biscoito-text transition-colors">
          <AlertCircle size={12} />
        </button>
      </div>
    </div>
  )
}

export default StatusBar
