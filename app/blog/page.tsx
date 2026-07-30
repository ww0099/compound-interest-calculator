import type { Metadata } from "next"
import { BlogIndex } from "./blog-index"

export const metadata: Metadata = {
  title: "Financial Education Blog - Compound Interest Calculator",
  description:
    "Learn about compound interest, retirement planning, investing strategies, and financial literacy. Free educational articles backed by real calculation data.",
  alternates: { canonical: "https://top.net.im/blog" },
  robots: { index: true, follow: true },
}

const articles = [
  {
    slug: "compound-vs-simple-interest",
    enTitle: "Compound Interest vs Simple Interest: A 10-Year Comparison",
    zhTitle: "复利 vs 单利：10 年对比分析",
    enDesc:
      "Discover why compound interest dramatically outperforms simple interest over time, with real data showing the widening gap year by year.",
    zhDesc:
      "通过真实数据了解为什么复利会随时间推移远超单利，逐年差距不断扩大。",
    date: "2026-07-30",
    readingTimeEn: "8 min read",
    readingTimeZh: "阅读 8 分钟",
  },
  {
    slug: "rule-of-72",
    enTitle: "The Rule of 72: How Fast Does Your Money Double?",
    zhTitle: "72 法则：你的钱多久翻一倍？",
    enDesc:
      "Master the Rule of 72 — a simple mental shortcut to estimate doubling time. See how different rates change your wealth trajectory over decades.",
    zhDesc:
      "掌握 72 法则——这个简单的速算方法可以估算资金翻倍时间，看看不同利率如何在几十年间改变你的财富轨迹。",
    date: "2026-07-30",
    readingTimeEn: "7 min read",
    readingTimeZh: "阅读 7 分钟",
  },
  {
    slug: "500-per-month-30-years",
    enTitle: "How Much Will $500/Month Grow in 30 Years?",
    zhTitle: "每月存 $500，30 年后能变成多少？",
    enDesc:
      "A realistic look at what consistent monthly investing can achieve. We run the numbers at 4%, 7%, and 10% returns to show the power of starting early.",
    zhDesc:
      "真实模拟每月固定投资能带来什么。我们分别计算 4%、7%、10% 三种收益率，展示尽早开始的力量。",
    date: "2026-07-30",
    readingTimeEn: "9 min read",
    readingTimeZh: "阅读 9 分钟",
  },
  {
    slug: "inflation-hidden-tax",
    enTitle: "Inflation's Hidden Tax on Your Investment Returns",
    zhTitle: "通胀——投资收益的隐形税收",
    enDesc:
      "Nominal returns can be deceiving. Learn how inflation silently erodes purchasing power over decades, with a striking 30-year comparison of nominal vs real wealth.",
    zhDesc:
      "名义收益可能具有欺骗性。了解通胀如何在几十年间悄然侵蚀购买力，通过 30 年名义 vs 实际财富的惊人对比。",
    date: "2026-07-30",
    readingTimeEn: "8 min read",
    readingTimeZh: "阅读 8 分钟",
  },
  {
    slug: "monthly-vs-annual-compounding",
    enTitle: "Monthly vs Annual Compounding: How Much Difference Does Frequency Make?",
    zhTitle: "每月复利 vs 每年复利：频率的差异有多大？",
    enDesc:
      "Does compounding frequency really matter? We quantify the exact dollar difference between annual, monthly, and daily compounding over 20 years.",
    zhDesc:
      "复利频率真的重要吗？我们精确量化了 20 年间每年、每月和每日复利之间的美元差异。",
    date: "2026-07-30",
    readingTimeEn: "7 min read",
    readingTimeZh: "阅读 7 分钟",
  },
  {
    slug: "beginner-guide-retirement",
    enTitle: "A Beginner's Guide to Retirement Planning with Compound Interest",
    zhTitle: "复利退休规划入门指南",
    enDesc:
      "Start from zero? No problem. This guide walks through realistic retirement scenarios — from your 20s, 30s, and 40s — showing exactly how much to save monthly.",
    zhDesc:
      "从零开始？没问题。本指南涵盖真实的退休规划场景——从 20 多岁、30 多岁到 40 多岁开始——精确展示每月需要存多少钱。",
    date: "2026-07-30",
    readingTimeEn: "10 min read",
    readingTimeZh: "阅读 10 分钟",
  },
  {
    slug: "capital-gains-tax",
    enTitle: "Understanding Capital Gains Tax for Long-Term Investors",
    zhTitle: "长期投资者必懂的资本利得税",
    enDesc:
      "Taxes take a real bite out of your returns. We calculate after-tax outcomes at 0%, 15%, and 30% tax rates to show why tax-efficient investing matters.",
    zhDesc:
      "税收会切实侵蚀你的收益。我们计算了 0%、15% 和 30% 税率下的税后结果，说明为什么节税投资如此重要。",
    date: "2026-07-30",
    readingTimeEn: "8 min read",
    readingTimeZh: "阅读 8 分钟",
  },
  {
    slug: "cagr-vs-average-return",
    enTitle: "CAGR vs Average Return: Why the Difference Can Mislead You",
    zhTitle: "CAGR vs 平均收益率：为什么差异会误导你",
    enDesc:
      "An investment that gains 50% then loses 50% is NOT flat. Understand the difference between arithmetic and geometric returns — and why CAGR is the honest number.",
    zhDesc:
      "先涨 50% 再跌 50% 的投资并不是不赚不赔。了解算术平均和几何平均的区别——以及为什么 CAGR 才是诚实的数字。",
    date: "2026-07-30",
    readingTimeEn: "9 min read",
    readingTimeZh: "阅读 9 分钟",
  },
]

export default function BlogPage() {
  return <BlogIndex articles={articles} />
}
