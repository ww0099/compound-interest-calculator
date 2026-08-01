"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  futurePurchasingPower,
  requiredNominalAmount,
  purchasingPowerSeries,
  formatInflationResult,
} from "@/lib/inflation"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

const PRIMARY = "#1a365d"
const ACCENT = "#3182ce"
const DANGER = "#e53e3e"

const T = {
  title: "Inflation Calculator",
  subtitle: "See how inflation erodes your purchasing power over time.",
  backToCalc: "Back to Calculator",
  amountLabel: "Amount Today",
  amountHint: "How much money you have today.",
  inflationLabel: "Annual Inflation Rate (%)",
  inflationHint: "Historical average is 2–3% in most developed economies.",
  yearsLabel: "Time Horizon (years)",
  yearsHint: "How far into the future to project.",
  resultsTitle: "Results",
  futurePP: "Future Purchasing Power",
  futurePPDesc: "What your money will actually be worth in today's terms.",
  purchasingPowerLost: "Purchasing Power Lost",
  lostDesc: "The amount of value inflation will erase over this period.",
  requiredNominal: "Required Nominal Amount",
  requiredDesc: "How much you would need in the future to maintain today's purchasing power.",
  chartTitle: "Purchasing Power Over Time",
  nominalLabel: "Nominal Value",
  realLabel: "Real Purchasing Power",
  chartDesc: "The gap between the two lines represents the cumulative effect of inflation.",
  infoTitle: "How to Use This Calculator",
  infoBody:
    "Enter the amount you have today, your expected annual inflation rate, and the number of years to project. The calculator will show you what your money will be worth in the future in today's terms, and how much you would need to save to maintain your current purchasing power. The chart visualizes how inflation compounds over time — what looks like a small annual rate becomes a dramatic gap over decades.",
}

export function InflationPage() {
  const [amount, setAmount] = useState("10000")
  const [inflationRate, setInflationRate] = useState("3")
  const [years, setYears] = useState("20")

  const locale = "en-US"
  const currency = "USD" as const

  // --- Calculations ---
  const amt = parseFloat(amount) || 0
  const rate = (parseFloat(inflationRate) || 0) / 100
  const yrs = parseInt(years, 10) || 0

  const fpp = futurePurchasingPower(amt, rate, yrs)
  const lost = amt - fpp
  const required = requiredNominalAmount(amt, rate, yrs)
  const series = purchasingPowerSeries(amt, rate, yrs)

  const t = T

  // Chart refs
  const chartCanvasRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartCanvasRef.current || yrs <= 0) return
    const ctx = chartCanvasRef.current.getContext("2d")
    if (!ctx) return

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: series.years.map((y) => y.toString()),
        datasets: [
          {
            label: t.nominalLabel,
            data: series.nominal,
            borderColor: PRIMARY,
            backgroundColor: `${PRIMARY}1a`,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.1,
          },
          {
            label: t.realLabel,
            data: series.real,
            borderColor: ACCENT,
            backgroundColor: `${ACCENT}1a`,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (ctx: any) =>
                `${ctx.dataset.label}: ${formatInflationResult(ctx.raw as number, currency, locale)}`,
            },
          },
        },
        scales: {
          x: { title: { display: true, text: "Year" } },
          y: {
            title: {
              display: true,
              text: `Amount (${currency})`,
            },
            ticks: {
              callback: (v: any) => formatInflationResult(v as number, currency, locale),
            },
          },
        },
      },
    })

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [series, t.nominalLabel, t.realLabel, currency, locale, yrs])

  // --- Shared input style ---
  const inputCls =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors"

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
              {t.backToCalc}
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-8">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <span>Inputs</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t.amountLabel}</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputCls}
                />
                <p className="text-xs text-muted-foreground">{t.amountHint}</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t.inflationLabel}</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className={inputCls}
                />
                <p className="text-xs text-muted-foreground">{t.inflationHint}</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t.yearsLabel}</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={inputCls}
                />
                <p className="text-xs text-muted-foreground">{t.yearsHint}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-accent" />
                <span>{t.resultsTitle}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Future Purchasing Power */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.futurePP}
                </p>
                <p className="mt-1 text-2xl font-bold text-accent">
                  {formatInflationResult(fpp, currency, locale)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t.futurePPDesc}</p>
              </div>

              {/* Purchasing Power Lost */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.purchasingPowerLost}
                </p>
                <p className="mt-1 text-2xl font-bold text-red-500">
                  {formatInflationResult(lost, currency, locale)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t.lostDesc}</p>
              </div>

              {/* Required Nominal */}
              <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {t.requiredNominal}
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {formatInflationResult(required, currency, locale)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t.requiredDesc}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>{t.chartTitle}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 sm:h-80">
              <canvas ref={chartCanvasRef} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">{t.chartDesc}</p>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t.infoTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.infoBody}</p>
          </CardContent>
        </Card>

        {/* Footer nav */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground pb-6">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            Disclaimer
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </main>
    </div>
  )
}
