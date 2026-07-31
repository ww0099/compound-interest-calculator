import type { Metadata } from "next"
import { LoanPage } from "./loan-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Loan Calculator - Compound Interest Calculator",
  description:
    "Free loan calculator with amortization schedule. Calculate monthly payments, total interest, and payoff time. Solve for loan amount, interest rate, or term with interactive charts.",
  alternates: { canonical: "https://top.net.im/loan" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Loan Calculator", url: "https://top.net.im/loan" },
      ]} />
      <LoanPage />
    </>
  )
}
