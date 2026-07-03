export type SolveTarget = "fv" | "pv" | "r" | "n" | "pmt"

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CNY"

export const CURRENCIES: CurrencyCode[] = ["USD", "EUR", "GBP", "CNY"]

export interface CalcInputs {
  pv: number // initial principal
  pmt: number // monthly contribution (per compounding period in the FV formula)
  r: number // annual interest rate as decimal (0.08 for 8%)
  t: number // years
  c: number // compounding periods per year
  inflation: number // annual inflation rate as decimal
  tax: number // capital gains tax rate as decimal
}

export interface CalcResults {
  fv: number // nominal final balance
  fvReal: number // inflation-adjusted final balance
  fvAfterTax: number // after-tax final balance
  totalContributions: number // PV + PMT * 12 * t
  totalInterest: number // FV - total contributions
  realInterest: number // FV_real - total contributions
  ear: number // effective annual rate = (1 + r/c)^c - 1
  solved: number // the solved-for value (fills the disabled field)
  solvedPmt: number | null // required monthly contribution (PMT solve mode)
}

/**
 * Future value with end-of-period contributions applied each compounding period.
 *
 *   N = c * t                 (total compounding periods)
 *   i = r / c                 (rate per period)
 *   FV = PV(1 + i)^N + PMT * [((1 + i)^N - 1) / i]
 *
 * When r = 0 the second term reduces to PMT * (c * t).
 */
export function futureValue(inputs: CalcInputs): number {
  const { pv, pmt, r, t, c } = inputs
  const N = c * t
  const i = r / c
  if (i === 0) {
    return pv + pmt * N
  }
  const growth = Math.pow(1 + i, N)
  return pv * growth + pmt * ((growth - 1) / i)
}

/** Nominal FV divided by cumulative inflation. FV_real = FV / (1 + i)^t */
export function realValue(fv: number, inflation: number, t: number): number {
  return fv / Math.pow(1 + inflation, t)
}

/** Effective annual rate. EAR = (1 + r/c)^c - 1 */
export function effectiveAnnualRate(r: number, c: number): number {
  return Math.pow(1 + r / c, c) - 1
}

/** Present value (only meaningful when pmt = 0). PV = FV / (1 + r/c)^(c t) */
export function presentValue(fv: number, r: number, t: number, c: number): number {
  return fv / Math.pow(1 + r / c, c * t)
}

/** Analytical solve for r when pmt = 0. r = c * ((FV/PV)^(1/(c t)) - 1) */
export function solveRateNoPmt(fv: number, pv: number, t: number, c: number): number {
  return c * (Math.pow(fv / pv, 1 / (c * t)) - 1)
}

/** Analytical solve for t when pmt = 0. N = ln(FV/PV)/ln(1 + r/c); t = N/c */
export function solveTimeNoPmt(fv: number, pv: number, r: number, c: number): number {
  const N = Math.log(fv / pv) / Math.log(1 + r / c)
  return N / c
}

/**
 * Closed-form solve for the monthly contribution required to hit a target FV.
 *   If r = 0:  PMT = (FV_target - PV) / (c * t)
 *   Else:      PMT = (FV_target - PV(1 + i)^N) / [((1 + i)^N - 1) / i]
 */
