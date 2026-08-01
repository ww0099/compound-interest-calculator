"use client"

import Link from "next/link"
import { ArrowLeft, Scale } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface LegalSection {
  heading: string
  body: string | string[]
}

export interface LegalContent {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
}

interface LegalLayoutProps {
  content: LegalContent
}

export function LegalLayout({ content }: LegalLayoutProps) {
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
              Back to Calculator
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Title */}
            <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
                  {content.title}
                </h1>
                <p className="mt-1 text-xs text-muted-foreground">
                  Last updated: {content.lastUpdated}
                </p>
              </div>
            </div>

            {/* Intro */}
            {content.intro && (
              <p className="mb-6 leading-relaxed text-muted-foreground">{content.intro}</p>
            )}

            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="mb-3 text-lg font-semibold text-primary">
                    {i + 1}. {section.heading}
                  </h2>
                  {typeof section.body === "string" ? (
                    <p className="leading-relaxed text-foreground/85">{section.body}</p>
                  ) : (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {section.body.map((item, j) => (
                        <li key={j} className="leading-relaxed text-foreground/85">
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

        {/* Legal nav footer */}
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/methodology" className="transition-colors hover:text-foreground">
            Methodology
          </Link>
          <Link href="/references" className="transition-colors hover:text-foreground">
            References
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            Disclaimer
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </main>
    </div>
  )
}
