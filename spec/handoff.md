# Handoff: Compound Interest Calculator

> **最后更新**：2026-08-01
> **当前状态**：全站已移除中英互译、重构为**纯英文网站**（commit 878c996），24 静态页构建通过、TypeScript 零错误；此前已含 About E-E-A-T 增强 + 第 10 篇「货币时间价值」+ sitemap 部署修复
> **下次任务入口**：阅读本文档 → 查看 `spec/adsense-readiness.md` → 执行剩余清单 → 提交 AdSense 审核

---

## 1. 项目概况

| 项目 | 详情 |
|------|------|
| 站点 | `https://top.net.im` |
| 仓库 | `github.com/WW0099/compound-interest-calculator` |
| 作者 | WW0099（对外统一笔名） |
| 目标 | Google AdSense 审核通过 + 长期 SEO 流量变现 |
| 受众 | 全球英文用户（英语为主，单一语言） |
| 性质 | **YMYL**（金融计算器）— AdSense 审核标准极严 |
| 部署 | GitHub Actions → GitHub Pages → Cloudflare CDN |

## 2. 技术栈

| 技术 | 版本 | 备注 |
|------|------|------|
| Next.js | 16.2.6 | App Router |
| React | 19 | — |
| TypeScript | 5.7.3 | `strict: true`，`ignoreBuildErrors: false`（已修复全部类型错误） |
| Tailwind CSS | 4.2.0 | `@import 'tailwindcss'` |
| shadcn/ui | BaseUI React | `data-slot` 属性选择器风格 |
| Chart.js | 4.5.1 | 直接 canvas API（非 react-chartjs-2） |
| 构建 | `output: 'export'` | 纯静态，无 SSR/API |
| 包管理 | pnpm（开发）/ npm（CI） | lockfile 两者均存在 |
| 部署 | `peaceiris/actions-gh-pages` | master 分支触发 |

## 3. 完整目录结构

```
compound-interest-calculator/
├── app/
│   ├── layout.tsx                  # 根布局（7 个 JSON-LD schema + preconnect + SiteFooter + CookieConsent）
│   ├── page.tsx                    # 主入口 → <CompoundCalculator />
│   ├── globals.css                 # Tailwind + CSS 变量 + shadcn 主题
│   ├── about/
│   │   ├── page.tsx                # 关于我们 metadata
│   │   └── about-page.tsx          # 关于我们客户端组件（作者 + 使命 + 透明度声明）
│   ├── methodology/
│   │   ├── page.tsx                # 方法论 metadata
│   │   └── methodology-page.tsx    # 方法论客户端组件（公式 + 假设 + 二分法说明）
│   ├── references/
│   │   ├── page.tsx                # 参考文献 metadata
│   │   └── references-page.tsx     # 参考文献客户端组件（10 项引用 × 4 类别）
│   ├── retirement/
│   │   ├── page.tsx                # 退休计算器 metadata
│   │   └── retirement-page.tsx     # 退休计算器客户端组件（376 行，3 种求解模式）
│   ├── inflation/
│   │   ├── page.tsx                # 通胀计算器 metadata
│   │   └── inflation-page.tsx      # 通胀计算器客户端组件（购买力 + 图表）
│   ├── loan/
│   │   ├── page.tsx                # 贷款计算器 metadata
│   │   └── loan-page.tsx           # 贷款计算器客户端组件（4 求解模式 + 摊销表 + 双图表）
│   ├── blog/
│   │   ├── page.tsx                # 博客首页（文章列表 + metadata）
│   │   ├── blog-index.tsx          # 博客首页客户端组件
│   │   ├── dollar-cost-averaging/page.tsx
│   │   ├── compound-vs-simple-interest/page.tsx
│   │   ├── rule-of-72/page.tsx
│   │   ├── 500-per-month-30-years/page.tsx
│   │   ├── inflation-hidden-tax/page.tsx
│   │   ├── monthly-vs-annual-compounding/page.tsx
│   │   ├── beginner-guide-retirement/page.tsx
│   │   ├── capital-gains-tax/page.tsx
│   │   ├── cagr-vs-average-return/page.tsx
│   │   └── time-value-of-money/page.tsx
│   ├── privacy/page.tsx            # 隐私政策
│   ├── terms/page.tsx              # 服务条款
│   ├── disclaimer/page.tsx         # 金融免责声明
│   └── contact/
│       ├── page.tsx                # 联系页 metadata
│       └── contact-page.tsx        # 联系页客户端组件
├── components/
│   ├── compound-calculator.tsx     # ★ 复利计算器主组件（含信任标识横幅）
│   ├── calculator-group.tsx        # 输入/结果表单组
│   ├── growth-chart.tsx            # Chart.js 增长图表
│   ├── history-panel.tsx           # 历史记录面板（Legacy + GenericHistoryPanel 泛型版本）
│   ├── json-ld.tsx                 # ★ JSON-LD 共享组件（BreadcrumbList / HowTo / FAQ / SoftwareApp）
│   ├── knowledge-section.tsx       # 复利知识段落（含 blog 链接）
│   ├── about-widget.tsx            # 博客文章底部作者卡片
│   ├── legal-layout.tsx            # 法律页面共享布局（含 E-E-A-T 导航）
│   ├── blog-layout.tsx             # 博客文章共享布局（含 JSON-LD + Related Articles + AboutWidget）
│   ├── cookie-consent.tsx          # Cookie 同意横幅
│   ├── site-footer.tsx             # 全局页脚（含 E-E-A-T + 法律链接）
│   └── ui/                        # shadcn/ui 基础组件
├── lib/
│   ├── math.ts                     # ★ 通用数值求解（bisect 二分法）
│   ├── format.ts                   # ★ 通用格式化（formatCurrency / formatPercent）
│   ├── finance.ts                  # ★ 复利计算引擎（5 种求解模式 + 重用 math/format）
│   ├── retirement.ts               # ★ 退休计算引擎（3 种求解模式 + 两阶段投影）
│   ├── inflation.ts                # ★ 通胀计算引擎（购买力 + 名义金额 + 序列）
│   ├── loan.ts                     # ★ 贷款计算引擎（4 求解模式 + 摊销表 + 逐年序列）
│   ├── i18n.ts                     # 复利计算器英文字典（纯英文，无 zh）
│   ├── types.ts                    # 类型定义 + 默认值 + 历史记录结构
│   └── utils.ts                    # cn() 工具（clsx + tailwind-merge）
├── spec/
│   ├── handoff.md                  # ★ 项目交接 SSOT
│   ├── adsense-readiness.md        # AdSense 审核准备报告 + 检查清单
│   └── link-building.md            # 外链建设跟踪清单
├── public/
│   ├── _headers                    # Cloudflare HTTP 头（含 HSTS/CSP/缓存策略）
│   ├── ads.txt                     # AdSense 验证 (pub-1920425213895856)
│   ├── robots.txt                  # 允许所有爬虫 + 广告爬虫（含 sitemap 引用）
│   ├── sitemap.xml                 # ★ 22 条 URL sitemap（位于 public/，随构建部署）
│   └── *.png/svg/ico               # 图标、OG 图
├── CNAME                           # top.net.im
├── .github/workflows/deploy.yml    # CI/CD：npm ci → build → deploy to gh-pages
├── AGENTS.md                       # 项目速览
├── CLOUDFLARE-SETUP.md             # Cloudflare 配置指南
├── package.json
├── tsconfig.json
└── next.config.mjs                 # poweredByHeader: false + ignoreBuildErrors: false
```

