import React, { useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { useEditorStore } from '@stores/editorStore'

const MonacoEditor: React.FC = () => {
  const { activeTabId, activeTabs, openFiles, updateFile } = useEditorStore()
  const activeTab = activeTabs.find((t) => t.id === activeTabId)
  const activeFile = activeTab ? openFiles.find((f) => f.id === activeTab.fileId) : null

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (activeFile && value !== undefined) {
        updateFile(activeFile.id, value)
      }
    },
    [activeFile, updateFile]
  )

  if (!activeFile) return null

  return (
    <Editor
      height="100%"
      defaultLanguage={activeFile.language}
      defaultValue={activeFile.content}
      onChange={handleChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoSurround: 'languageDefined',
      }}
    />
  )
}

export default MonacoEditor
