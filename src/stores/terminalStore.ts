import { create } from 'zustand'
import { TerminalSession } from '@types/index'

interface TerminalState {
  sessions: Map<string, TerminalSession>
  activeSessionId: string | null
  
  createSession: (session: TerminalSession) => void
  closeSession: (sessionId: string) => void
  setActiveSession: (sessionId: string) => void
  getSession: (id: string) => TerminalSession | undefined
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  sessions: new Map(),
  activeSessionId: null,

  createSession: (session: TerminalSession) =>
    set((state) => {
      const newSessions = new Map(state.sessions)
      newSessions.set(session.id, session)
      return {
        sessions: newSessions,
        activeSessionId: state.activeSessionId || session.id,
      }
    }),

  closeSession: (sessionId: string) =>
    set((state) => {
      const newSessions = new Map(state.sessions)
      newSessions.delete(sessionId)
      return {
        sessions: newSessions,
        activeSessionId:
          state.activeSessionId === sessionId
            ? Array.from(newSessions.keys())[0] || null
            : state.activeSessionId,
      }
    }),

  setActiveSession: (sessionId: string) => set({ activeSessionId: sessionId }),

  getSession: (id: string) => get().sessions.get(id),
}))
