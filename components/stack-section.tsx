'use client'

import { useLanguage } from '@/hooks/use-language'

export function StackSection() {
  const { t } = useLanguage()

  const techStack = [
    {
      name: '.NET Core',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg"
          alt=".NET Core"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.dotnet'),
    },
    {
      name: 'PHP',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
          alt="PHP"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.php'),
    },
    {
      name: 'JavaScript',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
          alt="JavaScript"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.javascript'),
    },
    {
      name: 'MySQL',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
          alt="MySQL"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.mysql'),
    },
    {
      name: 'MariaDB',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg"
          alt="MariaDB"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.mariadb'),
    },
    {
      name: 'REST APIs',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg"
          alt="REST API"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.restapis'),
    },
    {
      name: 'Python',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
          alt="Python"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.python'),
    },
    {
      name: 'Visual Studio',
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg"
          alt="Visual Studio"
          className="w-8 h-8 object-contain"
        />
      ),
      description: t('stack.visualstudio'),
    },
  ]

  return (
    <section id="stack" className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            {t('stack.section')}
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-balance">
          {t('stack.title')}
        </h2>

        <p className="text-muted-foreground mb-12 max-w-xl text-pretty">
          {t('stack.description')}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group relative rounded-xl border border-border bg-card p-5 flex flex-col items-center gap-3 text-center"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-secondary">
                {tech.icon}
              </div>

              <div>
                <div className="font-semibold text-sm text-foreground">
                  {tech.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {tech.description}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}