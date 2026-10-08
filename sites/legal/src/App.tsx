import { DetailDialogs } from './components/dialogs/DetailDialogs'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { Attorneys } from './components/sections/Attorneys'
import { Contact } from './components/sections/Contact'
import { Faq } from './components/sections/Faq'
import { FeaturedPractice } from './components/sections/FeaturedPractice'
import { FinalCta } from './components/sections/FinalCta'
import { Hero } from './components/sections/Hero'
import { HowWeWork } from './components/sections/HowWeWork'
import { Insights } from './components/sections/Insights'
import { PracticeAreas } from './components/sections/PracticeAreas'
import { ProofBar } from './components/sections/ProofBar'
import { Testimonials } from './components/sections/Testimonials'
import { WhyUs } from './components/sections/WhyUs'
import { useReveal } from './lib/useReveal'
import { AppProvider } from './state/AppState'

export function App() {
  useReveal()
  return (
    <AppProvider>
      <a
        href="#main"
        className="sr-only z-50 bg-espresso px-5 py-3 text-sm font-medium text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <ProofBar />
        <PracticeAreas />
        <FeaturedPractice />
        <Attorneys />
        <HowWeWork />
        <WhyUs />
        <Insights />
        <Testimonials />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <DetailDialogs />
    </AppProvider>
  )
}
