import type { Metadata } from "next"
import { BlogIndex } from "./blog-index"

export const metadata: Metadata = {
  title: "Financial Education Blog - Compound Interest Calculator",
  description:
    "Learn about compound interest, retirement planning, investing strategies, and financial literacy. Free educational articles backed by real calculation data.",
  alternates: { canonical: "https://top.net.im/blog" },
  robots: { index: true, follow: true },
}

const articles = [
  {
    slug: "time-value-of-money",
    title: "Time Value of Money: Why a Dollar Today Is Worth More Than a Dollar Tomorrow",
    desc:
      "Understand the single most important concept in finance — why today's dollar is worth more than tomorrow's, and how present value and opportunity cost shape every decision.",

    date: "2026-08-01",
    readingTime: "8 min read",
  },
  {
    slug: "dollar-cost-averaging",
    title: "Dollar-Cost Averaging: The Simple Strategy That Beats Market Timing",
    desc:
      "Learn why consistent, automated investing outperforms trying to time the market — with the math, behavioral psychology, and a real-world crash test.",

    date: "2026-07-31",
    readingTime: "8 min read",
  },
  {
    slug: "compound-vs-simple-interest",
    title: "Compound Interest vs Simple Interest: A 10-Year Comparison",
    desc:
      "Discover why compound interest dramatically outperforms simple interest over time, with real data showing the widening gap year by year.",

    date: "2026-07-30",
    readingTime: "8 min read",
  },
  {
    slug: "rule-of-72",
    title: "The Rule of 72: How Fast Does Your Money Double?",
    desc:
      "Master the Rule of 72 — a simple mental shortcut to estimate doubling time. See how different rates change your wealth trajectory over decades.",

    date: "2026-07-30",
    readingTime: "7 min read",
  },
  {
    slug: "500-per-month-30-years",
    title: "How Much Will $500/Month Grow in 30 Years?",
    desc:
      "A realistic look at what consistent monthly investing can achieve. We run the numbers at 4%, 7%, and 10% returns to show the power of starting early.",

    date: "2026-07-30",
    readingTime: "9 min read",
  },
  {
    slug: "inflation-hidden-tax",
    title: "Inflation's Hidden Tax on Your Investment Returns",
    desc:
      "Nominal returns can be deceiving. Learn how inflation silently erodes purchasing power over decades, with a striking 30-year comparison of nominal vs real wealth.",

    date: "2026-07-30",
    readingTime: "8 min read",
  },
  {
    slug: "monthly-vs-annual-compounding",
    title: "Monthly vs Annual Compounding: How Much Difference Does Frequency Make?",
    desc:
      "Does compounding frequency really matter? We quantify the exact dollar difference between annual, monthly, and daily compounding over 20 years.",

    date: "2026-07-30",
    readingTime: "7 min read",
  },
  {
    slug: "beginner-guide-retirement",
    title: "A Beginner's Guide to Retirement Planning with Compound Interest",
    desc:
      "Start from zero? No problem. This guide walks through realistic retirement scenarios — from your 20s, 30s, and 40s — showing exactly how much to save monthly.",

    date: "2026-07-30",
    readingTime: "10 min read",
  },
  {
    slug: "capital-gains-tax",
    title: "Understanding Capital Gains Tax for Long-Term Investors",
    desc:
      "Taxes take a real bite out of your returns. We calculate after-tax outcomes at 0%, 15%, and 30% tax rates to show why tax-efficient investing matters.",

    date: "2026-07-30",
    readingTime: "8 min read",
  },
  {
    slug: "cagr-vs-average-return",
    title: "CAGR vs Average Return: Why the Difference Can Mislead You",
    desc:
      "An investment that gains 50% then loses 50% is NOT flat. Understand the difference between arithmetic and geometric returns — and why CAGR is the honest number.",

    date: "2026-07-30",
    readingTime: "9 min read",
  },
]

export default function BlogPage() {
  return <BlogIndex articles={articles} />
}
