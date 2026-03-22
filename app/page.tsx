'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import { ArrowRight } from 'lucide-react'

const tiles = [
  {
    name: 'Coastal Solutions Media',
    tagline: 'Media that builds brands.',
    description:
      'Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    logoSrc: '/csm-logo.jpg',
    logoAlt: 'Coastal Solutions Media',
    accent: 'teal',
  },
  {
    name: 'CoastaFlow + CoastaClaw',
    tagline: 'AI-powered business systems.',
    description:
      'Automation, CRM infrastructure, and digital workforce solutions.',
    url: 'https://www.coastaflow.ai',
    logoSrc: '/coastaflow-logo.jpg',
    logoAlt: 'CoastaFlow',
    accent: 'blue',
  },
  {
    name: 'Lowcountry Unscripted',
    tagline: 'Real stories. Real people.',
    description:
      'Real conversations from the Lowcountry.',
    url: 'https://www.lowcountryunscripted.com',
    logoSrc: '/lowcountry-logo.jpg',
    logoAlt: 'Lowcountry Unscripted',
    accent: 'periwinkle',
  },
]

const accentMap = {
  teal: {
    name: 'text-cyan-400',
    nameAccent: 'text-cyan-400',
    border: 'rgba(20, 184, 166, 0.2)',
    borderHover: 'rgba(20, 184, 166, 0.5)',
    arrow: 'text-cyan-400/60 group-hover:text-cyan-400',
    glow: 'rgba(20, 184, 166, 0.12)',
  },
  blue: {
    name: 'text-cf-blue',
    nameAccent: 'text-cf-blue',
    border: 'rgba(46, 142, 234, 0.2)',
    borderHover: 'rgba(46, 142, 234, 0.5)',
    arrow: 'text-cf-blue/60 group-hover:text-cf-blue',
    glow: 'rgba(46, 142, 234, 0.12)',
  },
  periwinkle: {
    name: 'text-indigo-400',
    nameAccent: 'text-indigo-400',
    border: 'rgba(129, 140, 248, 0.2)',
    borderHover: 'rgba(129, 140, 248, 0.5)',
    arrow: 'text-indigo-400/60 group-hover:text-indigo-400',
    glow: 'rgba(129, 140, 248, 0.12)',
  },
}

export default function LandingHub() {
  return (
    <>
      <FractalOrb />
      <div className="noise-overlay" />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="pt-14 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10"
          >
            <span className="w-2 h-2 rounded-full animate-flash-red" />
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
              Coastal Solutions Media
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight font-display"
          >
            Choose Your <span className="text-gradient-hero">Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-base md:text-lg text-white/40 font-light tracking-wide max-w-md mx-auto"
          >
            Powered by Coastal Solutions Media
          </motion.p>
        </header>

        {/* Tile grid */}
        <main className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

              {tiles.map((tile, i) => {
                const a = accentMap[tile.accent as keyof typeof accentMap]
                return (
                  <motion.a
                    key={tile.name}
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center no-underline"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15 + i * 0.12,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {/* Tile card */}
                    <div
                      className="w-full flex flex-col items-center px-8 py-10 rounded-3xl transition-all duration-500 relative"
                      style={{
                        background: 'rgba(0, 0, 0, 0.55)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: `1px solid ${a.border}`,
                        boxShadow: `0 0 0 0 ${a.glow}`,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)'
                        e.currentTarget.style.border = `1px solid ${a.borderHover}`
                        e.currentTarget.style.boxShadow = `0 0 50px ${a.glow}, 0 30px 60px rgba(0,0,0,0.5)`
                        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.55)'
                        e.currentTarget.style.border = `1px solid ${a.border}`
                        e.currentTarget.style.boxShadow = `0 0 0 0 ${a.glow}`
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      }}
                    >
                      {/* Logo — raw, no container */}
                      <div className="relative mb-8" style={{ width: 120, height: 80 }}>
                        <Image
                          src={tile.logoSrc}
                          alt={tile.logoAlt}
                          fill
                          className="object-contain"
                          sizes="120px"
                        />
                      </div>

                      {/* Divider */}
                      <div
                        className="w-8 h-px mb-6 rounded-full"
                        style={{ background: a.border }}
                      />

                      {/* Tagline */}
                      <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${a.name}`}>
                        {tile.tagline}
                      </p>

                      {/* Name */}
                      <h2 className={`text-xl md:text-2xl font-bold font-display mb-4 leading-tight ${a.name}`}>
                        {tile.name}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-[220px]">
                        {tile.description}
                      </p>

                      {/* Enter arrow */}
                      <div className={`flex items-center gap-2 ${a.arrow} transition-all duration-300`}>
                        <span className="text-xs font-semibold tracking-widest uppercase">Enter</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.a>
                )
              })}

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-10 text-center">
          <p className="text-xs text-white/20 tracking-wide">
            &copy; {new Date().getFullYear()} Coastal Solutions Media. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}
