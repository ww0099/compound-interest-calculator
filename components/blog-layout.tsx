"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AboutWidget } from "@/components/about-widget"

export interface BlogSection {
  heading: string
  body: string | string[]
  table?: {
    caption?: string
    headers: string[]
    rows: string[][]
  }
}

export interface RelatedArticle {
  slug: string
  title: string
}

export interface BlogContent {
  title: string
  date: string
  author: string
  readingTime: string
  intro: string
  description: string
  sections: BlogSection[]
  relatedArticles?: RelatedArticle[]
}

interface BlogLayoutProps {
  slug: string
  content: BlogContent
}

function buildArticleJsonLd(
  slug: string,
  title: string,
  description: string,
  date: string,
  author: string,
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
      url: "https://top.net.im/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Compound Interest Calculator",
      logo: {
        "@type": "ImageObject",
        url: "https://top.net.im/og-image.png",
      },
    },
    image: "https://top.net.im/og-image.png",
    url: `https://top.net.im/blog/${slug}`,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://top.net.im/blog/${slug}`,
    },
  })
}

function buildBreadcrumbJsonLd(
  slug: string,
  title: string,
) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://top.net.im/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://top.net.im/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://top.net.im/blog/${slug}`,
      },
    ],
  })
}

export function BlogLayout({ slug, content }: BlogLayoutProps) {
  const articleJsonLd = buildArticleJsonLd(
    slug,
    content.title,
    content.description,
    content.date,
    content.author,
  )
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(slug, content.title)

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All Articles
            </Link>
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
                  {section.table && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[420px] text-left text-sm">
                        {section.table.caption && (
                          <caption className="mb-2 text-left text-xs text-muted-foreground">
                            {section.table.caption}
                          </caption>
                        )}
                        <thead>
                          <tr className="border-b-2 border-border">
                            {section.table.headers.map((h, hi) => (
                              <th
                                key={hi}
                                scope="col"
                                className="px-3 py-2 font-semibold text-primary"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-border/50 last:border-0">
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={cn(
                                    "px-3 py-2 text-foreground/85",
                                    ci === 0 && "font-medium",
                                  )}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {content.relatedArticles && content.relatedArticles.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-5 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                <BookOpen className="h-5 w-5" />
                Related Articles
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.relatedArticles.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={`/blog/${ra.slug}`}
                    className="rounded-lg border border-border p-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/40"
                  >
                    {ra.title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to all articles
          </Link>
        </div>

        {/* About widget */}
        <div className="mt-8">
          <AboutWidget />
        </div>
      </main>
    </div>
  )
}
