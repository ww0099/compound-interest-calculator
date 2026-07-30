"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Target, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

export function AboutPage() {
  const [lang, setLang] = useState<Lang>("en")

  const t = {
    title: lang === "en" ? "About Us" : "关于我们",
    back: lang === "en" ? "Back to Calculator" : "返回计算器",
    authorHeading: lang === "en" ? "The Author" : "作者",
    authorName: "WW0099",
    authorBio:
      lang === "en"
        ? "WW0099 is the creator and maintainer of this compound interest calculator. With a background in software engineering and a deep interest in personal finance, they built this tool to bridge the gap between complex financial mathematics and everyday decision-making."
        : "WW0099 是本复利计算器的创建者和维护者。拥有软件工程背景并对个人理财有浓厚兴趣，ta 构建了这个工具来弥合复杂金融数学与日常决策之间的鸿沟。",
    authorNote:
      lang === "en"
        ? "The author has studied financial mathematics independently and draws on standard references in investment theory. While not a certified financial advisor, the author is committed to implementing accurate, well-documented calculations based on established formulas."
        : "作者独立学习了金融数学，并参考投资理论的标准文献。虽然不是持证财务顾问，但作者致力于基于成熟公式实现准确、有据可查的计算。",
    missionHeading: lang === "en" ? "Our Mission" : "我们的使命",
    missionBody:
      lang === "en"
        ? "We believe that understanding compound interest is one of the most powerful financial skills anyone can develop. Our mission is to provide a free, accurate, and easy-to-use calculator that helps people worldwide visualize how their money can grow over time — whether they are planning for retirement, saving for a goal, or simply curious about the mathematics of compounding."
        : "我们相信，理解复利是任何人都能掌握的最强大的财务技能之一。我们的使命是提供一个免费、准确、易用的计算器，帮助全世界的人们可视化他们的资金如何随时间增长——无论他们是在规划退休、为某个目标储蓄，还是仅仅对复利的数学原理感到好奇。",
    transparencyHeading:
      lang === "en" ? "Transparency & Methodology" : "透明度与方法论",
    transparencyBody:
      lang === "en"
        ? "All calculations on this site use standard financial mathematics formulas. We do not use proprietary algorithms, black-box models, or AI-generated financial predictions. Every formula we use is publicly documented on our Methodology page. The source code for this entire website is open-source and available on GitHub."
        : "本网站的所有计算均使用标准金融数学公式。我们不使用专有算法、黑箱模型或 AI 生成的财务预测。我们使用的每个公式都在方法论页面公开记录。整个网站的源代码开源并可在 GitHub 上获取。",
    disclaimerHeading:
      lang === "en" ? "Important Note" : "重要提示",
    disclaimerBody:
      lang === "en"
        ? "This calculator is a mathematical tool, NOT a financial advisor. It does not provide personalized investment recommendations, tax advice, or retirement planning guidance. Please consult a qualified professional before making financial decisions. See our full Disclaimer for details."
        : "本计算器是一个数学工具，而非财务顾问。它不提供个性化的投资建议、税务建议或退休规划指导。在做出财务决策之前，请咨询合格的专业人士。详情请参阅我们的完整免责声明。",
    learnMore: lang === "en" ? "Learn more about our methods" : "了解更多关于我们的方法",
    viewSource: lang === "en" ? "View source code on GitHub" : "在 GitHub 上查看源代码",
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

          {/* Language toggle */}
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
            <div className="mb-8 border-b border-border pb-6">
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
            </div>

            <div className="space-y-10">
              {/* Author */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <User className="h-5 w-5" />
                  {t.authorHeading}
                </h2>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Avatar placeholder */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-foreground">
                      {t.authorName}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {t.authorBio}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {t.authorNote}
                    </p>
                  </div>
                </div>
              </section>

              {/* Mission */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Target className="h-5 w-5" />
                  {t.missionHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.missionBody}
                </p>
              </section>

              {/* Transparency */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Shield className="h-5 w-5" />
                  {t.transparencyHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.transparencyBody}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Link
                    href="/methodology"
                    className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    {t.learnMore} →
                  </Link>
                  <a
                    href="https://github.com/WW0099/compound-interest-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    {t.viewSource} →
                  </a>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
                <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                  ⚠️ {t.disclaimerBody}
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/methodology" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Methodology" : "方法论"}
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
