'use client'

import { Code2, Database, Globe, LayoutGrid, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

const getExperiences = (t: (key: string) => string) => [
  {
    icon: <Code2 className="w-5 h-5 text-primary" />,
    title: t('experience.dotnet'),
    description: t('experience.dotnetDesc'),
    skills: ['ASP.NET Core', 'Entity Framework', 'C#', 'Visual Studio'],
  },
  {
    icon: <Globe className="w-5 h-5 text-primary" />,
    title: t('experience.php'),
    description: t('experience.phpDesc'),
    skills: ['PHP', 'JavaScript', 'HTML/CSS', 'REST APIs'],
  },
  {
    icon: <Database className="w-5 h-5 text-primary" />,
    title: t('experience.database'),
    description: t('experience.databaseDesc'),
    skills: ['MySQL', 'MariaDB', 'SQL Server', 'Query Optimization'],
  },
  {
    icon: <LayoutGrid className="w-5 h-5 text-primary" />,
    title: t('experience.project'),
    description: t('experience.projectDesc'),
    skills: ['Jira', 'Agile/Scrum', 'Git', 'Code Review'],
  },
]

export function ExperienceSection() {
  const { t } = useLanguage()
  const experiences = getExperiences(t)

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">{t('experience.section')}</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-balance">{t('experience.title')}</h2>
        <p className="text-muted-foreground mb-12 max-w-xl text-pretty">
          {t('experience.description')}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  {exp.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-2">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-pretty">
                    {exp.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <li key={s} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
