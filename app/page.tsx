'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import { ArrowRight } from 'lucide-react'

const tiles = [
  {
    tagline: 'Media that builds brands.',
    description: 'Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    logoSrc: '/csm-logo.png',
    logoAlt: 'Coastal Solutions Media',
    nameText: 'Coastal Solutions Media',
    nameColor: 'text-cyan-400',
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
    nameText: null,
    flowColor: 'text-cf-blue',
    clawColor: 'text-cf-red',
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
    nameColor: 'text-indigo-400',
    borderColor: 'rgba(129, 140, 248, 0.22)',
    borderHColor: 'rgba(129, 140, 248, 0.65)',
    glowColor: 'rgba(129, 140, 248, 0.1)',
  },
]

const NEON_GREEN = '#39FF14'

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
        <header className="pt-12 pb-10 text-center shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full animate-flash-red" />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
              Coastal Solutions Media
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-5 leading-tight tracking-tight font-display"
          >
            Choose Your <span className="text-gradient-hero">Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/40 font-light tracking-wide max-w-xs mx-auto"
          >
            Powered by Coastal Solutions Media
          </motion.p>
        </header>

        {/* Tiles — horizontal row, more space between them */}
        <main className="flex-1 flex items-stretch justify-center px-8 pb-20">
          <div className="flex flex-wrap items-stretch justify-center gap-20">

            {tiles.map((tile, i) => (
              <motion.a
                key={i}
                href={tile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline flex flex-col"
                style={{ width: 'clamp(220px, 22vw, 270px)' }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.0,
                  delay: 0.1 + i * 0.14,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {/* Vertical card — 9:16, flex-col so contents stretch */}
                <div
                  className="card-inner flex flex-col items-center justify-between text-center px-5 pt-10 pb-8 h-full"
                  style={{
                    background: 'rgba(0, 0, 0, 0.62)',
                    border: `1px solid ${tile.borderColor}`,
                    borderRadius: '20px',
                    aspectRatio: '9 / 16',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.border = `1px solid ${tile.borderHColor}`
                    el.style.boxShadow = `0 0 80px ${tile.glowColor}, 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`
                    el.style.transform = 'translateY(-16px) scale(1.04)'
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
                    className="pointer-events-none absolute top-0 left-0 right-0"
                    style={{
                      height: '30%',
                      background: `radial-gradient(ellipse at 50% 0%, ${tile.glowColor} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Top section: logo + tagline + name */}
                  <div className="flex flex-col items-center w-full">
                    {/* Logo(s) */}
                    <div className="relative z-10 mb-4" style={{ width: 130, height: 80 }}>
                      <Image
                        src={tile.logoSrc}
                        alt={tile.logoAlt}
                        fill
                        className="object-contain"
                        sizes="130px"
                      />
                    </div>

                    {tile.logoSrc2 && (
                      <div className="relative z-10 mb-4" style={{ width: 105, height: 65 }}>
                        <Image
                          src={tile.logoSrc2!}
                          alt={tile.logoAlt2!}
                          fill
                          className="object-contain"
                          sizes="105px"
                        />
                      </div>
                    )}

                    {/* Divider */}
                    <div className="w-10 h-px rounded-full mb-4" style={{ background: tile.borderColor }} />

                    {/* Tagline — neon teal */}
                    <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3 text-cyan-400">
                      {tile.tagline}
                    </p>

                    {/* Brand name */}
                    {tile.nameText ? (
                      <h2 className={`text-base font-bold font-display leading-tight px-1 ${tile.nameColor}`}>
                        {tile.nameText}
                      </h2>
                    ) : (
                      /* CoastaFlow + CoastaClaw: Flow=blue, Claw=red */
                      <h2 className="text-base font-bold font-display leading-tight">
                        <span className="text-cf-blue">CoastaFlow</span>
                        <span className="text-white/60"> + </span>
                        <span className="text-cf-red">CoastaClaw</span>
                      </h2>
                    )}
                  </div>

                  {/* Bottom section: description + enter */}
                  <div className="flex flex-col items-center w-full mt-auto">
                    {/* Description — neon teal */}
                    <p className="text-xs leading-relaxed px-2 mb-0" style={{ color: 'rgba(34, 211, 238, 0.65)' }}>
                      {tile.description}
                    </p>

                    {/* Enter — neon green */}
                    <div
                      className="flex items-center gap-2 mt-5 transition-all duration-300"
                      style={{ color: NEON_GREEN }}
                    >
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: NEON_GREEN }}>
                        Enter
                      </span>
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
        <footer className="pb-10 text-center shrink-0">
          <p className="text-xs text-white/20 tracking-wide">
            &copy; {new Date().getFullYear()} Coastal Solutions Media. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}
