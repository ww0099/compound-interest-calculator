# Compound Interest Calculator

> Next.js 16 静态复利计算器站点，部署于 `https://top.net.im`。
> 目标：Google AdSense 盈利，面向全球英文用户（YMYL 类，纯英文单语言站点）。

## 快速链接

- **交接文档（SSOT）**：[spec/handoff.md](spec/handoff.md) — 下次任务的唯一入口
- 仓库：`github.com/WW0099/compound-interest-calculator`
- 站点：`https://top.net.im`

## 技术栈

| 技术 | 版本 |
|------|------|
| Next.js | 16.2.6（App Router） |
| React | 19 |
| TypeScript | 5.7.3 |
| Tailwind CSS | 4.2.0 |
| shadcn/ui | BaseUI React |
| Chart.js | 4.5.1 |
| 构建 | `output: 'export'`（纯静态） |
| 部署 | GitHub Actions → GitHub Pages → Cloudflare CDN |

## 当前进度

- [x] 核心计算器（5 种求解模式 + 图表 + 对比 + 历史）
- [x] Phase 1：法律合规页（Privacy / Terms / Disclaimer / Contact）
- [x] Phase 2：内容建设（8 篇英文金融文章 + 博客首页）
- [x] SEO 基础（JSON-LD / OG / Twitter / sitemap / robots.txt）
- [x] Cookie 同意横幅 + SiteFooter
- [x] **Phase 3：E-E-A-T 强化**（About / Methodology / References / 信任标识 / About Widget）
- [x] **Phase 4 Tier 1**：TS 修复 + ignoreBuildErrors:false + 性能优化
- [x] **Phase 4 Tier 2**：JSON-LD 结构化数据（Article×8 + BreadcrumbList + FAQPage）+ 博客内链×16
- [x] **Phase 4 Tier 3**：共享基础设施重构 + 退休计算器 `/retirement` + 通胀计算器 `/inflation`
- [x] **Phase 5：贷款计算器** `/loan`（4 求解模式 + 摊销表）+ HistoryPanel 泛化 + 全站 BreadcrumbList + HowTo Schema
- [x] **AdSense 审核准备**（`spec/adsense-readiness.md`）+ 第 10 篇博客「货币时间价值」
- [x] **全站英文化重构**：移除中英互译，纯英文站点（commit 878c996）
- [x] **sitemap 部署修复**：`sitemap.xml` 移入 `public/`
- [ ] Lighthouse / Core Web Vitals 实测审计

## 页面路由（23 内容路由 / 24 静态页面）

| 路由 | 说明 |
|------|------|
| `/` | 主页（复利计算器） |
| `/retirement` | 退休计算器（积累期 + 领取期 + 4% 法则） |
| `/inflation` | 通胀计算器（购买力 + 所需名义金额） |
| `/loan` | 贷款计算器（4 求解模式 + 摊销表） |
| `/about` | 关于我们（作者介绍 + 透明度声明） |
| `/methodology` | 方法论（公式 + 假设与局限性） |
| `/references` | 参考文献（权威外部引用） |
| `/privacy` | 隐私政策 |
| `/terms` | 服务条款 |
| `/disclaimer` | 金融免责声明 |
| `/contact` | 联系我们 |
| `/blog` | 博客首页（10 篇文章列表） |
| `/blog/dollar-cost-averaging` | 定投摊平（DCA） |
| `/blog/compound-vs-simple-interest` | 复利 vs 单利 |
| `/blog/rule-of-72` | 72 法则 |
| `/blog/500-per-month-30-years` | 每月 $500 × 30 年 |
| `/blog/inflation-hidden-tax` | 通胀隐形税收 |
| `/blog/monthly-vs-annual-compounding` | 复利频率对比 |
| `/blog/beginner-guide-retirement` | 退休规划入门 |
| `/blog/capital-gains-tax` | 资本利得税 |
| `/blog/cagr-vs-average-return` | CAGR vs 平均回报 |
| `/blog/time-value-of-money` | 货币时间价值（TVM） |

## 核心约定

- **语言**：**纯英文**（无语言切换；`lib/i18n.ts` 只导出英文 dict；locale 统一 `en-US`）
- **样式**：仅 light mode，`primary: #1a365d`，组件用 shadcn Card 包裹
- **构建验证**：提交前必须 `npm run build`（`git push` 触发 CI 自动部署）
- **分支**：`master` → 推送即部署
