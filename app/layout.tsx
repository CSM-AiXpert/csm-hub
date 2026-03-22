import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CSM Hub | Coastal Solutions Media',
  description: 'The central gateway to the Coastal Solutions Media ecosystem.',
  icons: {
    icon: '/favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
