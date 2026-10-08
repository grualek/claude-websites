import { DetailDialogs } from './components/dialogs/DetailDialogs'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileBookBar } from './components/layout/MobileBookBar'
import { BookingCta } from './components/sections/BookingCta'
import { Contact } from './components/sections/Contact'
import { Destination } from './components/sections/Destination'
import { Dining } from './components/sections/Dining'
import { Experiences } from './components/sections/Experiences'
import { Faq } from './components/sections/Faq'
import { FeaturedExperience } from './components/sections/FeaturedExperience'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Intro } from './components/sections/Intro'
import { Journal } from './components/sections/Journal'
import { Rooms } from './components/sections/Rooms'
import { Story } from './components/sections/Story'
import { Testimonials } from './components/sections/Testimonials'
import { useReveal } from './lib/useReveal'
import { AppProvider } from './state/AppState'

export function App() {
  useReveal()
  return (
    <AppProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-on-dark focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Intro />
        <Rooms />
        <FeaturedExperience />
        <Experiences />
        <Dining />
        <Destination />
        <Story />
        <Gallery />
        <Testimonials />
        <Journal />
        <Faq />
        <BookingCta />
        <Contact />
      </main>
      <Footer />
      <MobileBookBar />
      <DetailDialogs />
    </AppProvider>
  )
}
