import type { Metadata } from "next"
import { RetirementPage } from "./retirement-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Retirement Calculator - Compound Interest Calculator",
  description:
    "Free retirement calculator. Project your savings, find required monthly contributions, and discover when you can retire using the 4% rule and inflation-adjusted projections.",
  alternates: { canonical: "https://top.net.im/retirement" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Retirement Calculator", url: "https://top.net.im/retirement" },
      ]} />
      <RetirementPage />
    </>
  )
}
