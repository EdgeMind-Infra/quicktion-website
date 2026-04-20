---
name: dev-workflow
description: |
  Quicktion Website（Astro 6 + Starlight + Tailwind v4）项目开发工作流技能。在以下场景自动调用：
  (1) 编写或修改任何 src/ 下的代码
  (2) 添加新依赖或修改 astro.config.mjs / package.json / biome.json 等配置
  (3) 完成一个 feature 或修复一个 bug
  触发关键词：组件开发、bug 修复、重构、新功能、依赖升级、配置变更、页面、帮助中心、MDX、Starlight、Tailwind、部署、GitHub Pages、base url、i18n
---

# Dev Workflow — Quicktion Website 开发工作流

## 工作流程

### 1. 开发前：加载相关知识

根据当前任务，读取 `dev-notes/knowledge/` 下的相关主题文件：

| 文件 | 主题范围 |
|---|---|
| [deployment-and-base-url.md](../../../dev-notes/knowledge/deployment-and-base-url.md) | GitHub Pages 部署、`base` 配置、`withBase()` 工具、CI 工作流踩坑 |
| [starlight-customization.md](../../../dev-notes/knowledge/starlight-customization.md) | Starlight 组件覆盖、`customCss`、sidebar 配置、i18n `root` locale、Tailwind 桥接 |
| [toolchain.md](../../../dev-notes/knowledge/toolchain.md) | Tailwind v4（@tailwindcss/vite）、Biome、pnpm `packageManager` 字段、构建输出约定 |

**读取方式**：使用 Read 工具读取对应文件，遵循其中记录的最佳实践和注意事项。

如果不确定读哪个，先 `ls dev-notes/knowledge/` 再按文件名判断。

### 2. 开发中：遵循最佳实践

同时参考以下通用 skill（如果与当前任务相关，自动调用）：

- `/biome` — Biome lint + format（本项目唯一 lint 工具链，替代 ESLint/Prettier）
- `/tailwindcss` — Tailwind CSS v4 工具类与响应式模式
- `/tailwindcss-advanced-layouts` — Grid / Flexbox 高阶布局
- `/vercel-react-best-practices` — 仅当添加 React islands 时参考（本项目默认纯 Astro + 少量 `<script>`）

**优先级**：项目知识库 > 通用 skill > Claude 自身知识。当项目知识库中有明确记录时，以项目知识库为准。

### 3. 开发后：更新知识库

完成代码修改后，**检查是否产生了新的项目知识**：

**需要记录的内容**：
- 新引入的依赖及其正确用法（尤其是 Starlight 插件、Astro integration）
- 发现的配置坑和 workaround
- 做出的架构决策及原因（比如 "这个首页为什么不走 Starlight splash 而是 MarketingLayout"）
- 与通用最佳实践不同的项目特定做法
- 解决的 bug 的根因（如果不明显的话）

**不需要记录的内容**：
- 代码本身能表达的东西（看代码就能懂）
- 通用编程知识（Astro/React/Tailwind 标准用法去查官方文档）
- 临时性的调试信息

**更新方式**：
1. 判断属于哪个主题文件（deployment / starlight / toolchain）
2. 追加新条目到对应文件的合适子域下
3. 如果现有主题都不合适，创建新的主题文件（超过 4 个主题就要考虑合并）
4. 如果发现已有条目过时，更新或删除它

**条目格式**：

```markdown
### 条目标题

简短描述做了什么、为什么这样做。

**正确做法**：
- 具体的代码模式或配置

**不要做**（如果有）：
- 错误的做法及原因

**相关文件**：`path/to/file`
```

### 4. 代码质量检查

开发完成后，运行 `/simplify` 检查代码质量。lint/format/typecheck 命令：

```bash
pnpm lint            # Biome 检查（lint + format 检查）
pnpm lint:fix        # Biome 自动修复
pnpm format          # 仅格式化
pnpm build           # 构建 + Astro 类型检查（TypeScript 在构建中被检查）
```

构建成功即代表类型无错。失败的类型错误会在 `pnpm build` 输出里。
