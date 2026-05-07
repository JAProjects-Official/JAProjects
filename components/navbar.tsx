'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Menu, X, Code2 } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

const navLinkKeys = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.stack', href: '#stack' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.contact', href: '#contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)

  const { theme, resolvedTheme } = useTheme()
  const { t } = useLanguage()

  // ✅ Mount control (SSR safe)
  useEffect(() => {
    setMounted(true)
  }, [])

  // ❌ IMPORTANTE: hooks siempre arriba, nunca returns antes

  const activeTheme = theme === 'system' ? resolvedTheme : theme
  const logoSrc =
    activeTheme === 'dark'
      ? '/images/logo-light.png'
      : '/images/logo-dark.png'

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinkKeys.map((l) => l.href.replace('#', ''))

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)

    const id = href.replace('#', '')
    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // ✅ ahora sí: render controlado
  if (!mounted) {
    return <div className="h-16" />
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
          aria-label="JAProjects - back to top"
        >
          <Image
            src={logoSrc}
            alt="JAProjects logo"
            width={24}
            height={24}
            className="w-10 h-10 object-contain"
          />

          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>

          <span className="text-foreground font-semibold tracking-tight">
            JA<span className="text-primary">Projects</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinkKeys.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id

            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {t(link.key)}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Theme + Language + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />

          <button
            onClick={() => handleNavClick('#contact')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('nav.hireMe')}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinkKeys.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id

              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {t(link.key)}
                  </button>
                </li>
              )
            })}

            <li className="pt-3 border-t border-border flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </li>

            <li>
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {t('nav.hireMe')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}