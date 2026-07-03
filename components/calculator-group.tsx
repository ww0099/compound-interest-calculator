"use client"

import { AlertCircle, DollarSign, Percent, Calendar, PiggyBank, Target, TrendingDown, Receipt } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import type { Dict } from "@/lib/i18n"
import type { GroupState } from "@/lib/types"
import {
  type CalcResults,
  type CurrencyCode,
  type SolveTarget,
  formatCurrency,
  formatPercent,
} from "@/lib/finance"
import { cn } from "@/lib/utils"

export type GroupError =
  | "pv_needs_zero_pmt"
  | "no_solution"
  | "negative"
  | "rate_cap"
  | "inflation_cap"
  | "tax_cap"

interface CalculatorGroupProps {
  dict: Dict
  target: SolveTarget
  state: GroupState
  onChange: (patch: Partial<GroupState>) => void
  results: CalcResults | null
  error: GroupError | null
  base: CurrencyCode
  display: CurrencyCode
  rate: number
}

function fieldValue(
  target: SolveTarget,
  field: "pv" | "r" | "n" | "pmt",
  state: GroupState,
  results: CalcResults | null,
): string {
  if (target === field && results) {
    if (field === "pv") return results.solved.toFixed(2)
    if (field === "r") return (results.solved * 100).toFixed(4)
    if (field === "n") return results.solved.toFixed(2)
    if (field === "pmt") return (results.solvedPmt ?? 0).toFixed(2)
  }
  if (field === "pv") return state.pv
  if (field === "r") return state.ratePct
  if (field === "n") return state.years
  return state.pmt
}

