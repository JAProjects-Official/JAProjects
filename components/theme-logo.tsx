'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeLogo({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = theme === 'system' ? resolvedTheme : theme
  const isDark = activeTheme === 'dark'
  const background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)'
  const border = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(15,23,42,0.25)'
  const textColor = isDark ? '#ffffff' : '#111827'

  if (!mounted) {
    return <span className={`inline-flex items-center justify-center w-6 h-6 ${className ?? ''}`} />
  }

  return (
    <span className={`inline-flex items-center justify-center ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="block w-full h-full" role="img" aria-label="JAProjects logo">
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={background} stroke={border} strokeWidth="1.5" />
        <text
          x="50%"
          y="54%"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="700"
          fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        >
          JA
        </text>
      </svg>
    </span>
  )
}
