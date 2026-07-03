"use client"

import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Dict } from "@/lib/i18n"

export function KnowledgeSection({ dict }: { dict: Dict }) {
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
      </CardContent>
    </Card>
  )
}
