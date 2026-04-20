# 巨象 Quicktion 官网

基于 Astro 6 + Starlight 0.38 + Tailwind CSS v4 的营销官网 + 帮助中心。

## 技术栈

- **Astro 6** — Islands 架构，静态优先，SEO 最优
- **Starlight 0.38** — 文档框架（左侧导航、右侧目录、全文搜索、i18n）
- **Tailwind CSS v4** — 通过 `@tailwindcss/vite` 插件集成
- **@astrojs/starlight-tailwind** — Starlight 与 Tailwind 的主题桥接
- **React 19** — 预留用于需要客户端水合的复杂交互岛
- **Biome 2.4** — 统一 lint + format（替代 ESLint + Prettier）
- **pnpm 10** — 包管理
- **Pagefind** — Starlight 内置全文搜索

## 目录结构

```
src/
├── pages/
│   └── index.astro                # 首页（品牌营销 Hero，完全绕开 Starlight 壳）
├── layouts/
│   └── MarketingLayout.astro       # 营销页共享布局（独立 nav + footer）
├── components/
│   ├── home/                       # 首页模块：Hero / FeatureTabs / AgentShowcase / CTA
│   └── overrides/                  # Starlight 组件覆盖（SiteTitle 等）
├── content/docs/
│   └── help/                       # 帮助中心（→ Starlight 渲染）
│       ├── quick-start/            # 快速开始
│       ├── getting-started/        # 使用入门
│       └── advanced/               # 更多了解
├── styles/
│   └── global.css                  # Tailwind v4 + Starlight 主题变量（品牌橙色）
└── assets/                         # 图标、插图等静态资源
```

## 开发命令

```bash
pnpm install          # 安装依赖
pnpm dev              # 启动开发服务器 :4321
pnpm build            # 生产构建到 dist/
pnpm preview          # 预览构建产物
pnpm lint             # Biome 检查
pnpm lint:fix         # 自动修复
pnpm format           # 格式化
```

## 国际化

- **源语言：中文**（在根路由 `/`、`/help/...`）
- **英文**：在 `/en/` 前缀下（`/en/help/...`）
- 添加英文翻译：在 `src/content/docs/en/` 下创建同结构 MDX

## 部署

### GitHub Pages（默认）

推送到 `main` 分支，GitHub Actions 自动构建并部署到 GitHub Pages。

- 工作流文件：`.github/workflows/deploy.yml`
- 访问地址：`https://edgemind-infra.github.io/quicktion-website/`
- 第一次部署前需要在仓库 **Settings → Pages → Build and deployment → Source** 里选择 **GitHub Actions**

### 切换到自定义域名

1. 在仓库 Settings → Pages 绑定自定义域名（会自动生成 `public/CNAME`）
2. 修改 `astro.config.mjs`：
   - `site` 改为正式域名
   - **删除** `base` 字段

## 添加帮助中心文档

1. 在 `src/content/docs/help/<分组>/` 下创建 `.mdx` 文件
2. 在 `astro.config.mjs` 的 `sidebar` 数组中加上对应的 `slug` 项
3. 英文翻译放到 `src/content/docs/en/help/<分组>/` 下同名文件

## 品牌定制

全局 CSS 变量在 `src/styles/global.css` 的 `@theme` 块中：

- `--color-accent-*` 控制 Starlight 的主色调（文档站的链接、按钮、选中态）
- `--color-gray-*` 控制中性色（采用 stone 暖灰）

首页的品牌色变量在 `MarketingLayout.astro` 中独立定义（不受 Starlight 主题影响）。
