import type { Metadata } from "next"
import { MethodologyPage } from "./methodology-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Methodology - Compound Interest Calculator",
  description:
    "How our compound interest calculator works — complete mathematical formulas including FV, EAR, and bisection method for solving interest rate and time period.",
  alternates: { canonical: "https://top.net.im/methodology" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Methodology", url: "https://top.net.im/methodology" },
      ]} />
      <MethodologyPage />
    </>
  )
}
