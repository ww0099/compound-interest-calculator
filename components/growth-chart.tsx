"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import type { Dict } from "@/lib/i18n"
import type { CurrencyCode } from "@/lib/finance"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
)

export interface Series {
  years: number[]
  balance: number[]
  contributions: number[]
  real: number[]
}

interface GrowthChartProps {
  dict: Dict
  seriesA: Series
  seriesB?: Series | null
  compare: boolean
  currency: CurrencyCode
  showRealA: boolean
}

const COLORS = {
  balanceA: "#1a365d",
  contribA: "#3182ce",
  realA: "#805ad5",
  balanceB: "#dd6b20",
  contribB: "#38a169",
}

export function GrowthChart({ dict, seriesA, seriesB, compare, currency, showRealA }: GrowthChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const labels =
      seriesB && compare && seriesB.years.length > seriesA.years.length
        ? seriesB.years
        : seriesA.years

    const datasets: any[] = [
      {
        label: compare ? `${dict.totalBalance} (${dict.groupA})` : dict.totalBalance,
        data: seriesA.balance,
        borderColor: COLORS.balanceA,
        backgroundColor: "rgba(26,54,93,0.08)",
        fill: true,
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
      {
        label: compare ? `${dict.contributionsLine} (${dict.groupA})` : dict.contributionsLine,
        data: seriesA.contributions,
        borderColor: COLORS.contribA,
        backgroundColor: "transparent",
        borderDash: [5, 4],
        fill: false,
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ]

    if (showRealA) {
      datasets.push({
        label: compare ? `${dict.realBalanceLine} (${dict.groupA})` : dict.realBalanceLine,
        data: seriesA.real,
        borderColor: COLORS.realA,
        backgroundColor: "transparent",
        borderDash: [2, 3],
        fill: false,
        tension: 0.25,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      })
    }

    if (compare && seriesB) {
      datasets.push(
        {
          label: `${dict.totalBalance} (${dict.groupB})`,
          data: seriesB.balance,
          borderColor: COLORS.balanceB,
          backgroundColor: "rgba(221,107,32,0.08)",
          fill: true,
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
        {
          label: `${dict.contributionsLine} (${dict.groupB})`,
          data: seriesB.contributions,
          borderColor: COLORS.contribB,
          backgroundColor: "transparent",
          borderDash: [5, 4],
          fill: false,
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
      )
    }

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "bottom",
            labels: { usePointStyle: true, boxWidth: 8, padding: 16, color: "#4a5568" },
          },
          tooltip: {
            callbacks: {
              title: (items) => `${dict.yearAxis} ${items[0].label}`,
              label: (item) =>
                `${item.dataset.label}: ${new Intl.NumberFormat(dict.locale, {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 0,
                }).format(item.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: dict.yearAxis, color: "#4a5568" },
            grid: { display: false },
            ticks: { color: "#718096" },
          },
          y: {
            title: { display: true, text: dict.amount(currency), color: "#4a5568" },
            grid: { color: "#edf2f7" },
            ticks: {
              color: "#718096",
              callback: (value) =>
                new Intl.NumberFormat(dict.locale, {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(Number(value)),
            },
          },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [dict, seriesA, seriesB, compare, currency, showRealA])

  return (
    <div className="h-72 w-full sm:h-80">
      <canvas ref={canvasRef} aria-label={dict.chartTitle} role="img" />
    </div>
  )
}
