import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: {
    default: 'JAProjects — Iván Jurado Álvarez | Desarrollador Web Full Stack',
    template: '%s | JAProjects',
  },
  description:
    'Desarrollador web especializado en .NET Core, PHP, JavaScript y SQL. Creando soluciones empresariales escalables, APIs robustas y aplicaciones web modernas.',

  keywords: [
    '.NET Core',
    'PHP',
    'JavaScript',
    'SQL Server',
    'MySQL',
    'Desarrollador Web',
    'Full Stack',
    'REST API',
    'WebSockets',
    'España',
    'Freelance',
  ],

  authors: [{ name: 'Iván Jurado Álvarez', url: 'https://japrojects.vercel.app' }],
  creator: 'Iván Jurado Álvarez',

  // 🔥 IMPORTANTE: dominio correcto de Vercel
  metadataBase: new URL('https://japrojects.vercel.app'),

  icons: {
    icon: '/images/logo-dark.png',
    shortcut: '/images/logo-dark.png',
    apple: '/images/logo-dark.png',
  },

  openGraph: {
    title: 'JAProjects — Desarrollo Web Profesional',
    description:
      'Soluciones web escalables y de alto rendimiento. .NET Core, PHP, JavaScript, SQL.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'JAProjects',
    url: 'https://japrojects.vercel.app',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}

          {/* 📊 VERCEL ANALYTICS */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}