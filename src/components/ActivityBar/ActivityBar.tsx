import React from 'react'
import {
  FileText,
  Search,
  GitBranch,
  Bug,
  Lightbulb,
  Settings,
} from 'lucide-react'

interface ActivityBarProps {
  onToggleSidebar: () => void
}

const ActivityBar: React.FC<ActivityBarProps> = ({ onToggleSidebar }) => {
  const [activePanel, setActivePanel] = React.useState('explorer')

  const panels = [
    { id: 'explorer', icon: FileText, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'git', icon: GitBranch, label: 'Git' },
    { id: 'debug', icon: Bug, label: 'Debug' },
    { id: 'extensions', icon: Lightbulb, label: 'Extensions' },
  ]

  return (
    <div className="w-14 bg-biscoito-darker border-r border-biscoito-border flex flex-col items-center py-4 gap-2">
      {panels.map((panel) => {
        const Icon = panel.icon
        const isActive = activePanel === panel.id
        return (
          <button
            key={panel.id}
            onClick={() => {
              setActivePanel(panel.id)
              onToggleSidebar()
            }}
            className={`p-3 rounded-md transition-colors duration-200 ${
              isActive ? 'bg-biscoito-accent text-white' : 'text-biscoito-text-dim hover:bg-biscoito-hover'
            }`}
            title={panel.label}
          >
            <Icon size={20} />
          </button>
        )
      })}

      <div className="flex-1" />
      <button
        className="p-3 rounded-md text-biscoito-text-dim hover:bg-biscoito-hover transition-colors duration-200"
        title="Settings"
      >
        <Settings size={20} />
      </button>
    </div>
  )
}

export default ActivityBar
