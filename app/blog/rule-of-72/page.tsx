import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "The Rule of 72: How Fast Does Your Money Double?",
  description:
    "Learn the Rule of 72 — a simple mental math shortcut to estimate how long it takes for your investment to double at any interest rate.",
  alternates: { canonical: "https://top.net.im/blog/rule-of-72" },
  robots: { index: true, follow: true },
}

const content: BlogContent = {
  title: "The Rule of 72: How Fast Does Your Money Double?",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "7 min read",
  intro:
    "How long until your money doubles? Instead of reaching for a calculator, you can answer this question in seconds using the Rule of 72 — one of the most useful mental shortcuts in finance. Divide 72 by your annual interest rate, and you'll get a remarkably accurate estimate of the number of years it takes for your investment to double.",
  description:
    "Learn the Rule of 72 — a simple mental math shortcut to estimate how long it takes for your investment to double at any interest rate.",
  sections: [
    {
      heading: "The Rule, Explained in 10 Seconds",
      body: "The Rule of 72 states: Years to double ≈ 72 ÷ annual interest rate (as a percentage). At 6%, your money doubles in roughly 12 years (72 ÷ 6 = 12). At 8%, about 9 years (72 ÷ 8 = 9). At 10%, about 7.2 years (72 ÷ 10 = 7.2). At 12%, about 6 years. That's the entire rule — simple enough to do in your head while reading an investment prospectus or evaluating a savings account.",
    },
    {
      heading: "How Accurate Is It Really?",
      body: "Let's verify the Rule of 72 against exact compound interest calculations. At 6%: Rule says 12.0 years. Exact calculation (ln(2) / ln(1.06)) = 11.90 years. Error: 0.10 years. At 8%: Rule says 9.0 years. Exact: 9.01 years. Error: 0.01 years. At 10%: Rule says 7.2 years. Exact: 7.27 years. Error: 0.07 years. At 4%: Rule says 18.0 years. Exact: 17.67 years. Error: 0.33 years. The Rule of 72 is most accurate in the 6-10% range, which happens to be where most long-term investment return expectations sit. Below 4% it slightly overestimates; above 12% it slightly underestimates.",
    },
    {
      heading: "The Math Behind the Magic",
      body: "Why does 72 work? The exact doubling time comes from solving (1 + r)^n = 2, which gives n = ln(2) / ln(1 + r). For small interest rates, ln(1 + r) ≈ r, so n ≈ ln(2) / r = 0.693 / r. Multiply numerator and denominator by 100 to express r as a percentage: n ≈ 69.3 / r. But 69.3 isn't very convenient for mental math — it's not divisible by many numbers. Enter 72: it's close to 69.3 and evenly divisible by 2, 3, 4, 6, 8, 9, 12, 18, 24, and 36. The slight upward adjustment from 69.3 to 72 also conveniently compensates for the approximation error at typical interest rates, making the rule more accurate where it's used most.",
    },
    {
      heading: "Rule Variations: 69.3, 70, and 72",
      body: "For the purists: the 'Rule of 69.3' is theoretically exact for continuous compounding. The 'Rule of 70' is often used for lower rates (2-5%). The 'Rule of 72' is the sweet spot for the 6-10% range most investors care about. You can even adjust on the fly: for rates below 4%, use 70 or 71; for 4-10%, use 72; for rates above 10%, add 1 to 72 for every 3 percentage points above 10% (so 74 for 13%, 75 for 15%).",
    },
    {
      heading: "Practical Applications Beyond Doubling",
      body: [
        "Inflation halving: At 3% inflation, purchasing power halves in 72 ÷ 3 = 24 years. A dollar today buys what 50 cents will buy in 24 years.",
        "GDP growth: An economy growing at 3% annually doubles in size every 24 years.",
        "Debt doubling: A credit card with 18% APR doubles your debt in 72 ÷ 18 = 4 years if unpaid.",
        "Fee impact: A 2% annual management fee halves your effective return advantage — the fee alone consumes half your growth in 72 ÷ 2 = 36 years.",
        "These applications show that the Rule of 72 isn't just for investing — it's a universal exponential growth estimator.",
      ],
    },
    {
      heading: "Key Takeaways",
      body: "The Rule of 72 is a mental model that makes you faster at evaluating financial decisions. When comparing two investments — say a 6% bond vs a 9% stock index fund — the Rule instantly tells you doubling happens in ~12 years vs ~8 years. That 4-year difference, compounded over a career, explains why asset allocation matters. Use this rule. It takes seconds to learn and a lifetime to benefit from.",
    },
  ],
  relatedArticles: [
    { slug: "compound-vs-simple-interest", title: "Compound Interest vs Simple Interest: A 10-Year Comparison" },
    { slug: "cagr-vs-average-return", title: "CAGR vs Average Return: Why the Difference Can Mislead You" },
    { slug: "inflation-hidden-tax", title: "Inflation's Hidden Tax on Your Investment Returns" },
    { slug: "time-value-of-money", title: "Time Value of Money: Why a Dollar Today Is Worth More Than a Dollar Tomorrow" },
  ],
}

export default function Page() {
  return <BlogLayout slug="rule-of-72" content={content} />
}
