import type { Metadata } from "next"
import { BlogLayout, type BlogContent } from "@/components/blog-layout"

export const metadata: Metadata = {
  title: "CAGR vs Average Return: Why the Difference Can Mislead You",
  description:
    "An investment gaining 50% then losing 50% is not flat — it's down 25%. Learn why CAGR (geometric mean) is the honest measure of investment performance.",
  alternates: { canonical: "https://top.net.im/blog/cagr-vs-average-return" },
  robots: { index: true, follow: true },
}

const enContent: BlogContent = {
  title: "CAGR vs Average Return: Why the Difference Can Mislead You",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "9 min read",
  intro:
    "An investment gains 50% in year one, then loses 50% in year two. What's your average return? Many would say 0%. The reality: you've lost 25% of your money. This is the trap of arithmetic averages versus geometric returns — and why CAGR (Compound Annual Growth Rate) is the only honest way to measure investment performance. Understanding this distinction will make you a savvier investor and protect you from misleading performance claims.",
  sections: [
    {
      heading: "The 50/50 Trap: A Revealing Example",
      body: "Start with $1,000. Year 1: +50% → $1,500. Year 2: -50% → $750. The arithmetic average return is (+50% + -50%) / 2 = 0%. And yet you've lost $250, or 25%. This happens because a 50% loss requires a 100% gain to recover. Down 50% from $1,500 to $750 means you need to gain 100% from $750 just to get back to $1,500. This asymmetry is why arithmetic averages overstate returns whenever there's volatility — and there's always volatility.",
    },
    {
      heading: "CAGR: The Honest Number",
      body: "CAGR answers: what constant annual rate would produce the same final value? For the 50/50 example: $1,000 × (1 + CAGR)^2 = $750 → CAGR = (750/1000)^(1/2) - 1 = -13.4%. The CAGR says you lost 13.4% per year, which accurately reflects the $250 loss. The arithmetic average says 0%, which is dangerously misleading. CAGR is always less than or equal to the arithmetic average. The gap between them widens as volatility increases — making volatile investments look better than they really are when judged by average returns alone.",
    },
    {
      heading: "Real-World Example: 5 Years of S&P 500",
      body: "Consider these hypothetical annual S&P 500 returns: Year 1: +28%, Year 2: -12%, Year 3: +24%, Year 4: -8%, Year 5: +18%. The arithmetic average is (28-12+24-8+18)/5 = 10.0% — looks solid. Now calculate the actual growth: $1,000 → $1,280 → $1,126 → $1,397 → $1,285 → $1,516. The CAGR: (1516/1000)^(1/5) - 1 = 8.7%. The gap is 1.3 percentage points per year. Over 30 years, $100,000 at 10.0% grows to $1,744,940. At 8.7% (actual CAGR), it grows to $1,220,022. The 'average return' overstates final wealth by $524,918 — a 43% exaggeration.",
    },
    {
      heading: "Why Mutual Funds Report Average Returns",
      body: "Mutual funds are required to report standardized returns (1-year, 5-year, 10-year CAGR), but marketing materials often highlight 'average annual return' which is the arithmetic mean. When you see a fund advertise 'Average annual return: 12% over 5 years,' look for the CAGR number in the fine print. If the fund experienced significant volatility, the CAGR could be substantially lower. This is especially true for sector funds, emerging market funds, and any concentrated portfolio.",
    },
    {
      heading: "How to Protect Yourself",
      body: [
        "Always ask for CAGR: When evaluating any investment performance, calculate or request the CAGR, not the arithmetic average.",
        "Check the volatility: The gap between average and CAGR is proportional to variance. Higher volatility = bigger gap = more misleading the average becomes.",
        "Use the calculator: On top.net.im, enter your actual year-by-year returns in a spreadsheet, compute the final value, then use the Rate solver to find the CAGR.",
        "Be skeptical of round numbers: If a fund claims exactly '10% average annual returns,' the real CAGR is almost certainly lower — possibly much lower if the fund is volatile.",
        "Remember the sequence: Returns compound multiplicatively, not additively. (1+r1)(1+r2)...(1+rn) ≠ 1 + (r1+r2+...+rn).",
      ],
    },
    {
      heading: "The Variance Drain Formula",
      body: "There's a useful approximation: CAGR ≈ Arithmetic Average - (Variance / 2). For the S&P example above, the variance of returns is about 0.026, so CAGR ≈ 10.0% - (0.026/2) = 10.0% - 1.3% = 8.7%. This 'variance drain' of 1.3 percentage points per year is the cost of volatility. The formula explains why low-volatility strategies often have competitive long-term returns: they may have lower average returns but also lower variance drain, resulting in similar CAGRs with less stomach-churning rides.",
    },
    {
      heading: "Bottom Line",
      body: "CAGR is the truth-teller of investment performance. The arithmetic average is a marketing number. When someone tells you about 'average returns,' mentally convert it: subtract roughly half the variance to get a realistic CAGR. Better yet, always compute the CAGR yourself from beginning and ending values. Your retirement depends on geometric reality, not arithmetic fantasy.",
    },
  ],
}

