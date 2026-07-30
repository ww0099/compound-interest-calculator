"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"

interface ArticleMeta {
  slug: string
  enTitle: string
  zhTitle: string
  enDesc: string
  zhDesc: string
  date: string
  readingTimeEn: string
  readingTimeZh: string
}

export function BlogIndex({ articles }: { articles: ArticleMeta[] }) {
  const [lang, setLang] = useState<Lang>("en")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "en" ? "Back to Calculator" : "返回计算器"}
            </Link>
          </div>
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

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {lang === "en" ? "Financial Education" : "理财知识库"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {lang === "en"
                  ? "Data-backed articles to help you make smarter financial decisions."
                  : "数据驱动的文章，帮你做出更聪明的财务决策。"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col p-5">
                  <h2 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent sm:text-lg">
                    {lang === "en" ? a.enTitle : a.zhTitle}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {lang === "en" ? a.enDesc : a.zhDesc}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lang === "en" ? a.readingTimeEn : a.readingTimeZh}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
