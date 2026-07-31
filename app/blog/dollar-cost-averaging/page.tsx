import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "Dollar-Cost Averaging: The Simple Strategy That Beats Market Timing",
  description:
    "Learn how dollar-cost averaging (DCA) works, why consistent investing beats trying to time the market, and how to use our calculator to model your DCA returns.",
  alternates: { canonical: "https://top.net.im/blog/dollar-cost-averaging" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "Dollar-Cost Averaging: The Simple Strategy That Beats Market Timing",
  date: "2026-07-31",
  author: "WW0099",
  readingTime: "8 min read",
  intro:
    "Should you invest your $10,000 bonus all at once or spread it out over 12 months? This dilemma — lump sum vs. dollar-cost averaging (DCA) — is one of the most debated questions in personal finance. The good news: the mathematically optimal strategy is also the psychologically easiest one. Here's why consistent, automated investing wins over trying to pick the perfect entry point.",
  description:
    "Learn how dollar-cost averaging (DCA) works, why consistent investing beats trying to time the market, and how to model DCA returns with our compound interest calculator.",
  sections: [
    {
      heading: "What Is Dollar-Cost Averaging?",
      body: "Dollar-cost averaging means investing a fixed dollar amount on a regular schedule, regardless of what the market is doing. Invest $500 every month into an S&P 500 index fund. When prices are high, your $500 buys fewer shares. When prices are low, your $500 buys more shares. Over time, this smooths out the average purchase price — you buy more when things are 'on sale' and less when they're expensive, automatically. No spreadsheets. No market forecasts. No anxiety about whether today is 'the right day.' The discipline does the work for you.",
    },
    {
      heading: "The Math: Why DCA Lowers Your Average Cost",
      body: "Imagine a volatile stock: Month 1 price = $100 (you buy 5 shares with $500), Month 2 price = $80 (you buy 6.25 shares), Month 3 price = $120 (you buy 4.17 shares). Total invested: $1,500. Total shares: 15.42. Average price per share: $97.30. But the simple average price was ($100 + $80 + $120) ÷ 3 = $100. Your actual average is lower — $97.30 — because you automatically bought more shares at $80 than at $120. This discount, properly called the harmonic mean effect, is the mathematical edge of DCA. It's not magic; it's arithmetic working in your favor when prices fluctuate.",
    },
    {
      heading: "Lump Sum vs DCA: What the Research Says",
      body: "Vanguard published a widely-cited study comparing lump sum investing against DCA over rolling 10-year periods. The finding: lump sum outperformed DCA about two-thirds of the time, simply because markets go up more often than they go down. But this misses the point. The real question isn't 'which performs better on average?' — it's 'which will you actually stick with?' A 2022 study in the Journal of Financial Planning found that DCA investors were 34% less likely to panic-sell during downturns. If DCA keeps you invested when lump-sum investors are fleeing to cash, DCA wins — not in theory, but in your actual account balance.",
    },
    {
      heading: "The Behavioral Advantage Is the Real Advantage",
      body: "Market timing is emotionally exhausting. You check prices constantly. You second-guess every dip. You feel regret when you buy 'too early' or 'too late.' DCA eliminates all of this. You set up automatic contributions and forget about them. Your $500 goes in on the 1st of every month whether the market is up 3% or down 5%. This psychological benefit — what behavioral economists call reducing regret aversion — is the hidden superpower of DCA. The best investment strategy isn't the one with the highest theoretical return; it's the one you can follow consistently for 30 years without losing sleep.",
    },
    {
      heading: "How to Model DCA Returns with Our Calculator",
      body: "Our compound interest calculator lets you model DCA scenarios in seconds. Set 'Monthly Contribution' to your DCA amount (e.g., $500). Set the interest rate to the expected annual return of your chosen investment (e.g., 7% for a diversified stock portfolio). Set the investment period to your time horizon (e.g., 30 years). The calculator shows you exactly how regular $500 contributions compound into wealth — and the comparison mode lets you see what happens if you increase contributions over time or compare different return assumptions. Try it: $500/month at 7% for 30 years becomes approximately $610,000, even though you only contributed $180,000. The remaining $430,000 is compound growth — growth that happens whether you were timing the market or just showing up every month.",
    },
    {
      heading: "DCA Through Market Crashes: A Real-World Example",
      body: "Consider someone who started investing $500/month in January 2007, right before the Global Financial Crisis. By March 2009, the S&P 500 had fallen 57%. A lump sum investor who put in $60,000 in January 2007 would have seen their portfolio drop to roughly $25,800 at the trough. But a DCA investor who steadily put in $500/month from January 2007 through December 2013 would have bought shares at every point in the crash — including March 2009, when stocks were at their cheapest in a generation. By the end of 2013, both investors would have been solidly in the green, but only the DCA investor would have stayed invested without panic. The lump sum investor? Many sold at the bottom and never re-entered.",
    },
    {
      heading: "Key Takeaways",
      body: "Dollar-cost averaging isn't about maximizing theoretical returns — it's about making investing sustainable. It protects you from the single biggest risk in personal finance: yourself. The investor who contributes $500/month for 30 years without touching it will almost certainly outperform the investor who tries to time every market dip and rally. Consistency beats cleverness. Discipline beats prediction. And the math — with time as your ally — does the rest.",
    },
  ],
  relatedArticles: [
    { slug: "500-per-month-30-years", titleEn: "Investing $500/Month for 30 Years: The Full Picture", titleZh: "每月定投 $500 × 30 年：全景分析" },
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
    { slug: "beginner-guide-retirement", titleEn: "A Beginner's Guide to Retirement Planning", titleZh: "退休规划入门指南" },
  ],
}

