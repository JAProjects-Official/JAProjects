'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Code2, Github, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

export function Footer() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = theme === 'system' ? resolvedTheme : theme
  const logoSrc = activeTheme === 'dark' ? '/images/logo-light.png' : '/images/logo-dark.png'

  return (
    <footer className="border-t border-border py-8 sm:py-10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-3">

            {mounted ? (
              <Image
                src={logoSrc}
                alt="JAProjects logo"
                width={24}
                height={24}
                className="w-10 h-10 object-contain"
              />
            ) : (
              <span className="inline-block w-6 h-6" />
            )}
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground text-lg">
              JA<span className="text-primary">Projects</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {t('footer.tagline')}
          </span>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/JAProjects-Official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-jurado-alvarez/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} JAProjects — {t('footer.developed')} Iván Jurado Álvarez
          </p>
          <p className="flex items-center gap-1.5 justify-center">
            {t('footer.builtWith')}{' '}
            <span className="text-foreground font-medium">Next.js</span>,{' '}
            <span className="text-foreground font-medium">TypeScript</span> &{' '}
            <span className="text-foreground font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
