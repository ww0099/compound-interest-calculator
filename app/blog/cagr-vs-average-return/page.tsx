import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "CAGR vs Average Return: Why the Difference Can Mislead You",
  description:
    "An investment gaining 50% then losing 50% is not flat — it's down 25%. Learn why CAGR (geometric mean) is the honest measure of investment performance.",
  alternates: { canonical: "https://top.net.im/blog/cagr-vs-average-return" },
  robots: { index: true, follow: true },
}

const content: BlogContent = {
  title: "CAGR vs Average Return: Why the Difference Can Mislead You",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "9 min read",
  intro:
    "An investment gains 50% in year one, then loses 50% in year two. What's your average return? Many would say 0%. The reality: you've lost 25% of your money. This is the trap of arithmetic averages versus geometric returns — and why CAGR (Compound Annual Growth Rate) is the only honest way to measure investment performance. Understanding this distinction will make you a savvier investor and protect you from misleading performance claims.",
  description:
    "Why the arithmetic average return is misleading — learn how CAGR (Compound Annual Growth Rate) gives you the true picture of your investment performance.",
  sections: [
    {
      heading: "The 50/50 Trap: A Revealing Example",
      body: "Start with $1,000. Year 1: +50% → $1,500. Year 2: -50% → $750. The arithmetic average return is (+50% + -50%) / 2 = 0%. And yet you've lost $250, or 25%. This happens because a 50% loss requires a 100% gain to recover. Down 50% from $1,500 to $750 means you need to gain 100% from $750 just to get back to $1,500. This asymmetry is why arithmetic averages overstate returns whenever there's volatility — and there's always volatility.",
    },
    {
      heading: "CAGR: The Honest Number",
      body: "CAGR answers: what constant annual rate would produce the same final value? For the 50/50 example: $1,000 × (1 + CAGR)^2 = $750 → CAGR = (750/1000)^(1/2) - 1 = -13.4%. The CAGR says you lost 13.4% per year, which accurately reflects the $250 loss. The arithmetic average says 0%, which is dangerously misleading. CAGR is always less than or equal to the arithmetic average. The gap between them widens as volatility increases — making volatile investments look better than they really are when judged by average returns alone.",
    },
    {
      heading: "Real-World Example: 5 Years of S&P 500",
      body: "Consider these hypothetical annual S&P 500 returns: Year 1: +28%, Year 2: -12%, Year 3: +24%, Year 4: -8%, Year 5: +18%. The arithmetic average is (28-12+24-8+18)/5 = 10.0% — looks solid. Now calculate the actual growth: $1,000 → $1,280 → $1,126 → $1,397 → $1,285 → $1,516. The CAGR: (1516/1000)^(1/5) - 1 = 8.7%. The gap is 1.3 percentage points per year. Over 30 years, $100,000 at 10.0% grows to $1,744,940. At 8.7% (actual CAGR), it grows to $1,220,022. The 'average return' overstates final wealth by $524,918 — a 43% exaggeration.",
    },
    {
      heading: "Why Mutual Funds Report Average Returns",
      body: "Mutual funds are required to report standardized returns (1-year, 5-year, 10-year CAGR), but marketing materials often highlight 'average annual return' which is the arithmetic mean. When you see a fund advertise 'Average annual return: 12% over 5 years,' look for the CAGR number in the fine print. If the fund experienced significant volatility, the CAGR could be substantially lower. This is especially true for sector funds, emerging market funds, and any concentrated portfolio.",
    },
    {
      heading: "How to Protect Yourself",
      body: [
        "Always ask for CAGR: When evaluating any investment performance, calculate or request the CAGR, not the arithmetic average.",
        "Check the volatility: The gap between average and CAGR is proportional to variance. Higher volatility = bigger gap = more misleading the average becomes.",
        "Use the calculator: On top.net.im, enter your actual year-by-year returns in a spreadsheet, compute the final value, then use the Rate solver to find the CAGR.",
        "Be skeptical of round numbers: If a fund claims exactly '10% average annual returns,' the real CAGR is almost certainly lower — possibly much lower if the fund is volatile.",
        "Remember the sequence: Returns compound multiplicatively, not additively. (1+r1)(1+r2)...(1+rn) ≠ 1 + (r1+r2+...+rn).",
      ],
    },
    {
      heading: "The Variance Drain Formula",
      body: "There's a useful approximation: CAGR ≈ Arithmetic Average - (Variance / 2). For the S&P example above, the variance of returns is about 0.026, so CAGR ≈ 10.0% - (0.026/2) = 10.0% - 1.3% = 8.7%. This 'variance drain' of 1.3 percentage points per year is the cost of volatility. The formula explains why low-volatility strategies often have competitive long-term returns: they may have lower average returns but also lower variance drain, resulting in similar CAGRs with less stomach-churning rides.",
    },
    {
      heading: "Bottom Line",
      body: "CAGR is the truth-teller of investment performance. The arithmetic average is a marketing number. When someone tells you about 'average returns,' mentally convert it: subtract roughly half the variance to get a realistic CAGR. Better yet, always compute the CAGR yourself from beginning and ending values. Your retirement depends on geometric reality, not arithmetic fantasy.",
    },
  ],
  relatedArticles: [
    { slug: "compound-vs-simple-interest", title: "Compound Interest vs Simple Interest: A 10-Year Comparison" },
    { slug: "rule-of-72", title: "The Rule of 72: How Fast Does Your Money Double?" },
    { slug: "inflation-hidden-tax", title: "Inflation's Hidden Tax on Your Investment Returns" },
  ],
}

export default function Page() {
  return <BlogLayout slug="cagr-vs-average-return" content={content} />
}
