# 部署与 base URL

## 概览

本主题覆盖 GitHub Pages 部署的所有细节：`site` + `base` 配置、仓库子路径下的链接拼接陷阱、CI 工作流踩坑、切换自定义域名的步骤。本项目的部署地址是 `https://edgemind-infra.github.io/quicktion-website/`。

## base URL 拼接

### `import.meta.env.BASE_URL` 不保证有末尾斜杠

`astro.config.mjs` 里 `base: '/quicktion-website'`（无末尾 /）时，`import.meta.env.BASE_URL` 返回的也是 `/quicktion-website`（无末尾 /）。直接模板拼接会产生坏链接。

**不要做**：

```astro
<!-- ❌ 生成 href="/quicktion-websitehelp/..." 的 404 -->
<a href={`${import.meta.env.BASE_URL}help/quick-start/`}>帮助</a>
```

**正确做法**：使用 [src/lib/paths.ts](../../src/lib/paths.ts) 的 `withBase()`——总是显式插入 `/` 再折叠重复斜杠：

```astro
---
import { withBase } from "../lib/paths";
const helpHref = withBase("/help/quick-start/what-is/");
---
<a href={helpHref}>帮助</a>
```

**相关文件**：[src/lib/paths.ts](../../src/lib/paths.ts)、[src/layouts/MarketingLayout.astro](../../src/layouts/MarketingLayout.astro)、[src/components/overrides/SiteTitle.astro](../../src/components/overrides/SiteTitle.astro)

### Starlight 自己渲染的链接不受这个坑影响

Starlight 侧边栏、文档间链接、TOC 都会自动加 base 前缀，不需要手动处理。坑**只存在于自定义 `.astro` 组件和 `<Layout>` 的 head 资源引用里**（favicon、分享图、canonical URL 等）。

**判断方法**：构建后 `grep -oE 'href="[^"]*"' dist/index.html` 检查，所有内链应以 `/quicktion-website/` 开头。

## GitHub Pages 部署

### `astro.config.mjs` 配置

```js
export default defineConfig({
  // site 只填 origin（不含 base 路径），base 单独设
  site: "https://edgemind-infra.github.io",
  base: "/quicktion-website",  // 有头 /，无末尾 /
  // ...
});
```

**为什么 site 不含 base**：Starlight 的绝对 URL（sitemap、canonical、OG）内部会把 `site + base` 自动拼接。手动在 `site` 里加 base 会双重前缀。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)

### 首次部署必须手动启用 Pages

仓库创建后 Actions 能跑、能 build，但 **deploy 步骤会 404**，错误提示 `Ensure GitHub Pages has been enabled`。

**解决**：仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。启用后重跑工作流即可。

**GH CLI 能否自动启用**：需要 token 带 Pages admin 权限，普通 `repo + workflow` scope 不够。只能手动。

### `withastro/action@v3` 与 `packageManager` 字段冲突

如果 `package.json` 有 `packageManager: "pnpm@10.23.0"`，**不要**在 workflow 里同时指定 `package-manager: pnpm@latest`——`pnpm/action-setup` 检测到双重指定会直接报 `ERR_PNPM_BAD_PM_VERSION` 失败。

**不要做**：

```yaml
- uses: withastro/action@v3
  with:
    node-version: 22
    package-manager: pnpm@latest   # ❌ 与 package.json 冲突
```

**正确做法**：省略 `package-manager`，让 action 从 `pnpm-lock.yaml` + `packageManager` 字段自动推断：

```yaml
- uses: withastro/action@v3
  with:
    node-version: 22
```

**相关文件**：[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml)

### dist 输出不含 base 前缀

Astro 构建出的 `dist/` 目录下，文件路径**不**包含 `base` 前缀——`dist/help/quick-start/what-is/index.html` 而非 `dist/quicktion-website/help/...`。这是 Astro 有意设计：GitHub Pages 服务 repo 页面时自动把内容映射到 `/{repo}/` 下，所以 dist 直接是相对内容即可。

**不要**试图在 dist 里创建子目录——会双重前缀。

## 切换自定义域名

未来如果启用 `quicktion.ai` 等自定义域名：

1. 仓库 **Settings → Pages** 填自定义域名（GitHub 会自动在 `public/` 下生成 `CNAME` 文件）
2. 修改 [astro.config.mjs](../../astro.config.mjs)：
   - `site` 改为 `https://quicktion.ai`
   - **删除** `base` 字段
3. 修改完成后构建的链接会从 `/quicktion-website/help/...` 变回 `/help/...`——因为根路径现在就是站点根

切换后 `withBase()` 会退化成 no-op（BASE_URL = `/`），不需要改代码。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)

## CI 工作流结构

[.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) 是两阶段：`build`（用 `withastro/action`）→ `deploy`（用 `actions/deploy-pages`）。不要合并——分离让权限最小化（build 作业不需要 `pages: write`）。

`concurrency: { group: pages, cancel-in-progress: false }` 保证同时只有一个部署，但已开始的部署不被抢占——避免"新提交把正在上线的版本中断到一半"。
