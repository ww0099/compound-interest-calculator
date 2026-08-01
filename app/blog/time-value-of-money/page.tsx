import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Time Value of Money: Why a Dollar Today Is Worth More Than a Dollar Tomorrow",
  description:
    "Understand why a dollar today is worth more than a dollar tomorrow — and how present value, inflation, and opportunity cost shape every financial decision.",
  alternates: { canonical: "https://top.net.im/blog/time-value-of-money" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "Time Value of Money: Why a Dollar Today Is Worth More Than a Dollar Tomorrow",
  date: "2026-08-01",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "$100 today or $100 next year — which would you take? It sounds like a trick question, but your answer reveals whether you truly understand the most important concept in finance. Money today is worth more than the same amount of money tomorrow, and this single idea — the time value of money — is the foundation beneath every financial calculator on this site.",
  description:
    "Understand why a dollar today is worth more than a dollar tomorrow — and how present value, inflation, and opportunity cost shape every financial decision.",
  sections: [
    {
      heading: "The Core Idea: A Dollar Today Is Worth More",
      body: "The reason is not that money 'shrinks' on its own. It's that a dollar you hold today can be invested to earn a return, while a dollar you receive in the future cannot. That one sentence is the entire theory. Hold $100 today and invest it at 7% — in a year it becomes $107. A promise of $100 a year from now is still just $100. The $100 in your hand has grown; the promised $100 has stood still. Everything else in finance — bond pricing, stock valuation, retirement planning, loan amortization — is an application of this single principle.",
    },
    {
      heading: "The Math: Future Value and Present Value",
      body: [
        "The time value of money is captured in two formulas. Future value answers 'what will today's money be worth later?': FV = PV × (1 + r)ⁿ. Invest $1,000 at 7% for 30 years: FV = $1,000 × 1.07³⁰ = $7,612. Present value answers the reverse — 'what is future money worth today?': PV = FV ÷ (1 + r)ⁿ. A promise of $10,000 in 20 years, discounted at 7%, is worth only $2,584 today.",
        "The rate r is the discount rate — the return you could earn elsewhere. A higher rate makes future money worth less today. At 10%, that same $10,000 in 20 years is worth just $1,486. The math is not a guess; it is arithmetic that anyone can verify with our compound interest calculator.",
        "This is why every calculation on this site — retirement projections, inflation adjustments, loan schedules — is built on the same exponential formulas documented in our Methodology.",
      ],
    },
    {
      heading: "Inflation: The Silent Eroder",
      body: "Time erodes money's value through inflation even before you consider investing. At 3% annual inflation, the purchasing power of $1,000 shrinks by half roughly every 24 years — the Rule of 72 at work. The same $1,000 that buys a week of groceries today will buy less than half a week's worth two decades from now. Inflation is why 'keeping money under the mattress' is itself a financial loss. Combined with the opportunity cost of not investing, holding cash long-term is one of the most expensive decisions a saver can make.",
    },
    {
      heading: "Opportunity Cost: The Real Price of Waiting",
      body: [
        "Every dollar not invested has an implicit price: the return it could have earned. This is why 'waiting for the right time to invest' is so costly. Money that sits idle for a decade doesn't just delay your savings — it forfeits an entire decade of compounding.",
        "Consider two investors. Alice starts investing $300/month at age 25. Bob waits ten years and invests $300/month starting at 35. Assuming 7% annual returns, by age 65 Alice has contributed $144,000 and ends with roughly $788,000. Bob has contributed $108,000 but ends with roughly $366,000. Bob invested only slightly less money, yet ends with less than half — the price of a decade of waiting is greater than any market-timing edge can recover.",
      ],
    },
    {
      heading: "Present Value in the Real World",
      body: "Present value is not academic trivia — it decides real money. Lottery winners choosing between a lump sum and annual installments are comparing present values; the lump sum is almost always smaller than the sticker price of the prize, precisely because it represents the present value of all future payments. Bonds are priced by discounting future coupon and principal payments to today's dollars. When you compare a loan's interest rate, you're comparing how future payments are discounted. And when you use this site's retirement calculator, it discounts your future withdrawals to understand today's required savings. Every one of these is the same idea: future money, discounted to today.",
    },
    {
      heading: "Key Takeaways",
      body: [
        "Money today is worth more than money tomorrow — because today's money can earn a return.",
        "Future value and present value are two sides of the same exponential formula, and small rate differences compound into huge gaps over decades.",
        "Inflation silently taxes idle cash, and waiting to invest carries a hidden opportunity cost that is larger than most people realize.",
        "Use the calculators on this site — compound interest, retirement, inflation, and loan — to translate future promises into today's dollars, and make decisions with the time value of money in mind.",
      ],
    },
  ],
  relatedArticles: [
    { slug: "rule-of-72", titleEn: "The Rule of 72: How Fast Does Your Money Double?", titleZh: "72 法则：你的钱多久翻一倍？" },
    { slug: "inflation-hidden-tax", titleEn: "Inflation's Hidden Tax on Your Investment Returns", titleZh: "通胀——投资收益的隐形税收" },
    { slug: "500-per-month-30-years", titleEn: "How Much Will $500/Month Grow in 30 Years?", titleZh: "每月存 $500，30 年后能变成多少？" },
  ],
}

