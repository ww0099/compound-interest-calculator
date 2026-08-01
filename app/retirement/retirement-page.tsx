"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { projectRetirement, targetRetirementCorpus } from "@/lib/retirement"
import type { RetirementInputs, RetirementSolveMode } from "@/lib/retirement"

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler)

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function fmtMoney(value: number): string {
  if (!isFinite(value)) return "—"
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(value)
}

const T = {
  title: "Retirement Calculator",
  subtitle: "Plan your retirement with confidence. See how much you need to save and when you can retire.",
  back: "Back to Calculator",
  modeLabel: "Calculation Mode", modeProject: "Project Future Value",
  modeSolvePmt: "Required Monthly Savings", modeSolveAge: "When Can I Retire?",
  modeProjectDesc: "See how your savings grow and how long they last in retirement.",
  modeSolvePmtDesc: "Find out how much you need to save each month to reach your retirement goal.",
  modeSolveAgeDesc: "Find the earliest age at which you can afford to retire.",
  currentAge: "Current Age", retirementAge: "Retirement Age", lifeExpectancy: "Life Expectancy",
  currentSavings: "Current Savings ($)", monthlyContribution: "Monthly Contribution ($)",
  expectedReturn: "Expected Return (%)", inflationRate: "Inflation Rate (%)",
  desiredRetirementIncome: "Desired Retirement Income ($/yr)",
  solvedPmtLabel: "Required Monthly Savings", solvedAgeLabel: "Earliest Retirement Age",
  noSolution: "Goal not reachable with current inputs. Try increasing contributions or returns.",
  alreadyFunded: "Already fully funded", retireNow: "You can retire now!",
  results: "Results", totalAtRetirement: "Total at Retirement",
  realValue: "Inflation-Adjusted Value",
  sustainableWithdrawal: "Sustainable Annual Withdrawal (4% Rule)",
  yearsSupported: "Years of Retirement Supported",
  finalBalance: "Balance at Life Expectancy",
  chartTitle: "Retirement Portfolio Projection",
  portfolioLabel: "Portfolio Balance", targetLabel: "Target Corpus",
  ageLabel: "Age", amountLabel: "Amount (USD)",
}

const DEFAULT_INPUTS: RetirementInputs = {
  currentAge: 30, retirementAge: 65, lifeExpectancy: 90,
  currentSavings: 50000, monthlyContribution: 1000,
  expectedReturn: 0.07, inflationRate: 0.03, desiredRetirementIncome: 50000,
}

const MODES: RetirementSolveMode[] = ["project", "solvePmt", "solveAge"]

// ---------------------------------------------------------------------------
// component
// ---------------------------------------------------------------------------

