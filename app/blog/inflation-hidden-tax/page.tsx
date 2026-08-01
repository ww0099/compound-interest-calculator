import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Inflation's Hidden Tax on Your Investment Returns",
  description:
    "Nominal returns can be deceiving. See a 30-year comparison of nominal vs real wealth — and learn why inflation is the silent wealth destroyer every investor must account for.",
  alternates: { canonical: "https://top.net.im/blog/inflation-hidden-tax" },
  robots: { index: true, follow: true },
}

const content: BlogContent = {
  title: "Inflation's Hidden Tax on Your Investment Returns",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "You check your brokerage account and see your portfolio hit a new high. You feel good — until you realize that a gallon of milk now costs 40% more than it did a decade ago. This is inflation's hidden tax: your nominal returns look impressive, but what matters is what your money can actually buy. We ran the numbers for a 30-year investment to show exactly how much purchasing power inflation steals.",
  description:
    "Discover how inflation silently erodes your investment returns over time — the hidden tax that can destroy your purchasing power even as your portfolio grows.",
  sections: [
    {
      heading: "Nominal vs Real: The Crucial Distinction",
      body: "Nominal return is the raw percentage your investment grows. Real return is nominal return minus inflation. If your portfolio gains 8% in a year but inflation is 3%, your real return is approximately 5%. Over short periods, the gap seems small. Over 30 years, it's staggering. A $100,000 investment at 8% nominally grows to $1,006,266. But with 3% annual inflation, the real purchasing power is only $411,960 — less than half the nominal figure. Inflation effectively 'taxed' away $594,306 of your wealth.",
    },
    {
      heading: "The 30-Year Simulation: $100,000 at 8%",
      body: "Using our compound interest calculator, we modeled a $100,000 lump sum at 8% annual return with 3% inflation over 30 years. Nominal balance: $1,006,266. Real balance (inflation-adjusted): $411,960. Total nominal interest: $906,266. Real interest (actual purchasing power gained): $311,960. This means 65.6% of your nominal gains were consumed by inflation. You didn't see this 'tax' on any statement — but it's very real.",
    },
    {
      heading: "Why 2% vs 3% Inflation Matters Enormously",
      body: "The difference between 2% and 3% average inflation over 30 years is much larger than most people think. At 2% inflation, the same $100,000 at 8% gives a real balance of $558,173. At 3% inflation, it drops to $411,960 — a $146,213 difference. Central banks fight over fractions of a percent in inflation targets precisely because those fractions compound into enormous differences in long-term purchasing power.",
    },
    {
      heading: "Inflation's Uneven Impact",
      body: "Inflation doesn't affect all expenses equally. Over the past 30 years, US healthcare costs have risen roughly 5-6% annually, college tuition about 5-7%, and housing about 3-4%, while consumer electronics have actually deflated. If your personal inflation rate is higher than the CPI average — because you spend more on healthcare, education, and housing — your real returns are even lower than standard calculations suggest. This is why retirement planning should use a personal inflation estimate, not just the headline CPI figure.",
    },
    {
      heading: "How to Protect Against Inflation",
      body: "The best long-term inflation hedge has historically been equities (stocks). Companies can raise prices to pass inflation costs to consumers, which means their earnings — and ultimately their stock prices — tend to rise with inflation over the long run. Real estate and Treasury Inflation-Protected Securities (TIPS) also provide partial protection. Cash and long-term nominal bonds are the most vulnerable. This is why a 'safe' all-cash portfolio is actually risky in real terms — you're guaranteed to lose purchasing power every year.",
    },
    {
      heading: "Key Numbers at a Glance",
      body: [
        "Investment: $100,000 lump sum, 8% annual return, 30 years",
        "0% inflation (nominal): $1,006,266",
        "2% inflation: Real value = $558,173 | Lost to inflation = $448,093 (44.5%)",
        "3% inflation: Real value = $411,960 | Lost to inflation = $594,306 (59.0%)",
        "5% inflation: Real value = $224,208 | Lost to inflation = $782,058 (77.7%)",
        "Use the 'Inflation Rate' field on top.net.im to see your own scenario.",
      ],
    },
  ],
  relatedArticles: [
    { slug: "beginner-guide-retirement", title: "A Beginner's Guide to Retirement Planning with Compound Interest" },
    { slug: "cagr-vs-average-return", title: "CAGR vs Average Return: Why the Difference Can Mislead You" },
    { slug: "500-per-month-30-years", title: "How Much Will $500/Month Grow in 30 Years?" },
  ],
}

export default function Page() {
  return <BlogLayout slug="inflation-hidden-tax" content={content} />
}
