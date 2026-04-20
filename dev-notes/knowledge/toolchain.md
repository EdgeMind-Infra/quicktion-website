# 工具链

## 概览

Tailwind v4（@tailwindcss/vite 方案）、Biome 2、pnpm 10 的 `packageManager` 字段、Astro 6 构建输出约定。这些是"只在初次配置会踩一次、但忘了就会再踩一次"的坑。

## Tailwind CSS v4

### 用 `@tailwindcss/vite`，不用 `@astrojs/tailwind`

Astro ≥ 5.2 起，Tailwind 集成的方式变了。**不要**装 `@astrojs/tailwind`（已 deprecated）；用官方 Vite 插件：

```bash
pnpm astro add tailwind
```

这会装 `@tailwindcss/vite` + `tailwindcss`，并在 `astro.config.mjs` 里加 `vite.plugins: [tailwindcss()]`。

**不要做**：跟随旧博文 `astro add @astrojs/tailwind` 或手配 PostCSS——v4 不用 PostCSS 配置。

**相关文件**：[astro.config.mjs](../../astro.config.mjs)

### 和 Starlight 共用需要桥接包

详见 [starlight-customization.md](./starlight-customization.md) 的"必须装 @astrojs/starlight-tailwind"一节。

### `@theme` 块是 v4 token 定义入口

v4 放弃了 `tailwind.config.js`，所有 token 走 CSS：

```css
@theme {
  --font-sans: "Inter", ...;
  --color-accent-500: #ff6b35;
}
```

Tailwind 读 `--color-accent-*` 生成 `bg-accent-500`、`text-accent-500`、`border-accent-500` 等工具类。所以**每个 token 命名决定了工具类名字**——改名要全局搜索替换。

**相关文件**：[src/styles/global.css](../../src/styles/global.css)

## Biome

### biome.json 的 v2 schema

Biome 2.x 的 `files.includes` 字段用**正向 + 反向** glob，不再是 `files.ignore`：

```json
{
  "files": {
    "includes": [
      "**/*.ts", "**/*.tsx", "**/*.astro",
      "!**/dist/**", "!**/.astro/**", "!**/node_modules/**"
    ]
  }
}
```

`vcs: { enabled: true, useIgnoreFile: true }` 会自动把 `.gitignore` 规则当排除列表。

**相关文件**：[biome.json](../../biome.json)

### Biome 不原生支持 .astro 文件

截至 Biome 2.4，`.astro` frontmatter（`---` 块内的 TS）不被完全 lint。只有顶层 JS/TS/JSON 会走 Biome。对 Astro 组件的质量保证主要靠 `pnpm build`（Astro 内部 TypeScript 检查）。

**不要做**：别期望 `pnpm lint` 能发现 `.astro` 文件里的类型错。必须 `pnpm build` 才能看到。

## pnpm + packageManager 字段

### `package.json` 的 `packageManager` 字段

```json
{
  "packageManager": "pnpm@10.23.0"
}
```

这是 Node.js corepack 的标准字段。它做两件事：
1. Corepack 用户在任何机器上 `corepack enable` 后自动拉到对应版本的 pnpm
2. `pnpm/action-setup` 在 CI 里检测这个字段自动使用对应版本

### CI 里不要**再**指定 pnpm 版本

看 [deployment-and-base-url.md](./deployment-and-base-url.md) 的 "withastro/action@v3 与 packageManager 字段冲突" 条目。

### 升级 pnpm 版本的正确姿势

改 `package.json` 的 `packageManager` 字段即可。**不要**改 `.nvmrc` 或 CI 里硬编码版本——会再次出现冲突。

本地开发同步：

```bash
corepack prepare pnpm@<new-version> --activate
```

## Astro 构建

### build 输出结构

`pnpm build` 输出到 `dist/`：

```
dist/
├── index.html                          # 首页
├── 404.html                             # Starlight 自动 404
├── help/<slug>/index.html               # 每个 MDX 一个 HTML
├── en/...                               # 英文版本
├── _astro/                              # 哈希化的静态资源（CSS、JS、image）
├── pagefind/                            # Pagefind 搜索索引
├── sitemap-index.xml
└── sitemap-0.xml
```

Starlight 的搜索索引（Pagefind）在 build 末尾自动生成，构建时间的一部分（约 2 秒）。

**不要做**：别试图自己跑 `pagefind` 或把 `dist/pagefind` 加入 gitignore——它每次 build 自动重建。

### 每次改 astro.config.mjs 要清缓存

修改 `astro.config.mjs` 里的 `base` 或 `site` 后，有时开发服务器缓存旧值，表现为"改完 config 不生效"。

**workaround**：

```bash
rm -rf .astro node_modules/.astro dist
pnpm dev
```

### TypeScript 检查在 build 时发生

本项目 tsconfig extends `astro/tsconfigs/strict`——最严格档。`.astro` 文件里的 TS frontmatter、`.tsx` 组件、`.ts` 工具函数都在 `pnpm build` 时被检查。

单独跑类型检查：

```bash
pnpm exec astro check
```

但 `astro check` 不在默认依赖里，`pnpm build` 更可靠。

**相关文件**：[tsconfig.json](../../tsconfig.json)
