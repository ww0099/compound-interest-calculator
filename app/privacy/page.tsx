import type { Metadata } from "next"
import { LegalLayout, type LegalContent } from "@/components/legal-layout"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Privacy Policy - Compound Interest Calculator",
  description:
    "Privacy Policy for Compound Interest Calculator — how we handle your data, cookies, and third-party services including Google AdSense.",
  alternates: { canonical: "https://top.net.im/privacy" },
  robots: { index: true, follow: true },
}

const content: LegalContent = {
  title: "Privacy Policy",
  lastUpdated: "2026-07-30",
  intro:
    "Your privacy is important to us. This Privacy Policy explains what information Compound Interest Calculator (\"we\", \"our\", or \"us\") collects, how we use it, and your rights regarding your data when you visit https://top.net.im (the \"Service\").",
  sections: [
    {
      heading: "Information We Collect",
      body: "We do not require you to create an account or provide personal information to use the calculator. The Service operates entirely in your browser. Calculation inputs and results are processed locally on your device and are never transmitted to our servers. However, like most websites, we may automatically collect certain non-personal information through cookies and similar technologies, including browser type, device type, operating system, referring URLs, and page interaction data.",
    },
    {
      heading: "Cookies and Tracking Technologies",
      body: [
        "Essential Cookies: These are necessary for the website to function properly. They enable core functionality such as remembering your language preference and calculation history (stored locally in your browser via localStorage).",
        "Analytics Cookies: We may use third-party analytics services (such as Google Analytics) that place cookies to help us understand how visitors interact with the Service. These cookies collect aggregated, anonymous data about traffic patterns and usage.",
        "Advertising Cookies: We use Google AdSense to display advertisements. Google and its partners use cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.",
        "You may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or by visiting www.aboutads.info. You can also disable cookies through your browser settings, though this may affect the functionality of the Service.",
      ],
    },
    {
      heading: "Google AdSense & Third-Party Advertising",
      body: [
        "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website.",
        "Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.",
        "Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Google Ads Settings.",
        "We may also work with other third-party advertising networks. These networks may use cookies, web beacons, or similar technologies to collect information about your browsing activities across websites.",
      ],
    },
    {
      heading: "Local Storage",
      body: "The Service uses your browser's localStorage to save your calculation history, language preference, and cookie consent choice. This data remains on your device and is never sent to our servers. You can clear this data at any time through your browser settings or by using the \"Clear All History\" button within the application.",
    },
    {
      heading: "How We Use Information",
      body: "We use the automatically collected information to: (a) monitor and analyze usage trends to improve the Service; (b) display relevant advertisements through Google AdSense and other advertising partners; (c) ensure the technical stability and security of the Service; and (d) comply with legal obligations.",
    },
    {
      heading: "Data Sharing and Disclosure",
      body: "We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data with analytics providers and advertising partners as described above. We may also disclose information if required by law, court order, or governmental regulation.",
    },
    {
      heading: "Data Retention",
      body: "Since we do not collect or store personal data on our servers, there is no server-side data retention. Any data stored locally in your browser (calculation history, preferences) remains until you clear your browser data or use the in-app deletion feature.",
    },
    {
      heading: "Your Rights Under GDPR",
      body: [
        "If you are a resident of the European Economic Area (EEA), you have the following data protection rights:",
        "Right to Access: You have the right to request copies of your personal data.",
        "Right to Rectification: You have the right to request correction of any inaccurate information.",
        "Right to Erasure: You have the right to request deletion of your personal data under certain conditions.",
        "Right to Restrict Processing: You have the right to request restriction of processing under certain conditions.",
        "Right to Data Portability: You have the right to request transfer of your data to another organization.",
        "To exercise any of these rights, please contact us at pw3436858@gmail.com. We will respond within 30 days.",
      ],
    },
    {
      heading: "CCPA Compliance (California Residents)",
      body: [
        "Under the California Consumer Privacy Act (CCPA), California residents have the right to:",
        "Know what personal information is being collected about them.",
        "Know whether their personal information is sold or disclosed and to whom.",
        "Say no to the sale of personal information.",
        "Access their personal information.",
        "Request deletion of their personal information.",
        "Not be discriminated against for exercising their privacy rights.",
        "To exercise your CCPA rights, contact us at pw3436858@gmail.com.",
      ],
    },
    {
      heading: "Children's Privacy",
      body: "The Service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.",
    },
    {
      heading: "Changes to This Privacy Policy",
      body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated \"Last updated\" date. We encourage you to review this policy periodically. Your continued use of the Service after changes constitutes acceptance of the updated policy.",
    },
    {
      heading: "Contact Us",
      body: "If you have any questions about this Privacy Policy or our data practices, please contact us at pw3436858@gmail.com or visit our Contact page at https://top.net.im/contact.",
    },
  ],
}

export default function PrivacyPage() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Privacy Policy", url: "https://top.net.im/privacy" },
      ]} />
      <LegalLayout content={content} />
    </>
  )
}
