import { futureValue } from "@/lib/finance"
import { bisect } from "@/lib/math"
import { formatCurrency, formatPercent } from "@/lib/format"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RetirementInputs {
  currentAge: number
  retirementAge: number
  lifeExpectancy: number
  currentSavings: number
  monthlyContribution: number
  expectedReturn: number // annual rate as decimal (0.07 for 7%)
  inflationRate: number // annual rate as decimal (0.03 for 3%)
  desiredRetirementIncome: number // per year in today's dollars
}

export interface RetirementResults {
  /** Nominal portfolio value at retirement age */
  totalAtRetirement: number
  /** Inflation-adjusted portfolio value at retirement */
  totalAtRetirementReal: number
  /** 4%-rule sustainable annual withdrawal (nominal, first-year) */
  sustainableAnnualWithdrawal: number
  /** How many years the portfolio lasts during decumulation */
  yearsOfRetirementSupported: number
  /** Balance remaining at life expectancy */
  finalBalance: number
  /** Year-by-year balance during accumulation (index = years from now) */
  accumulation: number[]
  /** Year-by-year balance during decumulation (index = years in retirement) */
  decumulation: number[]
  /** The value solved for in solve modes, or null in project mode */
  solvedValue: number | null
}

export type RetirementSolveMode = "project" | "solvePmt" | "solveAge"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** 4%-rule target corpus, inflation-adjusted to retirement year. */
export function targetRetirementCorpus(
  desiredIncome: number,
  inflationRate: number,
  yearsToRetirement: number,
): number {
  const futureIncome = desiredIncome * Math.pow(1 + inflationRate, yearsToRetirement)
  return futureIncome / 0.04
}

/**
 * Simulate year-by-year portfolio decumulation.
 * Withdraws a growing annual amount (inflation-adjusted) and grows the remainder.
 */
function simulateDecumulation(
  corpus: number,
  annualReturn: number,
  inflationRate: number,
  yearsInRetirement: number,
  firstYearWithdrawal: number,
): number[] {
  const balances: number[] = [corpus]
  let balance = corpus
  for (let y = 1; y <= yearsInRetirement; y++) {
    const withdrawal = firstYearWithdrawal * Math.pow(1 + inflationRate, y - 1)
    balance = Math.max(0, (balance - withdrawal) * (1 + annualReturn))
    balances.push(parseFloat(balance.toFixed(2)))
  }
  return balances
}

// ---------------------------------------------------------------------------
// Solve functions
// ---------------------------------------------------------------------------

/**
 * Closed-form solve for the monthly contribution required to hit a target
 * retirement corpus. Same formula as `solvePmt` in finance.ts.
 */
export function solveRetirementPMT(
  targetFv: number,
  pv: number,
  r: number,
  t: number,
  c: number,
): number {
  const N = c * t
  const i = r / c
  if (i === 0) {
    return (targetFv - pv) / N
  }
  const growth = Math.pow(1 + i, N)
  const annuityFactor = (growth - 1) / i
  return (targetFv - pv * growth) / annuityFactor
}

/**
 * Binary-search for the earliest retirement age at which the portfolio
 * sustains the desired income through life expectancy.
 * Returns null if the goal is unreachable even at the latest possible age.
 */
export function solveRetirementAge(inputs: RetirementInputs): number | null {
  const {
    currentAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    desiredRetirementIncome,
  } = inputs

  const lo = currentAge + 1
  const hi = lifeExpectancy - 1
  if (lo >= hi) return null

  const f = (age: number): number => {
    const yrs = age - currentAge
    const retireYrs = lifeExpectancy - age
    const corp = futureValue({
      pv: currentSavings,
      pmt: monthlyContribution,
      r: expectedReturn,
      t: yrs,
      c: 12,
      inflation: 0,
      tax: 0,
    })
    const fw = desiredRetirementIncome * Math.pow(1 + inflationRate, yrs)
    const dec = simulateDecumulation(corp, expectedReturn, inflationRate, retireYrs, fw)
    return parseFloat(dec[dec.length - 1].toFixed(2))
  }

  const flo = f(lo)
  const fhi = f(hi)

  // Goal already achievable at the earliest possible age
  if (flo >= 0) return lo
  // Goal never achievable
  if (fhi < 0) return null

  return bisect(f, lo, hi, 0.01, 100)
}

// ---------------------------------------------------------------------------
// Main projection
// ---------------------------------------------------------------------------

/**
 * Run a full retirement projection given all inputs.
 * In "project" mode solvedValue is null.
 * In "solvePmt" mode solvedValue is the required monthly contribution.
 * In "solveAge" mode solvedValue is the earliest retirement age (or null).
 */
export function projectRetirement(
  inputs: RetirementInputs,
  mode: RetirementSolveMode,
): RetirementResults {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedReturn,
    inflationRate,
    desiredRetirementIncome,
  } = inputs

  const yearsToRetirement = Math.max(0, retirementAge - currentAge)
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge)

  // ---- accumulation year-by-year ----
  const accumulation: number[] = []
  for (let y = 0; y <= yearsToRetirement; y++) {
    accumulation.push(
      futureValue({
        pv: currentSavings,
        pmt: monthlyContribution,
        r: expectedReturn,
        t: y,
        c: 12,
        inflation: 0,
        tax: 0,
      }),
    )
  }

  const corpus = accumulation[accumulation.length - 1]
  const corpusReal = corpus / Math.pow(1 + inflationRate, yearsToRetirement)
  const firstYearWithdrawal =
    yearsInRetirement > 0
      ? desiredRetirementIncome * Math.pow(1 + inflationRate, yearsToRetirement)
      : 0

  // ---- decumulation ----
  const decumulation = simulateDecumulation(
    corpus,
    expectedReturn,
    inflationRate,
    yearsInRetirement,
    firstYearWithdrawal,
  )

  const finalBalance = decumulation[decumulation.length - 1]
  const sustainableAnnualWithdrawal = corpus * 0.04

  let yearsSupported = 0
  for (let i = 1; i < decumulation.length; i++) {
    if (decumulation[i] > 0) yearsSupported++
    else break
  }

  // ---- solved value ----
  let solvedValue: number | null = null
  if (mode === "solvePmt") {
    const targetCorpus = targetRetirementCorpus(
      desiredRetirementIncome,
      inflationRate,
      yearsToRetirement,
    )
    solvedValue = solveRetirementPMT(
      targetCorpus,
      currentSavings,
      expectedReturn,
      yearsToRetirement,
      12,
    )
  } else if (mode === "solveAge") {
    solvedValue = solveRetirementAge(inputs)
  }

  return {
    totalAtRetirement: corpus,
    totalAtRetirementReal: corpusReal,
    sustainableAnnualWithdrawal,
    yearsOfRetirementSupported: yearsSupported,
    finalBalance,
    accumulation,
    decumulation,
    solvedValue,
  }
}
