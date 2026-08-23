'use client'

import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const playStoreUrls = {
  timeplan: 'https://play.google.com/store/apps/details?id=com.timeplan.app',
  lumivex: 'https://play.google.com/store/apps/details?id=com.lumivex.app',
  blockpuzzle: 'https://play.google.com/store/apps/details?id=com.japrojects.blockpuzzle',
}

export function MobileAppsSection() {
  const { t } = useLanguage()

  return (
    <section id="mobile-apps" className="py-24 sm:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">{t('mobile.section')}</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-balance">{t('mobile.title')}</h2>
        <p className="text-muted-foreground mb-12 max-w-xl text-pretty">{t('mobile.description')}</p>

        {/* Grid: featured (left) + compact apps (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Featured card — TimePlan */}
          <div className="group relative rounded-2xl border border-border bg-card overflow-hidden card-hover glow-border flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 h-full">
            {/* App mockup image */}
            <div className="w-44 sm:w-48 shrink-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[9/19]">
                <Image
                  src="/images/timePlan_mockup.png"
                  alt="TimePlan app screenshot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 12rem"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                <Badge>
                  <Star className="w-3 h-3 fill-current" />
                  {t('mobile.featured')}
                </Badge>
                <Badge variant="secondary">{t('mobile.productivity')}</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('mobile.timeplan.name')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 text-pretty">
                {t('mobile.timeplan.description')}
              </p>
              <Button asChild size="sm">
                <a href={playStoreUrls.timeplan} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t('mobile.viewOnPlayStore')}
                </a>
              </Button>
            </div>
          </div>

          {/* Compact cards — right column */}
          <div className="flex flex-col gap-6">
            {/* Flappy LUMIVEX */}
            <div className="group relative rounded-2xl border border-border bg-card overflow-hidden card-hover glow-border flex items-center gap-4 p-5">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo_LUMIVEX.png"
                  alt="Flappy LUMIVEX app logo"
                  width={44}
                  height={44}
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground text-sm truncate">{t('mobile.lumivex.name')}</h4>
                  <Badge variant="secondary">{t('mobile.game')}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 text-pretty">
                  {t('mobile.lumivex.description')}
                </p>
                <a
                  href={playStoreUrls.lumivex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('mobile.viewOnPlayStore')}
                </a>
              </div>
            </div>

            {/* Block Puzzle+ */}
            <div className="group relative rounded-2xl border border-border bg-card overflow-hidden card-hover glow-border flex items-center gap-4 p-5">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo_puzle.png"
                  alt="Block Puzzle+ app logo"
                  width={44}
                  height={44}
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground text-sm truncate">{t('mobile.blockpuzzle.name')}</h4>
                  <Badge variant="secondary">{t('mobile.game')}</Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 text-pretty">
                  {t('mobile.blockpuzzle.description')}
                </p>
                <a
                  href={playStoreUrls.blockpuzzle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('mobile.viewOnPlayStore')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
