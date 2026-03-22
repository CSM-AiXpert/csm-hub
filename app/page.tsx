'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import { ArrowRight } from 'lucide-react'

const tiles = [
  {
    name: 'Coastal Solutions Media',
    tagline: 'Media that builds brands.',
    description: 'Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    logoSrc: '/csm-logo.jpg',
    logoAlt: 'Coastal Solutions Media',
    accent: 'teal',
    nameColor: 'text-cyan-400',
  },
  {
    name: 'CoastaFlow',
    tagline: 'AI-powered business systems.',
    description: 'Automation, CRM infrastructure, and digital workforce solutions.',
    url: 'https://www.coastaflow.ai',
    logoSrc: '/coastaflow-logo.jpg',
    logoAlt: 'CoastaFlow',
    accent: 'blue',
    nameColor: 'text-cf-blue',
  },
  {
    name: 'CoastaClaw',
    tagline: 'AI-driven automation.',
    description: 'Intelligent workflows and digital systems that work while you sleep.',
    url: 'https://www.coastaflow.ai',
    logoSrc: '/coastaclaw-logo.jpg',
    logoAlt: 'CoastaClaw',
    accent: 'red',
    nameColor: 'text-cf-red',
  },
  {
    name: 'Lowcountry Unscripted',
    tagline: 'Real stories. Real people.',
    description: 'Real conversations from the Lowcountry.',
    url: 'https://www.lowcountryunscripted.com',
    logoSrc: '/lowcountry-logo.jpg',
    logoAlt: 'Lowcountry Unscripted',
    accent: 'periwinkle',
    nameColor: 'text-indigo-400',
  },
]

const glowMap = {
  teal:    { border: 'rgba(20, 184, 166, 0.2)',  borderH: 'rgba(20, 184, 166, 0.55)',  glow: 'rgba(20, 184, 166, 0.1)'  },
  blue:    { border: 'rgba(46, 142, 234, 0.2)',  borderH: 'rgba(46, 142, 234, 0.55)',  glow: 'rgba(46, 142, 234, 0.1)'  },
  red:     { border: 'rgba(221, 44, 44, 0.2)',   borderH: 'rgba(221, 44, 44, 0.55)',   glow: 'rgba(221, 44, 44, 0.1)'  },
  periwinkle: { border: 'rgba(129, 140, 248, 0.2)', borderH: 'rgba(129, 140, 248, 0.55)', glow: 'rgba(129, 140, 248, 0.1)' },
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

        {/* Tile grid — four tiles, horizontal wrap */}
        <main className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="w-full max-w-7xl">
            <div className="flex flex-wrap items-stretch justify-center gap-8">

              {tiles.map((tile, i) => {
                const g = glowMap[tile.accent as keyof typeof glowMap]
                return (
                  <motion.a
                    key={tile.name}
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center no-underline flex-1 min-w-[200px] max-w-[280px]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 + i * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {/* Card */}
                    <div
                      className="tile-card w-full flex flex-col items-center px-7 py-9 rounded-3xl"
                      style={{
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        border: `1px solid ${g.border}`,
                        boxShadow: `0 0 0 0 ${g.glow}`,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = `1px solid ${g.borderH}`
                        el.style.boxShadow = `0 0 60px ${g.glow}, 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
                        el.style.transform = 'translateY(-12px) scale(1.03)'
                        el.style.background = 'rgba(0, 0, 0, 0.75)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = `1px solid ${g.border}`
                        el.style.boxShadow = `0 0 0 0 ${g.glow}`
                        el.style.transform = 'translateY(0) scale(1)'
                        el.style.background = 'rgba(0, 0, 0, 0.6)'
                      }}
                    >
                      {/* Glow fill from bottom */}
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0 rounded-b-3xl"
                        style={{
                          height: '50%',
                          background: `radial-gradient(ellipse at 50% 100%, ${g.glow} 0%, transparent 70%)`,
                          transition: 'opacity 0.5s',
                        }}
                      />

                      {/* Logo — JPG bg stripped via mix-blend-mode */}
                      <div
                        className="relative mb-8"
                        style={{ width: 130, height: 90 }}
                      >
                        <div
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(8px)',
                          }}
                        />
                        <Image
                          src={tile.logoSrc}
                          alt={tile.logoAlt}
                          fill
                          className="object-contain relative z-10"
                          sizes="130px"
                          style={{ mixBlendMode: 'multiply' }}
                        />
                      </div>

                      {/* Tagline */}
                      <p
                        className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                        style={{ color: tile.nameColor }}
                      >
                        {tile.tagline}
                      </p>

                      {/* Name */}
                      <h2
                        className={`text-xl md:text-2xl font-bold font-display mb-4 leading-tight ${tile.nameColor}`}
                      >
                        {tile.name}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-[210px]">
                        {tile.description}
                      </p>

                      {/* Enter */}
                      <div
                        className="flex items-center gap-2 transition-all duration-300"
                        style={{ color: tile.nameColor, opacity: 0.7 }}
                      >
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
