"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, AlertTriangle, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

export function MethodologyPage() {
  const [lang, setLang] = useState<Lang>("en")

  const t = {
    title: lang === "en" ? "Methodology" : "方法论",
    back: lang === "en" ? "Back to Calculator" : "返回计算器",
    intro:
      lang === "en"
        ? "This page documents every mathematical formula and assumption used in the Compound Interest Calculator. We believe in full transparency — there are no hidden algorithms or black-box calculations."
        : "本页面记录了复利计算器中使用的每个数学公式和假设。我们坚持完全透明——没有隐藏算法或黑箱计算。",

    // Core formulas
    formulaHeading:
      lang === "en" ? "Core Formulas" : "核心公式",
    fvTitle:
      lang === "en" ? "1. Future Value with Contributions" : "1. 含定期投入的未来值",
    fvDesc:
      lang === "en"
        ? "The compound interest formula with regular contributions combines the growth of an initial lump sum and a series of periodic payments:"
        : "含定期投入的复利公式结合了初始本金和一系列定期支付的增长：",
    fvFormula: "FV = PV × (1 + r/n)^(n×t) + PMT × [(1 + r/n)^(n×t) − 1] / (r/n)",
    fvWhere:
      lang === "en"
        ? "Where: FV = future value, PV = present value (initial principal), PMT = periodic payment, r = annual interest rate (decimal), n = compounding periods per year, t = number of years."
        : "其中：FV = 未来值，PV = 现值（初始本金），PMT = 定期支付额，r = 年利率（小数），n = 每年复利次数，t = 年数。",
    earTitle:
      lang === "en" ? "2. Effective Annual Rate (EAR)" : "2. 有效年利率（EAR）",
    earDesc:
      lang === "en"
        ? "The Effective Annual Rate converts a nominal rate with compounding frequency into the equivalent annual rate:"
        : "有效年利率将名义利率连同复利频率转换为等效年利率：",
    earFormula: "EAR = (1 + r/n)^n − 1",
    earWhere:
      lang === "en"
        ? "This is used throughout the calculator to display the true annual return accounting for compounding frequency."
        : "此公式贯穿整个计算器，用于显示考虑复利频率后的真实年化回报。",

    // Solve methods
    solveHeading:
      lang === "en" ? "Solving for Unknown Variables" : "求解未知变量",
    solveIntro:
      lang === "en"
        ? "The calculator supports five solve modes. While FV can be computed directly, solving for the interest rate (r) or time period (t) requires numerical methods."
        : "本计算器支持五种求解模式。虽然 FV 可以直接计算，但求解利率（r）或时间（t）需要使用数值方法。",
    bisectionTitle:
      lang === "en" ? "Bisection Method (for r and t)" : "二分法（求解 r 和 t）",
    bisectionDesc:
      lang === "en"
        ? "The bisection method is a root-finding algorithm that repeatedly bisects an interval and selects the subinterval containing the root. It is used because the future value equation cannot be algebraically rearranged to isolate r or t in closed form."
        : "二分法是一种求根算法，反复将区间二分并选择包含根的 subinterval。使用该方法是因为未来值公式无法通过代数变换以封闭形式分离 r 或 t。",
    bisectionSteps:
      lang === "en"
        ? [
            "Define f(x) = calculated FV − target FV, where x is the unknown variable (r or t).",
            "Start with a bracket [a, b] known to contain the root (f(a) × f(b) < 0).",
            "Compute midpoint m = (a + b) / 2 and evaluate f(m).",
            "Replace either a or b with m based on the sign of f(m), halving the interval.",
            "Repeat until the interval is smaller than the tolerance (1e-8 for r, 1e-4 for t).",
          ]
        : [
            "定义 f(x) = 计算 FV − 目标 FV，其中 x 为未知变量（r 或 t）。",
            "从一个已知包含根的区间 [a, b] 开始（f(a) × f(b) < 0）。",
            "计算中点 m = (a + b) / 2 并求值 f(m)。",
            "根据 f(m) 的符号用 m 替换 a 或 b，将区间减半。",
            "重复直到区间小于容差（r 为 1e-8，t 为 1e-4）。",
          ],
    pmtTitle:
      lang === "en" ? "Solving for Payment (PMT)" : "求解定期投入（PMT）",
    pmtDesc:
      lang === "en"
        ? "The periodic payment is solved by rearranging the future value formula algebraically:"
        : "定期投入额通过代数变换未来值公式求解：",
    pmtFormula:
      "PMT = (FV − PV × (1 + r/n)^(n×t)) × (r/n) / [(1 + r/n)^(n×t) − 1]",
    pvTitle:
      lang === "en" ? "Solving for Present Value (PV)" : "求解现值（PV）",
    pvDesc:
      lang === "en"
        ? "Present value is solved analogously by rearrangement:"
        : "现值通过类似的变换求解：",
    pvFormula:
      "PV = [FV − PMT × ((1 + r/n)^(n×t) − 1) / (r/n)] / (1 + r/n)^(n×t)",

    // Assumptions
    assumptionsHeading:
      lang === "en" ? "Assumptions & Limitations" : "假设与局限性",
    assumptionsIntro:
      lang === "en"
        ? "Like all financial models, this calculator makes simplifying assumptions. Understanding these limitations is essential for interpreting results correctly."
        : "与所有金融模型一样，本计算器做了简化假设。理解这些局限性对于正确解读结果至关重要。",
    assumptionsList:
      lang === "en"
        ? [
            {
              title: "Constant Interest Rate",
              body: "The calculator assumes a fixed annual interest rate for the entire investment period. In reality, interest rates fluctuate with market conditions, central bank policy, and economic cycles.",
            },
            {
              title: "Simplified Tax Model",
              body: "A single flat capital gains tax rate is applied uniformly to all gains. Real-world tax systems feature progressive brackets, different rates for short-term vs. long-term gains, tax-advantaged accounts (IRA, 401(k), ISA), and jurisdiction-specific rules.",
            },
            {
              title: "Constant Inflation Rate",
              body: "A fixed annual inflation rate is used to compute real (inflation-adjusted) values. Actual inflation varies year to year and across different goods and services.",
            },
            {
              title: "No Transaction Costs or Management Fees",
              body: "The model assumes zero trading commissions, management fees, expense ratios, bid-ask spreads, or other costs. Real investment products carry fees that reduce net returns.",
            },
            {
              title: "Continuous Compounding Approximation",
              body: "For daily compounding (n=365), the calculator uses discrete compounding. The difference between daily discrete and continuous compounding is negligible for most practical purposes.",
            },
            {
              title: "No Market Risk or Volatility",
              body: "The model projects smooth, deterministic growth. Real investments experience volatility, drawdowns, and sequence-of-returns risk that can significantly impact outcomes.",
            },
            {
              title: "Reinvestment Assumption",
              body: "Interest and dividends are assumed to be reinvested at the same rate. In practice, reinvestment rates may differ from the original yield.",
            },
          ]
        : [
            {
              title: "固定利率",
              body: "计算器假设整个投资期间年利率不变。现实中，利率随市场状况、央行政策和经济周期波动。",
            },
            {
              title: "简化税收模型",
              body: "对所有收益统一适用单一固定资本利得税率。现实税务体系涉及累进税率、短期与长期资本利得的差别税率、税收优惠账户（IRA、401(k)、ISA）以及各司法管辖区的特定规则。",
            },
            {
              title: "恒定通胀率",
              body: "使用固定年通胀率计算实际（通胀调整后）价值。实际通胀率每年不同，且因商品和服务而异。",
            },
            {
              title: "无交易成本或管理费",
              body: "模型假设零交易佣金、管理费、费率比、买卖价差或其他成本。真实投资产品包含会降低净回报的费用。",
            },
            {
              title: "离散复利近似",
              body: "对于每日复利（n=365），计算器使用离散复利。对于大多数实际用途，每日离散复利与连续复利之间的差异可以忽略不计。",
            },
            {
              title: "无市场风险或波动性",
              body: "模型预测平滑、确定性的增长。真实投资经历波动、回撤和回报序列风险，这些可能显著影响结果。",
            },
            {
              title: "收益再投资假设",
              body: "利息和股息假设以相同利率再投资。实际中，再投资利率可能与原始收益率不同。",
            },
          ],

    // Data sources
    sourcesHeading:
      lang === "en" ? "Data & Reference Sources" : "数据与参考来源",
    sourcesBody:
      lang === "en"
        ? "All formulas are based on standard financial mathematics as documented in authoritative textbooks and references. No proprietary data or AI-generated models are used. For a complete list of external references, see our References page."
        : "所有公式均基于权威教材和参考文献中记录的标准金融数学。未使用专有数据或 AI 生成的模型。完整的外部参考文献列表请参阅我们的参考文献页面。",
    viewReferences: lang === "en" ? "View References" : "查看参考文献",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
          </div>

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

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calculator className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
            </div>

            {/* Intro */}
            <p className="mb-8 leading-relaxed text-muted-foreground">
              {t.intro}
            </p>

            <div className="space-y-10">
              {/* Core Formulas */}
              <section>
                <h2 className="mb-5 text-lg font-semibold text-primary">
                  {t.formulaHeading}
                </h2>

                <div className="space-y-6">
                  {/* FV */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.fvTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.fvDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.fvFormula}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.fvWhere}</p>
                  </div>

                  {/* EAR */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.earTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.earDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.earFormula}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t.earWhere}</p>
                  </div>
                </div>
              </section>

              {/* Solve Methods */}
              <section>
                <h2 className="mb-5 text-lg font-semibold text-primary">
                  {t.solveHeading}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.solveIntro}
                </p>

                <div className="space-y-5">
                  {/* Bisection */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.bisectionTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.bisectionDesc}
                    </p>
                    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                      {t.bisectionSteps.map((step, i) => (
                        <li key={i} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* PMT */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.pmtTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.pmtDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.pmtFormula}
                    </p>
                  </div>

                  {/* PV */}
                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <h3 className="font-semibold text-foreground">{t.pvTitle}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t.pvDesc}
                    </p>
                    <p className="mt-3 overflow-x-auto rounded bg-card px-3 py-2.5 font-mono text-sm tracking-tight text-primary">
                      {t.pvFormula}
                    </p>
                  </div>
                </div>
              </section>

              {/* Assumptions */}
              <section>
                <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  {t.assumptionsHeading}
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.assumptionsIntro}
                </p>
                <div className="space-y-4">
                  {t.assumptionsList.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-secondary/30 p-4"
                    >
                      <h3 className="font-semibold text-foreground">
                        {i + 1}. {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Sources */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <BookOpen className="h-5 w-5" />
                  {t.sourcesHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.sourcesBody}
                </p>
                <Link
                  href="/references"
                  className="mt-3 inline-block text-sm font-medium text-accent transition-colors hover:text-accent/80"
                >
                  {t.viewReferences} →
                </Link>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {lang === "en" ? "About" : "关于我们"}
          </Link>
          <Link href="/references" className="transition-colors hover:text-foreground">
            {lang === "en" ? "References" : "参考文献"}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Privacy Policy" : "隐私政策"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Disclaimer" : "免责声明"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
