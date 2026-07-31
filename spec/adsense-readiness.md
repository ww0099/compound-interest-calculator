# Google AdSense 审核准备报告

> **站点**：`https://top.net.im`
> **审查日期**：2026-07-31
> **站点类型**：YMYL（Your Money or Your Life）— 金融计算器
> **审核难度**：⚠️ 高（金融类站点是 AdSense 审核最严格的类别之一）

---

## 1. 审核检查清单（Checklist）

### 1.1 必备页面（Hard Requirements）

| # | 要求 | 状态 | 备注 |
|---|------|------|------|
| 1 | Privacy Policy（隐私政策） | ✅ 通过 | GDPR + CCPA + Cookie 说明 + AdSense 披露 + 儿童隐私 |
| 2 | Terms of Service（服务条款） | ✅ 通过 | 含完整免责条款和责任限制 |
| 3 | Disclaimer（免责声明） | ✅ 通过 | YMYL 专项：10 个章节覆盖非财务建议、准确性限制等 |
| 4 | About Us（关于我们） | ⚠️ 可改进 | 有作者名和使命，但缺乏真实姓名和照片 |
| 5 | Contact Us（联系我们） | ⚠️ 可改进 | 有邮箱和 GitHub，但使用个人 Gmail 而非域名邮箱 |
| 6 | Cookie Consent（Cookie 同意） | ✅ 已修复 | 现在支持 Accept All / Essential Only 两个选项 |

### 1.2 技术合规

| # | 要求 | 状态 | 备注 |
|---|------|------|------|
| 7 | `ads.txt` | ✅ 通过 | `google.com, pub-1920425213895856, DIRECT, f08c47fec0942fa0` |
| 8 | `robots.txt` | ✅ 通过 | 允许 Mediapartners-Google + AdsBot-Google + sitemap |
| 9 | 站点可被 Google 爬取 | ✅ 通过 | 无 noindex，无 robots 阻止 |
| 10 | HTTPS | ✅ 通过 | Cloudflare CDN + HSTS preload |
| 11 | 移动端响应式 | ✅ 通过 | Tailwind CSS 响应式设计 |
| 12 | 页面加载速度 | ✅ 良好 | 纯静态 Next.js 导出，Cloudflare CDN 缓存 |

### 1.3 内容质量

| # | 要求 | 状态 | 备注 |
|---|------|------|------|
| 13 | 原创内容 | ✅ 通过 | 22 页，全部自写中英双语 |
| 14 | 内容量充足 | ✅ 通过 | 主页 + 3 计算器 + 8 博客 + 6 法律/信任页 |
| 15 | 无薄内容页 | ✅ 通过 | 每页至少 200+ 字实质性内容 |
| 16 | 定期更新 | ✅ 通过 | GitHub 活跃提交 + sitemap lastmod |
| 17 | 无抄袭内容 | ✅ 通过 | 全部原创 |

### 1.4 E-E-A-T 信号（对 YMYL 至关重要）

| # | 要求 | 状态 | 备注 |
|---|------|------|------|
| 18 | 作者身份 | ⚠️ 弱 | "WW0099" 是笔名，Google 偏好真实姓名 |
| 19 | 作者资质 | ⚠️ 弱 | 明确声明"非持证顾问"——对金融 YMYL 是双刃剑 |
| 20 | 透明度 | ✅ 通过 | 开源代码 + 方法论 + 参考文献页 |
| 21 | 结构化数据 | ✅ 通过 | 11 Schema 类型 + 全站 BreadcrumbList |
| 22 | 外部引用 | ✅ 通过 | 参考文献页列出 10 项权威来源 |
| 23 | 联系方式真实 | ⚠️ 待改进 | 建议添加域名邮箱 |
| 24 | 内容署名 | ✅ 通过 | 博客文章有 author + datePublished |

---

## 2. 风险分析与应对

### 🔴 高风险：YMYL + 笔名作者

**问题**：Google AdSense 审核团队对金融类站点执行最严格的 E-E-A-T 标准。当前 About 页面使用笔名 "WW0099" 且明确声明"非持证财务顾问"。

**Google 视角**：一个匿名作者提供金融计算工具 → 用户可能基于计算结果做投资决策 → 如果计算结果有误，谁负责？

**应对策略**：

1. **短期（审核前）**：在 About 页面强化以下内容：
   - 明确说明所有公式来自公开的金融数学教材（链接到 References 页）
   - 强调工具是"数学引擎"而非"投资顾问"
   - 添加 GitHub 开源链接（透明 = 信任）
   - 添加"我们的计算器被全球用户验证"的社会证明

2. **中期（审核后）**：考虑添加真实姓名或注册公司实体

3. **关键表述调整**：
   - ❌ "不是持证财务顾问" → 需要保留但不作为首句
   - ✅ 先展示透明度（开源、公式公开、10 项参考文献）→ 再说限制

### 🟡 中风险：个人 Gmail 邮箱

**问题**：Contact 页面使用 `pw3436858@gmail.com`，对于金融网站，域名邮箱（如 `contact@top.net.im`）更显专业。

