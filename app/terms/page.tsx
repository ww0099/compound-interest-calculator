import type { Metadata } from "next"
import { LegalLayout, type LegalContent } from "@/components/legal-layout"
import { JsonLdBreadcrumb } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Terms of Service - Compound Interest Calculator",
  description:
    "Terms of Service for Compound Interest Calculator — conditions for using our free online financial calculator tool.",
  alternates: { canonical: "https://top.net.im/terms" },
  robots: { index: true, follow: true },
}

const content: LegalContent = {
  title: "Terms of Service",
  lastUpdated: "2026-07-30",
  intro:
    'Welcome to Compound Interest Calculator. By accessing or using https://top.net.im (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.',
  sections: [
    {
      heading: "Service Description",
      body: "Compound Interest Calculator is a free online financial calculation tool that allows users to compute future value, present value, interest rates, investment periods, and monthly contributions using compound interest formulas. The Service is provided \"as is\" for informational and educational purposes only.",
    },
    {
      heading: "No Financial Advice",
      body: "THE SERVICE IS A MATHEMATICAL CALCULATION TOOL ONLY. IT DOES NOT PROVIDE FINANCIAL ADVICE, INVESTMENT RECOMMENDATIONS, OR PROFESSIONAL GUIDANCE OF ANY KIND. All calculations are based on mathematical formulas and user-provided inputs. Results should not be interpreted as financial projections, guarantees, or advice. You should consult with a qualified financial advisor, tax professional, or other appropriate specialist before making any financial decisions based on the output of this tool.",
    },
    {
      heading: "Accuracy of Calculations",
      body: "While we strive to ensure the mathematical accuracy of our calculations, we make no warranty or representation regarding the accuracy, completeness, or applicability of any results. Actual investment returns may differ materially from calculated projections due to market conditions, fees, taxes, and other factors not accounted for in the mathematical models used by this tool.",
    },
    {
      heading: "Intellectual Property",
      body: "The Service and its original content, features, and functionality — including but not limited to the source code, design, text, graphics, and logos — are owned by the Service operator and are protected by international copyright, trademark, and other intellectual property laws. You may use the Service for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any part of the Service without prior written permission.",
    },
    {
      heading: "User Responsibilities",
      body: [
        "You agree to use the Service only for lawful purposes and in accordance with these Terms.",
        "You are responsible for the accuracy of the data you input into the calculator.",
        "You agree not to attempt to disrupt, overload, or impair the Service or its infrastructure.",
        "You agree not to use any automated means (bots, scrapers, etc.) to access the Service without prior written permission.",
        "You acknowledge that financial calculations performed using this tool are for reference only and should be independently verified.",
      ],
    },
    {
      heading: "Disclaimer of Warranties",
      body: "THE SERVICE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY OF RESULTS. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS.",
    },
    {
      heading: "Limitation of Liability",
      body: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE SERVICE OPERATOR, ITS AFFILIATES, OR ITS CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, INVESTMENT LOSSES, DATA LOSS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOUR SOLE REMEDY FOR DISSATISFACTION WITH THE SERVICE IS TO STOP USING IT.",
    },
    {
      heading: "Third-Party Links and Advertisements",
      body: "The Service may contain links to third-party websites and display advertisements from Google AdSense and other advertising partners. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites or services. You access third-party content at your own risk.",
    },
    {
      heading: "Governing Law",
      body: "These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from or relating to these Terms or the Service shall be resolved through good faith negotiation. If negotiation fails, disputes shall be submitted to the competent courts of the applicable jurisdiction.",
    },
    {
      heading: "Changes to Terms",
      body: "We reserve the right to modify or replace these Terms at any time at our sole discretion. Changes will be posted on this page with an updated \"Last updated\" date. Your continued use of the Service after any changes constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically.",
    },
    {
      heading: "Contact Information",
      body: "If you have any questions about these Terms, please contact us at pw3436858@gmail.com or visit https://top.net.im/contact.",
    },
  ],
}

export default function TermsPage() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
        { name: "Terms of Service", url: "https://top.net.im/terms" },
      ]} />
      <LegalLayout content={content} />
    </>
  )
}
