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
    logoSrc: '/csm-logo.png',
    logoAlt: 'Coastal Solutions Media',
    accentColor: 'teal',
  },
  {
    name: (
      <>
        <span className="text-cf-blue">CoastaFlow</span>
        {' + '}
        <span className="text-cf-red">CoastaClaw</span>
      </>
    ),
    tagline: 'AI-powered business systems.',
    description: 'Automation, CRM infrastructure, and digital workforce solutions.',
    url: 'https://www.coastaflow.ai',
    logoSrc: '/coastaflow-logo.png',
    logoAlt: 'CoastaFlow',
    logoSrc2: '/coastaclaw-logo.png',
    logoAlt2: 'CoastaClaw',
    accentColor: 'blue',
  },
  {
    name: 'Lowcountry Unscripted',
    tagline: 'Real stories. Real people.',
    description: 'Real conversations from the Lowcountry.',
    url: 'https://www.lowcountryunscripted.com',
    logoSrc: '/lowcountry-logo.png',
    logoAlt: 'Lowcountry Unscripted',
    accentColor: 'periwinkle',
  },
]

const glowMap = {
  teal:       { border: 'rgba(20, 184, 166, 0.25)',  borderH: 'rgba(20, 184, 166, 0.6)',  glow: 'rgba(20, 184, 166, 0.12)',  text: 'text-cyan-400'     },
  blue:       { border: 'rgba(46, 142, 234, 0.25)', borderH: 'rgba(46, 142, 234, 0.6)',  glow: 'rgba(46, 142, 234, 0.12)', text: 'text-cf-blue'      },
  periwinkle: { border: 'rgba(129, 140, 248, 0.25)', borderH: 'rgba(129, 140, 248, 0.6)', glow: 'rgba(129, 140, 248, 0.12)', text: 'text-indigo-400'  },
}

export default function LandingHub() {
  return (
    <>
      {/* 3D background — centered, hot pink wireframe, dark blue core */}
      <FractalOrb />

      {/* Main layout */}
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

        {/* Three tiles, horizontal */}
        <main className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

              {tiles.map((tile, i) => {
                const g = glowMap[tile.accentColor as keyof typeof glowMap]
                return (
                  <motion.a
                    key={i}
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center text-center no-underline"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.13,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {/* Card — solid dark, NO blur */}
                    <div
                      className="tile-card w-full flex flex-col items-center px-6 py-10 rounded-3xl"
                      style={{
                        background: 'rgba(0, 0, 0, 0.65)',
                        border: `1px solid ${g.border}`,
                        boxShadow: `0 0 0 0 ${g.glow}`,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = `1px solid ${g.borderH}`
                        el.style.boxShadow = `0 0 80px ${g.glow}, 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)`
                        el.style.transform = 'translateY(-14px) scale(1.04)'
                        el.style.background = 'rgba(0, 0, 0, 0.8)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.border = `1px solid ${g.border}`
                        el.style.boxShadow = `0 0 0 0 ${g.glow}`
                        el.style.transform = 'translateY(0) scale(1)'
                        el.style.background = 'rgba(0, 0, 0, 0.65)'
                      }}
                    >
                      {/* Subtle bottom glow */}
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 right-0"
                        style={{
                          height: '40%',
                          background: `radial-gradient(ellipse at 50% 100%, ${g.glow} 0%, transparent 70%)`,
                        }}
                      />

                      {/* Logos */}
                      <div className="relative z-10 flex flex-col items-center gap-4 mb-6">
                        {/* Primary logo */}
                        <div className="relative" style={{ width: 140, height: 80 }}>
                          <Image
                            src={tile.logoSrc}
                            alt={tile.logoAlt}
                            fill
                            className="object-contain"
                            sizes="140px"
                          />
                        </div>

                        {/* Second logo (CoastaClaw) */}
                        {tile.logoSrc2 && (
                          <div className="relative" style={{ width: 120, height: 72 }}>
                            <Image
                              src={tile.logoSrc2}
                              alt={tile.logoAlt2!}
                              fill
                              className="object-contain"
                              sizes="120px"
                            />
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div
                        className="w-10 h-px rounded-full mb-5"
                        style={{ background: g.border }}
                      />

                      {/* Tagline */}
                      <p className={`text-xs font-bold tracking-[0.22em] uppercase mb-3 ${g.text}`}>
                        {tile.tagline}
                      </p>

                      {/* Name */}
                      <h2 className={`text-xl md:text-2xl font-bold font-display mb-4 leading-tight ${g.text}`}>
                        {tile.name}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-[210px]">
                        {tile.description}
                      </p>

                      {/* Enter */}
                      <div
                        className="flex items-center gap-2 transition-all duration-300"
                        style={{ color: 'inherit', opacity: 0.65 }}
                      >
                        <span className={`text-xs font-semibold tracking-widest uppercase ${g.text}`}>Enter</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: 'inherit' }}
                        />
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