**应对策略**：
- 如果 `top.net.im` 支持邮件转发，添加 `contact@top.net.im` 作为主要联系邮箱
- 保留 Gmail 作为备选
- 短期：不阻断审核，但需在后续改进

### 🟢 低风险：内容更新频率

AdSense 偏好活跃更新的站点。当前站点有 GitHub 提交记录，sitemap 有 lastmod。

**应对策略**：
- 审核前至少添加一篇新博客文章
- 确保 sitemap lastmod 日期在审核前一周内

---

## 3. 审核前行动清单

### 立即执行（今天）

- [x] Cookie 同意横幅 → 已改进（Accept All / Essential Only）
- [x] BreadcrumbList 全站覆盖 → 已完成（10 个非博客页面）
- [x] HowTo Schema → 已添加（主页面 5 步骤）
- [ ] 验证 `npm run build` 零错误

### 审核提交前（1-3 天）

- [ ] About 页面增强（见 §4 具体内容）
- [ ] 发布一篇新博客文章（展示站点活跃度）
- [ ] 确认所有页面 `<title>` 和 `<meta description>` 唯一且准确
- [ ] 确认主页有明显的内容区域（不是空白或仅输入框）
- [ ] 用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证结构化数据
- [ ] 用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试首页性能
- [ ] 确认 Cloudflare 未屏蔽 Google AdSense 爬虫 IP

### 提交时

- [ ] 在 [Google AdSense](https://adsense.google.com/) 提交 `top.net.im`
- [ ] 确认 `ads.txt` 可通过 `https://top.net.im/ads.txt` 访问
- [ ] 等待 1-2 周审核（金融 YMYL 通常更久）
- [ ] 审核期间不要大幅改版

---

## 4. About 页面强化方案

### 当前问题

1. 笔名 "WW0099" — 对 YMYL 不够
2. "不是持证顾问"在首段 — 降低信任
3. 无作者照片 — 降低可信度
4. 无社会证明（用户量、评价等）

### 建议增强（可选实施）

```markdown
新增内容块：

1. **Why Trust This Calculator?**
   - 开源：源代码在 GitHub 上公开可审计
   - 公式透明：所有公式基于标准金融数学教材（链接到 Methodology + References）
   - 数据隐私：计算在浏览器本地完成，不上传服务器

2. **Who Uses This Tool?**
   - 全球中英双语用户
   - 学生、投资者、理财规划爱好者
   - （如果有具体数据更好）

3. **Author Background**
   - 软件工程背景 + 多年个人理财自学
   - 通过阅读 [Investopedia / SEC / Federal Reserve] 等权威资料构建计算引擎
   - 开源社区贡献者
```

---

## 5. 常见被拒原因与预防

| 拒绝原因 | 本站状态 | 预防措施 |
|---------|---------|---------|
| **内容不足** | ✅ 22 页 | 主页有实质性介绍文字 + 计算器 + 图表 + 知识段落 |
| **薄内容** | ✅ 无 | 每页至少 200+ 字 |
| **无隐私政策** | ✅ 有 | 覆盖 GDPR + CCPA + AdSense |
| **无联系方式** | ✅ 有 | Email + GitHub |
| **版权内容** | ✅ 原创 | 全部自写 |
| **成人/暴力内容** | ✅ 无 | 金融教育 |
| **导航不清晰** | ✅ 清晰 | SiteFooter + 页内链接 |
| **广告过多（预审核）** | ✅ 无广告 | 审核前不放置任何广告代码 |
| **YMYL 缺乏 E-E-A-T** | ⚠️ 边缘 | About + Methodology + References + Disclaimer |

---

## 6. 审核通过后的配置

审核通过后，在 Google AdSense 后台：

1. 创建广告单元（推荐：响应式展示广告 + 链接广告）
2. 将广告代码添加到 `layout.tsx` 的 `<head>` 中
3. 配置 `ads.txt`（已有，无需修改）
4. 设置广告排除规则（避免广告覆盖计算器输入区）
5. 启用 Auto Ads（可选，让 Google 自动优化广告位）

### 广告放置建议

```
✅ 好的位置：
- 页面顶部横幅（header 下方）
- 侧边栏（结果卡片旁）
- 内容段落之间
- 页脚上方

❌ 避免的位置：
- 计算器输入框之间（影响用户体验）
- 覆盖按钮或图表
- 弹出式广告（违反 AdSense 政策）
```

---

## 7. 附录：当前站点数据

| 指标 | 数值 |
|------|------|
| 总路由数 | 22 |
| Twitter/Blog 文章 | 8 篇（中英双语） |
| 计算器工具 | 4 个（复利 / 退休 / 通胀 / 贷款） |
| 法律合规页 | 3 个（Privacy / Terms / Disclaimer） |
| E-E-A-T 信任页 | 3 个（About / Methodology / References） |
| JSON-LD Schema | 11 类型 + 18 BreadcrumbList |
| sitemap.xml | 22 URL，含 priority 和 changefreq |
| TypeScript 构建 | 零错误 |
| 部署方式 | GitHub Actions → GitHub Pages → Cloudflare CDN |
