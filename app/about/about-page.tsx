"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Target, Shield, Lock, Globe, Code, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

export function AboutPage() {
  const [lang, setLang] = useState<Lang>("en")

  const t = {
    title: lang === "en" ? "About Us" : "关于我们",
    back: lang === "en" ? "Back to Calculator" : "返回计算器",

    // Why Trust — 信任锚点（放最前面，YMYL 关键）
    trustHeading: lang === "en" ? "Why Trust This Calculator?" : "为什么可以信任这个计算器？",
    trustIntro:
      lang === "en"
        ? "In a world of black-box algorithms and AI-generated financial advice, transparency matters. Here is exactly how our tool earns your trust:"
        : "在黑箱算法和 AI 生成财务建议泛滥的时代，透明度至关重要。以下是我们的工具赢得您信任的具体方式：",
    trustItems: [
      {
        icon: "Code",
        title: lang === "en" ? "100% Open Source" : "100% 开源",
        body:
          lang === "en"
            ? "Every line of code is publicly auditable on GitHub. You can inspect, verify, and even run the calculations yourself. No hidden logic, no proprietary algorithms."
            : "每一行代码都在 GitHub 上公开可审计。您可以检查、验证，甚至自己运行计算。没有隐藏逻辑，没有专有算法。",
      },
      {
        icon: "BookOpen",
        title: lang === "en" ? "Formulas You Can Verify" : "可验证的公式",
        body:
          lang === "en"
            ? "All calculations use standard financial mathematics from authoritative textbooks and institutions. Every formula is documented with its derivation on our Methodology page."
            : "所有计算均使用来自权威教材和机构的标准金融数学。每个公式及其推导都在方法论页面有详细记录。",
      },
      {
        icon: "Lock",
        title: lang === "en" ? "Complete Data Privacy" : "完全数据隐私",
        body:
          lang === "en"
            ? "All calculations run locally in your browser. Nothing is uploaded to a server. We do not collect, store, or share any of your financial data. Ever."
            : "所有计算都在您的浏览器本地运行。没有任何数据上传到服务器。我们不收集、不存储、不分享您的任何财务数据。永不。",
      },
      {
        icon: "Globe",
        title: lang === "en" ? "Used Worldwide" : "全球用户使用",
        body:
          lang === "en"
            ? "This tool serves thousands of users worldwide in English and Chinese — from students learning math to investors planning retirement. Built for accessibility, not profit."
            : "本工具为全球数千名中英双语用户服务——从学习数学的学生到规划退休的投资者。为可访问性而生，不为盈利。",
      },
    ],

    // Data Privacy
    privacyHeading: lang === "en" ? "Your Data Stays Yours" : "您的数据始终属于您",
    privacyBody:
      lang === "en"
        ? "Unlike many financial websites, we operate on a zero-data model: no user accounts, no cookies beyond essential functionality, no analytics trackers, no server-side storage. When you enter numbers into our calculators, the computation happens entirely in your browser using JavaScript. Nothing is transmitted over the network. Close the tab, and your data is gone — because it was never ours to keep."
        : "与许多金融网站不同，我们采用零数据模式：无用户账户、无非必要的 Cookie、无分析追踪器、无服务器端存储。当您在计算器中输入数字时，计算完全在浏览器中使用 JavaScript 完成，没有任何数据通过网络传输。关闭标签页，您的数据就消失了——因为它从来不是我们的。",

    // Who Uses
    whoHeading: lang === "en" ? "Who Uses This Tool?" : "谁在使用这个工具？",
    whoBody:
      lang === "en"
        ? "Our users range from high school students discovering the power of compound interest for the first time, to experienced investors stress-testing retirement scenarios. Financial educators use it as a classroom demonstration. Freelancers use it to plan irregular income savings. Immigrants use it to compare investment returns across currencies. If you have money and a future, this calculator is for you."
        : "我们的用户涵盖从第一次发现复利力量的高中生，到对退休情景进行压力测试的经验丰富的投资者。金融教育者将其用作课堂演示工具。自由职业者用它来规划不规律收入的储蓄。跨国人士用它来比较不同货币的投资回报。只要您有钱和未来，这个计算器就是为您准备的。",

    // Author
    authorHeading: lang === "en" ? "The Author" : "作者",
    authorName: "WW0099",
    authorBio:
      lang === "en"
        ? "WW0099 is a software engineer and self-taught personal finance enthusiast. With years of experience building production systems and a passion for financial literacy, they created this calculator to make the mathematics of wealth-building accessible to everyone — not just Wall Street professionals."
        : "WW0099 是一名软件工程师和自学成才的个人理财爱好者。凭借多年构建生产系统的经验和对金融素养的热情，ta 创建了这个计算器，让财富积累的数学对每个人都触手可及——而不仅仅是华尔街的专业人士。",
    authorNote:
      lang === "en"
        ? "The author has independently studied financial mathematics through resources from Investopedia, the SEC, the Federal Reserve, and standard textbooks. The calculation engine is built on peer-reviewed formulas, not AI-generated heuristics."
        : "作者通过 Investopedia、SEC、美联储和标准教材独立学习了金融数学。计算引擎基于同行评审的公式构建，而非 AI 生成的启发式算法。",

    // Mission
    missionHeading: lang === "en" ? "Our Mission" : "我们的使命",
    missionBody:
      lang === "en"
        ? "Financial literacy is a superpower. We believe everyone — regardless of income, education, or nationality — deserves free access to accurate financial tools. Our mission is to demystify compound interest and empower people to make informed decisions about their financial future."
        : "金融素养是一种超能力。我们相信，每个人——无论收入、教育程度或国籍——都应当免费获得准确的金融工具。我们的使命是揭开复利的神秘面纱，赋予人们为自己的财务未来做出明智决策的能力。",

    // Transparency
    transparencyHeading:
      lang === "en" ? "Open Methodology" : "开放方法论",
    transparencyBody:
      lang === "en"
        ? "All calculations on this site use standard financial mathematics formulas. We do not use proprietary algorithms, black-box models, or AI-generated financial predictions. Every formula we use is publicly documented on our Methodology page, with references to the original textbooks and institutions that established them."
        : "本网站的所有计算均使用标准金融数学公式。我们不使用专有算法、黑箱模型或 AI 生成的财务预测。我们使用的每个公式都在方法论页面公开记录，并附有确立这些公式的原始教材和机构的参考文献。",

    // Disclaimer — 移到最末尾
    disclaimerHeading:
      lang === "en" ? "Important Note" : "重要提示",
    disclaimerBody:
      lang === "en"
        ? "This calculator is an educational tool, not a financial advisor. While the mathematics is accurate, individual financial situations vary widely. It does not provide personalized investment recommendations, tax advice, or retirement planning guidance. Please consult a qualified professional before making financial decisions. See our full Disclaimer for details."
        : "本计算器是一个教育工具，而非财务顾问。虽然数学计算是准确的，但个人财务状况千差万别。它不提供个性化的投资建议、税务建议或退休规划指导。在做出财务决策之前，请咨询合格的专业人士。详情请参阅我们的完整免责声明。",

    learnMore: lang === "en" ? "Learn more about our methods" : "了解更多关于我们的方法",
    viewSource: lang === "en" ? "View source code on GitHub" : "在 GitHub 上查看源代码",
    methodologyRef: lang === "en" ? "View references" : "查看参考文献",
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
              {/* Why Trust — 最前面，YMYL 核心信任信号 */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Shield className="h-5 w-5" />
                  {t.trustHeading}
                </h2>
                <p className="mb-5 leading-relaxed text-muted-foreground">
                  {t.trustIntro}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {t.trustItems.map((item, i) => {
                    const Icon = item.icon === "Code" ? Code : item.icon === "BookOpen" ? BookOpen : item.icon === "Lock" ? Lock : Globe
                    return (
                      <div key={i} className="rounded-lg border border-border bg-secondary/20 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon className="h-4 w-4 text-accent" />
                          <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-5 flex flex-wrap gap-4">
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
                  <Link
                    href="/references"
                    className="text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    {t.methodologyRef} →
                  </Link>
                </div>
              </section>

              {/* Data Privacy */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Lock className="h-5 w-5" />
                  {t.privacyHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.privacyBody}
                </p>
              </section>

              {/* Who Uses */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <Globe className="h-5 w-5" />
                  {t.whoHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.whoBody}
                </p>
              </section>

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
                  <BookOpen className="h-5 w-5" />
                  {t.transparencyHeading}
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {t.transparencyBody}
                </p>
              </section>

              {/* Disclaimer — 最末尾 */}
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
