import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Understanding Capital Gains Tax for Long-Term Investors",
  description:
    "See how taxes affect your real investment returns. We calculate after-tax outcomes at 0%, 15%, and 30% tax rates over 20 years — the difference is bigger than you think.",
  alternates: { canonical: "https://top.net.im/blog/capital-gains-tax" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "Understanding Capital Gains Tax for Long-Term Investors",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "You've done the hard work of investing consistently. You've let compound interest work its magic for decades. Then the tax bill arrives. Capital gains tax is the often-overlooked third drag on investment returns — alongside inflation and fees. We calculated the exact after-tax outcomes for a $100,000 investment at 8% over 20 years at 0%, 15%, and 30% tax rates. The difference between tax-free and taxable investing can mean tens of thousands of dollars.",
  description:
    "Learn how capital gains tax affects your long-term investment returns — and discover strategies to minimize the tax burden on your portfolio growth.",
  sections: [
    {
      heading: "How Capital Gains Tax Works on Investments",
      body: "Capital gains tax applies to the profit (the 'gain') when you sell an investment, not the original principal. If you invest $100,000 and it grows to $466,096, your gain is $366,096. The tax is applied to that gain. In the US, long-term capital gains (assets held over 1 year) are taxed at 0%, 15%, or 20% depending on your income, plus a potential 3.8% Net Investment Income Tax (NIIT). Short-term gains (held under 1 year) are taxed as ordinary income — often much higher.",
    },
    {
      heading: "The 20-Year After-Tax Comparison",
      body: "Using the after-tax calculation feature of our compound interest calculator, we modeled a $100,000 investment at 8% annual return over 20 years at three tax rates. At 0% tax: Final balance = $466,096. Total interest = $366,096. At 15% tax: After-tax balance = $411,181. Tax paid = $54,914. At 30% tax: After-tax balance = $356,267. Tax paid = $109,829. The jump from 15% to 30% tax costs an additional $54,915 — money that goes to the government instead of your retirement.",
    },
    {
      heading: "Tax-Efficient Investing Strategies",
      body: [
        "Use tax-advantaged accounts: In the US, 401(k)s and Traditional IRAs defer taxes until withdrawal; Roth IRAs eliminate taxes on qualified withdrawals entirely. Maximize these before investing in taxable accounts.",
        "Hold investments long-term: Assets held over 1 year qualify for lower long-term capital gains rates. Frequent trading generates short-term gains taxed at higher ordinary income rates.",
        "Tax-loss harvesting: Sell losing investments to offset gains, reducing your net taxable gain. The IRS allows up to $3,000 of net capital losses to offset ordinary income each year.",
        "Consider your withdrawal order: In retirement, withdraw from taxable accounts first, then tax-deferred, then tax-free — this gives tax-advantaged accounts more time to compound.",
      ],
    },
    {
      heading: "The Impact on Monthly Contributions",
      body: "For systematic investors who contribute monthly, the after-tax difference accumulates even more dramatically. Investing $500/month for 30 years at 7%: pre-tax balance = $609,986. At 15% tax on gains (gains = $429,986): after-tax = $545,488. At 30% tax: after-tax = $480,996. The difference between 15% and 30% is $64,492 — nearly 3.5 years of contributions. This is why 'tax diversification' (having investments across different tax treatments) is crucial: it gives you flexibility to manage your tax bill in retirement.",
    },
    {
      heading: "Tax Laws Change — Plan Accordingly",
      body: "Tax rates and rules are not permanent. The current US long-term capital gains brackets (0%/15%/20%) were established by the Tax Cuts and Jobs Act of 2017 and are scheduled to revert to higher pre-2018 levels after 2025 unless Congress acts. Always plan using current law but stay informed about potential changes. A qualified tax professional can help you model different scenarios specific to your situation — this article provides general illustrations, not tax advice.",
    },
    {
      heading: "Key Numbers",
      body: [
        "$100,000 lump sum, 8% return, 20 years",
        "Pre-tax balance: $466,096 (gain: $366,096)",
        "0% tax: After-tax = $466,096",
        "15% tax: After-tax = $411,181 | Tax = $54,914 (15.0% of gain)",
        "30% tax: After-tax = $356,267 | Tax = $109,829 (30.0% of gain)",
        "Use the 'Capital Gains Tax Rate' field on top.net.im to model your own tax rate.",
      ],
    },
  ],
  relatedArticles: [
    { slug: "500-per-month-30-years", titleEn: "How Much Will $500/Month Grow in 30 Years?", titleZh: "每月 $500 × 30 年能涨到多少？" },
    { slug: "beginner-guide-retirement", titleEn: "A Beginner's Guide to Retirement Planning with Compound Interest", titleZh: "复利退休规划入门指南" },
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
  ],
}

