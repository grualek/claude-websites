import { DialogProvider } from './components/dialogs/DialogProvider'
import { Dialogs } from './components/dialogs/Dialogs'
import { AnnouncementBar, Header, MobileBookingBar } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero, TrustStrip } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { FeaturedCare } from './components/sections/FeaturedCare'
import { Specialists } from './components/sections/Specialists'
import { Journey } from './components/sections/Journey'
import { PatientInfo } from './components/sections/PatientInfo'
import { Testimonials } from './components/sections/Testimonials'
import { Faq } from './components/sections/Faq'
import { Contact } from './components/sections/Contact'
import { FinalCta } from './components/sections/FinalCta'

export function App() {
  return (
    <DialogProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <TrustStrip />
        <Services />
        <FeaturedCare />
        <Specialists />
        <Journey />
        <PatientInfo />
        <Testimonials />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <MobileBookingBar />
      <Dialogs />
    </DialogProvider>
  )
}
