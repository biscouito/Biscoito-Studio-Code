import React from 'react'
import { Plus, X } from 'lucide-react'
import { useTerminalStore } from '@stores/terminalStore'

const TerminalTabs: React.FC = () => {
  const { sessions, activeSessionId, setActiveSession, createSession, closeSession } =
    useTerminalStore()

  return (
    <div className="flex items-center gap-1 overflow-x-auto flex-1">
      {Array.from(sessions.values()).map((session) => (
        <div
          key={session.id}
          className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors ${
            activeSessionId === session.id
              ? 'bg-biscoito-bg text-biscoito-text'
              : 'text-biscoito-text-dim hover:bg-biscoito-hover'
          }`}
          onClick={() => setActiveSession(session.id)}
        >
          <span className="text-xs">{session.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeSession(session.id)
            }}
            className="p-0 hover:text-biscoito-error"
          >
            <X size={12} />
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          createSession({
            id: `terminal-${Date.now()}`,
            name: `Terminal ${sessions.size + 1}`,
            shell: 'bash',
          })
        }
        className="p-1 text-biscoito-text-dim hover:text-biscoito-text transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default TerminalTabs
