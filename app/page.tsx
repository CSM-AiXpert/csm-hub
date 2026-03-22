'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FractalOrb from '@/components/FractalOrb'
import GlassTile from '@/components/GlassTile'

// ── SVG Logo marks ──────────────────────────────────────────────────────────

function LighthouseIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 4 L26 18 L38 18 L28 26 L32 40 L22 30 L12 40 L16 26 L6 18 L18 18 Z"
        fill="none"
        stroke="#2E8EEA"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <rect x="18" y="22" width="8" height="16" rx="2" fill="#2E8EEA" opacity="0.8" />
      <rect x="16" y="20" width="12" height="4" rx="1.5" fill="#2E8EEA" />
      <circle cx="22" cy="16" r="3" fill="#2E8EEA" />
      <circle cx="22" cy="16" r="5" fill="none" stroke="#2E8EEA" strokeWidth="1" opacity="0.4" />
      <circle cx="22" cy="16" r="8" fill="none" stroke="#2E8EEA" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 22 C10 14, 16 14, 22 22 C28 30, 34 30, 40 22"
        stroke="#2E8EEA"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 28 C10 20, 16 20, 22 28 C28 36, 34 36, 40 28"
        stroke="#2E8EEA"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M8 18 C6 14, 4 14, 4 17 C4 20, 6 20, 8 18"
        stroke="#DD2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M36 18 C38 14, 40 14, 40 17 C40 20, 38 20, 36 18"
        stroke="#DD2C2C"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <circle cx="22" cy="22" r="3" fill="#2E8EEA" opacity="0.9" />
      <circle cx="22" cy="22" r="6" fill="none" stroke="#2E8EEA" strokeWidth="0.75" opacity="0.25" />
    </svg>
  )
}

// ── Tiles data ───────────────────────────────────────────────────────────────

const tiles = [
  {
    logo: <LighthouseIcon />,
    title: 'Coastal Solutions Media',
    titleAccent: null,
    description:
      'Media that builds brands. Content, video, social, and digital presence for modern businesses.',
    url: 'https://www.coastalsolutionsmedia.com',
    accentColor: 'teal' as const,
  },
  {
    logo: <WaveIcon />,
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
