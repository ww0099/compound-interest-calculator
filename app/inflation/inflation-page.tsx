"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"
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

export function InflationPage() {
  const [lang, setLang] = useState<Lang>("en")
  const [amount, setAmount] = useState("10000")
  const [inflationRate, setInflationRate] = useState("3")
  const [years, setYears] = useState("20")

  const locale = lang === "en" ? "en-US" : "zh-CN"
  const currency = "USD" as const

  // --- Calculations ---
  const amt = parseFloat(amount) || 0
  const rate = (parseFloat(inflationRate) || 0) / 100
  const yrs = parseInt(years, 10) || 0

  const fpp = futurePurchasingPower(amt, rate, yrs)
  const lost = amt - fpp
  const required = requiredNominalAmount(amt, rate, yrs)
  const series = purchasingPowerSeries(amt, rate, yrs)

  // --- Translations ---
  const t = {
    title: lang === "en" ? "Inflation Calculator" : "通货膨胀计算器",
    subtitle:
      lang === "en"
        ? "See how inflation erodes your purchasing power over time."
        : "了解通货膨胀如何随时间侵蚀你的购买力。",
    backToCalc: lang === "en" ? "Back to Calculator" : "返回计算器",
    amountLabel: lang === "en" ? "Amount Today" : "当前金额",
    amountHint: lang === "en" ? "How much money you have today." : "你现在持有的金额。",
    inflationLabel: lang === "en" ? "Annual Inflation Rate (%)" : "年通货膨胀率 (%)",
    inflationHint:
      lang === "en"
        ? "Historical average is 2–3% in most developed economies."
        : "大多数发达经济体的历史平均值为 2–3%。",
    yearsLabel: lang === "en" ? "Time Horizon (years)" : "时间跨度（年）",
    yearsHint: lang === "en" ? "How far into the future to project." : "预测到未来多远。",
    resultsTitle: lang === "en" ? "Results" : "计算结果",
    futurePP: lang === "en" ? "Future Purchasing Power" : "未来购买力",
    futurePPDesc:
      lang === "en"
        ? "What your money will actually be worth in today's terms."
        : "你的钱在未来相当于今天的实际价值。",
    purchasingPowerLost: lang === "en" ? "Purchasing Power Lost" : "购买力损失",
    lostDesc:
      lang === "en"
        ? "The amount of value inflation will erase over this period."
        : "通货膨胀在此期间将侵蚀的价值。",
    requiredNominal: lang === "en" ? "Required Nominal Amount" : "所需名义金额",
    requiredDesc:
      lang === "en"
        ? "How much you would need in the future to maintain today's purchasing power."
        : "要在未来保持同等购买力所需的金额。",
    chartTitle: lang === "en" ? "Purchasing Power Over Time" : "购买力变化趋势",
    nominalLabel: lang === "en" ? "Nominal Value" : "名义价值",
    realLabel: lang === "en" ? "Real Purchasing Power" : "实际购买力",
    chartDesc:
      lang === "en"
        ? "The gap between the two lines represents the cumulative effect of inflation."
        : "两条线之间的差距代表通货膨胀的累积效应。",
    infoTitle: lang === "en" ? "How to Use This Calculator" : "使用说明",
    infoBody:
      lang === "en"
        ? "Enter the amount you have today, your expected annual inflation rate, and the number of years to project. The calculator will show you what your money will be worth in the future in today's terms, and how much you would need to save to maintain your current purchasing power. The chart visualizes how inflation compounds over time — what looks like a small annual rate becomes a dramatic gap over decades."
        : "输入你当前持有的金额、预期年通货膨胀率和预测年数。计算器将显示你的钱在未来相当于今天的实际价值，以及你需要多少钱才能维持目前的购买力。图表展示了通货膨胀如何随时间复利增长——看似不大的年通胀率在几十年后会形成惊人的差距。",
  }

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
          x: { title: { display: true, text: lang === "en" ? "Year" : "年份" } },
          y: {
            title: {
              display: true,
              text: lang === "en" ? `Amount (${currency})` : `金额（${currency}）`,
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
  }, [series, lang, t.nominalLabel, t.realLabel, currency, locale, yrs])

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

          {/* Language toggle */}
          <div className="flex items-center gap-1 self-start rounded-lg border border-border bg-secondary/60 p-1 sm:self-auto">
            {(["en", "zh"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  lang === l
                    ? "bg-card text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l === "en" ? "English" : "中文"}
              </button>
            ))}
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
                <span>{lang === "en" ? "Inputs" : "输入参数"}</span>
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
            {lang === "en" ? "Privacy Policy" : "隐私政策"}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Terms of Service" : "服务条款"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Disclaimer" : "免责声明"}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Contact" : "联系我们"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