const zhContent: BlogContent = {
  title: "CAGR vs 平均收益率：为什么差异会误导你",
  date: "2026-07-30",
  author: "WW0099",
  readingTime: "阅读 9 分钟",
  intro:
    "一项投资第一年涨了 50%，第二年跌了 50%。你的平均回报是多少？很多人会说 0%。现实是：你亏了 25%。这就是算术平均与几何回报的陷阱——以及为什么 CAGR（复合年增长率）才是衡量投资表现的唯一诚实方式。理解这个区别会让你成为更精明的投资者，保护你免受误导性业绩宣传的影响。",
  sections: [
    {
      heading: "50/50 陷阱：一个揭示性例子",
      body: "从 $1,000 开始。第 1 年：+50% → $1,500。第 2 年：-50% → $750。算术平均回报是 (+50% + -50%) / 2 = 0%。但你亏了 $250，即 25%。这是因为 50% 的亏损需要 100% 的盈利才能回本。从 $1,500 跌 50% 到 $750，意味着你需要从 $750 涨 100% 才能回到 $1,500。这种不对称性解释了为什么只要有波动性——而波动性永远存在——算术平均就会高估回报。",
    },
    {
      heading: "CAGR：诚实的数字",
      body: "CAGR 回答的问题是：什么固定的年化利率会产生相同的最终价值？对于 50/50 的例子：$1,000 × (1+CAGR)^2 = $750 → CAGR = (750/1000)^(1/2) - 1 = -13.4%。CAGR 显示你每年亏损 13.4%，准确反映了 $250 的亏损。算术平均显示 0%，这是危险的误导。CAGR 总是小于或等于算术平均。两者之间的差距随波动性增加而扩大——使得波动性大的投资仅凭平均回报来判断时看起来比实际更好。",
    },
    {
      heading: "真实案例：5 年标普 500",
      body: "考虑以下假设的标普 500 年回报：第 1 年：+28%，第 2 年：-12%，第 3 年：+24%，第 4 年：-8%，第 5 年：+18%。算术平均是 (28-12+24-8+18)/5 = 10.0%——看起来很稳健。现在计算实际增长：$1,000 → $1,280 → $1,126 → $1,397 → $1,285 → $1,516。CAGR：(1516/1000)^(1/5) - 1 = 8.7%。差距是每年 1.3 个百分点。30 年下来，$100,000 按 10.0% 增长到 $1,744,940。按 8.7%（实际 CAGR）只增长到 $1,220,022。「平均回报」将最终财富夸大了 $524,918——43% 的夸大。",
    },
    {
      heading: "为什么共同基金喜欢报告平均回报",
      body: "共同基金被要求报告标准化回报（1 年、5 年、10 年 CAGR），但营销材料通常突出显示「平均年回报」，这是算术平均值。当你看到一只基金宣传「5 年平均年回报：12%」时，请在细则中寻找 CAGR 数字。如果该基金经历了显著的波动，CAGR 可能低得多。这对行业基金、新兴市场基金和任何集中投资组合尤其如此。",
    },
    {
      heading: "如何保护自己",
      body: [
        "永远要求 CAGR：评估任何投资表现时，计算或索取 CAGR，而非算术平均。",
        "检查波动性：平均与 CAGR 之间的差距与方差成正比。波动性越高 = 差距越大 = 平均值越具有误导性。",
        "使用计算器：在 top.net.im，将你逐年的实际回报输入电子表格，计算最终价值，然后用利率求解器找出 CAGR。",
        "对整数保持怀疑：如果一只基金声称恰好「平均年回报 10%」，真实的 CAGR 几乎肯定更低——如果基金波动性大，可能低得多。",
        "记住顺序：回报是乘法复利，而非加法。(1+r1)(1+r2)...(1+rn) ≠ 1+(r1+r2+...+rn)。",
      ],
    },
    {
      heading: "方差损耗公式",
      body: "有一个有用的近似公式：CAGR ≈ 算术平均 - (方差 / 2)。对于上述标普 500 的例子，回报的方差约为 0.026，所以 CAGR ≈ 10.0% - (0.026/2) = 10.0% - 1.3% = 8.7%。这每年 1.3 个百分点的「方差损耗」就是波动性的代价。这个公式解释了为什么低波动性策略往往具有有竞争力的长期回报：它们的平均回报可能较低，但方差损耗也更小，从而产生相似的 CAGR，而且过程没那么惊心动魄。",
    },
    {
      heading: "总结",
      body: "CAGR 是投资表现的真相揭露者。算术平均是营销数字。当有人告诉你「平均回报」时，在脑中换算：减去大约一半的方差，得到现实的 CAGR。更好的是，始终自己从起始和结束价值计算 CAGR。你的退休金取决于几何现实，而不是算术幻想。",
    },
  ],
}

export default function Page() {
  return <BlogLayout en={enContent} zh={zhContent} />
}