export function RetirementPage() {
  const [mode, setMode] = useState<RetirementSolveMode>("project")
  const [inputs, setInputs] = useState<RetirementInputs>(DEFAULT_INPUTS)
  const t = T

  const results = useMemo(() => {
    const r = projectRetirement(inputs, mode)
    if (mode === "project") return r
    const solved = r.solvedValue
    if (solved === null || !isFinite(solved)) return r
    const adjusted = { ...inputs }
    if (mode === "solvePmt") adjusted.monthlyContribution = Math.max(0, solved)
    else adjusted.retirementAge = solved
    const full = projectRetirement(adjusted, "project")
    return { ...full, solvedValue: solved }
  }, [inputs, mode])

  const effectiveRetirementAge =
    mode === "solveAge" && results.solvedValue !== null ? results.solvedValue : inputs.retirementAge

  function update(field: keyof RetirementInputs, raw: string) {
    const n = parseFloat(raw)
    setInputs((prev) => ({ ...prev, [field]: isNaN(n) ? 0 : n }))
  }
  function updatePct(field: keyof RetirementInputs, raw: string) {
    const n = parseFloat(raw)
    setInputs((prev) => ({ ...prev, [field]: isNaN(n) ? 0 : n / 100 }))
  }

  // ---- chart ----
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { accumulation, decumulation } = results
    const rAge = effectiveRetirementAge
    const cAge = inputs.currentAge
    const ageLabels: number[] = []
    const balances: number[] = []
    for (let i = 0; i < accumulation.length; i++) { ageLabels.push(cAge + i); balances.push(accumulation[i]) }
    for (let i = 1; i < decumulation.length; i++) { ageLabels.push(rAge + i); balances.push(decumulation[i]) }

    const yrs = Math.max(0, rAge - cAge)
    const target = targetRetirementCorpus(inputs.desiredRetirementIncome, inputs.inflationRate, yrs)
    const fmtLocale = "en-US"

    if (chartRef.current) chartRef.current.destroy()
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: t.portfolioLabel, data: balances,
            borderColor: "#1a365d", backgroundColor: "rgba(26,54,93,0.08)",
            fill: true, tension: 0.25, pointRadius: 0, pointHoverRadius: 4, borderWidth: 2,
          },
          {
            label: t.targetLabel, data: Array(ageLabels.length).fill(target),
            borderColor: "#3182ce", backgroundColor: "transparent",
            borderDash: [6, 4], fill: false, tension: 0, pointRadius: 0, pointHoverRadius: 0, borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 16, color: "#4a5568" } },
          tooltip: {
            callbacks: {
              title: (items) => `${t.ageLabel}: ${items[0].label}`,
              label: (item) => `${item.dataset.label}: ${new Intl.NumberFormat(fmtLocale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.parsed.y ?? 0)}`,
            },
          },
        },
        scales: {
          x: { title: { display: true, text: t.ageLabel, color: "#4a5568" }, grid: { display: false }, ticks: { color: "#718096" } },
          y: {
            title: { display: true, text: t.amountLabel, color: "#4a5568" }, grid: { color: "#edf2f7" },
            ticks: { color: "#718096", callback: (v) => new Intl.NumberFormat(fmtLocale, { notation: "compact", maximumFractionDigits: 1 }).format(Number(v)) },
          },
        },
      },
    })
    return () => { chartRef.current?.destroy(); chartRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, effectiveRetirementAge, inputs.currentAge, inputs.lifeExpectancy, inputs.desiredRetirementIncome, inputs.inflationRate])

  const solvedPmt = mode === "solvePmt" && results.solvedValue !== null && isFinite(results.solvedValue) ? Math.max(0, results.solvedValue) : null
  const solvedAge = mode === "solveAge" && results.solvedValue !== null ? Math.round(results.solvedValue) : null

  return (
    <div className="min-h-screen bg-background">
      {/* header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />{t.back}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">{t.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* mode tabs */}
        <div className="mb-6">
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.modeLabel}</Label>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={cn("rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                  mode === m ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")}>
                {m === "project" ? t.modeProject : m === "solvePmt" ? t.modeSolvePmt : t.modeSolveAge}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {mode === "project" ? t.modeProjectDesc : mode === "solvePmt" ? t.modeSolvePmtDesc : t.modeSolveAgeDesc}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* inputs card */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Your Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label={t.currentAge} value={inputs.currentAge} onChange={(e) => update("currentAge", e.target.value)} min={18} max={100} />
                <InputField label={t.retirementAge}
                  value={mode === "solveAge" && solvedAge !== null ? solvedAge : inputs.retirementAge}
                  onChange={(e) => update("retirementAge", e.target.value)} min={(inputs.currentAge || 18) + 1} max={100}
                  disabled={mode === "solveAge"} highlighted={mode === "solveAge"} />
                <InputField label={t.lifeExpectancy} value={inputs.lifeExpectancy}
                  onChange={(e) => update("lifeExpectancy", e.target.value)} min={(inputs.retirementAge || 65) + 1} max={120} />
                <InputField label={t.currentSavings} value={inputs.currentSavings}
                  onChange={(e) => update("currentSavings", e.target.value)} min={0} step={1000} />
                <InputField label={t.monthlyContribution}
                  value={solvedPmt !== null ? Math.round(solvedPmt) : inputs.monthlyContribution}
                  onChange={(e) => update("monthlyContribution", e.target.value)} min={0} step={100}
                  disabled={mode === "solvePmt"} highlighted={mode === "solvePmt"} />
                <InputField label={t.desiredRetirementIncome} value={inputs.desiredRetirementIncome}
                  onChange={(e) => update("desiredRetirementIncome", e.target.value)} min={0} step={1000} />
                <InputField label={t.expectedReturn}
                  value={inputs.expectedReturn ? parseFloat((inputs.expectedReturn * 100).toFixed(1)) : 0}
                  onChange={(e) => updatePct("expectedReturn", e.target.value)} min={0} max={50} step={0.1} />
                <InputField label={t.inflationRate}
                  value={inputs.inflationRate ? parseFloat((inputs.inflationRate * 100).toFixed(1)) : 0}
                  onChange={(e) => updatePct("inflationRate", e.target.value)} min={0} max={20} step={0.1} />
              </div>

              {mode === "solvePmt" && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground">{t.solvedPmtLabel}</p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    {solvedPmt !== null && solvedPmt > 0
                      ? fmtMoney(solvedPmt) + "/mo"
                      : solvedPmt === 0 ? t.alreadyFunded : t.noSolution}
                  </p>
                </div>
              )}
              {mode === "solveAge" && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground">{t.solvedAgeLabel}</p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    {solvedAge !== null
                      ? solvedAge <= inputs.currentAge + 1 ? t.retireNow : `Age ${solvedAge}`
                      : t.noSolution}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* results card */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.results}</h2>
              <div className="space-y-3">
                <ResultRow label={t.totalAtRetirement} value={fmtMoney(results.totalAtRetirement)} />
                <ResultRow label={t.realValue} value={fmtMoney(results.totalAtRetirementReal)} muted />
                <hr className="border-border" />
                <ResultRow label={t.sustainableWithdrawal}
                  value={`${fmtMoney(results.sustainableAnnualWithdrawal)}/yr`} accent />
                <ResultRow label={t.yearsSupported}
                  value={`${results.yearsOfRetirementSupported} of ${Math.max(0, inputs.lifeExpectancy - effectiveRetirementAge)} years`} />
                <ResultRow label={t.finalBalance} value={fmtMoney(results.finalBalance)} muted />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* chart */}
        <Card className="mt-6">
          <CardContent className="p-5 sm:p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.chartTitle}</h2>
            <div className="h-72 w-full sm:h-80">
              <canvas ref={canvasRef} aria-label={t.chartTitle} role="img" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// tiny helpers
// ---------------------------------------------------------------------------

function InputField({ label, value, onChange, min, max, step, disabled, highlighted }: {
  label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number; max?: number; step?: number; disabled?: boolean; highlighted?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type="number" min={min} max={max} step={step} disabled={disabled}
        value={value || ""} onChange={onChange}
        className={cn(highlighted && "bg-primary/5 font-semibold text-primary")} />
    </div>
  )
}

function ResultRow({ label, value, muted, accent }: {
  label: string; value: string; muted?: boolean; accent?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("text-sm font-semibold tabular-nums", muted && "text-muted-foreground", accent && "text-accent", !muted && !accent && "text-foreground")}>{value}</span>
    </div>
  )
}
