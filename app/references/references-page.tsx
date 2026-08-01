"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Library } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Reference {
  title: string
  desc: string
  url: string
  category: "gov" | "edu" | "org" | "book"
}

const REFERENCES: Reference[] = [
  {
    title: "Investopedia — Compound Interest",
    desc: "Comprehensive explanation of compound interest, including formulas, examples, and real-world applications.",
    url: "https://www.investopedia.com/terms/c/compoundinterest.asp",
    category: "org",
  },
  {
    title: "Investopedia — Effective Annual Interest Rate",
    desc: "Definition and calculation of the Effective Annual Rate (EAR), including the impact of compounding frequency.",
    url: "https://www.investopedia.com/terms/e/effectiveinterest.asp",
    category: "org",
  },
  {
    title: "U.S. Securities and Exchange Commission (SEC) — Compound Interest Calculator",
    desc: "The SEC's official compound interest calculator and investor education resources on the power of compounding.",
    url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    category: "gov",
  },
  {
    title: "Federal Reserve Economic Data (FRED)",
    desc: "Historical interest rate data from the Federal Reserve Bank of St. Louis, providing context for real-world rate environments.",
    url: "https://fred.stlouisfed.org/categories/22",
    category: "gov",
  },
  {
    title: "IRS — Topic No. 409, Capital Gains and Losses",
    desc: "Official IRS guidance on capital gains tax rates, holding periods, and reporting requirements for investment income.",
    url: "https://www.irs.gov/taxtopics/tc409",
    category: "gov",
  },
  {
    title: "IRS — Publication 550, Investment Income and Expenses",
    desc: "Detailed IRS publication covering the tax treatment of investment income, including capital gains and losses.",
    url: "https://www.irs.gov/publications/p550",
    category: "gov",
  },
  {
    title: "Bodie, Kane & Marcus — Investments (12th Edition)",
    desc: "Standard university-level textbook on investment theory, covering compound interest, time value of money, and portfolio theory. McGraw-Hill Education.",
    url: "https://www.mheducation.com/highered/product/investments-bodie-kane/M9781260013832.html",
    category: "book",
  },
  {
    title: "Fabozzi — Fixed Income Analysis (4th Edition)",
    desc: "Authoritative reference on fixed-income mathematics, including compounding conventions, yield calculations, and interest rate theory. CFA Institute Investment Series.",
    url: "https://www.wiley.com/en-us/Fixed+Income+Analysis,+4th+Edition-p-9781119626862",
    category: "book",
  },
  {
    title: "Khan Academy — Compound Interest",
    desc: "Free educational video series explaining compound interest, the time value of money, and the mathematics of exponential growth.",
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial/compound-interest-tutorial/v/introduction-to-compound-interest",
    category: "edu",
  },
  {
    title: "MIT OpenCourseWare — Mathematics of Finance",
    desc: "Lecture notes and course materials on the mathematics of compound interest, annuities, and loan amortization from MIT's Sloan School of Management.",
    url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/",
    category: "edu",
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  gov: "Government & Regulatory",
  edu: "Educational Institutions",
  org: "Financial Reference",
  book: "Academic Textbooks",
}

export function ReferencesPage() {

  const t = {
    title: "References",
    back: "Back to Calculator",
    intro:
      "The following authoritative sources inform the formulas, assumptions, and educational content on this site. We cite only publicly accessible, reputable institutions and standard academic references.",
    disclaimer:
      "External links are provided for reference only. We are not affiliated with, endorsed by, or officially connected to any of the organizations listed below.",
  }

  // Group references by category
  const grouped = REFERENCES.reduce<Record<string, Reference[]>>((acc, ref) => {
    if (!acc[ref.category]) acc[ref.category] = []
    acc[ref.category].push(ref)
    return acc
  }, {})

  const categoryOrder = ["gov", "edu", "org", "book"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Library className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
            </div>

            {/* Intro */}
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {t.disclaimer}
            </p>

            {/* References by category */}
            <div className="space-y-10">
              {categoryOrder.map((cat) => {
                const refs = grouped[cat]
                if (!refs || refs.length === 0) return null
                const label = CATEGORY_LABELS[cat]
                return (
                  <section key={cat}>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </h2>
                    <div className="space-y-4">
                      {refs.map((ref, i) => (
                        <a
                          key={i}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {ref.title}
                            </h3>
                            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                              {ref.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {"About"}
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-foreground">
            {"Methodology"}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {"Privacy Policy"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {"Disclaimer"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
