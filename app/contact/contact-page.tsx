"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, ExternalLink, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

export function ContactPage() {
  const [lang, setLang] = useState<Lang>("en")

  const t = {
    title: lang === "en" ? "Contact Us" : "联系我们",
    subtitle:
      lang === "en"
        ? "We'd love to hear from you. Reach out with questions, feedback, or privacy requests."
        : "我们期待听到你的声音。如有疑问、反馈或隐私请求，请随时联系我们。",
    email: lang === "en" ? "Email" : "电子邮件",
    emailDesc:
      lang === "en"
        ? "Send us an email and we'll get back to you within 48 hours."
        : "给我们发送电子邮件，我们将在 48 小时内回复。",
    github: lang === "en" ? "GitHub" : "GitHub",
    githubDesc:
      lang === "en"
        ? "View the source code, report issues, or contribute to the project."
        : "查看源代码、报告问题或为项目做贡献。",
    response: lang === "en" ? "Response Time" : "响应时间",
    responseDesc:
      lang === "en"
        ? "We typically respond within 48 hours on business days."
        : "我们通常在工作日 48 小时内回复。",
    backToCalc: lang === "en" ? "Back to Calculator" : "返回计算器",
    legalNav: lang === "en" ? "Legal" : "法律页面",
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
              {t.backToCalc}
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
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8 border-b border-border pb-6">
              <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>
            </div>

            {/* Contact methods */}
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:pw3436858@gmail.com"
                className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{t.email}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.emailDesc}</p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    pw3436858@gmail.com
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/WW0099/compound-interest-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{t.github}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.githubDesc}</p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    github.com/WW0099/compound-interest-calculator
                  </p>
                </div>
              </a>

              {/* Response time */}
              <div className="flex items-start gap-4 rounded-lg border border-border p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{t.response}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t.responseDesc}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal nav footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Privacy Policy" : "隐私政策"}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Terms of Service" : "服务条款"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Disclaimer" : "免责声明"}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            {lang === "en" ? "Contact" : "联系我们"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
