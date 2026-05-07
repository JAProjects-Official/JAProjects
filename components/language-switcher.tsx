'use client'

import { useLanguage } from '@/hooks/use-language'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 p-1">
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
          language === 'es'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Cambiar a español"
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  )
}
