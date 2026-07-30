import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "The Rule of 72: How Fast Does Your Money Double?",
  description:
    "Learn the Rule of 72 — a simple mental math shortcut to estimate how long it takes for your investment to double at any interest rate.",
  alternates: { canonical: "https://top.net.im/blog/rule-of-72" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "The Rule of 72: How Fast Does Your Money Double?",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "7 min read",
  intro:
    "How long until your money doubles? Instead of reaching for a calculator, you can answer this question in seconds using the Rule of 72 — one of the most useful mental shortcuts in finance. Divide 72 by your annual interest rate, and you'll get a remarkably accurate estimate of the number of years it takes for your investment to double.",
  description:
    "Learn the Rule of 72 — a simple mental math shortcut to estimate how long it takes for your investment to double at any interest rate.",
  sections: [
    {
      heading: "The Rule, Explained in 10 Seconds",
      body: "The Rule of 72 states: Years to double ≈ 72 ÷ annual interest rate (as a percentage). At 6%, your money doubles in roughly 12 years (72 ÷ 6 = 12). At 8%, about 9 years (72 ÷ 8 = 9). At 10%, about 7.2 years (72 ÷ 10 = 7.2). At 12%, about 6 years. That's the entire rule — simple enough to do in your head while reading an investment prospectus or evaluating a savings account.",
    },
    {
      heading: "How Accurate Is It Really?",
      body: "Let's verify the Rule of 72 against exact compound interest calculations. At 6%: Rule says 12.0 years. Exact calculation (ln(2) / ln(1.06)) = 11.90 years. Error: 0.10 years. At 8%: Rule says 9.0 years. Exact: 9.01 years. Error: 0.01 years. At 10%: Rule says 7.2 years. Exact: 7.27 years. Error: 0.07 years. At 4%: Rule says 18.0 years. Exact: 17.67 years. Error: 0.33 years. The Rule of 72 is most accurate in the 6-10% range, which happens to be where most long-term investment return expectations sit. Below 4% it slightly overestimates; above 12% it slightly underestimates.",
    },
    {
      heading: "The Math Behind the Magic",
      body: "Why does 72 work? The exact doubling time comes from solving (1 + r)^n = 2, which gives n = ln(2) / ln(1 + r). For small interest rates, ln(1 + r) ≈ r, so n ≈ ln(2) / r = 0.693 / r. Multiply numerator and denominator by 100 to express r as a percentage: n ≈ 69.3 / r. But 69.3 isn't very convenient for mental math — it's not divisible by many numbers. Enter 72: it's close to 69.3 and evenly divisible by 2, 3, 4, 6, 8, 9, 12, 18, 24, and 36. The slight upward adjustment from 69.3 to 72 also conveniently compensates for the approximation error at typical interest rates, making the rule more accurate where it's used most.",
    },
    {
      heading: "Rule Variations: 69.3, 70, and 72",
      body: "For the purists: the 'Rule of 69.3' is theoretically exact for continuous compounding. The 'Rule of 70' is often used for lower rates (2-5%). The 'Rule of 72' is the sweet spot for the 6-10% range most investors care about. You can even adjust on the fly: for rates below 4%, use 70 or 71; for 4-10%, use 72; for rates above 10%, add 1 to 72 for every 3 percentage points above 10% (so 74 for 13%, 75 for 15%).",
    },
    {
      heading: "Practical Applications Beyond Doubling",
      body: [
        "Inflation halving: At 3% inflation, purchasing power halves in 72 ÷ 3 = 24 years. A dollar today buys what 50 cents will buy in 24 years.",
        "GDP growth: An economy growing at 3% annually doubles in size every 24 years.",
        "Debt doubling: A credit card with 18% APR doubles your debt in 72 ÷ 18 = 4 years if unpaid.",
        "Fee impact: A 2% annual management fee halves your effective return advantage — the fee alone consumes half your growth in 72 ÷ 2 = 36 years.",
        "These applications show that the Rule of 72 isn't just for investing — it's a universal exponential growth estimator.",
      ],
    },
    {
      heading: "Key Takeaways",
      body: "The Rule of 72 is a mental model that makes you faster at evaluating financial decisions. When comparing two investments — say a 6% bond vs a 9% stock index fund — the Rule instantly tells you doubling happens in ~12 years vs ~8 years. That 4-year difference, compounded over a career, explains why asset allocation matters. Use this rule. It takes seconds to learn and a lifetime to benefit from.",
    },
  ],
  relatedArticles: [
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
    { slug: "cagr-vs-average-return", titleEn: "CAGR vs Average Return: Why the Difference Can Mislead You", titleZh: "CAGR vs 平均回报：为什么差异会误导你" },
    { slug: "inflation-hidden-tax", titleEn: "Inflation's Hidden Tax on Your Investment Returns", titleZh: "通胀：你投资回报上的隐形税收" },
  ],
}

