"use client"

import Link from "next/link"
import { User, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutWidget() {
  const t = {
    aboutAuthor: "About the Author",
    authorName: "WW0099",
    authorBio:
      "Creator of the Compound Interest Calculator. Software engineer passionate about making financial mathematics accessible to everyone.",
    viewAll: "View all articles",
    fullAbout: "Learn more about our mission",
    disclaimer:
      "This article is for educational purposes only and does not constitute financial advice.",
  }

  return (
    <Card className="border-primary/10">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">
        {/* Avatar placeholder */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-7 w-7" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-primary">{t.aboutAuthor}</h3>
          <p className="mt-0.5 text-lg font-bold text-foreground">{t.authorName}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.authorBio}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent/80"
            >
              {t.viewAll} →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent/80"
            >
              {t.fullAbout}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <p className="mt-3 border-t border-border pt-3 text-xs italic text-muted-foreground">
            {t.disclaimer}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
