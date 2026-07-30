# Handoff: Compound Interest Calculator

> **最后更新**：2026-07-30
> **当前状态**：Phase 2 完成，待执行 Phase 3
> **下次任务入口**：直接跳到 [§5 Phase 3 执行计划](#5-phase-3-执行计划-ee-a-t-强化)

---

## 1. 项目概况

| 项目 | 详情 |
|------|------|
| 站点 | `https://top.net.im` |
| 仓库 | `github.com/WW0099/compound-interest-calculator` |
| 作者 | WW0099（对外统一笔名） |
| 目标 | Google AdSense 审核通过 + 长期 SEO 流量变现 |
| 受众 | 全球中英双语用户（英语为主，中文辅助） |
| 性质 | **YMYL**（金融计算器）— AdSense 审核标准极严 |
| 部署 | GitHub Actions → GitHub Pages → Cloudflare CDN |

## 2. 技术栈

| 技术 | 版本 | 备注 |
|------|------|------|
| Next.js | 16.2.6 | App Router |
| React | 19 | — |
| TypeScript | 5.7.3 | `strict: true`（但 `ignoreBuildErrors: true`） |
| Tailwind CSS | 4.2.0 | `@import 'tailwindcss'` |
| shadcn/ui | BaseUI React | `data-slot` 属性选择器风格 |
| Chart.js | 4.5.1 | 仅手动注册所需组件 |
| 构建 | `output: 'export'` | 纯静态，无 SSR/API |
| 包管理 | pnpm（开发）/ npm（CI） | lockfile 两者均存在 |
| 部署 | `peaceiris/actions-gh-pages` | master 分支触发 |

## 3. 完整目录结构

```
compound-interest-calculator/
├── app/
│   ├── layout.tsx                  # 根布局（SEO meta + JSON-LD + SiteFooter + CookieConsent）
│   ├── page.tsx                    # 主入口 → <CompoundCalculator />
│   ├── globals.css                 # Tailwind + CSS 变量 + shadcn 主题
│   ├── blog/
│   │   ├── page.tsx                # 博客首页（文章列表 + metadata）
│   │   ├── blog-index.tsx          # 博客首页客户端组件（语言切换 + 卡片网格）
│   │   ├── compound-vs-simple-interest/page.tsx
│   │   ├── rule-of-72/page.tsx
│   │   ├── 500-per-month-30-years/page.tsx
│   │   ├── inflation-hidden-tax/page.tsx
│   │   ├── monthly-vs-annual-compounding/page.tsx
│   │   ├── beginner-guide-retirement/page.tsx
│   │   ├── capital-gains-tax/page.tsx
│   │   └── cagr-vs-average-return/page.tsx
│   ├── privacy/page.tsx            # 隐私政策（GDPR/CCPA/AdSense cookie）
│   ├── terms/page.tsx              # 服务条款
│   ├── disclaimer/page.tsx         # 金融免责声明（YMYL 关键页）
│   └── contact/
│       ├── page.tsx                # 联系页 metadata
│       └── contact-page.tsx        # 联系页客户端组件
├── components/
│   ├── compound-calculator.tsx     # ★ 计算器主组件（520 行）
│   ├── calculator-group.tsx        # 输入/结果表单组（365 行）
│   ├── growth-chart.tsx            # Chart.js 增长图表（199 行）
│   ├── history-panel.tsx           # 历史记录面板
│   ├── knowledge-section.tsx       # 复利知识段落
│   ├── legal-layout.tsx            # 法律页面共享布局
│   ├── blog-layout.tsx             # 博客文章共享布局
│   ├── cookie-consent.tsx          # Cookie 同意横幅（localStorage）
│   ├── site-footer.tsx             # 全局页脚（Blog + 法律链接）
│   └── ui/                        # shadcn/ui 基础组件
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── switch.tsx
├── lib/
│   ├── finance.ts                  # ★ 计算引擎（纯函数，288 行，5 种求解模式）
│   ├── i18n.ts                     # 中英双语字典（245 行）
│   ├── types.ts                    # 类型定义 + 默认值 + 历史记录结构
│   └── utils.ts                    # cn() 工具（clsx + tailwind-merge）
├── spec/
│   └── handoff.md                  # ★ 本文档（项目交接 SSOT）
├── public/
│   ├── _headers                    # Cloudflare HTTP 头
│   ├── ads.txt                     # AdSense 验证 (pub-1920425213895856)
│   └── *.png/svg/ico               # 图标、OG 图
├── sitemap.xml                     # 16 条路由
├── robots.txt                      # 允许所有爬虫 + 广告爬虫
├── CNAME                           # top.net.im
├── .github/workflows/deploy.yml    # CI/CD：npm ci → build → deploy to gh-pages
├── AGENTS.md                       # 项目速览
├── CLOUDFLARE-SETUP.md             # Cloudflare 配置指南
├── package.json
├── tsconfig.json
└── next.config.mjs
```

## 4. 代码约定

### 4.1 页面组件模式

每个新路由遵循统一模式：

```typescript
// app/[route]/page.tsx
import type { Metadata } from "next"
import { SomeClientComponent } from "./some-component"

export const metadata: Metadata = {
  title: "Page Title - Compound Interest Calculator",
  description: "...",
  alternates: { canonical: "https://top.net.im/[route]" },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <SomeClientComponent {...props} />
}
```

- **metadata 在 page.tsx 中导出**（编译时提取，支持 client component 默认导出）
- **客户端内容在独立 `*-component.tsx` 中**（`"use client"` 边界）
- **双语内容作为 props 传入共享布局**（`en: Content, zh: Content`）

### 4.2 国际化

- `lib/i18n.ts`：仅含计算器 UI 文案
- 法律页面和博客文章：各自定义 `enContent` / `zhContent`，通过语言切换状态控制
- **禁止**在 JS 字符串内使用 ASCII `"` 作为中文引号 → 改用 `「」`

### 4.3 样式

- Tailwind CSS 4，仅 light mode（`color-scheme: light`）
- 颜色变量定义在 `globals.css` 的 `:root` 块
- 组件优先使用 shadcn Card 包裹，`max-w-3xl` / `max-w-4xl` 居中
- 主色调：`primary: #1a365d`，强调色：`accent: #3182ce`

### 4.4 构建约束

- `output: 'export'`：**禁止** API Routes、Server Components（数据获取）、ISR
- `images.unoptimized: true`：静态导出不支持 Next.js 图片优化
- `typescript.ignoreBuildErrors: true`：可改为 `false` 提高安全性
- 提交前**必须** `npm run build` 验证

## 5. Phase 3 执行计划：E-E-A-T 强化

> **背景**：Phase 1（法律页）+ Phase 2（8 篇文章）已完成。但 AdSense YMYL 审核还需要 E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）信号。

### Task 3.1：创建 About 页面
**路径**：`app/about/page.tsx`

要求：
- 具名作者页面（WW0099，附简短背景介绍）
- 说明项目动机：帮助普通人理解复利，做出更好的财务决策
- 可提及相关资质/经验（如有 CFA、金融学位、投资经验等 — 需用户填写）
- 透明度声明：工具使用标准金融数学公式，非个性化建议
- 双语
- metadata：`"About Us - Compound Interest Calculator"`

### Task 3.2：创建 Methodology 页面（方法透明度）
**路径**：`app/methodology/page.tsx`

要求：
- 列出所有使用的数学公式：
  - FV = PV(1+r/n)^(nt) + PMT × [(1+r/n)^(nt) - 1] / (r/n)
  - EAR = (1 + r/n)^n - 1
  - 二分法求解 R/N 的说明
- 明确列出假设和局限性：
  - 固定利率（现实利率波动）
  - 简化税收模型（固定税率，非累进）
  - 恒定通胀率
  - 无交易费用/管理费
- 数据来源说明（公式参考标准金融教科书）
- 双语

### Task 3.3：References 引用页
**路径**：`app/references/page.tsx`

要求：
- 列出权威外部引用：
  - Investopedia: Compound Interest
  - SEC: Compound Interest Calculator
  - Federal Reserve: Historical Interest Rate Data
  - IRS: Capital Gains Tax Rates
  - 标准金融教材（如 Bodie, Kane & Marcus "Investments"）
- 每项包含链接 + 简短说明
- 双语

### Task 3.4：主页面增强
**修改**：`app/page.tsx` 或 `components/compound-calculator.tsx`

要求：
- 在计算器上方/下方添加信任标识区域：
  - "As featured on..." / 引用标识（如有）
  - 简短信任声明："Calculations based on standard financial mathematics formulas"
- Knowledge section 添加 "Learn more" 链接 → 指向 `/blog`
- 考虑将 AI 风格的知识段落替换为数据驱动的摘要

### Task 3.5：About 小部件
**路径**：`components/about-widget.tsx`

要求：
- 侧边栏或卡片小部件，显示在每篇博客文章底部
- 简短作者简介 + 头像（placeholder）+ "View all articles" 链接
- 双语

### Task 3.6：更新 sitemap
- 新增 `/about`、`/methodology`、`/references`

## 6. Phase 4 展望：SEO 规模化

> 可在 Phase 3 完成后执行。

- [ ] 多计算器：退休计算器、贷款计算器、通胀计算器
- [ ] 内部链接优化：在相关文章之间交叉引用
- [ ] 外部链接建设：提交至金融工具目录站
- [ ] 结构化数据增强：FAQ Schema、Article Schema、BreadcrumbList
- [ ] 性能优化：Lighthouse 90+、Core Web Vitals 全绿
- [ ] `typescript.ignoreBuildErrors: false` — 彻底修复类型错误

## 7. 已知问题与改进点

| # | 问题 | 严重度 | 备注 |
|---|------|--------|------|
| 1 | `typescript.ignoreBuildErrors: true` | 中 | 跳过类型检查，长期应修复 |
| 2 | 知识段落为纯 AI 风格文本 | 高 | 2026.7 AI 透明度更新后属高风险，Phase 3 应处理 |
| 3 | sitemap 无 Blog 文章 | 已修复 | Phase 2 已更新 |
| 4 | 无反 AI 内容声明 | 中 | About/Methodology 页面可解决 |
| 5 | `out/privacy/` 目录缺 `index.html` | 低 | 根目录 `privacy.html` 可正常访问；GitHub Pages 自动路由 |

## 8. 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器（localhost:3000）

# 构建
npm run build        # 静态导出到 out/

# 预览构建产物
npx serve out        # 本地预览静态文件

# 部署
git push origin master   # 推送即触发 GitHub Actions 自动部署

# 验证
ls out/*.html              # 检查所有生成页面
grep -r "index" out/       # 验证所有路由
```

## 9. 交接清单

> 下一位 agent 接手时，按此清单逐项确认。

- [ ] 阅读本文档 §1-4（项目概况 + 技术栈 + 约定）
- [ ] 运行 `npm run build` 确认可构建
- [ ] 确认 Git 状态干净（`git status`）
- [ ] 确认当前 Phase（§5 或 §6）
- [ ] 开始执行当前 Phase 的第一个 Task
- [ ] 完成后更新本文档的「最后更新」日期和「当前状态」
