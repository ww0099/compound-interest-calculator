import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Loan Amortization Explained: How Your Monthly Payment Really Works",
  description:
    "Most of your early mortgage payments go to interest, not principal. We break down the amortization table with real numbers from a 30-year mortgage.",
  alternates: { canonical: "https://top.net.im/blog/loan-amortization-explained" },
  robots: { index: true, follow: true },
}

const content: BlogContent = {
  title: "Loan Amortization Explained: How Your Monthly Payment Really Works",
  date: "2026-08-03",
  author: "WW0099",
  readingTime: "9 min read",
  intro:
    "If you've ever looked at your mortgage statement and wondered why the balance barely moved after years of payments, you're not alone. That's amortization at work — and until you understand how it actually splits your payment between interest and principal, you can't make smart decisions about extra payments, refinancing, or choosing between a 15-year and 30-year loan. We ran the numbers on a realistic $300,000 mortgage at 6.5% to show you exactly what happens.",
  description:
    "Most of your early mortgage payments go to interest, not principal. We break down the amortization table with real numbers from a 30-year mortgage.",
  sections: [
    {
      heading: "What Amortization Actually Means",
      body: "Amortization is the process of paying off a loan through a fixed, equal monthly payment over a set term. The trick is that each monthly payment is the same amount, but the split between interest and principal changes every single month. In the early years, interest dominates because your balance is largest. As the balance shrinks, the interest portion shrinks too, and more of your payment finally goes toward the principal. It's the mirror image of compound interest working against you instead of for you.",
    },
    {
      heading: "The First Year of a 30-Year Mortgage: The Harsh Reality",
      body: "Let's look at a concrete example: a $300,000 mortgage at 6.5% for 30 years. The monthly payment is $1,896.20. Over the entire first year, you'll pay a total of $22,754. That sounds like a solid chunk of progress — until you see the breakdown. In year one, $19,401 of your payments goes to interest, and just $3,353 goes toward paying down the principal. That means over 85% of what you pay in the first year is interest. The balance on a $300,000 loan only drops to about $296,647 after twelve full payments.",
    },
    {
      heading: "How the Split Shifts Over Time",
      body: "The turning point on a 30-year mortgage happens roughly at the halfway mark. Around year 18, the split finally reaches 50/50 — half your payment goes to interest, half to principal. From there it accelerates. In the final years, almost your entire payment is principal. To feel this difference, consider this: in year 1, each $1,896 payment puts about $279 toward principal. In year 29, the same payment puts about $1,878 toward principal. The payment never changes — but what it's buying changes enormously.",
    },
    {
      heading: "15-Year vs 30-Year Mortgage: The $212,235 Question",
      body: "The same $300,000 loan at 6.5% over 15 years has a monthly payment of $2,613.32 — about $717 more per month. That extra payment is painful in the short term, but the total picture is dramatic. Over 15 years you'll pay $170,398 in total interest. Over 30 years, you'll pay $382,633. Choosing the 15-year term saves you $212,235 in interest. The shorter term saves money twice: fewer years of interest accrual, plus a lower effective rate being applied to a balance that's shrinking faster.",
      table: {
        caption: "The same $300,000 mortgage at 6.5%",
        headers: ["Term", "Monthly Payment", "Total Interest"],
        rows: [
          ["15 years", "$2,613", "$170,398"],
          ["30 years", "$1,896", "$382,633"],
          ["Savings with 15-yr", "—", "$212,235"],
        ],
      },
    },
    {
      heading: "Extra Payments: The Hidden Superpower",
      body: "You don't have to commit to a 15-year loan to slash your interest. Adding just $100 per month to your payment on that 30-year, $300,000 mortgage at 6.5% shortens the payoff from 360 months to about 312 months — that's 4 years off the loan. The interest savings add up to roughly $122,000. A one-time lump sum works too: pay an extra $10,000 in the first year and you'll knock about 2 years off the term and save around $61,000 in interest. The earlier the extra payment, the more each dollar saves, because it's cutting interest at the peak of the curve.",
    },
    {
      heading: "Auto Loans and Student Loans Follow the Same Rule",
      body: "Amortization isn't unique to mortgages. A $20,000 car loan at 5% over 5 years costs $377.42 per month and $2,645 in total interest. A $50,000 student loan at 7% over 10 years costs $580.54 per month and $19,665 in total interest. The same front-loaded interest pattern applies: early payments on the student loan are roughly 70% interest. The lesson carries over — any extra dollar you can put toward a loan in its early years has outsized value.",
    },
    {
      heading: "What This Means for Your Decision-Making",
      body: [
        "Check the amortization schedule, not just the monthly payment. Two loans with identical payments can have wildly different interest costs depending on the term.",
        "The interest rate, not the payment amount, is the real driver of total cost. A lower rate on a longer term can still beat a higher rate on a shorter one.",
        "Extra payments made in the first few years are worth far more than the same dollar amount later. Front-load your prepayments if you can.",
        "Before prepaying, compare your loan's interest rate to what you'd earn investing instead — that comparison is covered in our article on investing vs paying off debt.",
        "Use our loan calculator at /loan to generate your own amortization table and see the year-by-year interest split.",
      ],
    },
  ],
  relatedArticles: [
    { slug: "investing-vs-paying-off-debt", title: "Investing vs Paying Off Debt: How to Decide with Math" },
    { slug: "compound-vs-simple-interest", title: "Compound Interest vs Simple Interest: A 10-Year Comparison" },
    { slug: "500-per-month-30-years", title: "How Much Will $500/Month Grow in 30 Years?" },
    { slug: "beginner-guide-retirement", title: "A Beginner's Guide to Retirement Planning with Compound Interest" },
  ],
}

export default function Page() {
  return <BlogLayout slug="loan-amortization-explained" content={content} />
}