export function CalculatorGroup({
  dict,
  target,
  state,
  onChange,
  results,
  error,
  base,
  display,
  rate,
}: CalculatorGroupProps) {
  const pmtNum = Number.parseFloat(state.pmt) || 0
  const showNumericalNote = (target === "r" || target === "n") && pmtNum > 0
  const showConversion = base !== display && rate > 0
  const inflationNum = Number.parseFloat(state.inflationPct) || 0
  const taxNum = Number.parseFloat(state.taxPct) || 0

  const errorMessage =
    error === "pv_needs_zero_pmt"
      ? dict.errPvNeedsZero
      : error === "no_solution"
        ? dict.errNoSolution
        : error === "negative"
          ? dict.errNegative
          : error === "rate_cap"
            ? dict.errRateCap
            : error === "inflation_cap"
              ? dict.errInflationCap
              : error === "tax_cap"
                ? dict.errTaxCap
                : null

  // format a base-currency value, with optional display-currency conversion
  const money = (v: number) => formatCurrency(v, base, dict.locale)
  const converted = (v: number) =>
    showConversion ? formatCurrency(v * rate, display, dict.locale) : undefined

  return (
    <div className="flex flex-col gap-4">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pv">{dict.initialPrincipal}</Label>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="pv"
              type="number"
              min={0}
              className="pl-9"
              value={fieldValue(target, "pv", state, results)}
              disabled={target === "pv"}
              onChange={(e) => onChange({ pv: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pmt">{dict.monthlyContribution}</Label>
          <div className="relative">
            <PiggyBank className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="pmt"
              type="number"
              min={0}
              className="pl-9"
              value={fieldValue(target, "pmt", state, results)}
              disabled={target === "pmt"}
              onChange={(e) => onChange({ pmt: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rate">{dict.annualRate}</Label>
          <div className="relative">
            <Percent className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="rate"
              type="number"
              min={0}
              max={100}
              step={0.1}
              className="pl-9"
              value={fieldValue(target, "r", state, results)}
              disabled={target === "r"}
              onChange={(e) => onChange({ ratePct: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="years">{dict.investmentPeriod}</Label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="years"
              type="number"
              min={0}
              className="pl-9"
              value={fieldValue(target, "n", state, results)}
              disabled={target === "n"}
              onChange={(e) => onChange({ years: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="compounding">{dict.compounding}</Label>
          <Select
            id="compounding"
            value={state.c}
            onChange={(e) => onChange({ c: Number(e.target.value) })}
          >
            <option value={1}>{dict.annually}</option>
            <option value={2}>{dict.semiannually}</option>
            <option value={4}>{dict.quarterly}</option>
            <option value={12}>{dict.monthly}</option>
            <option value={365}>{dict.daily}</option>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="inflation">{dict.inflationRate}</Label>
          <div className="relative">
            <TrendingDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="inflation"
              type="number"
              min={0}
              max={50}
              step={0.1}
              className="pl-9"
              value={state.inflationPct}
              onChange={(e) => onChange({ inflationPct: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tax">{dict.taxRate}</Label>
          <div className="relative">
            <Receipt className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="tax"
              type="number"
              min={0}
              max={100}
              step={0.1}
              className="pl-9"
              value={state.taxPct}
              onChange={(e) => onChange({ taxPct: e.target.value })}
            />
          </div>
        </div>

        {target !== "fv" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="targetFv">{dict.targetFv}</Label>
            <div className="relative">
              <Target className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <Input
                id="targetFv"
                type="number"
                min={0}
                className="pl-9"
                value={state.targetFv}
                onChange={(e) => onChange({ targetFv: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {showNumericalNote && !errorMessage && (
        <p className="text-xs text-muted-foreground">{dict.numericalNote}</p>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Required monthly contribution (PMT solve mode) */}
      {target === "pmt" && results && results.solvedPmt !== null && (
        <ResultCard
          label={dict.requiredPmt}
          value={`${money(results.solvedPmt)}${dict.perMonth}`}
          sub={
            showConversion
              ? `${formatCurrency(results.solvedPmt * rate, display, dict.locale)}${dict.perMonth}`
              : undefined
          }
          highlight
          full
        />
      )}

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        <ResultCard
          label={dict.nominalBalance}
          value={results ? money(results.fv) : "—"}
          sub={results ? converted(results.fv) : undefined}
          highlight
        />
        <ResultCard
          label={dict.totalContributions}
          value={results ? money(results.totalContributions) : "—"}
          sub={results ? converted(results.totalContributions) : undefined}
        />
        {inflationNum > 0 && (
          <ResultCard
            label={dict.realBalance}
            value={results ? money(results.fvReal) : "—"}
            sub={results ? converted(results.fvReal) : undefined}
          />
        )}
        {taxNum > 0 && (
          <ResultCard
            label={dict.afterTaxBalance}
            value={results ? money(results.fvAfterTax) : "—"}
            sub={results ? converted(results.fvAfterTax) : undefined}
          />
        )}
        <ResultCard
          label={dict.totalInterest}
          value={results ? money(results.totalInterest) : "—"}
          sub={results ? converted(results.totalInterest) : undefined}
          positive
        />
        {inflationNum > 0 && (
          <ResultCard
            label={dict.realInterest}
            value={results ? money(results.realInterest) : "—"}
            sub={results ? converted(results.realInterest) : undefined}
            positive
          />
        )}
        <ResultCard
          label={dict.ear}
          value={results ? formatPercent(results.ear, dict.locale) : "N/A"}
        />
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  sub,
  highlight,
  positive,
  full,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
  positive?: boolean
  full?: boolean
}) {
  return (
    <Card
      className={cn(
        highlight ? "border-primary/20 bg-primary text-primary-foreground shadow-md" : "bg-secondary/60",
        full && "col-span-2",
      )}
    >
      <CardContent className="flex flex-col gap-1 p-4">
        <span
          className={
            highlight ? "text-xs text-primary-foreground/80" : "text-xs text-muted-foreground"
          }
        >
          {label}
        </span>
        <span
          className={
            highlight
              ? "text-lg font-bold tracking-tight sm:text-xl"
              : positive
                ? "text-lg font-semibold tracking-tight text-accent"
                : "text-lg font-semibold tracking-tight text-foreground"
          }
        >
          {value}
        </span>
        {sub && (
          <span
            className={cn(
              "text-xs",
              highlight ? "text-primary-foreground/70" : "text-muted-foreground",
            )}
          >
            {"≈ "}
            {sub}
          </span>
        )}
      </CardContent>
    </Card>
  )
}
