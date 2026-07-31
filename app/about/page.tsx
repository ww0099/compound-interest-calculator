import type { Metadata } from "next"
import { AboutPage } from "./about-page"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "About Us - Compound Interest Calculator",
  description:
    "Learn about WW0099, the creator of this free compound interest calculator — our mission to make financial mathematics accessible to everyone worldwide.",
  alternates: { canonical: "https://top.net.im/about" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "About Us", url: "https://top.net.im/about" },
      ]} />
      <AboutPage />
    </>
  )
}