## 4. 代码约定

### 4.1 页面组件模式

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

### 4.2 国际化（纯英文，单语言）

- 全站**纯英文**，无语言切换（commit 878c996 移除中英互译）
- `lib/i18n.ts`：复利计算器 UI 文案，只导出英文 dict（`export const dict: Dict = en`）
- 法律页/博客/新计算器：文案直接硬编码英文；所有 locale 统一 `en-US` / `en_US`

### 4.3 样式

- Tailwind CSS 4，仅 light mode（`color-scheme: light`）
- 主色调：`primary: #1a365d`，强调色：`accent: #3182ce`
- 组件优先使用 shadcn Card 包裹

### 4.4 构建约束

- `output: 'export'`：**禁止** API Routes、Server Components（数据获取）、ISR
- `typescript.ignoreBuildErrors: false` — 零类型错误才能构建通过
- Chart.js 使用直接 canvas API（`useRef<HTMLCanvasElement>` + `useEffect`），不引入额外依赖
- 提交前**必须** `npm run build` 验证

### 4.5 新文件约定

- 新计算器：`lib/xxx.ts`（引擎）+ `app/xxx/page.tsx`（metadata）+ `app/xxx/xxx-page.tsx`（客户端组件）
- 共享工具：放 `lib/`，纯函数导出，便于所有计算器复用

## 5. 当前进度：已完成

