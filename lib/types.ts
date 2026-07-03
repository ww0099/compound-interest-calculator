import type { CurrencyCode, SolveTarget } from "@/lib/finance"

export interface GroupState {
  pv: string
  pmt: string
  ratePct: string
  years: string
  c: number
  inflationPct: string
  taxPct: string
  targetFv: string
}

export const defaultGroup: GroupState = {
  pv: "10000",
  pmt: "0",
  ratePct: "8",
  years: "20",
  c: 12,
  inflationPct: "0",
  taxPct: "0",
  targetFv: "100000",
}

export const defaultGroupB: GroupState = {
  pv: "10000",
  pmt: "500",
  ratePct: "8",
  years: "20",
  c: 12,
  inflationPct: "0",
  taxPct: "0",
  targetFv: "100000",
}

export interface CurrencySettings {
  base: CurrencyCode
  display: CurrencyCode
  rate: string // display units per 1 base unit
}

export const defaultCurrency: CurrencySettings = {
  base: "USD",
  display: "USD",
  rate: "1",
}

export interface HistoryRecord {
  id: string
  timestamp: number
  target: SolveTarget
  base: CurrencyCode
  display: CurrencyCode
  rate: number
  // inputs
  pv: number
  pmt: number
  r: number
  t: number
  c: number
  inflation: number
  tax: number
  targetFv: number
  // outputs
  fv: number
  fvReal: number
  fvAfterTax: number
  totalContributions: number
  totalInterest: number
  realInterest: number
  ear: number
  solvedPmt: number | null
}
