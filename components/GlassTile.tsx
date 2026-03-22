'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ReactNode } from 'react'

interface GlassTileProps {
  logo: ReactNode
  title: string
  titleAccent?: string | null
  description: string
  url: string
  accentColor?: 'blue' | 'teal' | 'red'
  index: number
}

export default function GlassTile({
  logo,
  title,
  titleAccent,
  description,
  url,
  accentColor = 'blue',
  index,
}: GlassTileProps) {
  const colorMap = {
    blue: {
      text: 'text-cf-blue',
      glow: 'rgba(46, 142, 234, 0.4)',
      border: 'rgba(46, 142, 234, 0.15)',
      hoverBorder: 'rgba(46, 142, 234, 0.4)',
      gradient: 'from-cf-blue/20 to-cf-blue/5',
      cta: 'text-cf-blue/80',
      ctaHover: 'text-cf-blue',
    },
    teal: {
      text: 'text-cyan-400',
      glow: 'rgba(20, 184, 166, 0.4)',
      border: 'rgba(20, 184, 166, 0.15)',
      hoverBorder: 'rgba(20, 184, 166, 0.4)',
      gradient: 'from-cyan-500/15 to-cyan-500/5',
      cta: 'text-cyan-400/80',
      ctaHover: 'text-cyan-400',
    },
    red: {
      text: 'text-cf-red',
      glow: 'rgba(221, 44, 44, 0.4)',
      border: 'rgba(221, 44, 44, 0.15)',
      hoverBorder: 'rgba(221, 44, 44, 0.4)',
      gradient: 'from-cf-red/15 to-cf-red/5',
      cta: 'text-cf-red/80',
      ctaHover: 'text-cf-red',
    },
  }

  const colors = colorMap[accentColor]

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-tile group flex flex-col items-center text-center p-10 no-underline"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Logo mark */}
      <div className="logo-mark mb-8">
        {logo}
      </div>

      {/* Title */}
      <h2 className={`text-2xl md:text-3xl font-bold font-display mb-3 tracking-tight ${colors.text}`}>
        {title}
      </h2>

      {titleAccent != null && (
        <p className={`text-sm font-semibold tracking-[0.15em] uppercase mb-4 ${colors.text} opacity-70`}>
          {titleAccent}
        </p>
      )}

      {/* Description */}
      <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-xs mb-8 flex-1">
        {description}
      </p>

      {/* CTA */}
      <div className={`tile-cta ${colors.cta} group-hover:${colors.ctaHover}`}>
        <span>Enter</span>
        <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
      </div>
    </motion.a>
  )
}
