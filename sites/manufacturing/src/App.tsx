import { DetailDialogs } from './components/dialogs/DetailDialogs'
import { LeadDialog } from './components/dialogs/LeadDialog'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { Capabilities } from './components/sections/Capabilities'
import { Facility } from './components/sections/Facility'
import { FeaturedCapability } from './components/sections/FeaturedCapability'
import { FinalCta } from './components/sections/FinalCta'
import { Hero } from './components/sections/Hero'
import { Industries } from './components/sections/Industries'
import { Process } from './components/sections/Process'
import { Products } from './components/sections/Products'
import { ProofBar } from './components/sections/ProofBar'
import { Projects } from './components/sections/Projects'
import { Quality } from './components/sections/Quality'
import { Resources } from './components/sections/Resources'
import { Rfq } from './components/sections/Rfq'
import { useReveal } from './lib/useReveal'
import { AppProvider } from './state/AppState'

export function App() {
  useReveal()
  return (
    <AppProvider>
      <a
        href="#main"
        className="sr-only z-50 bg-charcoal px-5 py-3 text-sm font-medium text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <ProofBar />
        <Capabilities />
        <FeaturedCapability />
        <Products />
        <Industries />
        <Process />
        <Quality />
        <Facility />
        <Projects />
        <Resources />
        <Rfq />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <DetailDialogs />
      <LeadDialog />
    </AppProvider>
  )
}
