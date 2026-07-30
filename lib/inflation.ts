/**
 * 通货膨胀计算工具库。
 * 提供购买力折现、名义目标金额计算和逐年序列数据。
 */

import { formatCurrency } from "@/lib/format"
import type { CurrencyCode } from "@/lib/finance"

/** 计算给定金额在 N 年后的购买力（折现）。 */
export function futurePurchasingPower(
  amount: number,
  inflationRate: number,
  years: number,
): number {
  return amount / Math.pow(1 + inflationRate, years)
}

/** 计算要在未来保持同等购买力所需的名义金额。 */
export function requiredNominalAmount(
  amount: number,
  inflationRate: number,
  years: number,
): number {
  return amount * Math.pow(1 + inflationRate, years)
}

/** 逐年序列：名义金额（恒定）与实际购买力（递减）的对比，用于图表。 */
export function purchasingPowerSeries(
  amount: number,
  inflationRate: number,
  years: number,
): { years: number[]; nominal: number[]; real: number[] } {
  const totalYears = Math.max(0, Math.ceil(years))
  const yrList: number[] = []
  const nominal: number[] = []
  const real: number[] = []
  for (let y = 0; y <= totalYears; y++) {
    const yr = Math.min(y, years)
    yrList.push(Number(yr.toFixed(1)))
    nominal.push(amount)
    real.push(futurePurchasingPower(amount, inflationRate, yr))
  }
  return { years: yrList, nominal, real }
}

/** 格式化通货膨胀计算结果的便捷对象。 */
export function formatInflationResult(
  value: number,
  currency: CurrencyCode,
  locale: string,
): string {
  return formatCurrency(value, currency, locale)
}