const zhContent: BlogContent = {
  title: "货币时间价值：为什么今天的 1 美元比明天的 1 美元更值钱",
  date: "2026-08-01",
  author: "WW0099",
  readingTime: "阅读 8 分钟",
  intro:
    "今天的 100 美元，还是明年的 100 美元——你会选哪个？这听起来像个脑筋急转弯，但你的答案将揭示你是否真正理解了金融领域最重要的概念。今天的钱比明天的同等金额更值钱，这一简单思想——货币时间价值——正是本网站每一个金融计算器脚下的基石。",
  description:
    "理解为什么今天的钱比明天的钱更值钱——以及现值、通胀和机会成本如何塑造每一个财务决策。",
  sections: [
    {
      heading: "核心思想：今天的钱为什么更值钱",
      body: "原因并不是钱会自己「缩水」，而是你今天握着的 1 美元可以被投资以赚取回报，而未来才能收到的 1 美元不能。这一句话就是全部理论。今天持有 100 美元并以 7% 投资，一年后就变成 107 美元；而承诺一年后给你的 100 美元，仍然是 100 美元。你手里的 100 美元在增长，承诺的 100 美元原地踏步。金融世界的一切——债券定价、股票估值、退休规划、贷款摊销——都是这个单一原则的应用。",
    },
    {
      heading: "背后的数学：终值与现值",
      body: [
        "货币时间价值由两个公式刻画。终值回答「今天的钱未来值多少」：FV = PV × (1+r)ⁿ。把 1,000 美元以 7% 投资 30 年：FV = 1,000 × 1.07³⁰ = 7,612 美元。现值回答相反的问题——「未来的钱今天值多少」：PV = FV ÷ (1+r)ⁿ。一笔 20 年后到账的 10,000 美元，以 7% 贴现，今天只值 2,584 美元。",
        "利率 r 就是贴现率——你在别处能赚到的回报。贴现率越高，未来的钱在今天就越不值钱。以 10% 贴现，同样 20 年后的 10,000 美元只值 1,486 美元。这不是猜测，而是任何人都可以用我们的复利计算器验证的算术。",
        "这正是本站所有计算——退休预测、通胀调整、贷款计划——都建立在同一套指数公式之上的原因，详见我们的方法论页面。",
      ],
    },
    {
      heading: "通胀：沉默的侵蚀者",
      body: "即使在考虑投资之前，时间也在通过通胀侵蚀金钱的价值。在 3% 的年通胀率下，1,000 美元的实际购买力大约每 24 年减半——这正是 72 法则的体现。今天能买一周杂货的 1,000 美元，二十年后连半周都买不到。通胀就是为什么「把钱藏在床垫下」本身就是一种财务损失。再加上不投资的机会成本，长期持有现金是储蓄者能做的最昂贵的决定之一。",
    },
    {
      heading: "机会成本：等待的真实代价",
      body: [
        "每一美元闲置资金都有一个隐含价格：它本可以赚到的回报。这就是为什么「等待合适时机再投资」如此昂贵。闲置十年的钱，不只是推迟了你的储蓄——它放弃了一整段复利的十年。",
        "看看两位投资者。爱丽丝 25 岁开始每月投资 300 美元，鲍勃等到 35 岁才开始每月投资 300 美元。假设年回报 7%：到 65 岁时，爱丽丝投入了 144,000 美元，最终约 788,000 美元；鲍勃投入了 108,000 美元，最终约 366,000 美元。鲍勃投入的钱只少一点，最终却不到一半——十年等待的代价，比任何择时优势都更大。",
      ],
    },
    {
      heading: "现实世界中的现值",
      body: "现值不是学院派冷知识——它决定真金白银。彩票得主在选择一次性领取还是分期领取时，比较的正是现值：一次性金额几乎总是小于奖金的标价，恰恰因为它代表所有未来付款折现到今天。债券的定价，就是把未来的票息和本金折现到今天的美元。当你比较贷款利率时，你是在比较未来付款如何被折现。而当你使用本站的退休计算器时，它在把你未来的取款折现，来推算今天需要存多少。每一次都是同一个思想：未来的钱，折现到今天。",
    },
    {
      heading: "核心要点",
      body: [
        "今天的钱比明天的钱更值钱——因为今天的钱可以赚取回报。",
        "终值和现值是同一个指数公式的两面，微小的利率差异在几十年里会复利成巨大的鸿沟。",
        "通胀在悄悄地对闲置现金征税，而等待投资的机会成本比大多数人意识到的更大。",
        "使用本站的计算器——复利、退休、通胀、贷款——把未来的承诺换算成今天的美元，带着货币时间价值去做决策。",
      ],
    },
  ],
  relatedArticles: [
    { slug: "rule-of-72", titleEn: "The Rule of 72: How Fast Does Your Money Double?", titleZh: "72 法则：你的钱多久翻一倍？" },
    { slug: "inflation-hidden-tax", titleEn: "Inflation's Hidden Tax on Your Investment Returns", titleZh: "通胀——投资收益的隐形税收" },
    { slug: "500-per-month-30-years", titleEn: "How Much Will $500/Month Grow in 30 Years?", titleZh: "每月存 $500，30 年后能变成多少？" },
  ],
}

export default function Page() {
  return <BlogLayout slug="time-value-of-money" en={enContent} zh={zhContent} />
}
