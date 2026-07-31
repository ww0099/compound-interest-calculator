import type { Metadata } from "next"
import { ReferencesPage } from "./references-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "References - Compound Interest Calculator",
  description:
    "Authoritative references and data sources used by our compound interest calculator — including Investopedia, SEC, Federal Reserve, IRS, and standard finance textbooks.",
  alternates: { canonical: "https://top.net.im/references" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "References", url: "https://top.net.im/references" },
      ]} />
      <ReferencesPage />
    </>
  )
}