const zhContent: BlogContent = {
  title: "72 法则：你的钱多久翻一倍？",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "阅读 7 分钟",
  intro:
    "你的钱多久能翻倍？你不必掏出计算器，只需用 72 法则——金融领域最实用的速算工具之一——几秒钟就能得出答案。用 72 除以年利率，你就能得到一个相当准确的资金翻倍所需年数的估算。",
  description:
    "学习 72 法则——一个简单的心算捷径，用于估算在任何利率下你的投资翻倍需要多长时间。",
  sections: [
    {
      heading: "10 秒钟学会这个法则",
      body: "72 法则的内容：翻倍年数 ≈ 72 ÷ 年利率（百分比）。在 6% 下，你的钱大约 12 年翻倍（72 ÷ 6 = 12）。在 8% 下，约 9 年（72 ÷ 8 = 9）。在 10% 下，约 7.2 年（72 ÷ 10 = 7.2）。在 12% 下，约 6 年。这就是整个法则——简单到可以在阅读投资说明书或评估储蓄账户时直接心算。",
    },
    {
      heading: "到底有多准？",
      body: "让我们用精确的复利计算来验证 72 法则。6%：法则说 12.0 年。精确计算（ln(2)/ln(1.06)）= 11.90 年。误差：0.10 年。8%：法则说 9.0 年。精确：9.01 年。误差：0.01 年。10%：法则说 7.2 年。精确：7.27 年。误差：0.07 年。4%：法则说 18.0 年。精确：17.67 年。误差：0.33 年。72 法则在 6-10% 范围内最准确，而这恰好是大多数长期投资回报预期的区间。低于 4% 会略微高估，高于 12% 会略微低估。",
    },
    {
      heading: "背后的数学原理",
      body: "为什么是 72？精确的翻倍时间来自解方程 (1+r)^n = 2，即 n = ln(2)/ln(1+r)。对于小利率，ln(1+r) ≈ r，所以 n ≈ ln(2)/r = 0.693/r。分子分母乘以 100 将 r 转为百分比：n ≈ 69.3/r。但 69.3 对心算不太友好——它不能被很多数整除。这时 72 登场：它接近 69.3，且能被 2、3、4、6、8、9、12、18、24 和 36 整除。从 69.3 到 72 的略微上调也恰好补偿了典型利率下的近似误差，使得法则在最常用的区间内更加准确。",
    },
    {
      heading: "法则变体：69.3、70 和 72",
      body: "对纯粹主义者来说：「69.3 法则」在连续复利下理论上完全精确。「70 法则」常用于较低利率（2-5%）。「72 法则」是大多数投资者关心的 6-10% 区间的最佳选择。你甚至可以动态调整：利率低于 4% 用 70 或 71；4-10% 用 72；利率高于 10%，每高出 3 个百分点就在 72 上加 1（所以 13% 用 74，15% 用 75）。",
    },
    {
      heading: "翻倍之外的实用场景",
      body: [
        "通胀减半：在 3% 通胀率下，购买力在 72÷3=24 年后减半。今天的 1 美元在 24 年后只值 50 美分。",
        "GDP 增长：一个每年增长 3% 的经济体，规模每 24 年翻一番。",
        "债务翻倍：一张年利率 18% 的信用卡，如果不还款，债务在 72÷18=4 年内翻倍。",
        "费用影响：每年 2% 的管理费会让你在 72÷2=36 年内失去一半的收益优势。",
        "这些应用表明 72 法则不仅适用于投资——它是一个通用的指数增长估算工具。",
      ],
    },
    {
      heading: "核心要点",
      body: "72 法则是一个让你在评估财务决策时更快的心智模型。当比较两个投资时——比如 6% 的债券 vs 9% 的股票指数基金——法则立即告诉你翻倍分别需要约 12 年和约 8 年。这 4 年的差距，在职业生涯中不断复利，解释了为什么资产配置如此重要。请善用这个法则。它只需要几秒钟学会，却能让你的终身受益。",
    },
  ],
  relatedArticles: [
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
    { slug: "cagr-vs-average-return", titleEn: "CAGR vs Average Return: Why the Difference Can Mislead You", titleZh: "CAGR vs 平均回报：为什么差异会误导你" },
    { slug: "inflation-hidden-tax", titleEn: "Inflation's Hidden Tax on Your Investment Returns", titleZh: "通胀：你投资回报上的隐形税收" },
  ],
}

export default function Page() {
  return <BlogLayout slug="rule-of-72" en={enContent} zh={zhContent} />
}
