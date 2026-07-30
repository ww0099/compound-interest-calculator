import type { Metadata } from "next"
import { LegalLayout, type LegalContent } from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Privacy Policy - Compound Interest Calculator",
  description:
    "Privacy Policy for Compound Interest Calculator — how we handle your data, cookies, and third-party services including Google AdSense.",
  alternates: { canonical: "https://top.net.im/privacy" },
  robots: { index: true, follow: true },
}

const enContent: LegalContent = {
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

const zhContent: LegalContent = {
  title: "隐私政策",
  lastUpdated: "2026-07-30",
  intro:
    "我们重视你的隐私。本隐私政策说明了复利计算器（以下简称「我们」）在你访问 https://top.net.im（以下简称「服务」）时收集哪些信息、如何使用这些信息，以及你对自己数据拥有的权利。",
  sections: [
    {
      heading: "我们收集的信息",
      body: "我们不需要你创建账户或提供个人信息即可使用该计算器。本服务完全在你的浏览器中运行，计算输入和结果均在本地设备上处理，绝不会传输到我们的服务器。然而，与大多数网站一样，我们可能会通过 cookie 和类似技术自动收集某些非个人信息，包括浏览器类型、设备类型、操作系统、引荐 URL 和页面交互数据。",
    },
    {
      heading: "Cookie 和追踪技术",
      body: [
        "必要 Cookie：这些是网站正常运行所必需的。它们支持核心功能，如记住你的语言偏好和计算历史（通过 localStorage 存储在本地浏览器中）。",
        "分析 Cookie：我们可能会使用第三方分析服务（如 Google Analytics），通过放置 cookie 来帮助我们了解访问者如何与服务互动。这些 cookie 收集关于流量模式和使用情况的聚合匿名数据。",
        "广告 Cookie：我们使用 Google AdSense 展示广告。Google 及其合作伙伴使用 cookie（如 DoubleClick cookie），根据你之前访问本网站和其他网站的情况投放广告。Google 对广告 cookie 的使用使其及其合作伙伴能够根据你访问本网站和/或互联网上其他网站的情况投放广告。",
        "你可以通过访问 Google 广告设置 (https://adssettings.google.com) 或 www.aboutads.info 选择退出个性化广告。你还可以通过浏览器设置禁用 cookie，但这可能会影响服务的功能。",
      ],
    },
    {
      heading: "Google AdSense 与第三方广告",
      body: [
        "包括 Google 在内的第三方供应商使用 cookie 根据用户之前访问我们网站的情况投放广告。",
        "Google 使用 DoubleClick cookie 使其及其合作伙伴能够根据用户访问本网站和/或互联网上其他网站的情况向其投放广告。",
        "用户可以通过访问 Google 广告设置来选择退出将 DoubleClick cookie 用于基于兴趣的广告。",
        "我们还可能与其他第三方广告网络合作。这些网络可能使用 cookie、网络信标或类似技术来收集关于你跨网站浏览活动的信息。",
      ],
    },
    {
      heading: "本地存储",
      body: "本服务使用你浏览器的 localStorage 来保存你的计算历史、语言偏好和 cookie 同意选择。这些数据保留在你的设备上，绝不会发送到我们的服务器。你可以随时通过浏览器设置或使用应用程序内的「清空全部历史」按钮来清除这些数据。",
    },
    {
      heading: "我们如何使用信息",
      body: "我们使用自动收集的信息来：(a) 监测和分析使用趋势以改进服务；(b) 通过 Google AdSense 和其他广告合作伙伴展示相关广告；(c) 确保服务的技术稳定性和安全性；以及 (d) 遵守法律义务。",
    },
    {
      heading: "数据共享与披露",
      body: "我们不会向第三方出售、交易或出租你的个人信息。我们可能会如上所述与分析提供商和广告合作伙伴共享匿名聚合数据。如果法律、法院命令或政府法规要求，我们也可能披露信息。",
    },
    {
      heading: "数据保留",
      body: "由于我们不在服务器上收集或存储个人数据，因此没有服务器端的数据保留。任何存储在浏览器本地（计算历史、偏好）的数据都会一直保留，直到你清除浏览器数据或使用应用内的删除功能。",
    },
    {
      heading: "GDPR 下的你的权利",
      body: [
        "如果你是欧洲经济区 (EEA) 的居民，你拥有以下数据保护权利：",
        "访问权：你有权请求获取你个人数据的副本。",
        "更正权：你有权要求更正任何不准确的信息。",
        "删除权：你有权在特定条件下要求删除你的个人数据。",
        "限制处理权：你有权在特定条件下要求限制数据处理。",
        "数据可携权：你有权要求将你的数据传输到其他组织。",
        "要行使上述任何权利，请通过 pw3436858@gmail.com 联系我们。我们将在 30 天内回复。",
      ],
    },
    {
      heading: "CCPA 合规（加州居民）",
      body: [
        "根据《加州消费者隐私法案》(CCPA)，加州居民拥有以下权利：",
        "了解正在收集哪些关于自己的个人信息。",
        "了解自己的个人信息是否被出售或披露，以及出售/披露给谁。",
        "拒绝出售个人信息。",
        "访问自己的个人信息。",
        "请求删除自己的个人信息。",
        "不因行使隐私权而受到歧视。",
        "要行使你的 CCPA 权利，请通过 pw3436858@gmail.com 联系我们。",
      ],
    },
    {
      heading: "儿童隐私",
      body: "本服务不面向 13 岁以下的个人。我们不会故意收集 13 岁以下儿童的个人信息。如果你作为父母或监护人认为你的孩子向我们提供了个人信息，请联系我们，以便我们采取适当措施。",
    },
    {
      heading: "本隐私政策的变更",
      body: "我们可能不时更新本隐私政策。变更将在本页面发布，并注明更新的「最后更新」日期。我们建议你定期查看本政策。你在变更后继续使用本服务即表示你接受更新后的政策。",
    },
    {
      heading: "联系我们",
      body: "如果你对本隐私政策或我们的数据处理实践有任何疑问，请通过 pw3436858@gmail.com 联系我们，或访问我们的联系页面 https://top.net.im/contact。",
    },
  ],
}

export default function PrivacyPage() {
  return <LegalLayout en={enContent} zh={zhContent} />
}
