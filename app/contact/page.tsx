import type { Metadata } from "next"
import { ContactPage } from "./contact-page"

export const metadata: Metadata = {
  title: "Contact Us - Compound Interest Calculator",
  description:
    "Get in touch with the Compound Interest Calculator team. Reach us by email or GitHub for questions, feedback, or privacy requests.",
  alternates: { canonical: "https://top.net.im/contact" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ContactPage />
}
