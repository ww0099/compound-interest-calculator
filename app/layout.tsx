import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteFooter } from '@/components/site-footer'
import { CookieConsent } from '@/components/cookie-consent'

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
    googleBot: 'index, follow',
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

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is compound interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compound interest is the interest earned on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns on the principal, compound interest creates exponential growth over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate compound interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the formula FV = PV × (1 + r/n)^(n×t) where PV is the initial principal, r is the annual interest rate, n is the number of compounding periods per year, and t is the number of years. Our free calculator handles all five variables (FV, PV, rate, time, and contributions).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Rule of 72?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Rule of 72 is a mental shortcut to estimate how long it takes for an investment to double. Divide 72 by the annual interest rate (as a percentage). At 6%, your money doubles in approximately 12 years (72 ÷ 6 = 12).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does inflation affect my investments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inflation reduces the real purchasing power of your investment returns. An 8% nominal return with 3% inflation means your real return is approximately 5%. Over 30 years, 3% inflation can erode nearly 60% of your nominal gains.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I save for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A common guideline is the 4% rule: multiply your desired annual retirement income by 25 to get your target retirement savings. For example, to withdraw $40,000 per year, you would need approximately $1,000,000 saved. Use our retirement calculator for personalized projections.',
      },
    },
  ],
}

const jsonLdString = JSON.stringify(jsonLdWebSite)
const jsonLdAppString = JSON.stringify(jsonLdWebApp)
const jsonLdOrgString = JSON.stringify(jsonLdOrganization)
const jsonLdFaqString = JSON.stringify(jsonLdFaq)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light bg-background">
      <head>
        <link rel="preconnect" href="https://top.net.im" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFaqString }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  )
}
