import type { CurrencyCode, SolveTarget } from "@/lib/finance"

/** 计算器类型标识 */
export type CalculatorType = "compound" | "retirement" | "inflation" | "loan"

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
  calculatorType: CalculatorType
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

// ---------------------------------------------------------------------------
// Generic history for all calculators
// ---------------------------------------------------------------------------

/** 泛型历史记录基础字段 */
export interface HistoryRecordBase {
  id: string
  timestamp: number
  calculatorType: CalculatorType
}

/** 贷款计算器历史记录 */
export interface LoanHistoryRecord extends HistoryRecordBase {
  calculatorType: "loan"
  /** 求解模式 */
  mode: string
  /** 贷款本金 */
  principal: number
  /** 年利率 */
  annualRate: number
  /** 贷款期限（年） */
  years: number
  /** 月供 */
  monthlyPayment: number
  /** 总利息 */
  totalInterest: number
  /** 总还款额 */
  totalPayment: number
}

/** 历史面板列定义 */
export interface HistoryColumn<T extends HistoryRecordBase> {
  key: string
  header: string
  cell: (record: T, locale: string) => string
  className?: string
}