- [x] 核心计算器（5 种求解模式 + 图表 + 对比 + 历史）
- [x] Phase 1：法律合规页（Privacy / Terms / Disclaimer / Contact）
- [x] Phase 2：内容建设（8 篇英文金融文章 + 博客首页）
- [x] Phase 3：E-E-A-T 强化（About / Methodology / References / 信任标识 / About Widget）
- [x] **Phase 4 Tier 1**：TypeScript 修复（2 错 → 0）+ `ignoreBuildErrors: false` + preconnect + `poweredByHeader: false`
- [x] **Phase 4 Tier 2**：JSON-LD 结构化数据（Article×8 + BreadcrumbList + FAQPage）+ 博客内链（relatedArticles × 16 组）
- [x] **Phase 4 Tier 3 重构**：`lib/math.ts`（bisect）+ `lib/format.ts`（formatCurrency/formatPercent）+ finance.ts 模块化
- [x] **Phase 4 Tier 3 退休计算器**：`/retirement`（积累期 + 领取期 + 4% 法则 + 3 求解模式）
- [x] **Phase 4 Tier 3 通胀计算器**：`/inflation`（购买力 + 名义金额 + 趋势图）
- [x] **Phase 5 贷款计算器**：`/loan`（4 求解模式 + 摊销表 + 余额折线图 + 本金/利息饼图 + 泛型历史面板）
- [x] **Phase 5 HistoryPanel 泛化**：`GenericHistoryPanel<T>` + `HistoryColumn<T>` + `HistoryRecordBase` → 贷款计算器已集成
- [x] **Phase 5 结构化数据增强**：BreadcrumbList 覆盖 10 个非博客页面 + HowTo Schema（主页面）+ `components/json-ld.tsx` 共享组件
- [x] **Phase 5 外部链接建设**：`spec/link-building.md`（10 个目录 + 提交清单 + 内容营销建议）
- [x] **AdSense 审核准备**：`spec/adsense-readiness.md`（7 维度检查清单 + 风险分析 + 行动清单 + 常见拒绝原因）
- [x] **Cookie 同意 GDPR 改进**：Accept All / Essential Only 双选项 + 详细用途说明
- [x] **AdSense 冲刺 · About E-E-A-T 增强**：作者资质结构化（软件工程/自学金融数学/开源贡献/同行评审公式）+ 社会证明数据（By the Numbers）+ About FAQ 区块（4 条信任 FAQ）
- [x] **第 10 篇博客「货币时间价值」**：`/blog/time-value-of-money`（英文 + 双向内链到 rule-of-72/500-per-month + 新文章 relatedArticles + sitemap 更新）
- [x] **sitemap 部署 bug 修复**：`sitemap.xml` 原在根目录未随构建部署（站点 404），已移入 `public/`
- [x] **全站英文化重构**：移除中英互译（commit 878c996）— 删除 `Lang` 类型 / `zh` 字典 / `getDict`，4 个计算器移除语言切换，10 篇博客删除 `zhContent`，about/contact/methodology/references 等 5 页 + privacy/terms/disclaimer 3 个 legal 页改纯英文，history-panel 清理中文判断；构建验证 24 静态页、TypeScript 零错误

## 6. 后续展望

- [ ] 按 `spec/adsense-readiness.md` §3 执行审核前行动清单
- [ ] 提交 Google AdSense 审核（`pub-1920425213895856`）
- [ ] Core Web Vitals 实测审计（Lighthouse CI / PageSpeed Insights）
- [ ] 按 `spec/link-building.md` 逐步提交外链
- [ ] 考虑添加域名邮箱 `contact@top.net.im`
- [ ] 考虑添加更多计算器（储蓄目标 / 货币时间价值 / 投资回报率）

## 7. JSON-LD Schema 清单（11 个 + BreadcrumbList × 10）

| Schema | 位置 | 说明 |
|--------|------|------|
| WebSite | `layout.tsx` | 站点级 |
| SoftwareApplication | `layout.tsx` | 免费金融工具 |
| Organization | `layout.tsx` | WW0099 组织信息 |
| FAQPage | `layout.tsx` | 5 条金融 FAQ |
| HowTo | `app/page.tsx` | 复利计算器使用步骤 |
| BlogPosting × 10 | `blog-layout.tsx`（每篇文章） | headline + datePublished + author |
| BreadcrumbList × 8 | `blog-layout.tsx`（每篇文章） | Home → Blog → Article |
| BreadcrumbList × 10 | 各 `page.tsx` | 全站非博客页面 |
| — | — | 退休/通胀计算器可后续加 SoftwareApplication |

## 8. 已知问题与改进点

| # | 问题 | 严重度 | 状态 |
|---|------|--------|------|
| 1 | `typescript.ignoreBuildErrors: true` | 中 | ✅ 已修复（Phase 4） |
| 2 | 知识段落为纯 AI 风格文本 | 高 | ✅ 已处理（Phase 3 About/Methodology + Trust Badge） |
| 3 | sitemap 无 Blog 文章 | 已修复 | ✅ Phase 2 已更新 |
| 4 | 无反 AI 内容声明 | 中 | ✅ 已处理（Phase 3 About + Methodology） |
| 5 | `out/privacy/` 目录缺 `index.html` | 低 | GitHub Pages 自动路由 |
| 6 | 退休计算器 Chart.js 需确认无 react-chartjs-2 | 低 | ✅ 已确认用 canvas API |
| 7 | `sitemap.xml` 在根目录未随构建部署（站点 404） | 高 | ✅ 已修复（移入 `public/`，随部署发布） |
| 8 | 根目录 `index.html` 为旧版（Vercel 时代）残留，含「中文」按钮 | 低 | 未部署（CI 仅发布 `out/`），建议删除 |

## 9. 常用命令

```bash
npm run dev          # 开发服务器（localhost:3000）
npm run build        # 静态导出到 out/（24 静态页面 / TypeScript 零错误）
npx serve out        # 本地预览
git push origin master   # 推送即部署
```

## 10. 交接清单

- [ ] 阅读本文档 §1-4
- [ ] `npm run build` 确认 24 静态页面构建通过
- [ ] `git status` 确认干净
- [ ] 确认当前 Phase（§5 或 §6）
- [ ] 完成后更新本文档
