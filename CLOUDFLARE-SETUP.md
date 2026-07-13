# Cloudflare 配置指南 — top.net.im

## 当前架构

```
GitHub (master) → GitHub Actions → GitHub Pages (gh-pages branch)
                    ↑                        ↓
                    |              Cloudflare DNS Proxy (CDN)
                    |                        ↓
                    ユーザー ← ← ← ← ←  https://top.net.im
```

## Cloudflare DNS 设置（必需）

在 Cloudflare Dashboard → DNS → Records：

| 类型 | 名称 | 目标 | 代理状态 |
|------|------|------|----------|
| CNAME | @ | ww0099.github.io | ☁️ Proxied（橙色云） |
| CNAME | www | ww0099.github.io | ☁️ Proxied（橙色云） |

> ⚠️ `top.net.im` 是 `.im` 域名（马恩岛），不支持 Cloudflare Registrar 转移，保持当前注册商即可。

## SSL/TLS 设置

**Cloudflare Dashboard → SSL/TLS → 概述**

选择：**全面（Full）** 或 **全面（严格/Full Strict）**

- 不要选"灵活（Flexible）"——用户到 Cloudflare 是 HTTPS，但 Cloudflare 到 GitHub Pages 必须也是 HTTPS
- GitHub Pages 原生支持 HTTPS，所以 Full 模式完美工作

## Cloudflare 缓存规则（推荐）

### 规则 1: 静态资源长期缓存
- **字段**: URI Path
- **操作符**: 开头为
- **值**: `/_next/static/`
- **缓存状态**: 符合条件时缓存
- **Edge TTL**: 30 天

### 规则 2: HTML 短期缓存
- **字段**: URI Path
- **操作符**: 结尾为
- **值**: `.html`
- **缓存状态**: 符合条件时缓存
- **Edge TTL**: 1 小时

## 自动化部署流程

1. `git push` 到 `master` 分支
2. GitHub Actions 自动执行：
   - `npm ci` → 安装依赖
   - `npm run build` → Next.js 静态导出到 `out/`
   - `peaceiris/actions-gh-pages` → 部署到 `gh-pages` 分支
3. GitHub Pages 自动从 `gh-pages` 分支提供服务
4. Cloudflare 自动缓存并分发到全球 CDN

## Cloudflare Pages 说明

本项目不使用 Cloudflare Pages 的内置构建功能。
如果 Cloudflare Dashboard 中有一个 Cloudflare Pages 项目与 `top.net.im` 关联，
并且你在 Cloudflare 侧遇到构建失败，请到以下路径**删除 Cloudflare Pages 项目**：

**Cloudflare Dashboard → Workers & Pages → (选择项目) → Settings → Delete Project**

因为构建已经在 GitHub Actions 中完成了，Cloudflare 只需要做 DNS 代理。
Cloudflare Pages 构建与 GitHub Pages 是两条不同的路，同时开启会造成冲突。

## 清除缓存

如果网站更新后看不到变化：

```bash
# 方法 1: Cloudflare Dashboard
# Cache → 清除缓存 → 自定义清除 → 输入 https://top.net.im/*

# 方法 2: API
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## 故障排除

### 网站打不开
1. 检查 GitHub Actions 状态: https://github.com/ww0099/compound-interest-calculator/actions
2. 检查 GitHub Pages 状态: https://github.com/ww0099/compound-interest-calculator/settings/pages
3. 检查 Cloudflare DNS 记录是否正确

### HTTPS 证书错误
1. Cloudflare SSL/TLS → 边缘证书 → 确认"通用 SSL"已启用
2. 等待最多 24 小时让证书生效

### 404 错误
1. 确认 `gh-pages` 分支有最新的 `index.html`
2. 确认 CNAME 文件存在于 `gh-pages` 分支根目录
