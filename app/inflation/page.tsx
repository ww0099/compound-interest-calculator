import type { Metadata } from "next"
import { InflationPage } from "./inflation-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Inflation Calculator - Compound Interest Calculator",
  description:
    "Calculate how inflation erodes purchasing power over time. See your money's real value and plan for the future with our free inflation calculator.",
  alternates: { canonical: "https://top.net.im/inflation" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Inflation Calculator", url: "https://top.net.im/inflation" },
      ]} />
      <InflationPage />
    </>
  )
}
