"use client"

import Link from "next/link"
import {
  ArrowLeft,
  User,
  Target,
  Shield,
  Lock,
  Globe,
  Code,
  BookOpen,
  BadgeCheck,
  GraduationCap,
  GitBranch,
  FileText,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutPage() {

  const t = {
    title: "About Us",
    back: "Back to Calculator",

    // Why Trust — 信任锚点（放最前面，YMYL 关键）
    trustHeading: "Why Trust This Calculator?",
    trustIntro:
      "In a world of black-box algorithms and AI-generated financial advice, transparency matters. Here is exactly how our tool earns your trust:",
    trustItems: [
      {
        icon: "Code",
        title: "100% Open Source",
        body:
          "Every line of code is publicly auditable on GitHub. You can inspect, verify, and even run the calculations yourself. No hidden logic, no proprietary algorithms.",
      },
      {
        icon: "BookOpen",
        title: "Formulas You Can Verify",
        body:
          "All calculations use standard financial mathematics from authoritative textbooks and institutions. Every formula is documented with its derivation on our Methodology page.",
      },
      {
        icon: "Lock",
        title: "Complete Data Privacy",
        body:
          "All calculations run locally in your browser. Nothing is uploaded to a server. We do not collect, store, or share any of your financial data. Ever.",
      },
      {
        icon: "Globe",
        title: "Used Worldwide",
        body:
          "This tool serves thousands of users worldwide in English and Chinese — from students learning math to investors planning retirement. Built for accessibility, not profit.",
      },
    ],

    // Data Privacy
    privacyHeading: "Your Data Stays Yours",
    privacyBody:
      "Unlike many financial websites, we operate on a zero-data model: no user accounts, no cookies beyond essential functionality, no analytics trackers, no server-side storage. When you enter numbers into our calculators, the computation happens entirely in your browser using JavaScript. Nothing is transmitted over the network. Close the tab, and your data is gone — because it was never ours to keep.",

    // Who Uses
    whoHeading: "Who Uses This Tool?",
    whoBody:
      "Our users range from high school students discovering the power of compound interest for the first time, to experienced investors stress-testing retirement scenarios. Financial educators use it as a classroom demonstration. Freelancers use it to plan irregular income savings. Immigrants use it to compare investment returns across currencies. If you have money and a future, this calculator is for you.",

    // Stats — 社会证明
    statsHeading: "By the Numbers",
    stats: [
      { value: "4", label: "Free Calculators" },
      { value: "10", label: "Articles" },
      { value: "0", label: "Data Collected" },
      { value: "100%", label: "Open Source" },
    ],

    // Author
    authorHeading: "The Author",
    authorName: "WW0099",
    authorBio:
      "WW0099 is a software engineer and self-taught personal finance enthusiast. With years of experience building production systems and a passion for financial literacy, they created this calculator to make the mathematics of wealth-building accessible to everyone — not just Wall Street professionals.",
    authorCredentials: [
      {
        icon: "BadgeCheck",
        title: "Software Engineer",
        body:
          "Years of experience building production-grade systems across multiple industries.",
      },
      {
        icon: "GraduationCap",
        title: "Self-Taught Financial Mathematics",
        body:
          "Independently studied through Investopedia, the SEC, the Federal Reserve, and standard financial textbooks.",
      },
      {
        icon: "GitBranch",
        title: "Open-Source Contributor",
        body:
          "Every line of this calculator's code is publicly auditable on GitHub.",
      },
      {
        icon: "BookOpen",
        title: "Peer-Reviewed Formulas",
        body:
          "The calculation engine relies on established financial equations — not AI-generated heuristics.",
      },
    ],

    // Mission
    missionHeading: "Our Mission",
    missionBody:
      "Financial literacy is a superpower. We believe everyone — regardless of income, education, or nationality — deserves free access to accurate financial tools. Our mission is to demystify compound interest and empower people to make informed decisions about their financial future.",

    // Transparency
    transparencyHeading:
      "Open Methodology",
    transparencyBody:
      "All calculations on this site use standard financial mathematics formulas. We do not use proprietary algorithms, black-box models, or AI-generated financial predictions. Every formula we use is publicly documented on our Methodology page, with references to the original textbooks and institutions that established them.",

    // FAQ — 信任相关常见问题
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        q: "Is this calculator really free?",
        a:
          "Yes — completely free, forever. It is open source under an MIT license, so you can even download and run it yourself. There are no subscriptions, paywalls, or hidden fees.",
      },
      {
        q: "Do you collect my financial data?",
        a:
          "No. We operate a zero-data model: no accounts, no analytics trackers, no server-side storage. Every calculation runs locally in your browser. Nothing is transmitted over the network.",
      },
      {
        q: "How do I know the formulas are accurate?",
        a:
          "All formulas come from standard financial mathematics, publicly documented with their derivations on our Methodology page and cross-referenced on our References page. The source code is open on GitHub, so the calculations are fully auditable.",
      },
      {
        q: "Is this tool a financial advisor?",
        a:
          "No. This is an educational calculator. It does not provide personalized investment recommendations, tax advice, or retirement guidance. Please consult a qualified professional before making financial decisions.",
      },
    ],

    // Disclaimer — 移到最末尾
    disclaimerHeading:
      "Important Note",
    disclaimerBody:
      "This calculator is an educational tool, not a financial advisor. While the mathematics is accurate, individual financial situations vary widely. It does not provide personalized investment recommendations, tax advice, or retirement planning guidance. Please consult a qualified professional before making financial decisions. See our full Disclaimer for details.",

    learnMore: "Learn more about our methods",
    viewSource: "View source code on GitHub",
    methodologyRef: "View references",
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

              {/* Stats — 社会证明 */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <FileText className="h-5 w-5" />
                  {t.statsHeading}
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {t.stats.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-secondary/20 p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-primary">{s.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
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
                    <ul className="mt-4 space-y-3">
                      {t.authorCredentials.map((c, i) => {
                        const CredIcon =
                          c.icon === "BadgeCheck"
                            ? BadgeCheck
                            : c.icon === "GraduationCap"
                              ? GraduationCap
                              : c.icon === "GitBranch"
                                ? GitBranch
                                : BookOpen
                        return (
                          <li key={i} className="flex items-start gap-3">
                            <CredIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <div>
                              <div className="text-sm font-semibold text-foreground">{c.title}</div>
                              <div className="text-sm leading-relaxed text-muted-foreground">
                                {c.body}
                              </div>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
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

              {/* FAQ */}
              <section>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                  <HelpCircle className="h-5 w-5" />
                  {t.faqHeading}
                </h2>
                <div className="space-y-3">
                  {t.faqs.map((f, i) => (
                    <div key={i} className="rounded-lg border border-border bg-secondary/20 p-4">
                      <h3 className="text-sm font-semibold text-foreground">{f.q}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
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
            {"Methodology"}
          </Link>
          <Link href="/references" className="transition-colors hover:text-foreground">
            {"References"}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {"Privacy Policy"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {"Disclaimer"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
