# Compound Interest Calculator

> Next.js 16 静态复利计算器站，部署于 `top.net.im`。
> 目标：通过 Google AdSense 盈利，面向全球中英双语用户。

## 目录结构

| 路径 | 说明 |
|------|------|
| `app/page.tsx` | 主计算器页面（入口） |
| `app/layout.tsx` | 根布局（SEO meta、JSON-LD） |
| `components/compound-calculator.tsx` | 计算器主组件（状态管理） |
| `components/calculator-group.tsx` | 输入/结果表单组 |
| `components/growth-chart.tsx` | Chart.js 增长图表 |
| `components/history-panel.tsx` | 历史记录面板 |
| `components/knowledge-section.tsx` | 复利知识段落 |
| `components/ui/` | shadcn UI 组件 |
| `lib/finance.ts` | 复利计算引擎（FV/PV/R/N/PMT） |
| `lib/i18n.ts` | 中英双语字典 |
| `lib/types.ts` | 类型定义 |
| `spec/handoff.md` | **会话交接文档（下一 agent 起点）** |

## 关键约定

- **语言**：TypeScript、React 19、Next.js 16 App Router
- **样式**：Tailwind CSS 4 + shadcn/ui（BaseUI React）
- **构建**：`output: 'export'` 静态导出
- **部署**：GitHub Actions → GitHub Pages → Cloudflare CDN
- **分支**：`master` → 推送即自动构建部署

## 当前进度

- [x] 核心计算器功能完成
- [x] SEO 结构化数据（JSON-LD / OG / Twitter）
- [x] Cloudflare + GitHub Pages 部署流水线
- [ ] **Phase 1：法律合规页**（Privacy / Terms / Disclaimer / Contact）
- [ ] **Phase 2：内容建设**（20+ 篇金融文章）
- [ ] **Phase 3：E-E-A-T 强化**（About / 方法透明 / 外部引用）
- [ ] **Phase 4：SEO 规模化**（多计算器 / 内链 / 外链）

## 入口文档

详见 [spec/handoff.md](spec/handoff.md) — 当前任务、背景分析、执行计划。
