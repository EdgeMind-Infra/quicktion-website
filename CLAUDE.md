# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发工作流

**IMPORTANT**：执行任何开发任务（编写代码、修改配置、添加依赖）前，必须先调用 `/dev-workflow` skill。它会加载项目知识库（`dev-notes/knowledge/`）中的最佳实践和踩坑记录，并在开发完成后引导更新知识库。

知识库主题：

- [dev-notes/knowledge/deployment-and-base-url.md](dev-notes/knowledge/deployment-and-base-url.md) — GitHub Pages 部署、`base` 配置、`withBase()` 工具、CI 工作流踩坑
- [dev-notes/knowledge/starlight-customization.md](dev-notes/knowledge/starlight-customization.md) — Starlight 组件覆盖、`customCss`、sidebar、i18n `root` locale、Tailwind 桥接
- [dev-notes/knowledge/toolchain.md](dev-notes/knowledge/toolchain.md) — Tailwind v4、Biome、pnpm `packageManager` 字段、Astro 构建约定

## Project Overview

巨象 Quicktion 官网——基于 Astro 6 + Starlight 0.38 的**营销首页 + 帮助中心**混合站点，部署在 GitHub Pages（`https://edgemind-infra.github.io/quicktion-website/`）。中文为源语言，英文在 `/en/` 前缀下。

## Commands

```bash
pnpm dev              # 开发服务器 :4321
pnpm build            # 生产构建到 dist/（含 TypeScript 检查 + Pagefind 索引）
pnpm preview          # 预览构建产物
pnpm lint             # Biome 检查
pnpm lint:fix         # Biome 自动修复
pnpm format           # 仅格式化
```

本项目没有测试套件（营销站 + 文档站不需要）。类型错误只在 `pnpm build` 时暴露——`pnpm lint` 不能检查 `.astro` 文件内的 TypeScript。

## Architecture

### 双入口：Marketing 页面与 Starlight 文档并存

首页和定价等营销页**不走 Starlight**——它们在 `src/pages/*.astro` 下，用 `src/layouts/MarketingLayout.astro` 渲染自己的 HTML / nav / footer，完全品牌化。

帮助中心（`/help/*`）走 Starlight——内容在 `src/content/docs/help/` 下的 MDX，通过 `astro.config.mjs` 的 `sidebar` 配置出现在左侧导航。

这个分离的原因：Starlight 的 `template: splash` 仍保留 header/footer，对品牌化改造约束太大；而首页只有一个路由，不需要 Starlight 的内容集合机制。**代价**：首页没有 Pagefind 搜索框和语言切换器——这些只在 `/help/...` 下生效。

### 路由与 i18n

```
/                              → src/pages/index.astro (MarketingLayout)
/help/quick-start/what-is/     → src/content/docs/help/quick-start/what-is.mdx (Starlight, zh)
/en/help/quick-start/what-is/  → src/content/docs/en/help/quick-start/what-is.mdx (Starlight, en)
```

中文是**源语言**，通过 Starlight 的 `locales.root` 特殊 key 放在根路径（无 URL 前缀）。英文内容目录放在 `src/content/docs/en/`。`defaultLocale: "root"` 不是 `"zh-cn"`——`root` 是约定的特殊 key。

### base URL 在自定义组件里的处理

部署到 `/quicktion-website/` 子路径下意味着所有内链需要 base 前缀。**Starlight 自己渲染的链接自动处理**；但 `MarketingLayout.astro`、`SiteTitle.astro` 等**自定义 Astro 组件里所有手写的 href 都必须通过 [src/lib/paths.ts](src/lib/paths.ts) 的 `withBase()` 拼接**——不能直接 `` `${import.meta.env.BASE_URL}foo` ``，因为 `BASE_URL` 在 `base` 无末尾 `/` 时也没末尾 `/`，直接拼接产生 `/quicktion-websitefoo` 的 404。

### Provider/Integration Stack (`astro.config.mjs`)

- `starlight(...)` — 文档壳、侧边栏、搜索、i18n、组件覆盖（目前只覆盖了 `SiteTitle`）
- `react()` — 预留用于复杂交互岛（当前首页用纯 `<script>` 而非 React，保持 JS 最小）
- `tailwindcss()` via `vite.plugins` — Tailwind v4 的 Vite 插件方案，**不是**已废弃的 `@astrojs/tailwind`

Starlight 与 Tailwind 共用需要 `@astrojs/starlight-tailwind` 桥接包，CSS 的 `@layer` 顺序必须是 `base, starlight, theme, components, utilities`（见 [src/styles/global.css](src/styles/global.css)）。

### Sidebar 配置是手动维护的

新增帮助中心 MDX 页面后**必须**同步更新 `astro.config.mjs` 的 `sidebar` 数组——它不是自动扫描的。每条有 `slug`（相对于 `src/content/docs/`，不带 locale、不带 base）和 `translations: { en: '...' }` 两个必填字段。

### Deployment

GitHub Actions（`.github/workflows/deploy.yml`）两阶段：`build` 用 `withastro/action@v3` → `deploy` 用 `actions/deploy-pages@v4`。**不能**在 workflow 里指定 `package-manager: pnpm@latest`——会和 `package.json` 的 `packageManager: pnpm@10.23.0` 冲突报错。

切换自定义域名：改 `astro.config.mjs` 的 `site`，**删除** `base` 字段。`withBase()` 在无 base 情况下退化成 no-op，无需改代码。

## Code Style

Biome 统一管 lint 和 format（无 ESLint / Prettier）：2 空格缩进、100 字符行宽、双引号、末尾分号、逗号。`.astro` 文件不被 Biome lint——依赖 `pnpm build` 捕获类型错。

## Path Alias

无别名配置——`tsconfig.json` extends `astro/tsconfigs/strict`，所有 import 用相对路径。
