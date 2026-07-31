/**
 * 贷款计算引擎。
 * 支持 4 种求解模式：月供、可贷本金、利率、还款期限。
 * 生成摊销表（每期本金/利息/余额）、饼图数据和逐年趋势序列。
 */

import { bisect } from "@/lib/math"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoanInputs {
  /** 贷款本金（solvePrincipal 模式下复用为"每月可承担的还款额"） */
  principal: number
  /** 年利率（小数，0.05 = 5%） */
  annualRate: number
  /** 贷款期限（年） */
  years: number
  /** 每年还款次数（默认 12 = 月供） */
  paymentsPerYear: number
  /** 额外月还款（提前还款，默认 0） */
  extraPayment: number
  /** 目标月供 — solveRate/solveTerm 模式下用于求解的目标值 */
  targetPayment: number
}

export interface AmortizationRow {
  period: number
  payment: number
  interest: number
  principal: number
  extraPayment: number
  balance: number
}

export interface LoanResults {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  finalBalance: number
  totalPeriods: number
  schedule: AmortizationRow[]
  /** 饼图数据：[本金, 利息] */
  pieData: { label: string; value: number }[]
  solvedValue: number | null
}

export type LoanSolveMode = "project" | "solvePrincipal" | "solveRate" | "solveTerm"

// ---------------------------------------------------------------------------
// Core formulas
// ---------------------------------------------------------------------------

/** 等额本息月供公式。PMT = P × i × (1+i)^N / ((1+i)^N - 1) */
export function loanPayment(
  principal: number,
  annualRate: number,
  years: number,
  paymentsPerYear: number,
): number {
  const N = paymentsPerYear * years
  const i = annualRate / paymentsPerYear
  if (i === 0) return principal / N
  const growth = Math.pow(1 + i, N)
  return (principal * i * growth) / (growth - 1)
}

/** 从月供反推可贷本金。PV = PMT × ((1+i)^N - 1) / (i × (1+i)^N) */
export function maxPrincipal(
  payment: number,
  annualRate: number,
  years: number,
  paymentsPerYear: number,
): number {
  const N = paymentsPerYear * years
  const i = annualRate / paymentsPerYear
  if (i === 0) return payment * N
  const growth = Math.pow(1 + i, N)
  return (payment * (growth - 1)) / (i * growth)
}

/** 二分法求解贷款利率（区间 0.01%–100%） */
export function loanRateBisection(
  principal: number,
  payment: number,
  years: number,
  paymentsPerYear: number,
): number | null {
  return bisect(
    (r) => loanPayment(principal, r, years, paymentsPerYear) - payment,
    0.0001,
    1.0,
    1e-8,
    100,
  )
}

/**
 * 从月供反推还款期数（年）。
 * N = -log(1 - P×i/PMT) / log(1+i)，t = N / paymentsPerYear
 * 仅当 PMT > P×i 时有解（否则连利息都不够还）。
 */
export function loanTermYears(
  principal: number,
  payment: number,
  annualRate: number,
  paymentsPerYear: number,
): number | null {
  const i = annualRate / paymentsPerYear
  if (i === 0) return principal / (payment * paymentsPerYear)
  const interestOnly = principal * i
  if (payment <= interestOnly) return null
  const N = -Math.log(1 - (principal * i) / payment) / Math.log(1 + i)
  if (!isFinite(N) || N <= 0) return null
  return N / paymentsPerYear
}

// ---------------------------------------------------------------------------
// Amortization schedule
// ---------------------------------------------------------------------------

