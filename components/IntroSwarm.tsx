'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const LOGO = '/official/csm-logo.webp'
const FORM = 2.9, HOLD = 1.1, FADE = .7

/** One-time-per-session intro: a galaxy of particles swirls in and resolves into the supplied CSM logo. */
export default function IntroSwarm() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<'run' | 'logo' | 'out' | 'done'>('run')

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.intro === 'skip' || matchMedia('(prefers-reduced-motion: reduce)').matches) return // hidden by CSS
    try { sessionStorage.setItem('csm-intro', '1') } catch {}
    const canvas = ref.current
    if (!canvas) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' }) }
    catch { const id = window.setTimeout(() => setPhase('done')); return () => clearTimeout(id) }
    let frame = 0, disposed = false
    const timers: number[] = []
    const finish = () => { setPhase('out'); timers.push(window.setTimeout(() => setPhase('done'), FADE * 1000)) }
    const skip = () => { cancelAnimationFrame(frame); finish() }
    canvas.parentElement?.addEventListener('pointerdown', skip, { once: true })

    const img = new Image()
    img.src = LOGO
    img.decode().then(() => {
      if (disposed) return
      const w = innerWidth, h = innerHeight, mobile = w <= 600
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(w, h, false); renderer.setClearColor('#000000', 1)
      const scene = new THREE.Scene(), camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -10, 10)
      // Sample the actual logo raster for target positions and colors.
      const sw = 260, sh = Math.round(sw * img.naturalHeight / img.naturalWidth)
      const sample = document.createElement('canvas'); sample.width = sw; sample.height = sh
      const ctx = sample.getContext('2d', { willReadFrequently: true })!; ctx.drawImage(img, 0, 0, sw, sh)
      const data = ctx.getImageData(0, 0, sw, sh).data, solid: number[] = []
      for (let i = 0; i < sw * sh; i++) if (data[i * 4 + 3] > 140) solid.push(i)
      const logoW = Math.min(w * .78, 420), scale = logoW / sw
      const count = mobile ? 26000 : 70000
      const start = new Float32Array(count * 3), target = new Float32Array(count * 3), color = new Float32Array(count * 3), rand = new Float32Array(count * 4)
      const reach = Math.hypot(w, h) * .55
      for (let i = 0; i < count; i++) {
        const px = solid[(Math.random() * solid.length) | 0], x = px % sw, y = (px / sw) | 0
        target.set([(x + Math.random() - sw / 2) * scale, (sh / 2 - y - Math.random()) * scale, 0], i * 3)
        const arm = (i % 3) * Math.PI * 2 / 3, r = Math.pow(Math.random(), .6) * reach
        start.set([r + 30, arm + r / reach * 4 + (Math.random() - .5) * .9, 0], i * 3)
        const k = i * 3, p = px * 4
        color.set([data[p] / 255 * 1.25, data[p + 1] / 255 * 1.25, data[p + 2] / 255 * 1.25], k)
        rand.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(target, 3))
      geometry.setAttribute('aStart', new THREE.BufferAttribute(start, 3))
      geometry.setAttribute('aColor', new THREE.BufferAttribute(color, 3))
      geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 4))
      const uniforms = { uT: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uFade: { value: 1 } }
      const material = new THREE.ShaderMaterial({
        uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        vertexShader: `uniform float uT,uPx;attribute vec3 aStart,aColor;attribute vec4 aRand;varying vec3 vColor;varying float vA;
          void main(){
            float p=clamp((uT-aRand.x*.9)/1.85,0.,1.),e=1.-pow(1.-p,4.);
            float ang=aStart.y+uT*(1.1+aRand.y*.6)*(1.-e)+(1.-e)*3.;
            vec2 swirl=vec2(cos(ang),sin(ang)*.62)*aStart.x*(1.-e*.85);
            vec2 pos=mix(swirl,position.xy,e)+vec2(sin(uT*3.+aRand.z*40.),cos(uT*2.+aRand.w*40.))*(1.-e)*6.;
            vec3 peri=vec3(.41,.49,1.),teal=vec3(.08,.72,.65),copper=vec3(.92,.35,.05);
            vec3 hot=aRand.z<.45?peri:aRand.z<.75?teal:copper;
            vColor=mix(hot*1.4,aColor,smoothstep(.55,1.,e));
            vA=(.35+.65*e)*(.75+.25*sin(uT*9.+aRand.w*60.));
            gl_PointSize=uPx*(1.15+aRand.y*.9+(1.-e)*1.2);
            gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,0.,1.);}`,
        fragmentShader: `uniform float uFade;varying vec3 vColor;varying float vA;
          void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,vA*uFade*smoothstep(.5,.0,d));}`,
      })
      scene.add(new THREE.Points(geometry, material))
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = (now - t0) / 1000
        uniforms.uT.value = t
        uniforms.uFade.value = 1 - THREE.MathUtils.smoothstep(t, FORM + .25, FORM + HOLD)
        renderer.render(scene, camera)
        if (t > FORM) setPhase(p => (p === 'run' ? 'logo' : p))
        if (t > FORM + HOLD) { finish(); return }
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
      timers.push(window.setTimeout(() => { geometry.dispose(); material.dispose() }, (FORM + HOLD + FADE + 1) * 1000))
    }).catch(() => setPhase('done'))

    return () => { disposed = true; cancelAnimationFrame(frame); timers.forEach(clearTimeout); renderer.dispose() }
  }, [])

  if (phase === 'done') return null
  return (
    <div className={`intro is-${phase}`} aria-hidden="true">
      <canvas ref={ref} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="intro-logo" src={LOGO} alt="" />
      <span className="intro-skip">Tap to skip</span>
    </div>
  )
}
