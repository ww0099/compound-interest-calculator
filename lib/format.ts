/**
 * 通用格式化工具库。
 * 所有计算器共享的货币和百分比格式化函数。
 */

import type { CurrencyCode } from "@/lib/finance"

/** 格式化金额为货币字符串。 */
export function formatCurrency(
  value: number,
  currency: CurrencyCode = "USD",
  locale = "en-US",
): string {
  if (!isFinite(value)) return "—"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

/** 格式化利率/百分比为百分数字符串。 */
export function formatPercent(value: number | null, locale = "en-US"): string {
  if (value === null || !isFinite(value)) return "N/A"
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