const zhContent: BlogContent = {
  title: "定投策略：打败市场择时的简单方法",
  date: "2026-07-31",
  author: "WW0099",
  readingTime: "阅读 8 分钟",
  intro:
    "你应该把 $10,000 的奖金一次性投入，还是分散到 12 个月？这个困境——一次性投入 vs 定投（DCA）——是个人理财中争论最多的问题之一。好消息是：数学上最优的策略也是心理上最容易的策略。以下是为什么持续、自动化的投资胜过试图找到完美买入时机。",
  description:
    "了解定投（DCA）如何运作、为什么持续投资胜过择时交易，以及如何使用我们的复利计算器来模拟定投收益。",
  sections: [
    {
      heading: "什么是定投？",
      body: "定投意味着在固定时间间隔投入固定金额，无论市场在做什么。每月向标普 500 指数基金投入 $500。当价格高时，你的 $500 买到较少的份额。当价格低时，你的 $500 买到更多的份额。长期来看，这会平滑平均购买价格——你在「打折」时自动买入更多，在昂贵时买入更少。不需要电子表格，不需要市场预测，不需要为「今天是不是对的日子」而焦虑。纪律为你代劳。",
    },
    {
      heading: "数学原理：为什么定投能降低平均成本",
      body: "想象一只波动剧烈的股票：第 1 个月价格 = $100（用 $500 买 5 股），第 2 个月价格 = $80（买 6.25 股），第 3 个月价格 = $120（买 4.17 股）。总投入：$1,500。总股份：15.42 股。每股平均成本：$97.30。但简单的算术平均价格是 ($100+$80+$120)÷3=$100。你的实际平均成本更低——$97.30——因为你在 $80 时自动买入了比 $120 时更多的股份。这种折扣，正式名称为调和平均效应，是定投的数学优势。这不是魔法，而是当价格波动时算术在为你工作。",
    },
    {
      heading: "一次性投入 vs 定投：研究怎么说",
      body: "Vanguard 发表了一项被广泛引用的研究，比较了滚动 10 年期间一次性投入和定投的表现。发现：一次性投入在约三分之二的情况下优于定投，原因很简单，市场上涨的时间多于下跌的时间。但这忽略了重点。真正的问题不是「平均而言哪个表现更好？」——而是「你真正能坚持哪个？」2022 年《财务规划杂志》的一项研究发现，定投投资者在市场下跌时恐慌抛售的可能性低 34%。如果定投能让你在市场崩盘时保持投资而一次性投入者逃向现金，定投就赢了——不是在理论上，而是在你的实际账户余额中。",
    },
    {
      heading: "行为优势才是真正的优势",
      body: "择时交易让人情绪疲惫。你不断查看价格，每次下跌都怀疑自己，买入「太早」或「太晚」都感到后悔。定投消除了这一切。你设置自动扣款然后忘记它。每月的 $500 在 1 号投入，无论市场是涨 3% 还是跌 5%。这种心理好处——行为经济学家称之为减少后悔厌恶——是定投隐藏的超能力。最好的投资策略不是理论回报最高的那个，而是你能持续执行 30 年而不失眠的那个。",
    },
    {
      heading: "如何用我们的计算器模拟定投收益",
      body: "我们的复利计算器可以在几秒内模拟定投情景。将「每月投入」设置为你每月定投的金额（如 $500）。将利率设置为你所选投资品种的预期年化收益率（如多元化股票组合的 7%）。将投资期限设置为你的时间跨度（如 30 年）。计算器会精确显示每月 $500 的持续投入如何复利增长为财富——对比模式还能让你看到逐步增加投入会发生什么，或比较不同的收益率假设。试试看：每月 $500，年化 7%，30 年后约为 $610,000，即使你只投入了 $180,000 本金。剩下的 $430,000 是复利增长——无论你是在择时交易还是只是每月准时出现，这些增长都会发生。",
    },
    {
      heading: "穿越市场崩盘的定投：一个真实案例",
      body: "想象有人在 2007 年 1 月，全球金融危机前夕，开始每月投入 $500。到 2009 年 3 月，标普 500 指数下跌了 57%。一个在 2007 年 1 月一次性投入 $60,000 的投资者，会看到他们的投资组合在谷底缩水到约 $25,800。但一个从 2007 年 1 月到 2013 年 12 月持续每月投入 $500 的定投投资者，会在崩盘的每个阶段买入——包括 2009 年 3 月，当时股票是整整一代人中最便宜的。到 2013 年底，两位投资者都会稳稳盈利，但只有定投投资者能全程不恐慌地保持投资。那位一次性投入的投资者呢？很多人在底部卖出了，再也没有回来。",
    },
    {
      heading: "核心要点",
      body: "定投不是为了最大化理论回报——而是让投资变得可持续。它保护你免受个人理财中最大的单一风险：你自己。每月投入 $500 持续 30 年不动摇的投资者，几乎肯定会超越试图判断每次市场底部和顶部的投资者。持续性胜过聪明。纪律胜过预测。而数学——以时间为盟友——会完成其余的工作。",
    },
  ],
  relatedArticles: [
    { slug: "500-per-month-30-years", titleEn: "Investing $500/Month for 30 Years: The Full Picture", titleZh: "每月定投 $500 × 30 年：全景分析" },
    { slug: "compound-vs-simple-interest", titleEn: "Compound Interest vs Simple Interest: A 10-Year Comparison", titleZh: "复利 vs 单利：十年大对比" },
    { slug: "beginner-guide-retirement", titleEn: "A Beginner's Guide to Retirement Planning", titleZh: "退休规划入门指南" },
  ],
}

export default function Page() {
  return <BlogLayout slug="dollar-cost-averaging" en={enContent} zh={zhContent} />
}
