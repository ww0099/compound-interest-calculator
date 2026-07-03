export type Lang = "en" | "zh"

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

const zh: Dict = {
  locale: "zh-CN",
  subtitle: "清晰规划你的长期投资增长。",
  currencySettings: "货币与汇率",
  baseCurrency: "基准货币",
  displayCurrency: "显示货币",
  exchangeRate: "汇率",
  exchangeRateHint: (base, display) => `1 ${base} = ? ${display}（仅用于显示换算）`,
  solveLabel: "求解目标",
  solveFv: "终值",
  solvePv: "现值",
  solveR: "年利率",
  solveN: "投资期限",
  solvePmt: "每月定投",
  numericalNote: "由于每月定投不为零，已使用数值方法（二分法）求解。",
  initialPrincipal: "初始本金 (PV)",
  monthlyContribution: "每月定投 (PMT)",
  annualRate: "年利率 (r)",
  investmentPeriod: "投资期限 (t)",
  compounding: "复利频率",
  inflationRate: "通货膨胀率 (i)",
  taxRate: "资本利得税率",
  years: "年",
  targetFv: "目标终值",
  annually: "每年",
  semiannually: "每半年",
  quarterly: "每季度",
  monthly: "每月",
  daily: "每日",
  results: "计算结果",
  nominalBalance: "名义最终余额",
  realBalance: "实际最终余额",
  afterTaxBalance: "税后最终余额",
  totalContributions: "总投入",
  totalInterest: "名义累计利息",
  realInterest: "实际利息",
  ear: "实际年利率 (EAR)",
  requiredPmt: "所需每月定投",
  perMonth: "/月",
  chartTitle: "增长趋势",
  totalBalance: "总余额",
  contributionsLine: "累计投入",
  realBalanceLine: "实际余额",
  amount: (currency) => `金额（${currency}）`,
  yearAxis: "年份",
  errPvNeedsZero: "每月定投不为零时无法求解现值，请先将每月定投设为 0。",
  errNoSolution: "未找到有效解，请调整输入。",
  errNegative: "数值不能为负。",
  errRateCap: "年利率不能超过 100%。",
  errInflationCap: "通货膨胀率不能超过 50%。",
  errTaxCap: "税率不能超过 100%。",
  share: "分享",
  copied: "摘要已复制到剪贴板！",
  compareMode: "对比模式",
  groupA: "方案 A",
  groupB: "方案 B",
  history: "计算历史",
  clearAll: "清空全部历史",
  clearConfirm: "确定要删除所有计算历史吗？",
  load: "载入",
  delete: "删除",
  noHistory: "暂无计算记录，调整输入即可开始。",
  colTime: "时间",
  colTarget: "目标",
  colInputs: "输入",
  colFv: "最终余额",
  colInterest: "利息",
  knowledgeTitle: "了解复利",
  knowledgeBody: [
    "复利常被称为世界第八大奇迹，这是有道理的。它指的是你不仅能对最初的本金赚取利息，还能对随时间累积的利息再赚取利息，也就是所谓的“利滚利”。随着每一期的推移，用于计算利息的基数不断增大，从而让你的余额加速增长，而不是呈直线上升。",
    "这正是复利与单利的关键区别。单利只按最初的本金计算，因此增长是线性且可预测的；而复利则呈指数级增长。在短期内两者差距可能不明显，但经过数十年，差距会变得惊人。这也是为什么对长期投资者而言，尽早开始如此重要。",
    "驱动复利增长的有三大要素：本金（你投入多少）、利率（你获得的年化收益）和时间（资金投资的时长）。其中，由于复利的指数特性，时间往往是最强大的因素。即使是稳定而适度的定投，只要有足够长的时间去复利，也能积累成一笔可观的财富。",
    "一个实用的经验法则是“72 法则”：用 72 除以年利率，即可估算资金翻倍所需的年数。例如在 8% 的年化收益下，你的投资大约每 9 年翻一倍。",
    "最后请记住，名义收益可能具有误导性。通货膨胀会随时间侵蚀购买力，因此实际（经通胀调整后）价值才能反映你的钱在未来真正能买到什么。对收益征税会进一步减少你的实得金额。同时考虑实际价值与税后价值，才能更真实地了解你的财富，并据此做出符合现实预期的规划。",
  ],
}

export const dictionaries: Record<Lang, Dict> = { en, zh }

export function getDict(lang: Lang): Dict {
  return dictionaries[lang]
}
