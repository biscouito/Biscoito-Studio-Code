import { useEffect } from 'react'
import { useThemeStore } from '@stores/themeStore'

export const useTheme = () => {
  const { currentTheme, setCurrentTheme, getTheme } = useThemeStore()
  const theme = getTheme(currentTheme)

  useEffect(() => {
    if (theme?.colors) {
      const root = document.documentElement
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value as string)
      })
    }
  }, [theme])

  return { currentTheme, setCurrentTheme, theme }
}