const zhContent: BlogContent = {
  title: "长期投资者必懂的资本利得税",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "阅读 8 分钟",
  intro:
    "你坚持不懈地投资多年，让复利发挥了数十年的魔力。然后税单来了。资本利得税是经常被忽视的第三种投资回报阻力——与通胀和费用并列。我们计算了 $100,000 投资按 8% 在 20 年间的精确税后结果，分别适用 0%、15% 和 30% 税率。免税和应税投资之间的差额可达数万美元。",
  description:
    "了解资本利得税如何影响你的长期投资回报——并发现最小化投资组合增长税收负担的策略。",
  sections: [
    {
      heading: "资本利得税如何影响投资",
      body: "资本利得税针对的是你卖出投资时的利润（「利得」），而非原始本金。如果你投资 $100,000 并增长到 $466,096，你的利得为 $366,096。税收按此利得计算。在美国，长期资本利得（持有超过 1 年的资产）根据收入按 0%、15% 或 20% 征税，外加可能的 3.8% 净投资收入税（NIIT）。短期利得（持有不足 1 年）按普通收入征税——通常高得多。",
    },
    {
      heading: "20 年税后对比",
      body: "使用我们复利计算器的税后计算功能，我们模拟了 $100,000 投资按 8% 年回报、20 年、三种税率的情景。0% 税率：最终余额 = $466,096，总利息 = $366,096。15% 税率：税后余额 = $411,181，缴税 = $54,914。30% 税率：税后余额 = $356,267，缴税 = $109,829。从 15% 到 30% 的税率跃升导致多缴 $54,915——这笔钱进入了政府的口袋而非你的退休金。",
    },
    {
      heading: "节税投资策略",
      body: [
        "利用税收优惠账户：在美国，401(k) 和传统 IRA 延迟纳税至提款时；Roth IRA 在合格提款时完全免税。在投资应税账户之前先充分利用这些账户。",
        "长期持有投资：持有超过 1 年的资产享受较低的长期资本利得税率。频繁交易产生短期利得，按较高的普通收入税率征税。",
        "税务亏损收割：卖出亏损投资以抵消利得，减少应纳税净利得。IRS 允许每年最多 $3,000 的净资本亏损抵扣普通收入。",
        "考虑提款顺序：退休后，先从应税账户提款，再是延税账户，最后是免税账户——这样可以让税收优惠账户有更多时间复利增长。",
      ],
    },
    {
      heading: "对每月定投的影响",
      body: "对于每月定投的系统性投资者，税后差异的累积更为惊人。投资 $500/月、30 年、7%：税前余额 = $609,986。按 15% 对利得征税（利得 = $429,986）：税后 = $545,488。按 30% 征税：税后 = $480,996。15% 与 30% 之间的差距为 $64,492——接近 3.5 年的投入额。这就是为什么「税务多元化」（在不同税务处理的账户中持有投资）至关重要：它让你在退休时有管理税单的灵活性。",
    },
    {
      heading: "税法会变——相应规划",
      body: "税率和规则并非永久不变。美国当前的长期资本利得税率档次（0%/15%/20%）由 2017 年《减税与就业法案》确立，除非国会采取行动，否则计划在 2025 年后恢复至 2018 年前较高的税率水平。始终按现行法律规划，但随时关注潜在变化。合格的税务专业人士可以帮你模拟符合你具体情况的不同情景——本文仅提供一般性说明，不构成税务建议。",
    },
    {
      heading: "关键数据",
      body: [
        "$100,000 一次性投入，8% 回报，20 年",
        "税前余额：$466,096（利得：$366,096）",
        "0% 税率：税后 = $466,096",
        "15% 税率：税后 = $411,181 | 缴税 = $54,914（利得的 15.0%）",
        "30% 税率：税后 = $356,267 | 缴税 = $109,829（利得的 30.0%）",
        "使用 top.net.im 的「资本利得税率」字段模拟你自己的税率。",
      ],
    },
  ],
  relatedArticles: [
    { slug: "500-per-month-30-years", titleEn: "How Much Will $500/Month Grow in 30 Years?", titleZh: "每月 $500 × 30 年能涨到多少？" },
    { slug: "beginner-guide-retirement", titleEn: "A Beginner's Guide to Retirement Planning with Compound Interest", titleZh: "复利退休规划入门指南" },
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
  ],
}

export default function Page() {
  return <BlogLayout slug="capital-gains-tax" en={enContent} zh={zhContent} />
}
