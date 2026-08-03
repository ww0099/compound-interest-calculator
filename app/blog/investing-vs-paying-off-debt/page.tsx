import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Investing vs Paying Off Debt: How to Decide with Math",
  description:
    "Should you invest extra cash or pay down debt first? The answer comes down to one number — your interest rate. Here's the math, with a real $50,000 case study.",
  alternates: { canonical: "https://top.net.im/blog/investing-vs-paying-off-debt" },
  robots: { index: true, follow: true },
}

const content: BlogContent = {
  title: "Investing vs Paying Off Debt: How to Decide with Math",
  date: "2026-08-03",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "Every financial forum on the internet has argued this one: should you invest your extra cash, or throw it at your debt? The honest answer is that it's not a personality test — it's a math problem. One number, your interest rate, settles most of the argument. The rest is about risk and how you handle uncertainty. We built a concrete case study so you can see exactly where the tipping point is.",
  description:
    "Should you invest extra cash or pay down debt first? The answer comes down to one number — your interest rate. Here's the math, with a real $50,000 case study.",
  sections: [
    {
      heading: "The Rule That Settles 90% of the Debate",
      body: "Compare your debt's interest rate to the return you expect from investing. If the debt rate is higher, pay the debt. If the investment return is higher, invest. That's the whole framework. In practice, there's one critical twist: the debt rate is guaranteed, while investment returns are not. So a fair comparison isn't 7% debt vs 7% expected returns — it's 7% guaranteed vs 7% that could easily be 3% or 12%. That asymmetry matters more than people think.",
    },
    {
      heading: "The $50,000 Case Study: A Fair Fight",
      body: "Imagine you have $50,000 in student debt at 7% over 10 years, and $50,000 in cash. Option A: pay off the loan. Your monthly payment of $580.54 disappears, and you save the $19,665 in total interest the loan would have charged. Option B: invest the $50,000 at a hoped-for 7% return. After 10 years, $50,000 compounding at 7% grows to $98,358 — a gain of $48,358. On paper, investing looks better by roughly $28,000. But that assumes your investment actually earns 7% every year, with zero market turbulence. If the market returns 5%, the investment only grows to $81,445, and paying off the debt wins.",
      table: {
        caption: "The $50,000 decision — 10-year outcomes",
        headers: ["Path", "10-Year Result"],
        rows: [
          ["Pay off loan — interest saved", "$19,665"],
          ["Invest at 7% (if it delivers)", "$98,358"],
          ["Invest at 5% (if market lags)", "$81,445"],
        ],
      },
    },
    {
      heading: "Guaranteed vs Expected: Why the Spread Matters",
      body: "This is where the decision stops being pure math. A 7% debt is a guaranteed 7% loss of wealth every year you carry it. A 7% stock market return is an average over decades — in any given year it might be -20% or +25%. Most advisors suggest you need a spread of about 2-4 percentage points to justify investing instead of paying debt, precisely because of that uncertainty. So the practical rule becomes: invest instead of prepaying when your expected return beats your debt rate by a comfortable margin. When they're close, pay the debt — a guaranteed return is worth more than an uncertain one.",
    },
    {
      heading: "When Debt Obviously Wins",
      body: "High-interest debt makes the decision trivial. A credit card at 18% APR doubles your balance in about 4 years if unpaid (72 ÷ 18). Payday loans and most credit card balances are in this territory. No rational person should hold a 15-20% debt while investing in a 7% expected-return portfolio. The same logic applies to many auto loans at 6-9% and private student loans. Every dollar you throw at a 18% card is earning an 18% guaranteed return — nothing in the stock market offers that certainty.",
    },
    {
      heading: "When Investing Usually Wins",
      body: "The case flips with low-rate, tax-advantaged debt. A 3.5% mortgage in a period when a balanced portfolio historically returns 7-9% is cheap money — most people are better off investing than aggressively prepaying, especially after the mortgage interest deduction. The same goes for federal student loans at 4-5% and 0% promotional financing. If your debt is below about 5%, the historical evidence says investing the difference outperforms prepaying over a long horizon — you just have to stomach the volatility.",
    },
    {
      heading: "The Cash-Flow and Psychology Angle",
      body: "Math isn't the only factor, and pretending otherwise leads to bad decisions. Paying off debt gives a guaranteed psychological win: fewer bills, more cash flow, and a sense of security that no brokerage statement can match. It also reduces your required monthly expenses, which makes you more resilient to job loss or emergencies. On the flip side, some people can't be trusted to invest the 'difference' they'd get from refinancing to a lower payment — the money just gets spent. If you're the type who spends whatever is in the checking account, the discipline of paying off debt may be worth more than the theoretical return spread.",
    },
    {
      heading: "A Practical Decision Framework",
      body: [
        "List every debt with its interest rate and balance. Credit cards and payday loans come first — always.",
        "Compare each debt's rate to your realistic expected investment return (be honest — use 6-7% for a balanced portfolio, not a fantasy 15%).",
        "If the debt rate is more than 2-4 points above expected returns, prepay it. If it's below, invest — or at minimum stop making minimum payments and invest the surplus.",
        "Keep an emergency fund of 3-6 months of expenses before doing either aggressively.",
        "Run your own numbers: our compound interest calculator at / shows what your investment could grow to, and our loan calculator at /loan shows what your debt is actually costing you.",
      ],
    },
  ],
  relatedArticles: [
    { slug: "loan-amortization-explained", title: "Loan Amortization Explained: How Your Monthly Payment Really Works" },
    { slug: "compound-vs-simple-interest", title: "Compound Interest vs Simple Interest: A 10-Year Comparison" },
    { slug: "rule-of-72", title: "The Rule of 72: How Fast Does Your Money Double?" },
    { slug: "500-per-month-30-years", title: "How Much Will $500/Month Grow in 30 Years?" },
  ],
}

export default function Page() {
  return <BlogLayout slug="investing-vs-paying-off-debt" content={content} />
}