export function solvePmt(
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

/** Generic bisection root finder on f over [lo, hi]. */
function bisect(
  f: (x: number) => number,
  lo: number,
  hi: number,
  tol: number,
  maxIter: number,
): number | null {
  let flo = f(lo)
  const fhi = f(hi)
  if (!isFinite(flo) || !isFinite(fhi)) return null
  if (flo * fhi > 0) return null // no sign change in bracket
  let mid = lo
  for (let iter = 0; iter < maxIter; iter++) {
    mid = (lo + hi) / 2
    const fm = f(mid)
    if (Math.abs(fm) < tol) return mid
    if (flo * fm < 0) {
      hi = mid
    } else {
      lo = mid
      flo = fm
    }
  }
  return mid
}

/** Bisection solve for annual rate r that yields target FV (bracket 0.01%–100%). */
export function solveRateBisection(
  targetFv: number,
  pv: number,
  pmt: number,
  t: number,
  c: number,
): number | null {
  return bisect(
    (r) => futureValue({ pv, pmt, r, t, c, inflation: 0, tax: 0 }) - targetFv,
    0.0001,
    1.0,
    1e-8,
    100,
  )
}

/** Bisection solve for years t that yields target FV (bracket 0.1–100 years). */
export function solveTimeBisection(
  targetFv: number,
  pv: number,
  pmt: number,
  r: number,
  c: number,
): number | null {
  return bisect(
    (t) => futureValue({ pv, pmt, r, t, c, inflation: 0, tax: 0 }) - targetFv,
    0.1,
    100,
    1e-6,
    200,
  )
}

function buildResults(inputs: CalcInputs, solved: number, solvedPmt: number | null): CalcResults {
  const fv = futureValue(inputs)
  const fvReal = realValue(fv, inputs.inflation, inputs.t)
  const totalContributions = inputs.pv + inputs.pmt * 12 * inputs.t
  const taxableGain = Math.max(0, fv - totalContributions)
  const tax = taxableGain * inputs.tax
  const fvAfterTax = fv - tax
  const totalInterest = fv - totalContributions
  const realInterest = fvReal - totalContributions
  const ear = effectiveAnnualRate(inputs.r, inputs.c)
  return {
    fv,
    fvReal,
    fvAfterTax,
    totalContributions,
    totalInterest,
    realInterest,
    ear,
    solved,
    solvedPmt,
  }
}

export type CalcError = "pv_needs_zero_pmt" | "no_solution"

export interface CalcOutcome {
  results: CalcResults | null
  error: CalcError | null
}

/**
 * Main entry point. Given the current inputs, the desired target FV,
 * and which variable to solve for, returns results + the solved value.
 */
export function calculate(target: SolveTarget, inputs: CalcInputs, targetFv: number): CalcOutcome {
  const { pv, pmt, r, t, c } = inputs

  if (target === "fv") {
    return { results: buildResults(inputs, futureValue(inputs), null), error: null }
  }

  if (target === "pv") {
    if (pmt !== 0) return { results: null, error: "pv_needs_zero_pmt" }
    const solvedPv = presentValue(targetFv, r, t, c)
    if (!isFinite(solvedPv) || solvedPv < 0) return { results: null, error: "no_solution" }
    return { results: buildResults({ ...inputs, pv: solvedPv }, solvedPv, null), error: null }
  }

  if (target === "r") {
    let solvedR: number | null
    if (pmt === 0) {
      solvedR = pv > 0 ? solveRateNoPmt(targetFv, pv, t, c) : null
    } else {
      solvedR = solveRateBisection(targetFv, pv, pmt, t, c)
    }
    if (solvedR === null || !isFinite(solvedR) || solvedR < 0 || solvedR > 1) {
      return { results: null, error: "no_solution" }
    }
    return { results: buildResults({ ...inputs, r: solvedR }, solvedR, null), error: null }
  }

  if (target === "n") {
    let solvedT: number | null
    if (pmt === 0) {
      solvedT = pv > 0 ? solveTimeNoPmt(targetFv, pv, r, c) : null
    } else {
      solvedT = solveTimeBisection(targetFv, pv, pmt, r, c)
    }
    if (solvedT === null || !isFinite(solvedT) || solvedT <= 0) {
      return { results: null, error: "no_solution" }
    }
    return { results: buildResults({ ...inputs, t: solvedT }, solvedT, null), error: null }
  }

  // target === "pmt": solve required monthly contribution for the target FV
  const solvedMonthly = solvePmt(targetFv, pv, r, t, c)
  if (!isFinite(solvedMonthly)) {
    return { results: null, error: "no_solution" }
  }
  // Use the solved contribution in the results so the FV matches the target.
  return {
    results: buildResults({ ...inputs, pmt: solvedMonthly }, solvedMonthly, solvedMonthly),
    error: null,
  }
}

/** Cumulative series for charting, year by year (0..t). */
export function growthSeries(inputs: CalcInputs): {
  years: number[]
  balance: number[]
  contributions: number[]
  real: number[]
} {
  const years: number[] = []
  const balance: number[] = []
  const contributions: number[] = []
  const real: number[] = []
  const totalYears = Math.max(0, Math.ceil(inputs.t))
  for (let y = 0; y <= totalYears; y++) {
    const yr = Math.min(y, inputs.t)
    years.push(Number(yr.toFixed(2)))
    const bal = futureValue({ ...inputs, t: yr })
    balance.push(bal)
    contributions.push(inputs.pv + inputs.pmt * 12 * yr)
    real.push(realValue(bal, inputs.inflation, yr))
  }
  return { years, balance, contributions, real }
}

export function formatCurrency(
  value: number,
  currency: CurrencyCode = "USD",
  locale = "en-US",
): string {
  if (!isFinite(value)) return "—"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number | null, locale = "en-US"): string {
  if (value === null || !isFinite(value)) return "N/A"
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
