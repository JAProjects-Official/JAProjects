'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border bg-secondary/50" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg border border-border bg-secondary/50 hover:bg-secondary hover:border-primary/40 transition-all duration-200 flex items-center justify-center group"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
