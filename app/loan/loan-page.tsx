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
  DoughnutController,
  ArcElement,
} from "chart.js"
import { GenericHistoryPanel } from "@/components/history-panel"
import {
  projectLoan,
  generateAmortizationSchedule,
  loanBalanceSeries,
} from "@/lib/loan"
import type { LoanInputs, LoanSolveMode, AmortizationRow } from "@/lib/loan"
import type { LoanHistoryRecord, HistoryColumn, HistoryRecordBase } from "@/lib/types"

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Tooltip, Legend, Filler,
  DoughnutController, ArcElement,
)

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

const T = {
  title: "Loan Calculator",
  subtitle: "Calculate your monthly payments, total interest, and view a complete amortization schedule.",
  back: "Back to Calculator",
  modeLabel: "Calculation Mode",
  modeProject: "Monthly Payment", modeSolvePrincipal: "Max Loan Amount",
  modeSolveRate: "Interest Rate", modeSolveTerm: "Payoff Time",
  modeProjectDesc: "Enter loan amount, rate, and term to see your monthly payment.",
  modeSolvePrincipalDesc: "Enter your monthly budget to find out how much you can borrow.",
  modeSolveRateDesc: "Enter loan amount and monthly payment to calculate the effective interest rate.",
  modeSolveTermDesc: "Enter loan amount and monthly payment to see how long it will take to pay off.",
  loanAmount: "Loan Amount ($)", annualRate: "Annual Interest Rate (%)",
  loanTerm: "Loan Term (years)", monthlyPayment: "Monthly Payment ($)",
  extraPayment: "Extra Monthly Payment ($)", targetPayment: "Target Monthly Payment ($)",
  inputsTitle: "Loan Details", resultsTitle: "Results",
  monthlyPaymentLabel: "Monthly Payment", totalPaymentLabel: "Total Payment",
  totalInterestLabel: "Total Interest", payoffDate: "Payoff Time",
  payoffYears: "years",
  solvedPrincipalLabel: "Maximum Loan Amount", solvedRateLabel: "Effective Interest Rate",
  solvedTermLabel: "Payoff Time",
  noSolution: "No solution found. Check your inputs and try again.",
  scheduleTitle: "Amortization Schedule",
  schedulePeriod: "Period", schedulePayment: "Payment",
  schedulePrincipal: "Principal", scheduleInterest: "Interest", scheduleBalance: "Balance",
  chartBalanceTitle: "Loan Balance Over Time",
  chartPieTitle: "Principal vs Interest",
  balanceLabel: "Remaining Balance", principalLabel: "Principal", interestLabel: "Interest",
  yearLabel: "Year", amountLabel: "Amount (USD)",
  showAll: "Show Full Schedule",
  remainingBalance: "Remaining Balance",
}

// ---------------------------------------------------------------------------
// defaults
// ---------------------------------------------------------------------------

const DEFAULT_INPUTS: LoanInputs = {
  principal: 300000,
  annualRate: 0.065,
  years: 30,
  paymentsPerYear: 12,
  extraPayment: 0,
  targetPayment: 2000,
}

const MODES: LoanSolveMode[] = ["project", "solvePrincipal", "solveRate", "solveTerm"]

function fmtMoney(value: number): string {
  if (!isFinite(value)) return "—"
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 2,
  }).format(value)
}

