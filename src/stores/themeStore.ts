import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme } from '@types/index'

const defaultDarkTheme: Theme = {
  name: 'Biscoito Dark',
  type: 'dark',
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
    'editor.lineHighlightBackground': '#f7ebc61d',
    'editorCursor.foreground': '#aeafad',
    'editorWhitespace.foreground': '#e3e4e229',
    'editorIndentGuide.background': '#404405',
    'editor.selectionBackground': '#add6ff4d',
  },
  tokenColors: {},
}

interface ThemeState {
  themes: Map<string, Theme>
  currentTheme: string
  
  setCurrentTheme: (themeName: string) => void
  registerTheme: (theme: Theme) => void
  getTheme: (name: string) => Theme | undefined
}

export const useThemeStore = create<ThemeState>(
  persist(
    (set, get) => ({
      themes: new Map([[defaultDarkTheme.name, defaultDarkTheme]]),
      currentTheme: defaultDarkTheme.name,

      setCurrentTheme: (themeName: string) => set({ currentTheme: themeName }),

      registerTheme: (theme: Theme) =>
        set((state) => {
          const newThemes = new Map(state.themes)
          newThemes.set(theme.name, theme)
          return { themes: newThemes }
        }),

      getTheme: (name: string) => get().themes.get(name),
    }),
    {
      name: 'theme-storage',
    }
  )
)
