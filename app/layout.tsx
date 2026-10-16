import type { Metadata } from 'next'
import './globals.css'
import './approved-gale.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hub.coastalsolutionsmedia.com'),
  title: 'CSM Hub | Coastal Solutions Media',
  description: 'Solutions Beyond Horizons. Request your free digital audit, explore Coastal Solutions Media and CoastaFlow.AI, or connect with Brian Pierce.',
  alternates: { canonical: '/' },
  openGraph: { title: 'CSM Hub | Solutions Beyond Horizons', description: 'Your free digital audit, our work, and a direct connection to Brian Pierce.', url: '/', siteName: 'Coastal Solutions Media', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'CSM Hub | Solutions Beyond Horizons', description: 'Your free digital audit, our work, and a direct connection to Brian Pierce.', images: ['/opengraph-image'] },
  icons: { icon: [{ url: '/official/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/official/favicon-48.png', sizes: '48x48', type: 'image/png' }], apple: [{ url: '/official/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('csm-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='skip'}catch(e){}" }} /><link rel="preload" href="/fonts/jetbrains-mono-400.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head>
      <body>
        {children}
      </body>
    </html>
  )
}
