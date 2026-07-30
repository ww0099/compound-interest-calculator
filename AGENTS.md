# Compound Interest Calculator

> Next.js 16 静态复利计算器站点，部署于 `https://top.net.im`。
> 目标：Google AdSense 盈利，面向全球中英双语用户（YMYL 类）。

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
- [x] Phase 2：内容建设（8 篇中英双语金融文章 + 博客首页）
- [x] SEO 基础（JSON-LD / OG / Twitter / sitemap / robots.txt）
- [x] Cookie 同意横幅 + SiteFooter
- [x] **Phase 3：E-E-A-T 强化**（About / Methodology / References / 信任标识 / About Widget）
- [ ] Phase 4：SEO 规模化（多计算器 / 内链外链 / 性能优化）

## 页面路由（19 条）

| 路由 | 说明 |
|------|------|
| `/` | 主页（计算器） |
| `/about` | 关于我们（作者介绍 + 透明度声明） |
| `/methodology` | 方法论（公式 + 假设与局限性） |
| `/references` | 参考文献（权威外部引用） |
| `/privacy` | 隐私政策 |
| `/terms` | 服务条款 |
| `/disclaimer` | 金融免责声明 |
| `/contact` | 联系我们 |
| `/blog` | 博客首页（8 篇文章列表） |
| `/blog/compound-vs-simple-interest` | 复利 vs 单利 |
| `/blog/rule-of-72` | 72 法则 |
| `/blog/500-per-month-30-years` | 每月 $500 × 30 年 |
| `/blog/inflation-hidden-tax` | 通胀隐形税收 |
| `/blog/monthly-vs-annual-compounding` | 复利频率对比 |
| `/blog/beginner-guide-retirement` | 退休规划入门 |
| `/blog/capital-gains-tax` | 资本利得税 |
| `/blog/cagr-vs-average-return` | CAGR vs 平均回报 |

## 核心约定

- **语言**：中英双语（页面各自定义 `en/zh` 内容字典，通过 `useState<Lang>` 切换）
- **样式**：仅 light mode，`primary: #1a365d`，组件用 shadcn Card 包裹
- **中文引号**：JS 字符串内使用 `「」`，**禁止** ASCII `"`
- **构建验证**：提交前必须 `npm run build`（`git push` 触发 CI 自动部署）
- **分支**：`master` → 推送即部署
