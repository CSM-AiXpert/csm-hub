'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import { ArrowRight } from 'lucide-react'

const NEON_TEAL = '#22D3EE'
const NEON_GREEN = '#39FF14'
const CF_BLUE = '#2E8EEA'
const CF_RED = '#DD2C2C'

const tiles = [
  {
    tagline: 'Solutions beyond horizons.',
    description: 'Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    logoSrc: '/csm-logo.png',
    logoAlt: 'Coastal Solutions Media',
    nameText: 'Coastal Solutions Media',
    nameColor: NEON_TEAL,
    borderColor: 'rgba(20, 184, 166, 0.22)',
    borderHColor: 'rgba(20, 184, 166, 0.65)',
    glowColor: 'rgba(20, 184, 166, 0.1)',
  },
  {
    tagline: 'AI-powered business systems.',
    description: 'Automation, CRM infrastructure, and digital workforce solutions.',
    url: 'https://www.coastaflow.ai',
    logoSrc: '/coastaflow-logo.png',
    logoAlt: 'CoastaFlow',
    logoSrc2: '/coastaclaw-logo.png',
    logoAlt2: 'CoastaClaw',
    borderColor: 'rgba(46, 142, 234, 0.22)',
    borderHColor: 'rgba(46, 142, 234, 0.65)',
    glowColor: 'rgba(46, 142, 234, 0.1)',
  },
  {
    tagline: 'Real stories. Real people.',
    description: 'Real conversations from the Lowcountry.',
    url: 'https://www.lowcountryunscripted.com',
    logoSrc: '/lowcountry-logo.png',
    logoAlt: 'Lowcountry Unscripted',
    nameText: 'Lowcountry Unscripted',
    nameColor: '#818CF8',
    borderColor: 'rgba(129, 140, 248, 0.22)',
    borderHColor: 'rgba(129, 140, 248, 0.65)',
    glowColor: 'rgba(129, 140, 248, 0.1)',
  },
]

// Top position for the text content block — same for all tiles so taglines align
const CONTENT_TOP = 170

export default function LandingHub() {
  return (
    <>
      {/* Full-page 3D background */}
      <div className="fixed inset-0 -z-10">
        <FractalOrb />
      </div>

      {/* Noise */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        opacity: 0.025,
      }} />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="pt-8 pb-6 text-center shrink-0 px-4">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(20, 184, 166, 0.08)',
              border: '1px solid rgba(20, 184, 166, 0.35)',
              boxShadow: '0 0 20px rgba(20, 184, 166, 0.2), 0 0 40px rgba(20, 184, 166, 0.08)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
              background: NEON_TEAL,
              boxShadow: `0 0 6px ${NEON_TEAL}, 0 0 12px ${NEON_TEAL}`,
            }} />
            <span className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: NEON_TEAL }}>
              Coastal{' '}
              <span style={{ color: '#FF0000', animation: 'rainbow-solutions 4s linear infinite', display: 'inline-block' }}>
                Solutions
              </span>
              {' '}Media
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-white mb-3 leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)' }}
          >
            Choose Your <span className="text-gradient-hero">Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs text-white/40 font-light tracking-wide max-w-[200px] mx-auto"
          >
            Powered by Coastal Solutions Media
          </motion.p>
        </header>

        {/* Tiles — mobile-first: stacked on mobile, row on tablet+ */}
        <main className="flex-1 flex items-start justify-center px-4 pb-12">
          <div className="flex flex-col items-center gap-8 w-full max-w-[300px] sm:max-w-[580px] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:max-w-[820px] xl:max-w-[900px]">

            {tiles.map((tile, i) => (
              <motion.a
                key={i}
                href={tile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline w-full sm:flex-1"
                style={{ maxWidth: '300px', minWidth: '200px' }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.13,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {/* Card */}
                <div
                  className="relative text-center"
                  style={{
                    background: 'rgba(0, 0, 0, 0.62)',
                    border: `1px solid ${tile.borderColor}`,
                    borderRadius: '18px',
                    aspectRatio: '3 / 4',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.border = `1px solid ${tile.borderHColor}`
                    el.style.boxShadow = `0 0 70px ${tile.glowColor}, 0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`
                    el.style.transform = 'translateY(-10px) scale(1.03)'
                    el.style.background = 'rgba(0, 0, 0, 0.78)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.border = `1px solid ${tile.borderColor}`
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.background = 'rgba(0, 0, 0, 0.62)'
                  }}
                >
                  {/* Top glow */}
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      top: 0, left: 0, right: 0,
                      height: '25%',
                      background: `radial-gradient(ellipse at 50% 0%, ${tile.glowColor} 0%, transparent 70%)`,
                      zIndex: 1,
                    }}
                  />

                  {/* Logos — centered */}
                  <div
                    className="absolute z-10"
                    style={{
                      top: 14,
                      left: 0,
                      right: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: 110, height: 68, position: 'relative' }}>
                      <Image src={tile.logoSrc} alt={tile.logoAlt} fill className="object-contain" sizes="110px" />
                    </div>
                    {tile.logoSrc2 && (
                      <div style={{ width: 88, height: 56, position: 'relative', marginTop: 6 }}>
                        <Image src={tile.logoSrc2} alt={tile.logoAlt2!} fill className="object-contain" sizes="88px" />
                      </div>
                    )}
                  </div>

                  {/* Text content block — fixed top position */}
                  <div
                    className="absolute left-0 right-0 flex flex-col items-center px-3"
                    style={{ top: CONTENT_TOP }}
                  >
                    {/* Divider */}
                    <div className="w-7 h-px rounded-full mb-3" style={{ background: tile.borderColor }} />

                    {/* Tagline */}
                    <p className="text-[8px] font-bold tracking-[0.2em] uppercase mb-1.5 whitespace-nowrap" style={{ color: NEON_TEAL }}>
                      {tile.tagline}
                    </p>

                    {/* Brand name */}
                    {tile.nameText ? (
                      <h2 className="text-xs font-bold font-display leading-tight mb-1.5 px-1" style={{ color: tile.nameColor }}>
                        {tile.nameText}
                      </h2>
                    ) : (
                      <div className="flex flex-col items-center gap-0.5 mb-1.5">
                        <h2 className="text-xs font-bold font-display leading-tight">
                          <span style={{ color: CF_BLUE }}>Coasta</span>
                          <span style={{ color: CF_BLUE }}>Flow</span>
                        </h2>
                        <h2 className="text-xs font-bold font-display leading-tight">
                          <span style={{ color: CF_BLUE }}>Coasta</span>
                          <span style={{ color: CF_RED }}>Claw</span>
                        </h2>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-[10px] leading-relaxed px-1 mb-2" style={{ color: 'rgba(34, 211, 238, 0.65)' }}>
                      {tile.description}
                    </p>

                    {/* Enter */}
                    <div className="flex items-center gap-1 transition-all duration-300" style={{ color: NEON_GREEN }}>
                      <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: NEON_GREEN }}>
                        Enter
                      </span>
                      <ArrowRight
                        className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: NEON_GREEN }}
                      />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

          </div>
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center shrink-0">
          <p className="text-[10px] text-white/20 tracking-wide">
            &copy; {new Date().getFullYear()} Coastal Solutions Media. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}
