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

const enContent: LegalContent = {
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

const zhContent: LegalContent = {
  title: "服务条款",
  lastUpdated: "2026-07-30",
  intro:
    "欢迎使用复利计算器。通过访问或使用 https://top.net.im（以下简称「服务」），你同意受本服务条款（以下简称「条款」）的约束。如果你不同意这些条款，请不要使用本服务。",
  sections: [
    {
      heading: "服务描述",
      body: "复利计算器是一个免费的在线金融计算工具，允许用户使用复利公式计算终值、现值、利率、投资期限和每月定投金额。本服务按「原样」提供，仅供信息和教育目的使用。",
    },
    {
      heading: "非财务建议",
      body: "本服务仅为数学计算工具。它不提供财务建议、投资推荐或任何专业指导。所有计算均基于数学公式和用户提供的输入数据。计算结果不应被理解为财务预测、保证或建议。在根据本工具的输出做出任何财务决策之前，你应咨询合格的财务顾问、税务专业人士或其他合适的专业人士。",
    },
    {
      heading: "计算准确性",
      body: "虽然我们努力确保计算的数学准确性，但我们对任何结果的准确性、完整性或适用性不作任何保证或陈述。由于市场状况、费用、税费以及本工具所用数学模型未考虑的其他因素，实际投资回报可能与计算预测存在重大差异。",
    },
    {
      heading: "知识产权",
      body: "本服务及其原创内容、功能特性——包括但不限于源代码、设计、文本、图形和标志——归服务运营者所有，并受国际版权、商标和其他知识产权法律保护。你可以将本服务用于个人、非商业目的。未经事先书面许可，你不得复制、分发、修改、创作衍生作品、公开展示或商业利用本服务的任何部分。",
    },
    {
      heading: "用户责任",
      body: [
        "你同意仅为本条款允许的合法目的使用本服务。",
        "你对自己输入到计算器中的数据准确性负责。",
        "你同意不试图干扰、超载或损害本服务或其基础设施。",
        "你同意未经事先书面许可，不使用任何自动化手段（机器人、爬虫等）访问本服务。",
        "你承认使用本工具进行的财务计算仅供参考，应独立验证。",
      ],
    },
    {
      heading: "免责声明",
      body: "本服务按「原样」和「可用状态」提供，不作任何明示或暗示的保证，包括但不限于对适销性、特定用途适用性、不侵权性或结果准确性的暗示保证。我们不保证服务将不间断、无错误、安全或无病毒或其他有害组件。",
    },
    {
      heading: "责任限制",
      body: "在适用法律允许的最大范围内，服务运营者、其关联方或贡献者在任何情况下均不对因使用或无法使用本服务而产生的任何间接、附带、特殊、后果性或惩罚性损害赔偿承担责任，包括但不限于利润损失、投资损失、数据丢失或业务中断，无论基于保证、合同、侵权（包括过失）或任何其他法律理论，即使已被告知此类损害的可能性。你对服务不满的唯一补救措施是停止使用。",
    },
    {
      heading: "第三方链接和广告",
      body: "本服务可能包含指向第三方网站的链接，并展示来自 Google AdSense 和其他广告合作伙伴的广告。我们不对任何第三方网站或服务的内容、隐私政策或实践表示认可、控制或承担任何责任。你访问第三方内容需自行承担风险。",
    },
    {
      heading: "适用法律",
      body: "本条款应受适用法律管辖并依其解释，不适用法律冲突原则。因本条款或本服务引起或与之相关的任何争议应通过善意协商解决。如果协商失败，争议应提交至适用司法管辖区的有管辖权的法院。",
    },
    {
      heading: "条款变更",
      body: "我们保留自行决定随时修改或替换本条款的权利。变更将在本页面发布，并注明更新的「最后更新」日期。你在任何变更后继续使用本服务即表示你接受修订后的条款。你有责任定期查看本条款。",
    },
    {
      heading: "联系信息",
      body: "如果你对本条款有任何疑问，请通过 pw3436858@gmail.com 联系我们，或访问 https://top.net.im/contact。",
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
      <LegalLayout en={enContent} zh={zhContent} />
    </>
  )
}
