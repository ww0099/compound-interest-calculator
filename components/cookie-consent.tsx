"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const COOKIE_KEY = "cookieConsent"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Delay check so localStorage is available (not SSR)
    try {
      const consented = localStorage.getItem(COOKIE_KEY)
      if (!consented) {
        setVisible(true)
      }
    } catch {
      /* localStorage not available */
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_KEY, "true")
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
          <div className="flex-1 text-sm leading-relaxed text-foreground/85">
            This site uses cookies for analytics and to display personalized advertisements
            via Google AdSense. By continuing to use this site, you consent to our use of
            cookies. See our{" "}
            <Link
              href="/privacy"
              className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent/80"
            >
              Privacy Policy
            </Link>{" "}
            for details.
          </div>
          <div className="flex items-center gap-3 sm:shrink-0">
            <Button onClick={accept} size="sm" className="gap-1.5">
              Accept
            </Button>
            <button
              type="button"
              onClick={accept}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close cookie banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
