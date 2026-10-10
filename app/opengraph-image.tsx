import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'CSM Hub — Coastal Solutions Media. Free digital audit, our work, and direct contact with Brian Pierce.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function SocialImage() {
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), 'public/official/csm-logo-social.png')),
    readFile(join(process.cwd(), 'public/fonts/jetbrains-mono-400.ttf')),
  ])
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0d121c', color: '#f2f6ff', fontFamily: 'JetBrains Mono', padding: 66, position: 'relative' }}>
      <div style={{ display: 'flex', position: 'absolute', top: 0, right: 0, width: 460, height: 630, background: 'linear-gradient(140deg,#26374b,#132129 55%,#111620)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', width: 710 }}>
        <div style={{ color: '#91bde9', fontSize: 18, letterSpacing: 4 }}>COASTAL SOLUTIONS MEDIA</div>
        <div style={{ fontSize: 86, lineHeight: 1.1, marginTop: 40, letterSpacing: -5 }}>Your next move.</div>
        <div style={{ fontSize: 86, lineHeight: 1.1, color: '#80b7ff', letterSpacing: -5 }}>Starts here.</div>
        <div style={{ color: '#b6c3d3', fontSize: 23, marginTop: 26 }}>Solutions Beyond Horizons.</div>
        <div style={{ display: 'flex', marginTop: 46, gap: 16, alignItems: 'center' }}>
          <div style={{ padding: '17px 22px', background: '#2469dc', borderRadius: 12, fontSize: 20 }}>Free Digital Audit</div>
          <div style={{ fontSize: 17, color: '#bbcadc' }}>Work · Websites · Connect</div>
        </div>
        <div style={{ fontSize: 16, marginTop: 36, color: '#8a9eb8' }}>hub.coastalsolutionsmedia.com</div>
      </div>
      {/* The approved lighthouse is embedded unchanged; this is a code-composed social card. */}
      <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width={340} height={250} style={{ position: 'absolute', right: 42, top: 170, objectFit: 'contain' }} />
      <div style={{ position: 'absolute', bottom: 65, right: 72, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: '#adc6df', fontSize: 18 }}><span>CSM / HUB</span><span style={{ fontSize: 12, marginTop: 10, color: '#6da7a6' }}>ONE CONNECTION. MORE POSSIBILITIES.</span></div>
    </div>,
    { ...size, fonts: [{ name: 'JetBrains Mono', data: font, weight: 400, style: 'normal' }] },
  )
}
