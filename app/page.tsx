'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import GlassTile from '@/components/GlassTile'

// ── SVG Logo marks ──────────────────────────────────────────────────────────

function LighthouseLogo() {
  return (
    <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden flex items-center justify-center">
      <Image
        src="/csm-logo.jpg"
        alt="Coastal Solutions Media"
        fill
        className="object-contain"
        sizes="72px"
      />
    </div>
  )
}

function FlowClawLogos() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[60px] h-[48px] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
        <Image
          src="/coastaflow-logo.jpg"
          alt="CoastaFlow"
          fill
          className="object-contain"
          sizes="60px"
        />
      </div>
      <div className="relative w-[54px] h-[54px] rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
        <Image
          src="/coastaclaw-logo.jpg"
          alt="CoastaClaw"
          fill
          className="object-contain"
          sizes="54px"
        />
      </div>
    </div>
  )
}

// ── Tiles data ───────────────────────────────────────────────────────────────

const tiles = [
  {
    logo: <LighthouseLogo />,
    title: 'Coastal Solutions Media',
    titleAccent: null,
    description:
      'Media that builds brands. Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    accentColor: 'teal' as const,
  },
  {
    logo: <FlowClawLogos />,
    title: (
      <>
        <span className="text-cyan-400">Coasta</span>
        <span className="text-cf-blue">Flow</span>
        {' + '}
        <span className="text-cf-blue">Coasta</span>
        <span className="text-cf-red">Claw</span>
      </>
    ),
    titleAccent: null,
    description:
      'AI-powered business systems, automation, CRM infrastructure, and digital workforce solutions.',
    url: 'https://www.coastaflow.ai',
    accentColor: 'teal' as const,
  },
  {
    logo: (
      <div className="relative w-[70px] h-[70px] rounded-xl overflow-hidden flex items-center justify-center">
        <Image
          src="/lowcountry-logo.jpg"
          alt="Lowcountry Unscripted"
          fill
          className="object-contain"
          sizes="70px"
        />
      </div>
    ),
    title: (
      <span className="text-indigo-400">Lowcountry Unscripted</span>
    ),
    titleAccent: null,
    description:
      'Real conversations, real people, real stories from the Lowcountry.',
    url: 'https://www.lowcountryunscripted.com',
    accentColor: 'periwinkle' as const,
  },
]

// ── Component ────────────────────────────────────────────────────────────────

export default function LandingHub() {
  return (
    <>
      {/* 3D Background */}
      <FractalOrb />

      {/* Noise overlay */}
      <div className="noise-overlay" />

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

          {/* Hero headline */}
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
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tiles.map((tile, i) => (
                <GlassTile key={i} {...tile} index={i} />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="pb-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xs text-white/20 tracking-wide"
          >
            &copy; {new Date().getFullYear()} Coastal Solutions Media. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </>
  )
}