function fmtPercent(value: number): string {
  if (!isFinite(value)) return "—"
  return new Intl.NumberFormat("en-US", {
    style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value)
}

// ---------------------------------------------------------------------------
// component
// ---------------------------------------------------------------------------

export function LoanPage() {
  const [mode, setMode] = useState<LoanSolveMode>("project")
  const [inputs, setInputs] = useState<LoanInputs>(DEFAULT_INPUTS)
  const [showFullSchedule, setShowFullSchedule] = useState(false)
  const [history, setHistory] = useState<LoanHistoryRecord[]>([])
  const t = T

  const LOAN_HISTORY_KEY = "loan-calc-history"
  const MAX_LOAN_HISTORY = 50

  // 从 localStorage 加载历史
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOAN_HISTORY_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch { /* ignore */ }
  }, [])

  // 泛型列定义
  const loanColumns: HistoryColumn<LoanHistoryRecord>[] = [
    {
      key: "mode", header: "Mode",
      cell: (r) => {
        const map: Record<string, string> = { project: "Payment", solvePrincipal: "Max Loan", solveRate: "Rate", solveTerm: "Term" }
        return map[r.mode] ?? r.mode
      },
    },
    { key: "principal", header: "Loan Amount", cell: (r) => fmtMoney(r.principal) },
    { key: "payment", header: "Monthly Payment", cell: (r) => fmtMoney(r.monthlyPayment) },
    { key: "rate", header: "Rate", cell: (r) => fmtPercent(r.annualRate) },
    { key: "term", header: "Term", cell: (r) => `${parseFloat(r.years.toFixed(1))}y` },
    { key: "interest", header: "Total Interest", cell: (r) => fmtMoney(r.totalInterest) },
  ]

  // 处理函数
  const handleLoanLoad = (rec: LoanHistoryRecord) => {
    setMode(rec.mode as LoanSolveMode)
    setInputs((prev) => ({
      ...prev,
      principal: rec.principal,
      annualRate: rec.annualRate,
      years: rec.years,
      targetPayment: rec.monthlyPayment,
    }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handleLoanDelete = (id: string) => {
    setHistory((prev) => {
      const next = prev.filter((r) => r.id !== id)
      try { localStorage.setItem(LOAN_HISTORY_KEY, JSON.stringify(next)) } catch { /* ignore */ }
      return next
    })
  }
  const handleLoanClear = () => {
    setHistory([])
    try { localStorage.removeItem(LOAN_HISTORY_KEY) } catch { /* ignore */ }
  }

  // ---- compute ----
  const results = useMemo(() => {
    const r = projectLoan(inputs, mode)
    if (mode === "project") return r

    const solved = r.solvedValue
    if (solved === null || !isFinite(solved)) return r

    const adjusted = { ...inputs }
    if (mode === "solvePrincipal") adjusted.principal = solved
    else if (mode === "solveRate") adjusted.annualRate = solved
    else adjusted.years = solved

    // Re-run in project mode with the solved value to get full schedule
    return projectLoan(adjusted, "project")
  }, [inputs, mode])

  const effectivePrincipal =
    mode === "solvePrincipal" && results.solvedValue !== null
      ? results.solvedValue
      : inputs.principal

  const effectiveRate =
    mode === "solveRate" && results.solvedValue !== null
      ? results.solvedValue
      : inputs.annualRate

  const effectiveYears =
    mode === "solveTerm" && results.solvedValue !== null
      ? results.solvedValue
      : inputs.years

  // ---- balance chart data ----
  const balanceSeries = useMemo(() => {
    const adjusted: LoanInputs = {
      ...inputs,
      principal: effectivePrincipal,
      annualRate: effectiveRate,
      years: effectiveYears,
    }
    return loanBalanceSeries(adjusted)
  }, [effectivePrincipal, effectiveRate, effectiveYears, inputs])

  // ---- auto-save to history ----
  const lastSavedRef = useRef("")
  useEffect(() => {
    if (!results.monthlyPayment || results.totalPeriods === 0) return
    const sig = JSON.stringify([effectivePrincipal, effectiveRate, effectiveYears, results.monthlyPayment, results.totalInterest])
    if (sig === lastSavedRef.current) return

    const timer = setTimeout(() => {
      lastSavedRef.current = sig
      const record: LoanHistoryRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: Date.now(),
        calculatorType: "loan",
        mode,
        principal: effectivePrincipal,
        annualRate: effectiveRate,
        years: effectiveYears,
        monthlyPayment: results.monthlyPayment,
        totalInterest: results.totalInterest,
        totalPayment: results.totalPayment,
      }
      setHistory((prev) => {
        const next = [record, ...prev].slice(0, MAX_LOAN_HISTORY)
        try { localStorage.setItem(LOAN_HISTORY_KEY, JSON.stringify(next)) } catch { /* ignore */ }
        return next
      })
    }, 900)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectivePrincipal, effectiveRate, effectiveYears, results.monthlyPayment, results.totalInterest, results.totalPeriods, mode])

  // ---- chart refs ----
  const balanceCanvasRef = useRef<HTMLCanvasElement>(null)
  const balanceChartRef = useRef<Chart | null>(null)
  const pieCanvasRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<Chart | null>(null)

  const fmtLocale = "en-US"

  // balance line chart
  useEffect(() => {
    const canvas = balanceCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (balanceChartRef.current) balanceChartRef.current.destroy()

    balanceChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: balanceSeries.years,
        datasets: [
          {
            label: t.balanceLabel,
            data: balanceSeries.balance,
            borderColor: "#1a365d",
            backgroundColor: "rgba(26,54,93,0.08)",
            fill: true, tension: 0.25, pointRadius: 0, pointHoverRadius: 4, borderWidth: 2,
          },
          {
            label: t.interestLabel + " (cumulative)",
            data: balanceSeries.totalInterest,
            borderColor: "#e53e3e",
            backgroundColor: "transparent",
            borderDash: [6, 4], fill: false, tension: 0.25, pointRadius: 0, pointHoverRadius: 4, borderWidth: 2,
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
              title: (items) => `${t.yearLabel}: ${items[0].label}`,
              label: (item) => `${item.dataset.label}: ${new Intl.NumberFormat(fmtLocale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.parsed.y ?? 0)}`,
            },
          },
        },
        scales: {
          x: { title: { display: true, text: t.yearLabel, color: "#4a5568" }, grid: { display: false }, ticks: { color: "#718096" } },
          y: {
            title: { display: true, text: t.amountLabel, color: "#4a5568" }, grid: { color: "#edf2f7" },
            ticks: { color: "#718096", callback: (v) => new Intl.NumberFormat(fmtLocale, { notation: "compact", maximumFractionDigits: 1 }).format(Number(v)) },
          },
        },
      },
    })
    return () => { balanceChartRef.current?.destroy(); balanceChartRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceSeries])

  // pie chart
  useEffect(() => {
    const canvas = pieCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (pieChartRef.current) pieChartRef.current.destroy()

    pieChartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [t.principalLabel, t.interestLabel],
        datasets: [{
          data: [results.pieData[0]?.value ?? 0, results.pieData[1]?.value ?? 0],
          backgroundColor: ["#1a365d", "#3182ce"],
          borderColor: ["#fff", "#fff"],
          borderWidth: 2,
          hoverOffset: 4,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 16, color: "#4a5568" } },
          tooltip: {
            callbacks: {
              label: (item) => {
                const val = item.parsed ?? 0
                const pct = results.totalPayment > 0 ? ((val / results.totalPayment) * 100).toFixed(1) : "0"
                return `${item.label}: ${fmtMoney(val)} (${pct}%)`
              },
            },
          },
        },
      },
    })
    return () => { pieChartRef.current?.destroy(); pieChartRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.pieData, results.totalPayment])

  // ---- input handlers ----
  function update(field: keyof LoanInputs, raw: string) {
    const n = parseFloat(raw)
    setInputs((prev) => ({ ...prev, [field]: isNaN(n) ? 0 : n }))
  }
  function updatePct(field: keyof LoanInputs, raw: string) {
    const n = parseFloat(raw)
    setInputs((prev) => ({ ...prev, [field]: isNaN(n) ? 0 : n / 100 }))
  }

  // ---- schedule display ----
  const displayedSchedule: AmortizationRow[] = useMemo(() => {
    const s = results.schedule
    if (showFullSchedule || s.length <= 24) return s
    // show first 12 + last 12
    return [...s.slice(0, 12), ...s.slice(-12)]
  }, [results.schedule, showFullSchedule])

  const scheduleTruncated = !showFullSchedule && results.schedule.length > 24

  // ---- solved hints ----
  const solvedPrincipal = mode === "solvePrincipal" && results.solvedValue !== null && isFinite(results.solvedValue)
    ? results.solvedValue : null
  const solvedRate = mode === "solveRate" && results.solvedValue !== null && isFinite(results.solvedValue)
    ? results.solvedValue : null
  const solvedTerm = mode === "solveTerm" && results.solvedValue !== null && isFinite(results.solvedValue)
    ? results.solvedValue : null

  const showTargetPayment = mode === "solveRate" || mode === "solveTerm"
  const showExtraPayment = mode === "project"

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
        {/* title */}
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
                {m === "project" ? t.modeProject : m === "solvePrincipal" ? t.modeSolvePrincipal : m === "solveRate" ? t.modeSolveRate : t.modeSolveTerm}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {mode === "project" ? t.modeProjectDesc : mode === "solvePrincipal" ? t.modeSolvePrincipalDesc : mode === "solveRate" ? t.modeSolveRateDesc : t.modeSolveTermDesc}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* inputs card */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.inputsTitle}</h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label={mode === "solvePrincipal" ? t.monthlyPayment : t.loanAmount}
                  value={mode === "solvePrincipal" && solvedPrincipal !== null ? Math.round(solvedPrincipal) : inputs.principal}
                  onChange={(e) => update("principal", e.target.value)}
                  min={0} step={mode === "solvePrincipal" ? 100 : 10000}
                  disabled={mode === "solvePrincipal"} highlighted={mode === "solvePrincipal"}
                />
                <InputField
                  label={t.annualRate}
                  value={mode === "solveRate" && solvedRate !== null
                    ? parseFloat((solvedRate * 100).toFixed(2))
                    : inputs.annualRate ? parseFloat((inputs.annualRate * 100).toFixed(2)) : 0}
                  onChange={(e) => updatePct("annualRate", e.target.value)}
                  min={0} max={50} step={0.1}
                  disabled={mode === "solveRate"} highlighted={mode === "solveRate"}
                />
                <InputField
                  label={t.loanTerm}
                  value={mode === "solveTerm" && solvedTerm !== null
                    ? parseFloat(solvedTerm.toFixed(1))
                    : inputs.years}
                  onChange={(e) => update("years", e.target.value)}
                  min={1} max={50} step={1}
                  disabled={mode === "solveTerm"} highlighted={mode === "solveTerm"}
                />
                {showTargetPayment ? (
                  <InputField
                    label={t.targetPayment}
                    value={inputs.targetPayment}
                    onChange={(e) => update("targetPayment", e.target.value)}
                    min={0} step={100}
                  />
                ) : (
                  <InputField
                    label={t.monthlyPayment}
                    value={results.monthlyPayment}
                    onChange={() => {}}
                    disabled highlighted
                  />
                )}
                {showExtraPayment && (
                  <InputField
                    label={t.extraPayment}
                    value={inputs.extraPayment}
                    onChange={(e) => update("extraPayment", e.target.value)}
                    min={0} step={100}
                  />
                )}
              </div>

              {/* solved callout */}
              {mode === "solvePrincipal" && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground">{t.solvedPrincipalLabel}</p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    {solvedPrincipal !== null && solvedPrincipal > 0
                      ? fmtMoney(solvedPrincipal)
                      : t.noSolution}
                  </p>
                </div>
              )}
              {mode === "solveRate" && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground">{t.solvedRateLabel}</p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    {solvedRate !== null ? fmtPercent(solvedRate) : t.noSolution}
                  </p>
                </div>
              )}
              {mode === "solveTerm" && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
                  <p className="text-xs font-medium text-muted-foreground">{t.solvedTermLabel}</p>
                  <p className="mt-0.5 text-lg font-bold text-primary">
                    {solvedTerm !== null
                      ? `${parseFloat(solvedTerm.toFixed(1))} ${t.payoffYears}`
                      : t.noSolution}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* results card */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.resultsTitle}</h2>
              <div className="space-y-3">
                <ResultRow label={t.monthlyPaymentLabel} value={fmtMoney(results.monthlyPayment)} accent />
                <ResultRow label={t.totalPaymentLabel} value={fmtMoney(results.totalPayment)} />
                <ResultRow label={t.totalInterestLabel} value={fmtMoney(results.totalInterest)} muted />
                <hr className="border-border" />
                <ResultRow label={t.payoffDate}
                  value={`${results.totalPeriods > 0 ? parseFloat((results.totalPeriods / 12).toFixed(1)) : 0} ${t.payoffYears}`} />
                {results.finalBalance > 0.01 && (
                  <ResultRow label={t.remainingBalance}
                    value={fmtMoney(results.finalBalance)} muted />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* charts row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* balance line chart */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.chartBalanceTitle}</h2>
              <div className="h-72 w-full sm:h-80">
                <canvas ref={balanceCanvasRef} aria-label={t.chartBalanceTitle} role="img" />
              </div>
            </CardContent>
          </Card>

          {/* pie chart */}
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.chartPieTitle}</h2>
              <div className="h-72 w-full sm:h-80 flex items-center justify-center">
                <div className="w-full max-w-[280px]">
                  <canvas ref={pieCanvasRef} aria-label={t.chartPieTitle} role="img" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* amortization schedule */}
        {results.schedule.length > 0 && (
          <Card className="mt-6">
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.scheduleTitle}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pr-4">{t.schedulePeriod}</th>
                      <th className="py-2 pr-4 text-right">{t.schedulePayment}</th>
                      <th className="py-2 pr-4 text-right">{t.schedulePrincipal}</th>
                      <th className="py-2 pr-4 text-right">{t.scheduleInterest}</th>
                      <th className="py-2 text-right">{t.scheduleBalance}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleTruncated && (
                      <tr>
                        <td colSpan={5} className="py-2 text-center text-xs text-muted-foreground">
                          {`Showing first 12 and last 12 of ${results.schedule.length} periods.`}
                          {" "}
                          <button type="button" onClick={() => setShowFullSchedule(true)}
                            className="text-accent underline hover:no-underline">
                            {t.showAll}
                          </button>
                        </td>
                      </tr>
                    )}
                    {displayedSchedule.map((row, i) => {
                      const isGap = scheduleTruncated && i === 12
                      return (
                        <tr key={row.period} className={cn("border-b border-border/50", isGap && "border-dashed")}>
                          <td className="py-1.5 pr-4 tabular-nums">
                            {isGap ? "..." : row.period}
                          </td>
                          <td className="py-1.5 pr-4 text-right tabular-nums">{fmtMoney(row.payment)}</td>
                          <td className="py-1.5 pr-4 text-right tabular-nums">{fmtMoney(row.principal)}</td>
                          <td className="py-1.5 pr-4 text-right tabular-nums">{fmtMoney(row.interest)}</td>
                          <td className="py-1.5 text-right tabular-nums">{fmtMoney(row.balance)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* history */}
        <div className="mt-6">
          <GenericHistoryPanel
            title="Calculation History"
            emptyText="No calculations yet. Adjust the inputs to get started."
            clearConfirm="Delete all loan calculation history?"
            clearAllLabel="Clear All"
            loadLabel="Load"
            deleteLabel="Delete"
            locale="en-US"
            records={history}
            columns={loanColumns}
            onLoad={handleLoanLoad}
            onDelete={handleLoanDelete}
            onClearAll={handleLoanClear}
          />
        </div>

        {/* footer nav */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground pb-6">
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
