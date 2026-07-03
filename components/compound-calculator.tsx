"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Share2, TrendingUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalculatorGroup, type GroupError } from "@/components/calculator-group"
import { GrowthChart, type Series } from "@/components/growth-chart"
import { HistoryPanel } from "@/components/history-panel"
import { KnowledgeSection } from "@/components/knowledge-section"
import { getDict, type Lang } from "@/lib/i18n"
import {
  calculate,
  growthSeries,
  formatCurrency,
  formatPercent,
  CURRENCIES,
  type CalcInputs,
  type CalcResults,
  type CurrencyCode,
  type SolveTarget,
} from "@/lib/finance"
import {
  defaultCurrency,
  defaultGroup,
  defaultGroupB,
  type CurrencySettings,
  type GroupState,
  type HistoryRecord,
} from "@/lib/types"
import { cn } from "@/lib/utils"

const HISTORY_KEY = "compound-calc-history"
const MAX_HISTORY = 100

interface GroupComputation {
  inputs: CalcInputs
  results: CalcResults | null
  error: GroupError | null
  series: Series | null
  showReal: boolean
}

function computeGroup(target: SolveTarget, state: GroupState): GroupComputation {
  const pv = Number.parseFloat(state.pv) || 0
  const pmt = Number.parseFloat(state.pmt) || 0
  const ratePctRaw = Number.parseFloat(state.ratePct) || 0
  const years = Number.parseFloat(state.years) || 0
  const inflationRaw = Number.parseFloat(state.inflationPct) || 0
  const taxRaw = Number.parseFloat(state.taxPct) || 0
  const targetFv = Number.parseFloat(state.targetFv) || 0
  const c = state.c

  const baseInputs: CalcInputs = { pv, pmt, r: 0, t: years, c, inflation: 0, tax: 0 }

  // validation
  if (
    pv < 0 || pmt < 0 || ratePctRaw < 0 || years < 0 ||
    inflationRaw < 0 || taxRaw < 0 || targetFv < 0
  ) {
    return { inputs: baseInputs, results: null, error: "negative", series: null, showReal: false }
  }
  if (ratePctRaw > 100) {
    return { inputs: baseInputs, results: null, error: "rate_cap", series: null, showReal: false }
  }
  if (inflationRaw > 50) {
    return { inputs: baseInputs, results: null, error: "inflation_cap", series: null, showReal: false }
  }
  if (taxRaw > 100) {
    return { inputs: baseInputs, results: null, error: "tax_cap", series: null, showReal: false }
  }

  const inputs: CalcInputs = {
    pv,
    pmt,
    r: ratePctRaw / 100,
    t: years,
    c,
    inflation: inflationRaw / 100,
    tax: taxRaw / 100,
  }

  const { results, error } = calculate(target, inputs, targetFv)

  let series: Series | null = null
  if (results) {
    const solvedInputs: CalcInputs = { ...inputs }
    if (target === "pv") solvedInputs.pv = results.solved
    else if (target === "r") solvedInputs.r = results.solved
    else if (target === "n") solvedInputs.t = results.solved
    else if (target === "pmt") solvedInputs.pmt = results.solvedPmt ?? inputs.pmt
    series = growthSeries(solvedInputs)
  }

  return { inputs, results, error, series, showReal: inputs.inflation > 0 }
}

