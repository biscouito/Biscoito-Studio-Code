import React from 'react'
import { useEditorStore } from '@stores/editorStore'
import EditorTabs from '@components/Editor/EditorTabs'
import MonacoEditor from '@components/Editor/MonacoEditor'

const EditorArea: React.FC = () => {
  const { activeTabs, activeTabId } = useEditorStore()

  return (
    <div className="flex-1 flex flex-col bg-biscoito-dark overflow-hidden">
      {/* Tabs */}
      {activeTabs.length > 0 && <EditorTabs />}

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {activeTabId ? (
          <MonacoEditor />
        ) : (
          <div className="h-full flex items-center justify-center text-biscoito-text-dim">
            <p>Open a file to start editing</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditorArea
