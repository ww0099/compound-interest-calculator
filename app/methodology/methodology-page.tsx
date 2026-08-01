"use client"

import Link from "next/link"
import { ArrowLeft, Calculator, AlertTriangle, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MethodologyPage() {

  const t = {
    title: "Methodology",
    back: "Back to Calculator",
    intro:
      "This page documents every mathematical formula and assumption used in the Compound Interest Calculator. We believe in full transparency — there are no hidden algorithms or black-box calculations.",

    // Core formulas
    formulaHeading:
      "Core Formulas",
    fvTitle:
      "1. Future Value with Contributions",
    fvDesc:
      "The compound interest formula with regular contributions combines the growth of an initial lump sum and a series of periodic payments:",
    fvFormula: "FV = PV × (1 + r/n)^(n×t) + PMT × [(1 + r/n)^(n×t) − 1] / (r/n)",
    fvWhere:
      "Where: FV = future value, PV = present value (initial principal), PMT = periodic payment, r = annual interest rate (decimal), n = compounding periods per year, t = number of years.",
    earTitle:
      "2. Effective Annual Rate (EAR)",
    earDesc:
      "The Effective Annual Rate converts a nominal rate with compounding frequency into the equivalent annual rate:",
    earFormula: "EAR = (1 + r/n)^n − 1",
    earWhere:
      "This is used throughout the calculator to display the true annual return accounting for compounding frequency.",

    // Solve methods
    solveHeading:
      "Solving for Unknown Variables",
    solveIntro:
      "The calculator supports five solve modes. While FV can be computed directly, solving for the interest rate (r) or time period (t) requires numerical methods.",
    bisectionTitle:
      "Bisection Method (for r and t)",
    bisectionDesc:
      "The bisection method is a root-finding algorithm that repeatedly bisects an interval and selects the subinterval containing the root. It is used because the future value equation cannot be algebraically rearranged to isolate r or t in closed form.",
    bisectionSteps:
      [
            "Define f(x) = calculated FV − target FV, where x is the unknown variable (r or t).",
            "Start with a bracket [a, b] known to contain the root (f(a) × f(b) < 0).",
            "Compute midpoint m = (a + b) / 2 and evaluate f(m).",
            "Replace either a or b with m based on the sign of f(m), halving the interval.",
            "Repeat until the interval is smaller than the tolerance (1e-8 for r, 1e-4 for t).",
          ],
    pmtTitle:
      "Solving for Payment (PMT)",
    pmtDesc:
      "The periodic payment is solved by rearranging the future value formula algebraically:",
    pmtFormula:
      "PMT = (FV − PV × (1 + r/n)^(n×t)) × (r/n) / [(1 + r/n)^(n×t) − 1]",
    pvTitle:
      "Solving for Present Value (PV)",
    pvDesc:
      "Present value is solved analogously by rearrangement:",
    pvFormula:
      "PV = [FV − PMT × ((1 + r/n)^(n×t) − 1) / (r/n)] / (1 + r/n)^(n×t)",

    // Assumptions
    assumptionsHeading:
      "Assumptions & Limitations",
    assumptionsIntro:
      "Like all financial models, this calculator makes simplifying assumptions. Understanding these limitations is essential for interpreting results correctly.",
    assumptionsList:
      [
            {
              title: "Constant Interest Rate",
              body: "The calculator assumes a fixed annual interest rate for the entire investment period. In reality, interest rates fluctuate with market conditions, central bank policy, and economic cycles.",
            },
            {
              title: "Simplified Tax Model",
              body: "A single flat capital gains tax rate is applied uniformly to all gains. Real-world tax systems feature progressive brackets, different rates for short-term vs. long-term gains, tax-advantaged accounts (IRA, 401(k), ISA), and jurisdiction-specific rules.",
            },
            {
              title: "Constant Inflation Rate",
              body: "A fixed annual inflation rate is used to compute real (inflation-adjusted) values. Actual inflation varies year to year and across different goods and services.",
            },
            {
              title: "No Transaction Costs or Management Fees",
              body: "The model assumes zero trading commissions, management fees, expense ratios, bid-ask spreads, or other costs. Real investment products carry fees that reduce net returns.",
            },
            {
              title: "Continuous Compounding Approximation",
              body: "For daily compounding (n=365), the calculator uses discrete compounding. The difference between daily discrete and continuous compounding is negligible for most practical purposes.",
            },
            {
              title: "No Market Risk or Volatility",
              body: "The model projects smooth, deterministic growth. Real investments experience volatility, drawdowns, and sequence-of-returns risk that can significantly impact outcomes.",
            },
            {
              title: "Reinvestment Assumption",
              body: "Interest and dividends are assumed to be reinvested at the same rate. In practice, reinvestment rates may differ from the original yield.",
            },
          ],

    // Data sources
    sourcesHeading:
      "Data & Reference Sources",
    sourcesBody:
      "All formulas are based on standard financial mathematics as documented in authoritative textbooks and references. No proprietary data or AI-generated models are used. For a complete list of external references, see our References page.",
    viewReferences: "View References",
  }

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
                <Calculator className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
            </div>

            {/* Intro */}
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {t.intro}
            </p>

            <div className="space-y-10">
              {/* Core Formulas */}
              <section>
                <h2 className="mb-5 text-lg font-semibold text-primary">
                  {t.formulaHeading}
                </h2>

                <div className="space-y-6">
                  {/* FV */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.fvTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.fvDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.fvFormula}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.fvWhere}</p>
                  </div>

                  {/* EAR */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.earTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.earDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.earFormula}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.earWhere}</p>
                  </div>
                </div>
              </section>

              {/* Solve Methods */}
              <section>
                <h2 className="mb-5 text-lg font-semibold text-primary">
                  {t.solveHeading}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.solveIntro}
                </p>

                <div className="space-y-5">
                  {/* Bisection */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.bisectionTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.bisectionDesc}
                    </p>
                    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                      {t.bisectionSteps.map((step, i) => (
                        <li key={i} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* PMT */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.pmtTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.pmtDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.pmtFormula}
                    </p>
                  </div>

                  {/* PV */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.pvTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.pvDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.pvFormula}
                    </p>
                  </div>
                </div>
              </section>

              {/* Assumptions */}
              <section>
                <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  {t.assumptionsHeading}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.assumptionsIntro}
                </p>
                <div className="space-y-4">
                  {t.assumptionsList.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-secondary/30 p-4"
                    >
                      <h3 className="font-semibold text-foreground">
                        {i + 1}. {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Sources */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <BookOpen className="h-5 w-5" />
                  {t.sourcesHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.sourcesBody}
                </p>
                <Link
                  href="/references"
                  className="mt-3 inline-block text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  {t.viewReferences} →
                </Link>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {"About"}
          </Link>
          <Link href="/references" className="transition-colors hover:text-foreground">
            {"References"}
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
