import React, { useEffect } from 'react'
import EditorLayout from '@layouts/EditorLayout'
import { useThemeStore } from '@stores/themeStore'
import { useWorkspaceStore } from '@stores/workspaceStore'

const App: React.FC = () => {
  const { currentTheme } = useThemeStore()
  const { initializeWorkspace } = useWorkspaceStore()

  useEffect(() => {
    initializeWorkspace()
  }, [])

  return (
    <div className={`app theme-${currentTheme}`}>
      <EditorLayout />
    </div>
  )
}

export default App
