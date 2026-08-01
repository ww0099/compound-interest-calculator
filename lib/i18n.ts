export interface Dict {
  locale: string
  subtitle: string
  // currency
  currencySettings: string
  baseCurrency: string
  displayCurrency: string
  exchangeRate: string
  exchangeRateHint: (base: string, display: string) => string
  // solve tabs
  solveLabel: string
  solveFv: string
  solvePv: string
  solveR: string
  solveN: string
  solvePmt: string
  numericalNote: string
  // inputs
  initialPrincipal: string
  monthlyContribution: string
  annualRate: string
  investmentPeriod: string
  compounding: string
  inflationRate: string
  taxRate: string
  years: string
  targetFv: string
  // compounding options
  annually: string
  semiannually: string
  quarterly: string
  monthly: string
  daily: string
  // results
  results: string
  nominalBalance: string
  realBalance: string
  afterTaxBalance: string
  totalContributions: string
  totalInterest: string
  realInterest: string
  ear: string
  requiredPmt: string
  perMonth: string
  // chart
  chartTitle: string
  totalBalance: string
  contributionsLine: string
  realBalanceLine: string
  amount: (currency: string) => string
  yearAxis: string
  // errors
  errPvNeedsZero: string
  errNoSolution: string
  errNegative: string
  errRateCap: string
  errInflationCap: string
  errTaxCap: string
  // share
  share: string
  copied: string
  // compare
  compareMode: string
  groupA: string
  groupB: string
  // history
  history: string
  clearAll: string
  clearConfirm: string
  load: string
  delete: string
  noHistory: string
  colTime: string
  colTarget: string
  colInputs: string
  colFv: string
  colInterest: string
  // knowledge
  knowledgeTitle: string
  knowledgeBody: string[]
}

const en: Dict = {
  locale: "en-US",
  subtitle: "Plan your long-term investment growth with clarity.",
  currencySettings: "Currency & Exchange Rate",
  baseCurrency: "Base Currency",
  displayCurrency: "Display Currency",
  exchangeRate: "Exchange Rate",
  exchangeRateHint: (base, display) => `1 ${base} = ? ${display} (display conversion only)`,
  solveLabel: "Solve for",
  solveFv: "Future Value",
  solvePv: "Present Value",
  solveR: "Interest Rate",
  solveN: "Investment Period",
  solvePmt: "Monthly Contribution",
  numericalNote: "Solved numerically (bisection) because monthly contribution is non-zero.",
  initialPrincipal: "Initial Principal (PV)",
  monthlyContribution: "Monthly Contribution (PMT)",
  annualRate: "Annual Interest Rate (r)",
  investmentPeriod: "Investment Period (t)",
  compounding: "Compounding Frequency",
  inflationRate: "Inflation Rate (i)",
  taxRate: "Capital Gains Tax Rate",
  years: "years",
  targetFv: "Target Future Value",
  annually: "Annually",
  semiannually: "Semiannually",
  quarterly: "Quarterly",
  monthly: "Monthly",
  daily: "Daily",
  results: "Results",
  nominalBalance: "Nominal Final Balance",
  realBalance: "Real Final Balance",
  afterTaxBalance: "After-tax Final Balance",
  totalContributions: "Total Contributions",
  totalInterest: "Total Nominal Interest",
  realInterest: "Real Interest",
  ear: "Effective Annual Rate",
  requiredPmt: "Required Monthly Contribution",
  perMonth: "/mo",
  chartTitle: "Growth Over Time",
  totalBalance: "Total Balance",
  contributionsLine: "Total Contributions",
  realBalanceLine: "Real Balance",
  amount: (currency) => `Amount (${currency})`,
  yearAxis: "Year",
  errPvNeedsZero:
    "Cannot solve for PV when monthly contribution is non-zero. Please set contribution to 0.",
  errNoSolution: "No valid solution found. Please adjust your inputs.",
  errNegative: "Values cannot be negative.",
  errRateCap: "Interest rate cannot exceed 100%.",
  errInflationCap: "Inflation rate cannot exceed 50%.",
  errTaxCap: "Tax rate cannot exceed 100%.",
  share: "Share",
  copied: "Summary copied to clipboard!",
  compareMode: "Compare Mode",
  groupA: "Group A",
  groupB: "Group B",
  history: "Calculation History",
  clearAll: "Clear All History",
  clearConfirm: "Are you sure you want to delete all calculation history?",
  load: "Load",
  delete: "Delete",
  noHistory: "No calculations yet. Adjust the inputs to get started.",
  colTime: "Time",
  colTarget: "Target",
  colInputs: "Inputs",
  colFv: "Final Balance",
  colInterest: "Interest",
  knowledgeTitle: "Understanding Compound Interest",
  knowledgeBody: [
    "Compound interest is often called the eighth wonder of the world, and for good reason. It is the process of earning interest not only on your original principal but also on the interest that accumulates over time. In other words, it is \"interest on interest.\" As each period passes, the base on which interest is calculated grows larger, which causes your balance to accelerate rather than grow in a straight line.",
    "This is the key difference from simple interest. Simple interest is calculated only on the original principal, so it grows linearly and predictably. Compound interest, by contrast, grows exponentially. Over short periods the difference may seem small, but over decades the gap becomes dramatic, which is why starting early matters so much for long-term investors.",
    "Three factors drive compound growth: principal (how much you invest), rate (the annual return you earn), and time (how long your money stays invested). Of these, time is frequently the most powerful because of the exponential nature of compounding. Even modest, consistent contributions can grow into a substantial sum when given enough decades to compound.",
    "A handy shortcut is the Rule of 72: divide 72 by your annual interest rate to estimate how many years it takes for your money to double. At an 8% return, for example, your investment roughly doubles every nine years.",
    "Finally, remember that nominal returns can be misleading. Inflation erodes purchasing power over time, so the real (inflation-adjusted) value shows what your money can actually buy in the future. Taxes on gains further reduce what you keep. Considering both real and after-tax values gives you a truer picture of your wealth and helps you plan with realistic expectations.",
  ],
}

export const dict: Dict = en
