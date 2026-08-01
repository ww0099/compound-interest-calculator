"use client"

import Link from "next/link"
import { ArrowLeft, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ArticleMeta {
  slug: string
  title: string
  desc: string
  date: string
  readingTime: string
}

export function BlogIndex({ articles }: { articles: ArticleMeta[] }) {
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
              Back to Calculator
            </Link>
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
                Financial Education
              </h1>
              <p className="text-sm text-muted-foreground">
                Data-backed articles to help you make smarter financial decisions.
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
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {a.readingTime}
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
