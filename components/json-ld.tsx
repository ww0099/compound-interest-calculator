/**
 * JSON-LD 结构化数据共享组件。
 * 用于向页面注入 Schema.org 结构化数据（BreadcrumbList、HowTo 等）。
 */

import React from "react"

/** 面包屑项 */
export interface BreadcrumbItem {
  name: string
  url: string
}

/** 渲染 JSON-LD script 标签 */
function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** BreadcrumbList Schema */
export function JsonLdBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <JsonLdScript data={data} />
}

/** HowTo Schema — 用于主计算器页面 */
export function JsonLdHowTo({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  }
  return <JsonLdScript data={data} />
}

/** FAQ Schema — 用于主计算器页面 */
export function JsonLdFaq({ questions }: { questions: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
  return <JsonLdScript data={data} />
}

/** SoftwareApplication Schema — 用于各计算器子页面 */
export function JsonLdSoftwareApp({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }
  return <JsonLdScript data={data} />
}
