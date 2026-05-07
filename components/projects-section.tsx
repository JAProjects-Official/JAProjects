'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

type Project = {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
  tags: string[]
  liveUrl: string
  featured: boolean
  label: string
}

const projects: Project[] = [
{
    id: 1,
    title: 'Sistema CRUD con Laravel',
    description: 'Aplicación Laravel con autenticación, gestión de registros y panel administrativo. Construida para demostrar prácticas de CRUD y seguridad en un entorno PHP moderno.',
    image: '/images/CRUDlaravel.png',
    tech: ['PHP', 'MySQL', 'HTML/CSS'],
    tags: ['PHP', 'SQL'],
    liveUrl: 'https://japrojects.rf.gd/CRUDlaravel/public/index.php',
    featured: false,
    label: 'projects.personal',
  },
  {
    id: 2,
    title: 'Aplicación de práctica de idiomas',
    description: 'Plataforma de práctica de idiomas con ejercicios interactivos y contenido educativo. Diseñada para reforzar vocabulario y comprensión desde cualquier dispositivo.',
    image: '/images/idioma.png',
    tech: ['JavaScript', 'HTML/CSS'],
    tags: ['JavaScript'],
    liveUrl: '/projects/idiomaPractica/index.html',
    featured: true,
    label: 'projects.personal',
  },
    {
    id: 3,
    title: 'Gestor de tareas en PHP',
    description: 'Aplicación de gestión de tareas con backend PHP y base de datos MySQL. Funcionalidades incluidas: creación, edición, eliminación y búsqueda de tareas con interfaz limpia y responsiva.',
    image: '/images/tareas.png',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tags: ['PHP', 'SQL'],
    liveUrl: '/projects/todo/',
    featured: false,
    label: 'projects.personal',
  },
  {
    id: 4,
    title: 'Aplicación de cuestionarios en Angular',
    description: 'Cuestionario interactivo construido en Angular con navegación fluida y respuestas en tiempo real. Ideal para evaluar conocimiento con diseño limpio y experiencia de usuario moderna.',
    image: '/images/quiz.PNG',
    tech: ['JavaScript', 'HTML/CSS'],
    tags: ['JavaScript'],
    liveUrl: '/projects/AngularQuizApp/index.html',
    featured: true,
    label: 'projects.personal',
  },
  {
    id: 5,
    title: 'Conversor de texto a voz',
    description: 'Herramienta de lectura de texto que convierte contenido en voz en tiempo real. Interfaz accesible, controles de reproducción y compatibilidad con múltiples navegadores.',
    image: '/images/Conversor-texto-a-voz.png',
    tech: ['JavaScript', 'HTML/CSS'],
    tags: ['JavaScript'],
    liveUrl: '/projects/LecturaTexto/index.html',
    featured: false,
    label: 'projects.personal',
  }
,
]

const filters = [
  { value: 'All', labelKey: 'filters.all' },
  { value: '.NET Core', labelKey: 'filters.dotnet' },
  { value: 'PHP', labelKey: 'filters.php' },
  { value: 'JavaScript', labelKey: 'filters.javascript' },
  { value: 'SQL', labelKey: 'filters.sql' },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { t } = useLanguage()

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter))

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">{t('projects.section')}</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-balance">{t('projects.title')}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl text-pretty">
          {t('projects.description')}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by technology">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === filter.value
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5'
              }`}
              aria-pressed={activeFilter === filter.value}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>

        {/* Featured projects (large cards) */}
        {featured.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} large />
            ))}
          </div>
        )}

        {/* Grid of remaining projects */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} large={false} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {t('projects.noResults')}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, large }: { project: Project; large: boolean }) {
  const { t } = useLanguage()

  return (
    <article
      className={`group relative rounded-2xl border border-border bg-card overflow-hidden card-hover glow-border flex flex-col h-full`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${large ? 'h-52' : 'h-40'}`}>
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1280}
          height={720}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.featured && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/20 border border-primary/40 text-primary text-xs font-medium backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}
          <div className="px-2 py-1 rounded-md bg-secondary/80 border border-border text-muted-foreground text-xs font-medium backdrop-blur-sm">
            {t(project.label)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`font-semibold text-foreground mb-2 ${large ? 'text-xl' : 'text-base'}`}>
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 text-pretty">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-secondary border border-border text-xs text-muted-foreground font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Live Demo Action */}
        <div className="flex items-center gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {t('projects.liveDemo')}
          </a>
        </div>
      </div>
    </article>
  )
}
