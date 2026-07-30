import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Inflation's Hidden Tax on Your Investment Returns",
  description:
    "Nominal returns can be deceiving. See a 30-year comparison of nominal vs real wealth — and learn why inflation is the silent wealth destroyer every investor must account for.",
  alternates: { canonical: "https://top.net.im/blog/inflation-hidden-tax" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "Inflation's Hidden Tax on Your Investment Returns",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "You check your brokerage account and see your portfolio hit a new high. You feel good — until you realize that a gallon of milk now costs 40% more than it did a decade ago. This is inflation's hidden tax: your nominal returns look impressive, but what matters is what your money can actually buy. We ran the numbers for a 30-year investment to show exactly how much purchasing power inflation steals.",
  sections: [
    {
      heading: "Nominal vs Real: The Crucial Distinction",
      body: "Nominal return is the raw percentage your investment grows. Real return is nominal return minus inflation. If your portfolio gains 8% in a year but inflation is 3%, your real return is approximately 5%. Over short periods, the gap seems small. Over 30 years, it's staggering. A $100,000 investment at 8% nominally grows to $1,006,266. But with 3% annual inflation, the real purchasing power is only $411,960 — less than half the nominal figure. Inflation effectively 'taxed' away $594,306 of your wealth.",
    },
    {
      heading: "The 30-Year Simulation: $100,000 at 8%",
      body: "Using our compound interest calculator, we modeled a $100,000 lump sum at 8% annual return with 3% inflation over 30 years. Nominal balance: $1,006,266. Real balance (inflation-adjusted): $411,960. Total nominal interest: $906,266. Real interest (actual purchasing power gained): $311,960. This means 65.6% of your nominal gains were consumed by inflation. You didn't see this 'tax' on any statement — but it's very real.",
    },
    {
      heading: "Why 2% vs 3% Inflation Matters Enormously",
      body: "The difference between 2% and 3% average inflation over 30 years is much larger than most people think. At 2% inflation, the same $100,000 at 8% gives a real balance of $558,173. At 3% inflation, it drops to $411,960 — a $146,213 difference. Central banks fight over fractions of a percent in inflation targets precisely because those fractions compound into enormous differences in long-term purchasing power.",
    },
    {
      heading: "Inflation's Uneven Impact",
      body: "Inflation doesn't affect all expenses equally. Over the past 30 years, US healthcare costs have risen roughly 5-6% annually, college tuition about 5-7%, and housing about 3-4%, while consumer electronics have actually deflated. If your personal inflation rate is higher than the CPI average — because you spend more on healthcare, education, and housing — your real returns are even lower than standard calculations suggest. This is why retirement planning should use a personal inflation estimate, not just the headline CPI figure.",
    },
    {
      heading: "How to Protect Against Inflation",
      body: "The best long-term inflation hedge has historically been equities (stocks). Companies can raise prices to pass inflation costs to consumers, which means their earnings — and ultimately their stock prices — tend to rise with inflation over the long run. Real estate and Treasury Inflation-Protected Securities (TIPS) also provide partial protection. Cash and long-term nominal bonds are the most vulnerable. This is why a 'safe' all-cash portfolio is actually risky in real terms — you're guaranteed to lose purchasing power every year.",
    },
    {
      heading: "Key Numbers at a Glance",
      body: [
        "Investment: $100,000 lump sum, 8% annual return, 30 years",
        "0% inflation (nominal): $1,006,266",
        "2% inflation: Real value = $558,173 | Lost to inflation = $448,093 (44.5%)",
        "3% inflation: Real value = $411,960 | Lost to inflation = $594,306 (59.0%)",
        "5% inflation: Real value = $224,208 | Lost to inflation = $782,058 (77.7%)",
        "Use the 'Inflation Rate' field on top.net.im to see your own scenario.",
      ],
    },
  ],
}

const zhContent: BlogContent = {
  title: "通胀——投资收益的隐形税收",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "阅读 8 分钟",
  intro:
    "你查看券商账户，发现你的投资组合创了新高。感觉不错——直到你意识到一加仑牛奶现在比十年前贵了 40%。这就是通胀的隐形税收：你的名义回报看起来很亮眼，但真正重要的是你的钱实际能买到什么。我们计算了一个 30 年期投资的数据，精确展示通胀偷走了多少购买力。",
  sections: [
    {
      heading: "名义 vs 实际：关键区别",
      body: "名义回报是投资增长的原始百分比。实际回报是名义回报减去通胀。如果你的投资组合一年涨了 8% 但通胀是 3%，你的实际回报大约只有 5%。短期内差距看起来很小。30 年后，差距触目惊心。$100,000 的投资按 8% 名义增长到 $1,006,266。但扣除 3% 的年通胀，实际购买力只有 $411,960——不到名义数字的一半。通胀实际上从你的财富中「征走」了 $594,306。",
    },
    {
      heading: "30 年模拟：$100,000 按 8% 计算",
      body: "使用我们的复利计算器，我们模拟了一笔 $100,000 一次性投资，年回报 8%，通胀率 3%，期限 30 年。名义余额：$1,006,266。实际余额（通胀调整后）：$411,960。名义总利息：$906,266。实际利息（真正的购买力增长）：$311,960。这意味着你 65.6% 的名义收益被通胀吞噬了。你不会在任何账单上看到这笔「税」——但它非常真实。",
    },
    {
      heading: "为什么 2% 和 3% 的通胀差异如此巨大",
      body: "30 年间平均通胀 2% 和 3% 的差异远超大多数人的想象。在 2% 通胀下，同样的 $100,000 按 8% 计算的实际余额为 $558,173。在 3% 通胀下，降至 $411,960——差距 $146,213。各国央行为百分之零点几的通胀目标争论不休，正是因为这些小数在长期复利后会变成巨大的购买力差异。",
    },
    {
      heading: "通胀的不均衡影响",
      body: "通胀并不平等地影响所有支出。在过去 30 年，美国医疗费用年均上涨约 5-6%，大学学费约 5-7%，住房约 3-4%，而消费电子产品实际在降价。如果你的个人通胀率高于 CPI 平均值——因为你在医疗、教育和住房上支出更多——你的实际回报比标准计算显示的还要低。这就是为什么退休规划应使用个人通胀估算，而不仅仅是公布的 CPI 数据。",
    },
    {
      heading: "如何抵御通胀",
      body: "历史上最好的长期通胀对冲工具是股票。企业可以通过提价将通胀成本转嫁给消费者，这意味着它们的盈利——最终是股价——长期来看会随通胀上涨。房地产和通胀保护国债（TIPS）也能提供部分保护。现金和长期名义债券是最脆弱的。这就是为什么一个「安全」的全现金投资组合在实际意义上反而是有风险的——你每年都注定要损失购买力。",
    },
    {
      heading: "关键数据一览",
      body: [
        "投资：$100,000 一次性投入，年回报 8%，30 年",
        "0% 通胀（名义值）：$1,006,266",
        "2% 通胀：实际价值 = $558,173 | 通胀吞噬 = $448,093（44.5%）",
        "3% 通胀：实际价值 = $411,960 | 通胀吞噬 = $594,306（59.0%）",
        "5% 通胀：实际价值 = $224,208 | 通胀吞噬 = $782,058（77.7%）",
        "使用 top.net.im 的「通货膨胀率」字段查看你自己的情景。",
      ],
    },
  ],
}

export default function Page() {
  return <BlogLayout en={enContent} zh={zhContent} />
}
