import Image from 'next/image'
import HubHexBackground from '@/components/HubHexBackground'
import IntroSwarm from '@/components/IntroSwarm'
import { ArrowUpRight, ArrowRight, ScanLine, Phone, Mail, Contact, BriefcaseBusiness, UserRound } from 'lucide-react'

const sites = [
  { name: 'Coastal Solutions Media', detail: 'AI and business automation', services: ['Websites', 'SEO · AEO · GEO', 'AI receptionist', 'CRM', 'Automation', 'AI video & media'], href: 'https://www.coastalsolutionsmedia.com', logo: '/official/csm-logo.webp', width: 480, height: 353 },
  { name: 'CoastaFlow.AI', detail: 'AI-powered CRM', href: 'https://www.coastaflow.ai', logo: '/official/coastaflow-supplied.png', width: 1254, height: 1254 },
  { name: 'Lowcountry Unscripted', detail: 'Podcast', href: 'https://www.lowcountryunscripted.com', logo: '/official/lowcountry-logo.png', width: 1000, height: 600 },
]

const socials = [
  { name: 'YouTube', href: 'https://www.youtube.com/@coastalsolutionsmedia' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569810494297' },
  { name: 'Instagram', href: 'https://www.instagram.com/coastalsolutionsmedia' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/coastalsolutionsmedia/?viewAsMember=true' },
]

export default function LandingHub() {
  return (
    <>
    <HubHexBackground />
    <IntroSwarm />
    <div className="hub">
      <a className="skip-link" href="#main">Skip to links</a>
      <header className="identity">
        <Image className="brand-logo" src="/official/csm-logo.webp" alt="Coastal Solutions Media" width={480} height={353} loading="eager" fetchPriority="high" />
        <div><h1>Coastal Solutions Media</h1><p>Solutions Beyond Horizons.</p></div>
      </header>
      <main id="main">
        <a className="audit-button" href="https://app.coastaflow.ai/widget/form/DgnYvfyPRgKgZS8gFqoY"><ScanLine size={23} aria-hidden="true" /><span><strong>Get Your Free Digital Audit</strong><small>Find your next growth opportunity.</small></span><ArrowRight size={19} aria-hidden="true" /></a>
        <section className="contact" aria-labelledby="contact-title">
          <div className="person"><h2 id="contact-title">Brian Pierce</h2><span>President / CEO</span></div>
          <div className="contact-buttons"><a href="tel:+16784165997"><Phone size={17} aria-hidden="true" /><span>Call Brian<small>(678) 416-5997</small></span></a><a href="mailto:brian@coastalsolutionsmedia.com"><Mail size={18} aria-hidden="true" /><span>Email Brian<small>Let’s talk business</small></span></a></div>
          <a className="save-contact" href="/contact.vcf" download="Brian-Pierce-Coastal-Solutions-Media.vcf"><Contact size={18} aria-hidden="true" /><span>Save Contact to Device</span></a>
        </section>
        <nav className="destinations" aria-label="Our websites and podcast">
          {sites.map(site => <a className="destination" key={site.href} href={site.href} aria-label={site.detail === 'Podcast' ? 'Lowcountry Unscripted Podcast' : undefined}><span className="logo-frame"><Image src={site.logo} alt="" width={site.width} height={site.height} /></span><span className="destination-copy"><strong>{site.name}</strong>{'services' in site && site.services ? <small className="services">{site.services.map(service => <span key={service}>{service}</span>)}</small> : <small>{site.detail}</small>}</span><ArrowUpRight size={18} aria-hidden="true" /></a>)}
        </nav>
        <p className="about-copy">Lowcountry-based marketing, websites &amp; AI.</p>
        <nav className="more-links" aria-label="Learn about Coastal Solutions Media"><a href="https://www.coastalsolutionsmedia.com/portfolio"><BriefcaseBusiness size={17} aria-hidden="true" />See Our Work<ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.coastalsolutionsmedia.com/about"><UserRound size={17} aria-hidden="true" />About Us<ArrowUpRight size={15} aria-hidden="true" /></a></nav>
        <div className="review-actions">
        <a className="leave-review" href="https://g.page/r/CfYAy-Jna-CUEBM/review" target="_blank" rel="noopener noreferrer"><Image src="/official/google-g.png" alt="Google" width={23} height={23} unoptimized /><strong>Leave Us a Review</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
        <a className="review-link" href="https://share.google/cGTG3DA4y7jDHL0ZB"><Image className="google-mark" src="/official/google-g.png" alt="Google" width={20} height={20} unoptimized /><strong>See Our Reviews</strong><small>on Google</small><ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <nav className="social-links" aria-label="Follow Coastal Solutions Media">{socials.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Coastal Solutions Media on ${social.name} (opens in a new tab)`}><Image src={`/official/${social.name.toLowerCase()}.svg`} width={23} height={23} alt="" unoptimized /></a>)}</nav>
      </main>
      <footer>© {new Date().getFullYear()} Coastal Solutions Media</footer>
    </div>
    </>
  )
}
