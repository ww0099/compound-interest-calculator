# Handoff: Compound Interest Calculator — Phase 1 法律合规改造

> 本文档是会话交接文档。下一位 agent 从本文档开始执行所有任务。

---

## 1. 项目概况

**站点**：https://top.net.im  
**仓库**：https://github.com/ww0099/compound-interest-calculator  
**作者标识**：笔名 "WW0099"（对外保持统一）  
**目标**：通过 Google AdSense 审核 + 长期 SEO 流量变现  
**受众**：全球中英双语用户（英语为主，中文为辅）  
**性质**：YMYL（Your Money or Your Life）—— 金融计算器类，AdSense 审核标准极严

## 2. 当前状态

### 已有
- [x] 复利计算器核心功能（5 种求解模式 + 图表 + 对比 + 历史）
- [x] SEO 结构化数据（JSON-LD WebSite/SoftwareApplication/Organization）
- [x] Open Graph / Twitter Cards / canonical
- [x] ads.txt / robots.txt / sitemap.xml / .well-known/security.txt
- [x] Cloudflare + GitHub Pages 自动部署
- [x] 响应式设计、中英双语

### 缺失（AdSense 审核致命项）
- [ ] Privacy Policy（隐私政策）
- [ ] Terms of Service（服务条款）
- [ ] Disclaimer（金融免责声明）
- [ ] Contact（联系页面）
- [ ] Cookie Consent Banner（GDPR 合规）
- [ ] 支撑内容（20+ 篇文章）
- [ ] About 页面（具名作者+资质）
- [ ] 财务建议免责声明（仅作估算用途）
- [ ] 方法透明度（公式/假设/局限性说明）

### 被拒原因判断
拒信类型：**"low value content"**。原因组合：
1. 单页工具，无文章支撑
2. 无任何法律页面
3. 匿名运营（"WW0099" 无背景）
4. 知识版块为纯 AI 风格文本（2026.7 AI 透明度更新后高风险）

---

## 3. 技术栈

| 技术 | 版本 |
|------|------|
| Next.js | 16.2.6 |
| React | 19 |
| TypeScript | 5.7.3 |
| Tailwind CSS | 4.2.0 |
| shadcn/ui | BaseUI React |
| Chart.js | 4.5.1 |
| 构建方式 | `output: 'export'` 静态导出 |
| 部署 | GitHub Actions → GitHub Pages → Cloudflare CDN |

## 4. 代码约定

### 目录结构规范
```
app/
  page.tsx          ← 主页面
  layout.tsx        ← 根布局
  globals.css
  [route]/          ← 新页面按此模式（如 privacy/page.tsx）
    page.tsx
components/
  ui/               ← shadcn UI 组件（button, card, input...）
  *.tsx             ← 业务组件
lib/
  finance.ts        ← 纯函数计算引擎（无 UI 依赖）
  i18n.ts           ← 双语字典
  types.ts          ← 类型定义
  utils.ts          ← cn() 工具
spec/
  handoff.md        ← 本文档
public/
```

### 样式规范
- Tailwind CSS 4（`@import 'tailwindcss'`）
- CSS 变量：根变量定义在 `globals.css`
- 颜色方案：仅 light mode（`color-scheme: light`）
- shadcn class 风格：`data-slot="card"` 属性选择器

### 国际化
- 文件：`lib/i18n.ts` 含 `en` / `zh` 双字典
- 通过 `useState<Lang>` 切换（本地状态，无路由 i18n）
- 新页面需要同时提供英文和中文内容

### 构建约束
- 静态导出（`output: 'export'`）：无 API routes、无 server components、无 ISR
- 所有页面在构建时预渲染
- `next.config.mjs` 中 `images.unoptimized: true`
- `typescript.ignoreBuildErrors: true`（可移除以提高类型安全）

---

## 5. Phase 1 执行计划：法律合规页

### 任务清单

#### Task 1：创建 Privacy Policy 页面
**路径**：`app/privacy/page.tsx`

要求：
- 完整隐私政策，覆盖：
  - Google AdSense cookie 使用说明
  - 第三方广告数据收集
  - GDPR 用户权利（访问、更正、删除、数据可携）
  - CCPA 合规声明（California residents）
  - 联系方式
