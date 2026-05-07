'use client'

import { User, MapPin, Briefcase } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

const skills = [
  '.NET Core', 'PHP', 'JavaScript', 'TypeScript',
  'MySQL', 'MariaDB', 'SQL Server', 'REST APIs',
  'WebSockets', 'HTML/CSS', 'Git', 'Jira',
]

const stats = [
  { labelKey: 'about.stats.tech', value: '7+' },
  { labelKey: 'about.stats.projects', value: '10+' },
  { labelKey: 'about.stats.experience', value: '3+' },
]

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* subtle glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">{t('about.title')}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-balance">
              {t('about.name')} <span className="text-primary">Álvarez</span>
            </h2>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-primary" />
                {t('about.role')}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {t('about.location')}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                {t('about.availability')}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
              {t('about.bio')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.labelKey}
                  className="rounded-xl border border-border bg-card p-3 sm:p-4 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-xs text-muted-foreground">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — skills */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
              {t('about.skills')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg border border-border bg-secondary text-sm text-foreground font-medium
                    hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* personality card */}
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {t('about.quote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
