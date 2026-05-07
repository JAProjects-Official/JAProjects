'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Send, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useLanguage()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // 🔥 MAPA DE ERRORES (TRADUCIDOS)
  const errorMap: Record<string, string> = {
    RATE_LIMIT: t('contact.error.rateLimit'),
    MISSING_FIELDS: t('contact.error.missing'),
    INVALID_EMAIL: t('contact.error.invalidEmail'),
    EMAIL_BLOCKED: t('contact.error.blocked'),
    SPAM_DETECTED: t('contact.error.spam'),
    MESSAGE_TOO_SHORT: t('contact.error.short'),
    SERVER_ERROR: t('contact.error.server'),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      // ❌ ERROR CONTROLADO
      if (!res.ok || !data.success) {
        const msg =
          errorMap[data.errorCode] || t('contact.error.server')

        setErrorMessage(msg)
        setStatus('error')

        setTimeout(() => setStatus('idle'), 3000)
        return
      }

      // ✅ SUCCESS
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })

      setTimeout(() => {
        setStatus('idle')
      }, 4000)
    } catch {
      setErrorMessage(t('contact.error.server'))
      setStatus('error')

      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('contact.email'),
      value: 'ivan97.business@gmail.com',
      href: 'mailto:ivan97.business@gmail.com',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: t('contact.github'),
      value: 'github.com/japrojects',
      href: 'https://github.com/JAProjects-Official',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: t('contact.linkedin'),
      value: 'linkedin.com/in/ivan-jurado',
      href: 'https://www.linkedin.com/in/ivan-jurado-alvarez/',
    },
  ]

  return (
    <section id="contact" className="py-24 sm:py-32 relative">

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            {t('contact.section')}
          </span>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            {t('contact.title')} <span className="text-primary">{t('contact.together')}</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-12 text-pretty">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
              {t('contact.getInTouch')}
            </h3>

            <div className="flex flex-col gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card
                  hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    {link.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground">{link.label}</div>
                    <div className="text-sm font-medium text-foreground truncate">
                      {link.value}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
              {t('contact.sendMessage')}
            </h3>

            {/* ERROR UI */}
            {status === 'error' && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}

            {/* SUCCESS */}
            {status === 'sent' ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {t('contact.sent')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('contact.sentMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                <div className="grid sm:grid-cols-2 gap-4">

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.namePlaceholder')}
                    className="rounded-xl border border-border bg-input px-4 py-3 text-sm"
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    className="rounded-xl border border-border bg-input px-4 py-3 text-sm"
                  />

                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm resize-none"
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      {t('contact.sendBtn')}
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}