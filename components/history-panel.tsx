"use client"

import { useState } from "react"
import { ChevronDown, Trash2, Upload, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Dict } from "@/lib/i18n"
import type { HistoryRecord } from "@/lib/types"
import type { HistoryRecordBase, HistoryColumn } from "@/lib/types"
import { formatCurrency, formatPercent, type SolveTarget } from "@/lib/finance"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Legacy (compound-interest specific)
// ---------------------------------------------------------------------------

interface LegacyHistoryPanelProps {
  dict: Dict
  records: HistoryRecord[]
  onLoad: (record: HistoryRecord) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

function targetLabel(target: SolveTarget, dict: Dict): string {
  switch (target) {
    case "fv": return dict.solveFv
    case "pv": return dict.solvePv
    case "r": return dict.solveR
    case "n": return dict.solveN
    case "pmt": return dict.solvePmt
  }
}

export function HistoryPanel({ dict, records, onLoad, onDelete, onClearAll }: LegacyHistoryPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-5 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <ScrollText className="h-5 w-5 text-primary" />
          {dict.history}
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {records.length}
          </span>
        </span>
        <ChevronDown
          className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="border-t border-border p-5">
          {records.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{dict.noHistory}</p>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (window.confirm(dict.clearConfirm)) onClearAll()
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  {dict.clearAll}
                </Button>
              </div>

              <div className="-mx-1 overflow-x-auto px-1">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">{dict.colTime}</th>
                      <th className="py-2 pr-3 font-medium">{dict.colTarget}</th>
                      <th className="py-2 pr-3 font-medium">{dict.colInputs}</th>
                      <th className="py-2 pr-3 font-medium">{dict.colFv}</th>
                      <th className="py-2 pr-3 font-medium">{dict.colInterest}</th>
                      <th className="py-2 pr-3 font-medium sr-only">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-b border-border/60 last:border-0">
                        <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap">
                          {new Date(rec.timestamp).toLocaleString(dict.locale, {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 pr-3">
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                            {targetLabel(rec.target, dict)}
                          </span>
                        </td>
                        <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap">
                          {formatCurrency(rec.pv, rec.base, dict.locale)} ·{" "}
                          {formatCurrency(rec.pmt, rec.base, dict.locale)}
                          {dict.perMonth} · {formatPercent(rec.r, dict.locale)} · {rec.t.toFixed(1)}y
                        </td>
                        <td className="py-3 pr-3 font-semibold text-foreground whitespace-nowrap">
                          {formatCurrency(rec.fv, rec.base, dict.locale)}
                        </td>
                        <td className="py-3 pr-3 text-accent whitespace-nowrap">
                          {formatCurrency(rec.totalInterest, rec.base, dict.locale)}
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onLoad(rec)} className="h-8 px-2">
                              <Upload className="mr-1 h-3.5 w-3.5" />{dict.load}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete(rec.id)}
                              className="h-8 px-2 text-destructive hover:text-destructive" aria-label={dict.delete}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Generic (multi-calculator)
// ---------------------------------------------------------------------------

interface GenericHistoryPanelProps<T extends HistoryRecordBase> {
  /** 面板标题 */
  title: string
  /** 无记录时的提示文字 */
  emptyText: string
  /** 清空确认文字 */
  clearConfirm: string
  /** 清空按钮文字 */
  clearAllLabel: string
  /** 载入按钮文字 */
  loadLabel: string
  /** 删除 aria-label */
  deleteLabel: string
  /** 时间格式化 locale */
  locale: string
  records: T[]
  columns: HistoryColumn<T>[]
  onLoad: (record: T) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

export function GenericHistoryPanel<T extends HistoryRecordBase>({
  title, emptyText, clearConfirm, clearAllLabel, loadLabel, deleteLabel, locale,
  records, columns, onLoad, onDelete, onClearAll,
}: GenericHistoryPanelProps<T>) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-5 text-left transition-colors hover:bg-secondary/50"
      >
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <ScrollText className="h-5 w-5 text-primary" />
          {title}
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {records.length}
          </span>
        </span>
        <ChevronDown
          className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="border-t border-border p-5">
          {records.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (window.confirm(clearConfirm)) onClearAll()
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  {clearAllLabel}
                </Button>
              </div>

              <div className="-mx-1 overflow-x-auto px-1">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">
                        Time
                      </th>
                      {columns.map((col) => (
                        <th key={col.key} className={cn("py-2 pr-3 font-medium", col.className)}>
                          {col.header}
                        </th>
                      ))}
                      <th className="py-2 pr-3 font-medium sr-only">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-b border-border/60 last:border-0">
                        <td className="py-3 pr-3 text-muted-foreground whitespace-nowrap">
                          {new Date(rec.timestamp).toLocaleString(locale, {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                          })}
                        </td>
                        {columns.map((col) => (
                          <td key={col.key} className={cn("py-3 pr-3 text-muted-foreground whitespace-nowrap", col.className)}>
                            {col.cell(rec, locale)}
                          </td>
                        ))}
                        <td className="py-3 pr-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onLoad(rec)} className="h-8 px-2">
                              <Upload className="mr-1 h-3.5 w-3.5" />{loadLabel}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => onDelete(rec.id)}
                              className="h-8 px-2 text-destructive hover:text-destructive" aria-label={deleteLabel}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  )
}
