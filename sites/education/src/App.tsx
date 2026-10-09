import { DetailDialogs } from './components/dialogs/DetailDialogs'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileCtaBar } from './components/layout/MobileCtaBar'
import { Admissions } from './components/sections/Admissions'
import { AdmissionsCta } from './components/sections/AdmissionsCta'
import { Contact } from './components/sections/Contact'
import { Faculty } from './components/sections/Faculty'
import { Faq } from './components/sections/Faq'
import { FeaturedProgram } from './components/sections/FeaturedProgram'
import { Hero } from './components/sections/Hero'
import { LearningExperience } from './components/sections/LearningExperience'
import { Outcomes } from './components/sections/Outcomes'
import { ProgramFinder } from './components/sections/ProgramFinder'
import { Resources } from './components/sections/Resources'
import { Stories } from './components/sections/Stories'
import { StudentLife } from './components/sections/StudentLife'
import { WhyChooseUs } from './components/sections/WhyChooseUs'
import { useReveal } from './lib/useReveal'
import { AppProvider } from './state/AppState'

export function App() {
  useReveal()
  return (
    <AppProvider>
      <a href="#main" className="sr-only z-50 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <ProgramFinder />
        <FeaturedProgram />
        <WhyChooseUs />
        <LearningExperience />
        <Admissions />
        <StudentLife />
        <Faculty />
        <Outcomes />
        <Stories />
        <Resources />
        <Faq />
        <AdmissionsCta />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
      <DetailDialogs />
    </AppProvider>
  )
}
