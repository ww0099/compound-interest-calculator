"use client"

import Link from "next/link"
import { GraduationCap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Dict } from "@/lib/i18n"

interface KnowledgeSectionProps {
  dict: Dict
  blogLabel?: string
}

export function KnowledgeSection({ dict, blogLabel }: KnowledgeSectionProps) {
  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
          <GraduationCap className="h-6 w-6" />
          {dict.knowledgeTitle}
        </h2>
        <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
          {dict.knowledgeBody.map((para, i) => (
            <p key={i} className="text-pretty text-sm sm:text-base">
              {para}
            </p>
          ))}
        </div>
        {blogLabel && (
          <Link
            href="/blog"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            {blogLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
