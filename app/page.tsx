import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { MobileAppsSection } from '@/components/mobile-apps-section'
import { StackSection } from '@/components/stack-section'
import { ExperienceSection } from '@/components/experience-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MobileAppsSection />
      <StackSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
