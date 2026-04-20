# Starlight 定制化

## 概览

本主题覆盖在不放弃 Starlight 的前提下做品牌级定制的所有机制：组件覆盖（`components` 字段）、自定义 CSS（`customCss`）、侧边栏配置、i18n（`root` locale 的特殊用法）、Tailwind v4 主题桥接。Starlight 版本 ≥ 0.38。

## 组件覆盖

### 覆盖机制是"替换"而非"扩展"

`components: { Header: './...' }` 里的组件**完全替换**默认组件。如果只想加一点东西，需要在你的 Astro 文件里手动 import 默认组件再包裹：

```astro
---
import Default from '@astrojs/starlight/components/Header.astro';
---
<Default><slot /></Default>
<div class="extra">额外内容</div>
```

常用覆盖点：`SiteTitle`、`Header`、`Sidebar`、`Footer`、`Hero`、`SocialIcons`、`PageFrame`、`TwoColumnContent`。全部列表见 [Starlight 文档](https://starlight.astro.build/reference/overrides/)。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)、[src/components/overrides/SiteTitle.astro](../../src/components/overrides/SiteTitle.astro)

### 覆盖组件里的链接必须用 withBase()

和 `MarketingLayout.astro` 同一个坑——`Astro.locals.starlightRoute` 里的 `locale` 等字段不带 base 前缀，你必须手动加。详见 [deployment-and-base-url.md](./deployment-and-base-url.md)。

## 自定义 CSS 与 Tailwind 桥接

### 必须装 `@astrojs/starlight-tailwind`

Starlight + Tailwind 不是简单加个 `@import "tailwindcss"` 就行。Starlight 有自己的样式层（`@layer starlight`），Tailwind 的 theme/utilities 需要**精确的层级顺序**才能互不干扰。必须装桥接包：

```bash
pnpm add @astrojs/starlight-tailwind
```

然后在 [src/styles/global.css](../../src/styles/global.css) 里：

```css
@layer base, starlight, theme, components, utilities;

@import "@astrojs/starlight-tailwind";
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@theme {
  /* 你的品牌 token 放这 */
  --color-accent-500: #ff6b35;
  /* ... */
}
```

**不要做**：按 Tailwind v4 官方文档那样只写 `@import "tailwindcss"`——会和 Starlight 的 base 层打架，颜色混乱。

**相关文件**：[src/styles/global.css](../../src/styles/global.css)、[astro.config.mjs](../../astro.config.mjs)（`customCss` 字段）

### Starlight 主色调色板用 50-950 尺度

Starlight 的 `--sl-color-accent` 来自 `--color-accent-*`（50 到 950 共 11 个 shade）。要改品牌色必须全部提供，缺一个会在某些状态（hover、active、dark mode）下回退到默认。

可以直接映射 Tailwind 预设：

```css
--color-accent-500: var(--color-orange-500);
```

或手写品牌色（本项目的 Quicktion 橙色）：

```css
--color-accent-500: #ff6b35;
--color-accent-600: #ff5500;
/* ... */
```

**相关文件**：[src/styles/global.css](../../src/styles/global.css)

## i18n

### `root` 是特殊的 locale key

Starlight i18n 里 `locales.root` 表示"无 URL 前缀的 locale"。本项目中文是源语言，所以：

```js
locales: {
  root: { label: "简体中文", lang: "zh-CN" },  // /help/...
  en: { label: "English", lang: "en" },         // /en/help/...
}
```

配合 `defaultLocale: "root"`——不是 `defaultLocale: "zh-cn"`。如果不设置 `defaultLocale` 也行，Starlight 会自动把 `root` 当默认。

**不要做**：同时写 `locales.zh` 和 `locales.root`——会产生两套 URL（`/help/` 和 `/zh/help/`），混乱。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)

### 内容目录结构跟随 locale

- `src/content/docs/help/...` → zh 根路由（因为 root）
- `src/content/docs/en/help/...` → en `/en/` 前缀

en 目录可以部分缺失，缺失的页面 Starlight 会自动回退到默认 locale 并展示一条"未翻译"提示。

**相关文件**：[src/content/docs/](../../src/content/docs/)

### sidebar 配置里的 slug 不带前缀

`astro.config.mjs` 的 `sidebar` 数组里的 `slug` 是相对于 `src/content/docs/` 的路径，**不**带 base、不带 locale：

```js
sidebar: [
  { slug: "help/quick-start/what-is" }  // ✓ 指向 src/content/docs/help/quick-start/what-is.mdx
]
```

Starlight 会自动把这个 slug 在 zh 下渲染成 `/help/...` 链接，在 en 下渲染成 `/en/help/...`。

**不要做**：`slug: "/help/..."`（有头 /）或 `slug: "quicktion-website/help/..."`（带 base）——两者都会 404。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)

### 每个 sidebar 条目可以单独翻译标签

```js
{
  label: "快速开始",
  translations: { en: "Quick Start" },
  items: [
    { label: "了解 Quicktion", slug: "help/quick-start/what-is", translations: { en: "What is Quicktion" } }
  ]
}
```

只有 `label` 和 `translations` 里列出的 locale 会显示，其他 locale fallback 到 `label`。

## 首页绕开 Starlight

本项目的首页 `/` 不走 Starlight，是 `src/pages/index.astro` 直接用 `MarketingLayout.astro` 渲染。原因：

- Starlight 的 `template: splash` 仍带默认 Header + Footer，品牌化改造成本高
- 自定义 `<nav>` + `<footer>` 能完全匹配 Accio 风格
- 首页只有一个路由，不需要 Starlight 的内容集合机制

**权衡**：首页没有 Pagefind 搜索框、没有语言切换器——用户通过顶部导航进入 `/help/...` 后才能用到这些。可接受。

**相关文件**：[src/pages/index.astro](../../src/pages/index.astro)、[src/layouts/MarketingLayout.astro](../../src/layouts/MarketingLayout.astro)
