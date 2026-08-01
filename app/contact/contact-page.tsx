"use client"

import Link from "next/link"
import { ArrowLeft, Mail, ExternalLink, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ContactPage() {

  const t = {
    title: "Contact Us",
    subtitle:
      "We'd love to hear from you. Reach out with questions, feedback, or privacy requests.",
    email: "Email",
    emailDesc:
      "Send us an email and we'll get back to you within 48 hours.",
    github: "GitHub",
    githubDesc:
      "View the source code, report issues, or contribute to the project.",
    response: "Response Time",
    responseDesc:
      "We typically respond within 48 hours on business days.",
    backToCalc: "Back to Calculator",
    legalNav: "Legal",
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
            {"Privacy Policy"}
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            {"Terms of Service"}
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">
            {"Disclaimer"}
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            {"Contact"}
          </Link>
        </nav>
      </main>
    </div>
  )
}
