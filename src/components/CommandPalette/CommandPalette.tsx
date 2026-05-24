import React, { useEffect, useRef, useState } from 'react'
import { useCommandPaletteStore } from '@stores/commandPaletteStore'
import { Search } from 'lucide-react'

const CommandPalette: React.FC = () => {
  const { isOpen, setIsOpen, searchQuery, setSearchQuery, searchCommands } =
    useCommandPaletteStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const results = searchCommands(searchQuery)
    setResults(results)
  }, [searchQuery, searchCommands])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16 z-50">
      <div className="w-96 bg-biscoito-bg border border-biscoito-border rounded-lg shadow-lg overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-biscoito-border">
          <Search size={16} className="text-biscoito-text-dim" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-biscoito-text placeholder-biscoito-text-dim"
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-center text-biscoito-text-dim">
              {searchQuery ? 'No commands found' : 'Type to search'}
            </div>
          ) : (
            results.map((cmd) => (
              <div
                key={cmd.id}
                className="px-4 py-2 hover:bg-biscoito-hover cursor-pointer transition-colors"
                onClick={() => {
                  cmd.execute()
                  setIsOpen(false)
                  setSearchQuery('')
                }}
              >
                <div className="text-sm text-biscoito-text">{cmd.title}</div>
                <div className="text-xs text-biscoito-text-dim">{cmd.category}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
