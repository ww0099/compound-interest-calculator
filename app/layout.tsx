import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  // 标题 ≤60字符，中文优先 + 品牌词 + 核心关键词
  title: '复利计算器 - 在线复利投资收益计算 | Compound Interest Calculator',
  description:
    '免费在线复利计算器，支持终值、现值、年利率、投资期限、每月定投五种求解模式，提供增长趋势图表和方案对比功能，帮助您科学规划长期投资收益。',
  keywords:
    '复利计算器,复利,投资计算器,定投计算,复利收益,理财计算,72法则,compound interest calculator,在线计算器,财务规划',
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
    title: '复利计算器 - 在线复利投资收益计算',
    description:
      '免费在线复利计算器，支持终值、现值、利率、期限、定投五种求解，带图表对比。',
    url: 'https://top.net.im',
    siteName: '复利计算器',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '复利计算器 - 在线复利投资收益计算',
    description:
      '免费在线复利计算器，支持终值、现值、利率、期限、定投五种求解，带图表对比。',
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
    <html lang="zh-CN" className="light bg-background">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