export function CompoundCalculator() {
  const [lang, setLang] = useState<Lang>("en")
  const [target, setTarget] = useState<SolveTarget>("fv")
  const [compare, setCompare] = useState(false)
  const [currency, setCurrency] = useState<CurrencySettings>(defaultCurrency)
  const [groupA, setGroupA] = useState<GroupState>(defaultGroup)
  const [groupB, setGroupB] = useState<GroupState>(defaultGroupB)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [toast, setToast] = useState<string | null>(null)

  const dict = getDict(lang)
  const rate = Number.parseFloat(currency.rate) || 0

  const compA = useMemo(() => computeGroup(target, groupA), [target, groupA])
  const compB = useMemo(() => computeGroup(target, groupB), [target, groupB])

  // Load history from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])

  // Auto-save every valid calculation (debounced) for group A
  const lastSavedRef = useRef<string>("")
  useEffect(() => {
    const res = compA.results
    if (!res) return
    const inputs = compA.inputs
    const solved: CalcInputs = { ...inputs }
    if (target === "pv") solved.pv = res.solved
    else if (target === "r") solved.r = res.solved
    else if (target === "n") solved.t = res.solved
    else if (target === "pmt") solved.pmt = res.solvedPmt ?? inputs.pmt

    const signature = JSON.stringify([
      target,
      currency.base,
      currency.display,
      rate,
      solved.pv,
      solved.pmt,
      solved.r,
      solved.t,
      solved.c,
      solved.inflation,
      solved.tax,
    ])
    if (signature === lastSavedRef.current) return

    const handle = setTimeout(() => {
      lastSavedRef.current = signature
      const record: HistoryRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: Date.now(),
        target,
        base: currency.base,
        display: currency.display,
        rate,
        pv: solved.pv,
        pmt: solved.pmt,
        r: solved.r,
        t: solved.t,
        c: solved.c,
        inflation: solved.inflation,
        tax: solved.tax,
        targetFv: Number.parseFloat(groupA.targetFv) || 0,
        fv: res.fv,
        fvReal: res.fvReal,
        fvAfterTax: res.fvAfterTax,
        totalContributions: res.totalContributions,
        totalInterest: res.totalInterest,
        realInterest: res.realInterest,
        ear: res.ear,
        solvedPmt: res.solvedPmt,
      }
      setHistory((prev) => {
        const next = [record, ...prev].slice(0, MAX_HISTORY)
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    }, 900)

    return () => clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compA, target, currency, rate])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2600)
  }

  const handleShare = async () => {
    const res = compA.results
    if (!res) return
    const inputs = compA.inputs
    const base = currency.base
    const showConv = currency.base !== currency.display && rate > 0
    const line = (v: number) =>
      showConv
        ? `${formatCurrency(v, base, dict.locale)} (≈ ${formatCurrency(v * rate, currency.display, dict.locale)})`
        : formatCurrency(v, base, dict.locale)

    const rows = [
      `${dict.subtitle}`,
      `${dict.baseCurrency}: ${base}${showConv ? ` → ${currency.display} @ ${rate}` : ""}`,
      `${dict.initialPrincipal}: ${formatCurrency(inputs.pv, base, dict.locale)}`,
      `${dict.monthlyContribution}: ${formatCurrency(inputs.pmt, base, dict.locale)}`,
      `${dict.annualRate}: ${formatPercent(inputs.r, dict.locale)}`,
      `${dict.investmentPeriod}: ${inputs.t} ${dict.years}`,
      `${dict.inflationRate}: ${formatPercent(inputs.inflation, dict.locale)}`,
      `${dict.taxRate}: ${formatPercent(inputs.tax, dict.locale)}`,
      "—",
      `${dict.nominalBalance}: ${line(res.fv)}`,
      `${dict.realBalance}: ${line(res.fvReal)}`,
      `${dict.afterTaxBalance}: ${line(res.fvAfterTax)}`,
      `${dict.totalContributions}: ${line(res.totalContributions)}`,
      `${dict.totalInterest}: ${line(res.totalInterest)}`,
      `${dict.ear}: ${formatPercent(res.ear, dict.locale)}`,
    ]
    if (res.solvedPmt !== null) {
      rows.push(`${dict.requiredPmt}: ${line(res.solvedPmt)}${dict.perMonth}`)
    }
    const summary = rows.join("\n")
    try {
      await navigator.clipboard.writeText(summary)
      showToast(dict.copied)
    } catch {
      showToast(dict.copied)
    }
  }

  const handleLoad = (rec: HistoryRecord) => {
    setTarget(rec.target)
    setCurrency({ base: rec.base, display: rec.display, rate: String(rec.rate) })
    setGroupA({
      pv: String(rec.pv),
      pmt: String(rec.pmt),
      ratePct: String(Number((rec.r * 100).toFixed(6))),
      years: String(Number(rec.t.toFixed(6))),
      c: rec.c,
      inflationPct: String(Number((rec.inflation * 100).toFixed(6))),
      taxPct: String(Number((rec.tax * 100).toFixed(6))),
      targetFv: String(Number(rec.targetFv.toFixed(2)) || Number(rec.fv.toFixed(2))),
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = (id: string) => {
    setHistory((prev) => {
      const next = prev.filter((r) => r.id !== id)
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  const handleClearAll = () => {
    setHistory([])
    try {
      localStorage.removeItem(HISTORY_KEY)
    } catch {
      /* ignore */
    }
  }

  const tabs: { key: SolveTarget; label: string }[] = [
    { key: "fv", label: dict.solveFv },
    { key: "pv", label: dict.solvePv },
    { key: "r", label: dict.solveR },
    { key: "n", label: dict.solveN },
    { key: "pmt", label: dict.solvePmt },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                Compound Interest Calculator <span className="text-muted-foreground">|</span> 复利计算器
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">{dict.subtitle}</p>
            </div>
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

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Currency settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-primary">{dict.currencySettings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="baseCurrency">{dict.baseCurrency}</Label>
                <Select
                  id="baseCurrency"
                  value={currency.base}
                  onChange={(e) =>
                    setCurrency((s) => ({ ...s, base: e.target.value as CurrencyCode }))
                  }
                >
                  {CURRENCIES.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="displayCurrency">{dict.displayCurrency}</Label>
                <Select
                  id="displayCurrency"
                  value={currency.display}
                  onChange={(e) =>
                    setCurrency((s) => ({ ...s, display: e.target.value as CurrencyCode }))
                  }
                >
                  {CURRENCIES.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="exchangeRate">{dict.exchangeRate}</Label>
                <Input
                  id="exchangeRate"
                  type="number"
                  min={0}
                  step="any"
                  value={currency.rate}
                  disabled={currency.base === currency.display}
                  onChange={(e) => setCurrency((s) => ({ ...s, rate: e.target.value }))}
                />
                <span className="text-xs text-muted-foreground">
                  {dict.exchangeRateHint(currency.base, currency.display)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solve tabs + compare toggle */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {dict.solveLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setTarget(tab.key)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    target === tab.key
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary/60",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5">
            <Switch checked={compare} onCheckedChange={setCompare} aria-label={dict.compareMode} />
            <span className="text-sm font-medium text-foreground">{dict.compareMode}</span>
          </label>
        </div>

        {/* Calculator groups */}
        <div className={cn("grid gap-6", compare ? "lg:grid-cols-2" : "grid-cols-1")}>
          <Card>
            <CardHeader className="pb-0">
              {compare && (
                <CardTitle className="flex items-center gap-2 text-primary">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#1a365d]" />
                  {dict.groupA}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <CalculatorGroup
                dict={dict}
                target={target}
                state={groupA}
                onChange={(patch) => setGroupA((s) => ({ ...s, ...patch }))}
                results={compA.results}
                error={compA.error}
                base={currency.base}
                display={currency.display}
                rate={rate}
              />
            </CardContent>
          </Card>

          {compare && (
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center gap-2 text-[#dd6b20]">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#dd6b20]" />
                  {dict.groupB}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CalculatorGroup
                  dict={dict}
                  target={target}
                  state={groupB}
                  onChange={(patch) => setGroupB((s) => ({ ...s, ...patch }))}
                  results={compB.results}
                  error={compB.error}
                  base={currency.base}
                  display={currency.display}
                  rate={rate}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Share */}
        <div>
          <Button onClick={handleShare} disabled={!compA.results} className="gap-2">
            <Share2 className="h-4 w-4" />
            {dict.share}
          </Button>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">{dict.chartTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {compA.series ? (
              <GrowthChart
                dict={dict}
                seriesA={compA.series}
                seriesB={compare ? compB.series : null}
                compare={compare}
                currency={currency.base}
                showRealA={compA.showReal}
              />
            ) : (
              <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
                {dict.errNoSolution}
              </div>
            )}
          </CardContent>
        </Card>

        {/* History */}
        <HistoryPanel
          dict={dict}
          records={history}
          onLoad={handleLoad}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />

        {/* Knowledge */}
        <KnowledgeSection dict={dict} />
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg">
            <Check className="h-4 w-4 text-accent" />
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
