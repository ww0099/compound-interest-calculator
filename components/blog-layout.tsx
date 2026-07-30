"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n"
import { AboutWidget } from "@/components/about-widget"

export interface BlogSection {
  heading: string
  body: string | string[]
}

export interface BlogContent {
  title: string
  date: string
  author: string
  readingTime: string
  intro: string
  sections: BlogSection[]
}

interface BlogLayoutProps {
  en: BlogContent
  zh: BlogContent
}

export function BlogLayout({ en, zh }: BlogLayoutProps) {
  const [lang, setLang] = useState<Lang>("en")
  const content = lang === "en" ? en : zh

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "en" ? "All Articles" : "所有文章"}
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

      {/* Article */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Meta */}
            <div className="mb-8 border-b border-border pb-6">
              <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                {content.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {content.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {content.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {content.readingTime}
                </span>
              </div>
            </div>

            {/* Intro */}
            <p className="mb-8 text-lg leading-relaxed text-foreground/80">
              {content.intro}
            </p>

            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="mb-3 text-lg font-semibold text-primary">
                    {section.heading}
                  </h2>
                  {typeof section.body === "string" ? (
                    <p className="leading-relaxed text-foreground/80">{section.body}</p>
                  ) : (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {section.body.map((item, j) => (
                        <li key={j} className="leading-relaxed text-foreground/80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {lang === "en" ? "Back to all articles" : "返回所有文章"}
          </Link>
        </div>

        {/* About widget */}
        <div className="mt-8">
          <AboutWidget lang={lang} />
        </div>
      </main>
    </div>
  )
}
