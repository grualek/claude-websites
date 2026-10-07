import { AppStateProvider } from './state/AppState'
import { Dialogs } from './components/dialogs/Dialogs'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { FeaturedProperties } from './components/sections/FeaturedProperties'
import { PropertySearch } from './components/sections/PropertySearch'
import { Showcase } from './components/sections/Showcase'
import { Services } from './components/sections/Services'
import { Areas } from './components/sections/Areas'
import { WhyUs } from './components/sections/WhyUs'
import { Sell } from './components/sections/Sell'
import { Management } from './components/sections/Management'
import { Insights } from './components/sections/Insights'
import { Testimonials } from './components/sections/Testimonials'
import { Faq } from './components/sections/Faq'
import { Contact } from './components/sections/Contact'
import { FinalCta } from './components/sections/FinalCta'

export function App() {
  return (
    <AppStateProvider>
      <a href="#main" className="sr-only z-50 rounded-[3px] bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <FeaturedProperties />
        <PropertySearch />
        <Showcase />
        <Services />
        <Areas />
        <WhyUs />
        <Sell />
        <Management />
        <Insights />
        <Testimonials />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <Dialogs />
    </AppStateProvider>
  )
}