- 双语：英文为正文，中文作为下方切换或折叠段落
- 使用 `components/legal-layout.tsx` 保持统一样式
- 页面 metadata：title "Privacy Policy - Compound Interest Calculator"
- 日期：2026-07-30

#### Task 2：创建 Terms of Service 页面
**路径**：`app/terms/page.tsx`

要求：
- 完整服务条款覆盖：
  - 服务描述（在线计算工具，非财务建议）
  - 知识产权
  - 用户责任
  - 免责声明
  - 责任限制
  - 适用法律
- 双语
- metadata：title "Terms of Service - Compound Interest Calculator"

#### Task 3：创建 Disclaimer 页面
**路径**：`app/disclaimer/page.tsx`

要求 - 这是 AdSense YMYL 审查的关键页：
- 必须包含以下声明：
  - **"非专业财务建议"** — 工具仅提供数学估算
  - **精确性限制** — 计算结果不保证与真实市场一致
  - **投资决策** — 不构成投资建议，请咨询合格财务顾问
  - **无保证** — 不保证任何投资结果
  - **税务/通胀假设** — 简化模型，实际情况可能不同
- 双语
- metadata：title "Disclaimer - Compound Interest Calculator"

#### Task 4：创建 Contact 页面
**路径**：`app/contact/page.tsx`

要求：
- 联系方式（静态页，因 `output: 'export'` 无后端）：
  - Email：`pw3436858@gmail.com`（mailto 链接）
  - GitHub 仓库链接
  - 响应时间说明（48 小时内回复）
- 双语
- metadata：title "Contact Us - Compound Interest Calculator"

#### Task 5：创建 Legal Layout 组件
**路径**：`components/legal-layout.tsx`

要求：
- 复用 shadcn Card 组件
- 固定的最大宽度（`max-w-3xl`）
- 排版优化（大标题、段落间距、列表样式）
- 接受 `dict` props（或其他 i18n 方案）
- 页脚导航链接（Privacy · Terms · Disclaimer · Contact）

#### Task 6：添加 Cookie Consent Banner
**路径**：`components/cookie-consent.tsx`

要求：
- 底部固定 Banner，初始隐藏
- 检查 localStorage `cookieConsent` 标记
- 显示内容："This site uses cookies for analytics and personalized ads. See our [Privacy Policy](/privacy)."
- Accept 按钮，点击后写入 localStorage
- 使用 `useEffect` + `useState` 控制显示
- 样式：居中底部，毛玻璃/阴影效果

#### Task 7：更新 Root Layout
**路径**：`app/layout.tsx`

修改：
- 添加 SiteFooter 组件（包含所有法律页链接）
- 添加 CookieConsent 组件
- 统一页面底部样式

#### Task 8：更新 Sitemap
**路径**：`sitemap.xml`

添加新路由：
- `/privacy`
- `/terms`
- `/disclaimer`
- `/contact`

#### Task 9：创建 Phase 1 汇总检查页（可选）
**路径**：`app/legal/page.tsx` 或合并到 footer 中

---

## 6. 文章内容策略（Phase 2 预备）

### 选题方向（中英双语，每篇 1000+ 词）
1. Compound Interest vs Simple Interest: A 10-Year Comparison
2. The Rule of 72: How Fast Does Your Money Double?
3. How Much Will $500/Month Grow in 30 Years?
4. Inflation's Hidden Tax on Your Investment Returns
5. Monthly vs Annual Compounding: What's the Difference?
6. A Beginner's Guide to Retirement Planning with Compound Interest
7. Understanding Capital Gains Tax for Long-Term Investors
8. CAGR vs Average Return: Key Differences Explained

### AI 内容规避策略
- 每篇文章必须包含至少一个"原创数据"：
  - 自己用本计算器跑出来的数值表
  - 不同情景对比（利率 6% vs 8% vs 10%）
  - 引用外部权威来源（Investopedia, SEC, Federal Reserve）
- 人工调整段落结构，避免 AI 默认格式
- 添加具体数字和场景，而非泛泛而谈

---

## 7. 验证方式

```bash
# 构建验证
npm run build

# 检查输出的 static 文件
ls out/privacy/index.html
ls out/terms/index.html
ls out/disclaimer/index.html
ls out/contact/index.html
```
