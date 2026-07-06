import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Free Investment Growth Tool',
  description:
    'Free compound interest calculator. Solve future value, present value, rate, time, or monthly contributions with interactive charts and comparison mode.',
  keywords:
    'compound interest calculator, investment calculator, compound interest, future value, retirement planning, savings calculator, 72 rule, CAGR, financial calculator, wealth growth',
  authors: [{ name: 'WW0099' }],
  generator: 'v0.app',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googlebot: 'index, follow',
  },
  openGraph: {
    title: 'Compound Interest Calculator | Free Investment Growth Tool',
    description:
      'Free compound interest calculator — solve for FV, PV, rate, time, or contributions with interactive charts and side-by-side comparison.',
    url: 'https://top.net.im',
    siteName: 'Compound Interest Calculator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Free Investment Growth Tool',
    description:
      'Free compound interest calculator — solve for FV, PV, rate, time, or contributions with interactive charts and side-by-side comparison.',
  },
  alternates: {
    canonical: 'https://top.net.im',
  },
  other: {
    'google-adsense-account': 'ca-pub-1920425213895856',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1a365d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light bg-background">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
