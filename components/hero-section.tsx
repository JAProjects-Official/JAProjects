'use client'

import { ArrowRight, ChevronDown, Terminal } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'

const codeLines = [
  { indent: 0, content: 'class JAProjects {', color: 'text-blue-400' },
  { indent: 1, content: 'private stack = [', color: 'text-foreground' },
  { indent: 2, content: '"dotnet", "php",', color: 'text-emerald-400' },
  { indent: 2, content: '"javascript", "sql"', color: 'text-emerald-400' },
  { indent: 1, content: '];', color: 'text-foreground' },
  { indent: 0, content: '', color: '' },
  { indent: 1, content: 'build(project: string) {', color: 'text-yellow-300' },
  { indent: 2, content: 'return scalable +', color: 'text-foreground' },
  { indent: 2, content: '  performant;', color: 'text-foreground' },
  { indent: 1, content: '}', color: 'text-yellow-300' },
  { indent: 0, content: '}', color: 'text-blue-400' },
]

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    // Get theme-aware colors from computed styles
    const getThemeColors = () => {
      const root = document.documentElement
      const styles = getComputedStyle(root)
      const primaryRgb = styles.getPropertyValue('--primary').trim()
      const isDark = document.documentElement.classList.contains('dark')

      // Return RGB values (e.g., "0.65 0.22 240" from oklch) - we'll use reasonable defaults based on theme
      return {
        particleColor: isDark ? 'rgba(99, 149, 255, ' : 'rgba(85, 120, 212, ',
        lineColor: isDark ? 'rgba(99, 149, 255, ' : 'rgba(85, 120, 212, ',
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // seed particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const colors = getThemeColors()

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${colors.particleColor}${p.alpha})`
        ctx.fill()
      })

      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `${colors.lineColor}${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* animated particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl animate-pulse-glow animation-delay-300" />
      </div>

      {/* dot grid */}
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left — text */}
        <div className="flex-1 text-center lg:text-left">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t('hero.available')}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 animate-fade-in-up animation-delay-100">
            <span className="text-foreground">JA</span>
            <span className="text-primary">Projects</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4 animate-fade-in-up animation-delay-200 text-balance">
            {t('hero.subheadline')}
          </p>

          <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in-up animation-delay-300 text-pretty">
            {t('hero.description')}
          </p>

          <p className="text-sm text-primary font-semibold mb-6 animate-fade-in-up animation-delay-350 italic">
            {t('contact.cta')}
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
            <button
              onClick={() => handleScroll('projects')}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
            >
              {t('hero.cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScroll('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              {t('hero.cta2')}
            </button>
          </div>
        </div>

        {/* Right — code card */}
        <div className="flex-1 w-full max-w-md animate-fade-in-up animation-delay-500">
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden glow-border animate-float">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <div className="flex items-center gap-1.5 ml-3 text-muted-foreground text-xs">
                <Terminal className="w-3 h-3" />
                <span>japrojects.ts</span>
              </div>
            </div>

            {/* code body */}
            <div className="p-5 font-mono text-sm leading-relaxed">
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  className="flex"
                  style={{ paddingLeft: `${line.indent * 16}px` }}
                >
                  <span className="select-none text-muted-foreground/40 w-5 mr-3 text-right text-xs leading-5">
                    {i + 1}
                  </span>
                  <span className={line.color || 'text-muted-foreground'}>{line.content}</span>
                </div>
              ))}
              {/* blinking cursor */}
              <div className="flex" style={{ paddingLeft: '0px' }}>
                <span className="select-none text-muted-foreground/40 w-5 mr-3 text-right text-xs leading-5">
                  {codeLines.length + 1}
                </span>
                <span className="inline-block w-2 h-4 bg-primary animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <span className="text-xs uppercase tracking-widest font-medium">{t('hero.scroll')}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  )
}
