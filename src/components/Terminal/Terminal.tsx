import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useTerminalStore } from '@stores/terminalStore'
import TerminalTabs from '@components/Terminal/TerminalTabs'

interface TerminalProps {
  onClose: () => void
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const { sessions, activeSessionId, createSession } = useTerminalStore()
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessions.size === 0) {
      createSession({
        id: `terminal-${Date.now()}`,
        name: 'Terminal',
        shell: 'bash',
      })
    }
  }, [])

  return (
    <div className="h-48 bg-biscoito-darker border-t border-biscoito-border flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-biscoito-border">
        <TerminalTabs />
        <button
          onClick={onClose}
          className="p-1 hover:bg-biscoito-hover rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto bg-biscoito-dark p-4 font-mono text-sm text-biscoito-success"
      >
        <p className="text-biscoito-text-dim">Terminal</p>
        <p>$ Ready for commands...</p>
      </div>
    </div>
  )
}

export default Terminal
