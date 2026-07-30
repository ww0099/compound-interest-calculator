"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Library } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

interface Reference {
  title: string
  en: { desc: string }
  zh: { desc: string }
  url: string
  category: "gov" | "edu" | "org" | "book"
}

const REFERENCES: Reference[] = [
  {
    title: "Investopedia — Compound Interest",
    en: {
      desc: "Comprehensive explanation of compound interest, including formulas, examples, and real-world applications.",
    },
    zh: {
      desc: "复利的全面解释，包括公式、示例和实际应用。",
    },
    url: "https://www.investopedia.com/terms/c/compoundinterest.asp",
    category: "org",
  },
  {
    title: "Investopedia — Effective Annual Interest Rate",
    en: {
      desc: "Definition and calculation of the Effective Annual Rate (EAR), including the impact of compounding frequency.",
    },
    zh: {
      desc: "有效年利率（EAR）的定义和计算，包括复利频率的影响。",
    },
    url: "https://www.investopedia.com/terms/e/effectiveinterest.asp",
    category: "org",
  },
  {
    title: "U.S. Securities and Exchange Commission (SEC) — Compound Interest Calculator",
    en: {
      desc: "The SEC's official compound interest calculator and investor education resources on the power of compounding.",
    },
    zh: {
      desc: "SEC 官方复利计算器和关于复利力量的投资教育资源。",
    },
    url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",
    category: "gov",
  },
  {
    title: "Federal Reserve Economic Data (FRED)",
    en: {
      desc: "Historical interest rate data from the Federal Reserve Bank of St. Louis, providing context for real-world rate environments.",
    },
    zh: {
      desc: "圣路易斯联邦储备银行的历史利率数据，为真实利率环境提供背景。",
    },
    url: "https://fred.stlouisfed.org/categories/22",
    category: "gov",
  },
  {
    title: "IRS — Topic No. 409, Capital Gains and Losses",
    en: {
      desc: "Official IRS guidance on capital gains tax rates, holding periods, and reporting requirements for investment income.",
    },
    zh: {
      desc: "IRS 关于资本利得税率、持有期和投资收入申报要求的官方指南。",
    },
    url: "https://www.irs.gov/taxtopics/tc409",
    category: "gov",
  },
  {
    title: "IRS — Publication 550, Investment Income and Expenses",
    en: {
      desc: "Detailed IRS publication covering the tax treatment of investment income, including capital gains and losses.",
    },
    zh: {
      desc: "IRS 关于投资收入税务处理（包括资本利得和损失）的详细出版物。",
    },
    url: "https://www.irs.gov/publications/p550",
    category: "gov",
  },
  {
    title: "Bodie, Kane & Marcus — Investments (12th Edition)",
    en: {
      desc: "Standard university-level textbook on investment theory, covering compound interest, time value of money, and portfolio theory. McGraw-Hill Education.",
    },
    zh: {
      desc: "标准的大学级投资理论教材，涵盖复利、货币时间价值和投资组合理论。McGraw-Hill 出版。",
    },
    url: "https://www.mheducation.com/highered/product/investments-bodie-kane/M9781260013832.html",
    category: "book",
  },
  {
    title: "Fabozzi — Fixed Income Analysis (4th Edition)",
    en: {
      desc: "Authoritative reference on fixed-income mathematics, including compounding conventions, yield calculations, and interest rate theory. CFA Institute Investment Series.",
    },
    zh: {
      desc: "固定收益数学的权威参考，包括复利惯例、收益率计算和利率理论。CFA 协会投资系列。",
    },
    url: "https://www.wiley.com/en-us/Fixed+Income+Analysis,+4th+Edition-p-9781119626862",
    category: "book",
  },
  {
    title: "Khan Academy — Compound Interest",
    en: {
      desc: "Free educational video series explaining compound interest, the time value of money, and the mathematics of exponential growth.",
    },
    zh: {
      desc: "免费的复利、货币时间价值和指数增长数学教育视频系列。",
    },
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance/interest-tutorial/compound-interest-tutorial/v/introduction-to-compound-interest",
    category: "edu",
  },
  {
    title: "MIT OpenCourseWare — Mathematics of Finance",
    en: {
      desc: "Lecture notes and course materials on the mathematics of compound interest, annuities, and loan amortization from MIT's Sloan School of Management.",
    },
    zh: {
      desc: "MIT 斯隆管理学院关于复利数学、年金和贷款摊销的讲义和课程材料。",
    },
    url: "https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/",
    category: "edu",
  },
]

const CATEGORY_LABELS: Record<string, { en: string; zh: string }> = {
  gov: { en: "Government & Regulatory", zh: "政府与监管机构" },
  edu: { en: "Educational Institutions", zh: "教育机构" },
  org: { en: "Financial Reference", zh: "金融参考资料" },
  book: { en: "Academic Textbooks", zh: "学术教材" },
}

export function ReferencesPage() {
  const [lang, setLang] = useState<Lang>("en")

  const t = {
    title: lang === "en" ? "References" : "参考文献",
    back: lang === "en" ? "Back to Calculator" : "返回计算器",
    intro:
      lang === "en"
        ? "The following authoritative sources inform the formulas, assumptions, and educational content on this site. We cite only publicly accessible, reputable institutions and standard academic references."
        : "以下权威来源为本网站的公式、假设和教育内容提供了依据。我们仅引用可公开访问的、有信誉的机构和标准学术参考文献。",
    disclaimer:
      lang === "en"
        ? "External links are provided for reference only. We are not affiliated with, endorsed by, or officially connected to any of the organizations listed below."
        : "外部链接仅供参考。我们不附属于下列任何组织，也不受其认可或与之有官方关联。",
  }

  // Group references by category
  const grouped = REFERENCES.reduce<Record<string, Reference[]>>((acc, ref) => {
    if (!acc[ref.category]) acc[ref.category] = []
    acc[ref.category].push(ref)
    return acc
  }, {})

  const categoryOrder = ["gov", "edu", "org", "book"]

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
                <Library className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
            </div>

            {/* Intro */}
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {t.intro}
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              {t.disclaimer}
            </p>

            {/* References by category */}
            <div className="space-y-10">
              {categoryOrder.map((cat) => {
                const refs = grouped[cat]
                if (!refs || refs.length === 0) return null
                const label = CATEGORY_LABELS[cat]
                return (
                  <section key={cat}>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {label[lang]}
                    </h2>
                    <div className="space-y-4">
                      {refs.map((ref, i) => (
                        <a
                          key={i}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {ref.title}
                            </h3>
                            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                              {lang === "en" ? ref.en.desc : ref.zh.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {lang === "en" ? "About" : "关于我们"}
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Methodology" : "方法论"}
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
