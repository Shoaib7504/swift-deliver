import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import Hero from '../components/landing/hero';
import LogoStrip from '../components/landing/logo-strip';
import Services from '../components/landing/services';
import HowItWorks from '../components/landing/how-it-works';
import Stats from '../components/landing/stats';
import Testimonials from '../components/landing/testimonials';
import Pricing from '../components/landing/pricing';
import FAQ from '../components/landing/faq';
import CTA from '../components/landing/cta';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Services />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