export function generateAmortizationSchedule(
  inputs: LoanInputs,
): AmortizationRow[] {
  const { principal, annualRate, years, paymentsPerYear, extraPayment } = inputs
  const N = Math.ceil(paymentsPerYear * years)
  const i = annualRate / paymentsPerYear
  const basePayment = loanPayment(principal, annualRate, years, paymentsPerYear)

  const schedule: AmortizationRow[] = []
  let balance = principal

  for (let period = 1; period <= N && balance > 0.005; period++) {
    const interest = balance * i
    const totalPayment = Math.min(balance + interest, basePayment + extraPayment)
    const principalPaid = totalPayment - interest
    balance = Math.max(0, balance - principalPaid)

    schedule.push({
      period,
      payment: parseFloat(totalPayment.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
      principal: parseFloat(principalPaid.toFixed(2)),
      extraPayment: extraPayment > 0
        ? parseFloat(Math.min(extraPayment, Math.max(0, totalPayment - basePayment)).toFixed(2))
        : 0,
      balance: parseFloat(balance.toFixed(2)),
    })
  }

  return schedule
}

// ---------------------------------------------------------------------------
// Main projection
// ---------------------------------------------------------------------------

export function projectLoan(
  inputs: LoanInputs,
  mode: LoanSolveMode,
): LoanResults {
  const { principal, annualRate, years, paymentsPerYear, extraPayment, targetPayment } = inputs

  // ---- project: 给定全部参数 ----
  if (mode === "project") {
    const pmt = loanPayment(principal, annualRate, years, paymentsPerYear)
    const schedule = generateAmortizationSchedule(inputs)
    return buildResults(inputs, schedule, pmt, null)
  }

  // ---- solvePrincipal: 给定月供预算 → 求可贷本金 ----
  if (mode === "solvePrincipal") {
    const budget = principal // 复用：principal 字段存放月供预算
    const maxP = maxPrincipal(budget, annualRate, years, paymentsPerYear)
    if (!isFinite(maxP) || maxP <= 0) return emptyResults(null)
    const adjusted: LoanInputs = { ...inputs, principal: maxP }
    const schedule = generateAmortizationSchedule(adjusted)
    return buildResults(adjusted, schedule, loanPayment(maxP, annualRate, years, paymentsPerYear), maxP)
  }

  // ---- solveRate: 给定本金 + 月供 → 求利率 ----
  if (mode === "solveRate") {
    const pmt = targetPayment > 0 ? targetPayment : loanPayment(principal, annualRate, years, paymentsPerYear)
    const rate = loanRateBisection(principal, pmt, years, paymentsPerYear)
    if (rate === null) return emptyResults(null)
    const adjusted: LoanInputs = { ...inputs, annualRate: rate }
    const schedule = generateAmortizationSchedule(adjusted)
    return buildResults(adjusted, schedule, pmt, rate)
  }

  // ---- solveTerm: 给定本金 + 月供 → 求还款期限 ----
  {
    const pmt = targetPayment > 0 ? targetPayment : loanPayment(principal, annualRate, years, paymentsPerYear)
    const solvedYears = loanTermYears(principal, pmt, annualRate, paymentsPerYear)
    if (solvedYears === null || solvedYears <= 0) return emptyResults(null)
    const adjusted: LoanInputs = { ...inputs, years: solvedYears }
    const schedule = generateAmortizationSchedule(adjusted)
    return buildResults(adjusted, schedule, pmt, solvedYears)
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildResults(
  inputs: LoanInputs,
  schedule: AmortizationRow[],
  monthlyPayment: number,
  solvedValue: number | null,
): LoanResults {
  const totalPayment = schedule.reduce((s, r) => s + r.payment, 0)
  const totalInterest = schedule.reduce((s, r) => s + r.interest, 0)
  const finalBalance = schedule.length > 0 ? schedule[schedule.length - 1].balance : 0

  return {
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    finalBalance: parseFloat(finalBalance.toFixed(2)),
    totalPeriods: schedule.length,
    schedule,
    pieData: [
      { label: "principal", value: parseFloat((totalPayment - totalInterest).toFixed(2)) },
      { label: "interest", value: parseFloat(totalInterest.toFixed(2)) },
    ],
    solvedValue,
  }
}

function emptyResults(solvedValue: number | null): LoanResults {
  return {
    monthlyPayment: 0, totalPayment: 0, totalInterest: 0, finalBalance: 0,
    totalPeriods: 0, schedule: [],
    pieData: [{ label: "principal", value: 0 }, { label: "interest", value: 0 }],
    solvedValue,
  }
}

/** 逐年汇总（用于折线图：余额递减 + 累计已还 + 累计利息） */
export function loanBalanceSeries(inputs: LoanInputs): {
  years: number[]
  balance: number[]
  totalPaid: number[]
  totalInterest: number[]
} {
  const schedule = generateAmortizationSchedule(inputs)
  const years: number[] = [0]
  const balance: number[] = [inputs.principal]
  const totalPaid: number[] = [0]
  const totalInterest: number[] = [0]

  let cumPaid = 0
  let cumInterest = 0
  const ppy = inputs.paymentsPerYear

  for (const row of schedule) {
    cumPaid += row.payment
    cumInterest += row.interest
    if (row.period % ppy === 0 || row.period === schedule.length) {
      years.push(parseFloat((row.period / ppy).toFixed(2)))
      balance.push(row.balance)
      totalPaid.push(parseFloat(cumPaid.toFixed(2)))
      totalInterest.push(parseFloat(cumInterest.toFixed(2)))
    }
  }

  return { years, balance, totalPaid, totalInterest }
}
