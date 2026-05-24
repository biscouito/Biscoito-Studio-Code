import React, { useState, useEffect } from 'react'
import ActivityBar from '@components/ActivityBar/ActivityBar'
import Sidebar from '@components/Sidebar/Sidebar'
import EditorArea from '@components/Editor/EditorArea'
import Terminal from '@components/Terminal/Terminal'
import StatusBar from '@components/StatusBar/StatusBar'
import CommandPalette from '@components/CommandPalette/CommandPalette'
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts'
import { useCommandSystem } from '@hooks/useCommandSystem'
import { useTheme } from '@hooks/useTheme'

const EditorLayout: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [isTerminalVisible, setIsTerminalVisible] = useState(false)
  const { register } = useCommandSystem()
  useKeyboardShortcuts()
  useTheme()

  useEffect(() => {
    register({
      id: 'sidebar.toggleVisibility',
      title: 'Toggle Sidebar',
      category: 'View',
      execute: () => setIsSidebarVisible((prev) => !prev),
    })

    register({
      id: 'terminal.toggleTerminal',
      title: 'Toggle Terminal',
      category: 'View',
      keybinding: 'Ctrl+`',
      execute: () => setIsTerminalVisible((prev) => !prev),
    })
  }, [register])

  return (
    <div className="flex h-screen w-screen bg-biscoito-dark text-biscoito-text overflow-hidden">
      {/* Activity Bar */}
      <ActivityBar onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {isSidebarVisible && <Sidebar />}

          {/* Editor Area */}
          <EditorArea />
        </div>

        {/* Terminal */}
        {isTerminalVisible && <Terminal onClose={() => setIsTerminalVisible(false)} />}
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette */}
      <CommandPalette />
    </div>
  )
}

export default EditorLayout
