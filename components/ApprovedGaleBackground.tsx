'use client'

import { useEffect, useRef } from 'react'

type GaleWindow = Window & {
  CSMBackground?: { mountHexBackground: (canvas: HTMLCanvasElement, options: { logoSelector: string }) => (() => void) }
  mountGaleLighthouse?: () => (() => void)
}
const scripts = new Map<string, Promise<void>>()
function loadScript(src: string) {
  if (!scripts.has(src)) scripts.set(src, new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src; script.onload = () => resolve(); script.onerror = () => { scripts.delete(src); script.remove(); reject(new Error(src)) }
    document.head.appendChild(script)
  }))
  return scripts.get(src)!
}

/** Exact approved renderer, with a React lifecycle adapter. */
export default function ApprovedGaleBackground({ lighthouse = false }: { lighthouse?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const root = document.documentElement
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
    let cancelled = false, lost = false
    let dispose = () => {}, stopBeam = () => {}
    const update = () => {
      const rendered = canvas.dataset.rendered === 'true' && !lost && !root.classList.contains('no-webgl')
      root.dataset.backgroundState = rendered ? 'webgl' : 'fallback'
      root.dataset.motionState = !rendered ? 'fallback' : motion.matches ? 'reduced-motion' : nav.connection?.saveData || (nav.deviceMemory && nav.deviceMemory <= 4) ? 'save-data' : document.hidden ? 'hidden' : 'running'
    }
    const contextLost = () => { lost = true; delete canvas.dataset.rendered; update() }
    const contextRestored = () => { lost = false; update() }
    const observer = new MutationObserver(update)
    observer.observe(canvas, { attributes: true, attributeFilter: ['data-rendered'] })
    canvas.addEventListener('webglcontextlost', contextLost)
    canvas.addEventListener('webglcontextrestored', contextRestored)
    motion.addEventListener('change', update); document.addEventListener('visibilitychange', update)
    update()
    const mount = async () => {
      try {
        await loadScript('/approved-gale/csm-background-kinetic.js')
        if (cancelled) return
        root.classList.remove('no-webgl')
        dispose = (window as GaleWindow).CSMBackground!.mountHexBackground(canvas, { logoSelector: '.brand-logo' }) || (() => {})
        update()
        if (lighthouse) {
          await loadScript('/approved-gale/lighthouse.js')
          if (!cancelled) stopBeam = (window as GaleWindow).mountGaleLighthouse!()
        }
      } catch { if (!cancelled) { root.classList.add('no-webgl'); update() } }
    }
    void mount()
    return () => {
      cancelled = true; observer.disconnect(); dispose(); stopBeam()
      canvas.removeEventListener('webglcontextlost', contextLost); canvas.removeEventListener('webglcontextrestored', contextRestored)
      motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update)
      delete canvas.dataset.rendered; delete root.dataset.backgroundState; delete root.dataset.motionState
    }
  }, [lighthouse])
  return <canvas ref={ref} className="hex-canvas" aria-hidden="true" data-source="deep-brand-single-beam-20261016" />
}
