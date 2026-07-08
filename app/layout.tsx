import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://top.net.im'),
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
      'Free compound interest calculator - solve for FV, PV, rate, time, or contributions with interactive charts and side-by-side comparison.',
    url: 'https://top.net.im',
    siteName: 'Compound Interest Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator - Free Online Investment Growth Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Free Investment Growth Tool',
    description:
      'Free compound interest calculator - solve for FV, PV, rate, time, or contributions with interactive charts and side-by-side comparison.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://top.net.im/',
  },
  other: {
    'google-adsense-account': 'ca-pub-1920425213895856',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
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

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Compound Interest Calculator',
  url: 'https://top.net.im',
  description:
    'Free compound interest calculator. Solve future value, present value, rate, time, or monthly contributions with interactive charts and comparison mode.',
  inLanguage: 'en',
}

const jsonLdWebApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Compound Interest Calculator',
  url: 'https://top.net.im',
  description:
    'Free online compound interest calculator with five solve modes — future value, present value, interest rate, investment period, and monthly contribution. Includes growth charts, comparison mode, and history.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  inLanguage: 'en',
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Compound Interest Calculator',
  url: 'https://top.net.im',
  logo: 'https://top.net.im/og-image.png',
  description:
    'Free online financial calculator helping users plan long-term investment growth with compound interest.',
  sameAs: ['https://github.com/WW0099/compound-interest-calculator'],
}

const jsonLdString = JSON.stringify(jsonLdWebSite)
const jsonLdAppString = JSON.stringify(jsonLdWebApp)
const jsonLdOrgString = JSON.stringify(jsonLdOrganization)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdAppString }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdOrgString }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
