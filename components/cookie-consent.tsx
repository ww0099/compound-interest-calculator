"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "cookieConsent"

type ConsentChoice = "accepted" | "rejected" | null

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(CONSENT_KEY)
      // Show banner only if user hasn't made a choice yet
      if (!existing) {
        // Small delay so the banner doesn't flash on every load
        const timer = setTimeout(() => setVisible(true), 600)
        return () => clearTimeout(timer)
      }
    } catch {
      /* localStorage unavailable — don't show banner */
    }
  }, [])

  const choose = (choice: ConsentChoice) => {
    try {
      if (choice) {
        localStorage.setItem(CONSENT_KEY, choice)
      }
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-2xl sm:flex-row sm:items-start sm:gap-6">
          {/* Icon */}
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Cookie className="h-5 w-5" />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-2">
            <p id="cookie-title" className="text-sm font-semibold text-foreground">
              Cookie Consent
            </p>
            <p id="cookie-desc" className="text-sm leading-relaxed text-muted-foreground">
              We use cookies and similar technologies for the following purposes:
              <span className="mt-1.5 block space-y-0.5">
                <span className="block">• <strong>Essential:</strong> Required for the website to function (language preference, history).</span>
                <span className="block">• <strong>Analytics & Advertising:</strong> Google AdSense and analytics cookies to display relevant ads and understand traffic.</span>
              </span>
              <span className="mt-1.5 block">
                By clicking <strong>Accept All</strong> you consent to all cookies.{" "}
                <strong>Essential Only</strong> disables advertising and analytics cookies.{" "}
                See our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent/80"
                >
                  Privacy Policy
                </Link>{" "}
                for details.
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:shrink-0 sm:flex-col sm:items-stretch">
            <Button onClick={() => choose("accepted")} size="sm" className="gap-1.5 whitespace-nowrap">
              Accept All
            </Button>
            <Button onClick={() => choose("rejected")} variant="outline" size="sm" className="gap-1.5 whitespace-nowrap">
              Essential Only
            </Button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="hidden rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
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
