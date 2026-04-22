# 首页 UI 模式

## 概览

本主题覆盖 `src/components/home/*` 下营销首页的 UI 组件模式、临时依赖、品牌 token 用法。这些是做首页改版时会反复用到的通用做法。

## 全站 container 宽度统一

### 所有 section 用同一个 `--landing-container`

大屏下 header 的 Logo 和下方 Hero 的 H1、视频卡要左右对齐——视觉一致性的基础。早期各组件 max-width 乱写（Hero 1200 / FeatureTabs 1300 / AgentShowcase 1300 / Footer 1400），大屏上 logo 和内容不在同一垂直线。

修：[src/styles/global.css](../../src/styles/global.css) 定两个 token，所有 section 引用：

```css
:root {
  --landing-container: 1200px;
  --landing-container-px: 40px;
}
```

引用方：`.hero-inner`、`.ft-content`、`.agent-row`、`.mega-inner`、`.footer-inner`、`.site-nav-inner` 全部 `max-width: var(--landing-container)` + `margin: 0 auto`。

Accio 用 1400px 作为 container，主流 SaaS 多数在 1200–1280 之间。1200 在 1440 viewport 下留 120px 两侧空白，视觉舒适。

### SiteNav 必须"外壳全宽 + 内部 wrapper 居中"，水平 padding 一律放外壳

Header 不能直接 `.site-nav { max-width: 1200 }`——那样 sticky 背景、border、毛玻璃都只覆盖中间 1200px，两侧穿帮。正确结构：

```astro
<nav class="site-nav">              <!-- 外壳：full-width、sticky、毛玻璃 + 水平 padding -->
  <div class="site-nav-inner">      <!-- 内部：max-width + margin auto，不再加 padding -->
    ...
  </div>
</nav>
```

```css
.site-nav {
  /* 全宽布局层：高度、背景、sticky */
  position: sticky; top: 0;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  padding: 0 var(--landing-container-px);
  ...
}
.site-nav-inner {
  max-width: var(--landing-container);
  margin: 0 auto;
  display: flex;
  /* 注意：不写 padding，否则 content 会比同是 1200 容器的 .hero-inner / .footer-inner / .mega-inner 偏右 40px */
}
```

### 必须和其它 section 用一致的"outer padding + inner bare max-width"模式

本项目 **所有** 1200px 容器（`.hero-inner`、`.footer-inner`、`.ft-content`、`.mega-inner`、`.agent-row`、`.score-section` 等）的模式都是：

```css
.section-outer { padding: X 40; }      /* 某些用 24px，某些用 40px，但都在外层 */
.section-inner { max-width: 1200; margin: 0 auto; /* 无水平 padding */ }
```

大屏（w ≥ 1280）下这种模式的内容 x 起点 = `(w − 1200) / 2`。

**错误的反例**（曾经的 SiteNav）：把 padding 放在 inner 上 —— `.site-nav-inner { max-width: 1200; padding: 0 40; margin: 0 auto }`。这让 nav 内容 x 起点 = `(w − 1200) / 2 + 40`，比下方 Hero 视频 / Footer 品牌 / mega menu 的列标题整体**偏右 40px**，视觉上 logo 不在同一条竖线上。

**判断方法**：取任意两个 section 的内部元素 `getBoundingClientRect().left`，在 w ≥ 1280 时应该完全相等。

mega menu 也遵循同样规则：`.mega-menu` 外壳只管全宽背景和垂直 padding（`padding: 40px 0 44px`），内部 `.mega-inner` 只写 `max-width: 1200; margin: 0 auto`，不加水平 padding。

### docs variant 要特例：nav 全宽对齐 sidebar

Starlight 文档页的左侧 sidebar 从屏幕 `left: 0` 开始；如果 docs 下 nav 也用 1200 container 居中，logo 会悬空在 sidebar 的右侧、看起来脱离主视觉。

docs variant 下让 `.site-nav` 外壳的 padding 对齐 Starlight 自己的 `--sl-nav-pad-x`，并让 inner 取消 max-width 限制：

```css
.site-nav[data-variant="docs"] {
  padding: 0 var(--sl-nav-pad-x, 1.5rem);
}
.site-nav[data-variant="docs"] .site-nav-inner {
  max-width: none;
}
```

这样 docs 下 logo 紧贴 sidebar 起点，marketing 下 logo 和 Hero 内容对齐——两种场景各自最优。

**相关文件**：[src/styles/global.css](../../src/styles/global.css)、[src/components/nav/SiteNav.astro](../../src/components/nav/SiteNav.astro)

## Landing Token 命名

### `--landing-*` 系列独立于 `--color-accent-*`

`src/styles/global.css` 里同时存在两组品牌色 token：

- `--color-accent-50..950` — **Starlight 主题色**，11 个 shade，用于 `/help/*` 下 Starlight 渲染的部分。命名必须以 `-accent-` 开头，Starlight 才认。
- `--landing-brand` / `--landing-brand-dark` / `--landing-brand-light` / `--landing-brand-rgb` — **Marketing 页面专用**，命名对齐 Accio（方便对照抄布局），语义更具体：
  - `brand` = 主品牌色（按钮、激活态）
  - `brand-dark` = hover / 深色变体
  - `brand-light` = 浅色徽章背景
  - `brand-rgb` = 空格分隔的 R G B 数值，用于 `rgb(var(--landing-brand-rgb) / 0.3)` 调透明度阴影

**为什么不统一**：Marketing 页面要和 Accio 的设计语言对齐，用 `--landing-*` 方便跨项目找源；Starlight 必须用 `--color-accent-*`，强绑定不能改。两者维护时要同步品牌色（改橙色主调时 11 个 accent + 4 个 landing 一起改）。

**相关文件**：[src/styles/global.css](../../src/styles/global.css)

### 按钮/Tab 的彩色 glow 阴影

品牌同色阴影是 Accio 风格的核心视觉特征。用 `rgb(var(--landing-brand-rgb) / <alpha>)` 语法：

```css
.btn-primary {
  box-shadow:
    0 10px 15px -3px rgb(var(--landing-brand-rgb) / 0.3),
    0 4px 6px -4px rgb(var(--landing-brand-rgb) / 0.25);
}
.ft-tab.active {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 10px 28px -8px rgb(var(--landing-brand-rgb) / 0.55);
}
```

Tab active 态那行 `0.55` 不透明度是 Accio 测出来的（截屏自他们首页），显著更强的彩色光晕，用在"唯一激活项"比按钮更合适。

## Tab / Accordion 切换：用 CSS Grid Stack，不要 display: none

### 为什么不能用 display: none ↔ display: flex

面板切换如果用：
```css
.panel { display: none; }
.panel.active { display: flex; }
```

会产生两类闪烁：
1. 容器高度塌缩/展开（如果面板高度不同），页面其他内容跳动
2. `display` 切换会立刻把新面板放在最终位置，任何 `@keyframes` 从 `opacity: 0` 入场都"来不及"动画——浏览器先 layout 再绘制

**现象**：用户报告"tab 切换时卡片会闪一下"——当时用的就是 `display` + `animation`。

### 正确做法：CSS Grid Stack + opacity 过渡

所有面板都渲染在**同一个 grid cell**，容器高度自动取最高那个，切换只改 opacity：

```css
.ft-content {
  display: grid;
  grid-template-columns: 1fr;
}
.ft-panel {
  grid-row: 1;
  grid-column: 1;              /* 全部堆在第 1 行第 1 列 */
  opacity: 0;
  pointer-events: none;        /* 非激活态不接收事件 */
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.ft-panel.active {
  opacity: 1;
  pointer-events: auto;
}
```

**为什么优于 `position: absolute`**：absolute 会让容器高度塌到 0，需要手动给容器设 min-height 或 padding 撑起。Grid stack 自动取最高面板的尺寸。

**验证闪不闪的方法**：`getBoundingClientRect().top/height` 在切换前后完全一样（layout 不变），只有 `opacity` 变化。

**相关文件**：[src/components/home/FeatureTabs.astro](../../src/components/home/FeatureTabs.astro)

## Hero 视频卡

### 热链 Accio 视频作为临时占位

当前 [Hero.astro](../../src/components/home/Hero.astro) 的视频 src 指向：

```
https://work-download.accio.com/videos/home.mp4
```

这是 Accio（竞品）的产品 demo 视频热链。**上线公开域名前必须替换**，3 个风险：
1. Accio CDN 随时换 URL，失效就是白屏
2. 他们可能加 Referer 防盗链
3. 他们能从 access log 看到我们的域名

替换策略：录一段 Quicktion 自己的 30s demo → 压成 h264 mp4 + vp9 webm → 放 `public/videos/hero.mp4`。

### 视频 lightbox：单例 + 行为注入式（`VideoLightbox` 组件）

首页视频分散在 Hero（1 个）+ FeatureTabs（4 个），都需要"点击后原地 FLIP 放大到屏幕中心 + 带原生 controls（进度条 / 音量 / 全屏）"的观看体验。

抽 [src/components/media/VideoLightbox.astro](../../src/components/media/VideoLightbox.astro) 为**单例共享实例**，而非 per-video props：

```astro
<!-- MarketingLayout 挂一次 -->
<VideoLightbox lang={navLang} />

<!-- 任意元素加属性即成触发器；文档级事件委托捕获 -->
<button data-video-lightbox data-video-src={src} aria-label={label}>...</button>
```

**为什么选 data-attribute 委托而非 props 实例化**：5+ 个视频若各自 `<VideoLightbox src={...}>` 会产生 5 份 backdrop/stage DOM，且同一时刻只能打开一个 —— 单例天然契合模态语义。新增视频时只需给元素加属性，零 import、零布局改动。

**FLIP 技术选型**：Web Animations API + `left/top/width/height/borderRadius` 关键帧。不用 `transform: scale`——scale 会让内容"从缩小态放大"（海报感），而原地扩张的"卡片长大"视觉需要真实的 box 尺寸插值。单次 320ms + 小矩形，逐帧 layout 不是性能问题。

**原地扩张 → 稳定态的交接**：动画以 `fill: "forwards"` 持续施加最后一帧的 px 值，阻止后续 CSS `left: 50%; transform: translate(-50%, -50%)` 的稳定态规则生效。`onfinish` 里必须：

```ts
setState("open");           // 先切 data-state，CSS 稳定态规则激活
stage.removeAttribute("style"); // 清 first 帧 inline
animation.cancel();         // ★ 释放 fill:forwards 的末帧值，CSS 才真正接管
```

关键是最后一步 `animation.cancel()`——漏掉它，stage 会卡在动画末帧绝对坐标，浏览器 resize 时不会重排（验证方法：打开 lightbox 后拖动浏览器大小，看 stage 是否跟着居中）。

稳定态尺寸写 CSS：`width: min(1200px, 92vw, calc(85vh * 16 / 9))` —— 三重 min 兼顾"宽度占比 / 硬顶 1200 / 高度约束反推的宽度（防 aspect-ratio 被 max-height 拉扁）"。JS 的 `computeFinalRect()` 必须用和 CSS 等价的算式，否则 FLIP 到达末帧后切 CSS 会有跳变。

### `:global()` 触发器样式：必须用 `:where()` 降特异性

VideoLightbox 的全局规则：

```css
:global(:where([data-video-lightbox])) {
  cursor: pointer;
  position: relative;  /* 给 ::after overlay 做 containing block 兜底 */
}
```

不加 `:where()` 的话，该规则特异性 (0,1,0) 等于消费者 `.ft-clicker { position: absolute }` / `.video-clicker { position: absolute }` 的特异性——跨组件 CSS 加载顺序决定胜负（通常后定义的赢，即 VideoLightbox 反而覆盖了 .video-clicker 的 `absolute`），导致 clicker 变成 `position: relative` → 块级流动 → 高度塌到 0px → 点击范围为零点。

`:where()` 把特异性压到 (0,0,0)，消费者任何显式 `position:` 都能稳赢。全局只作兜底；这是"全局行为注入"的通用守则。

**验证**：`getComputedStyle(clicker).position === "absolute"` 和 `height !== "0px"`。

**Hero 的 nested button 问题**：`.hero-video` 已内含 `.video-sound` 按钮（unmute 切换），不能把 `.hero-video` 本身做 `role="button"` / 加 `data-video-lightbox`——会产生嵌套 interactive 违反 a11y。解法：在 `.hero-video` 内部放一个**独立的、和 `.video-sound` 同级的透明 `<button class="video-clicker">`**，DOM 顺序先于声控按钮，自然低 z-index 不吞声控点击；定位 `top: 44px` 刚好避开 titlebar。FeatureTabs 的 `.ft-right` 不含其他 interactive，同样用 `.ft-clicker` 绝对覆盖保持一致。

声控按钮还需 `e.stopPropagation()`，否则 click 冒泡到 `.hero-video` 的事件委托区域（虽然 clicker 是兄弟不是父级，但 `closest("[data-video-lightbox]")` 仍会在 document 事件路径上匹配到同级别 Hero 区域的其他 trigger）。

**相关文件**：[src/components/media/VideoLightbox.astro](../../src/components/media/VideoLightbox.astro)、[src/components/home/Hero.astro](../../src/components/home/Hero.astro)、[src/components/home/FeatureTabs.astro](../../src/components/home/FeatureTabs.astro)、[src/layouts/MarketingLayout.astro](../../src/layouts/MarketingLayout.astro)

### 16:9 响应式视频卡

用 `aspect-ratio: 16 / 9` 而非固定高度：

```css
.hero-video {
  width: 100%;
  max-width: 1120px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.video-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

好处：视频在任何宽度下都保持比例，不需要媒体查询改 height。Mockup 的三色"红黄绿"titlebar 用 `position: absolute; top: 14px; left: 16px` 叠在视频上方——Accio 风。

**相关文件**：[src/components/home/Hero.astro](../../src/components/home/Hero.astro)

## 首页 i18n

### 品牌命名："巨象" = "Quicktion"

两个是同一品牌的中/英译名，不是并列词。所有地方按 locale 选其一，**不要**写成"巨象 Quicktion"复合形式：

- `astro.config.mjs` Starlight `title: { "zh-CN": "巨象", en: "Quicktion" }`
- SiteNav brand-text: `lang === "zh" ? "巨象" : "Quicktion"`
- MarketingLayout footer 按 lang 切换

Favicon 的 logo mark 仍然用 "巨" 字——它是设计元素，跨语言保留。

### 文案集中存放：src/i18n/home.ts

首页所有组件的文案放在单一 TS 文件里，按 `{ zh, en }` 结构。组件通过 `homeStrings[lang].<section>` 消费：

```ts
// src/i18n/home.ts
export const homeStrings: Record<"zh" | "en", HomeStrings> = { zh, en };

// 组件
import { type Lang, homeStrings } from "../../i18n/home";
const { lang = "zh" } = Astro.props;
const t = homeStrings[lang].hero;
```

为什么不用第三方 i18n 库（astro-i18next / lingui）：

- 静态站文案量小（~200 条），单 TS 文件可读性 > key 查找
- TypeScript 接口 `HomeStrings` 保证 zh/en 结构对等，漏翻译会在 `pnpm build` 时报类型错
- 零运行时开销，Astro 编译时消文本

**相关文件**：[src/i18n/home.ts](../../src/i18n/home.ts)

### 路由：中文根路径 + 英文 /en/ 镜像

- `src/pages/index.astro` → `/` (zh-CN)
- `src/pages/en/index.astro` → `/en/` (en) — 简单镜像，所有组件传 `lang="en"`
- Starlight 文档侧 locale 由 `astro.config.mjs` 的 `locales` 管理：`root: zh-CN` / `en: /en/`

两套 i18n（首页手写 + Starlight 内置）共存但不冲突——`withBase(lang === "zh" ? "/en/" : "/")` 的语言切换链接，进入 Starlight 的页面后会被 Starlight 的 LanguageSelect 接管。

**相关文件**：[src/pages/index.astro](../../src/pages/index.astro)、[src/pages/en/index.astro](../../src/pages/en/index.astro)

## 自制 LanguageSwitcher 替代 Starlight 原生 select

### 为什么换掉 Starlight 默认 `<LanguageSelect />`

Starlight 默认语言切换是原生 `<select>`——下拉面板样式受操作系统控制，和 Accio/Linear 风格的 nav 不搭。自制一个 CSS/JS 轻量下拉（复用 mega menu 同款交互）。

[src/components/nav/LanguageSwitcher.astro](../../src/components/nav/LanguageSwitcher.astro) 结构：
- Trigger：globe icon + 当前 locale label + chevron
- Dropdown：小卡片（圆角、阴影），每个 locale 一个 `<a>`，选中项橙色 + checkmark
- Hover / focus / `data-open` click 三重触发，点击外部关闭

### 不依赖 Starlight internal utility

本来想用 Starlight 的 `localizedUrl()` 工具算"当前页在目标 locale 的 URL"，但 `@astrojs/starlight/utils/localizedUrl` 不在 package `exports` 里——build 会失败 (`Missing "./utils/localizedUrl" specifier`)。

替代：自己在 Astro frontmatter 里算。核心 4 步：

```ts
function urlFor(targetCode: string): string {
  const rel = pathname.startsWith(base) ? pathname.slice(base.length) : pathname; // 剥 base
  let core = rel;
  if (currentLocale) { // 剥当前 locale 前缀
    const prefix = `/${currentLocale}`;
    if (core === prefix || core === `${prefix}/`) core = "/";
    else if (core.startsWith(`${prefix}/`)) core = core.slice(prefix.length);
  }
  const withLocale = targetCode === "root" ? core : `/${targetCode}${core}`; // 加目标 locale
  return base + withLocale; // 拼回 base
}
```

`root` 是 Starlight 的特殊 locale key（表示"无 URL 前缀的源语言"），切到它时不加前缀。

**相关文件**：[src/components/nav/LanguageSwitcher.astro](../../src/components/nav/LanguageSwitcher.astro)

## 移除主题切换：需要覆盖两个组件

Starlight 的 `ThemeSelect` 渲染在两处：**桌面 Header 右侧** + **Mobile 折叠菜单底部 (`MobileMenuFooter`)**。只改一处用户在另一处还能看到。

全站保持亮色品牌，去掉主题切换需要两次覆盖：

```js
// astro.config.mjs
components: {
  Header: "./src/components/overrides/Header.astro",            // 桌面 header 里不再引入 ThemeSelect
  MobileMenuFooter: "./src/components/overrides/MobileMenuFooter.astro",  // 折叠菜单里也不再引入
}
```

[MobileMenuFooter.astro](../../src/components/overrides/MobileMenuFooter.astro) 里仍保留原生 `<LanguageSelect />`——touch 设备上原生 `<select>` 会唤起系统选择器，UX 其实比自制下拉更好。两边解耦：desktop 用自制，mobile 用原生。

**相关文件**：[src/components/overrides/Header.astro](../../src/components/overrides/Header.astro)、[src/components/overrides/MobileMenuFooter.astro](../../src/components/overrides/MobileMenuFooter.astro)

## 移动端适配：MobileDrawer + 横滚 tabs + aspect-ratio 槽位

### MobileDrawer：汉堡 + 全屏侧滑

[src/components/nav/MobileDrawer.astro](../../src/components/nav/MobileDrawer.astro) 是 marketing 场景的移动端导航替代。Mobile（≤768px）下隐藏 SiteNav 右侧的内联 `.lang-switch` + `.btn-login`，显示汉堡按钮。点击 → 右侧滑入 full-screen panel（`width: min(86vw, 360px)`）+ 半透明 backdrop，列出 Pricing / Docs / 语言切换 / 登录 CTA 的扁平列表。docs variant 不挂载（Starlight 自带 MobileMenuToggle）。

关闭触发链：X 按钮 / backdrop 点击 / Escape / 点击内部链接 / 视窗跨回桌面（matchMedia listener）。打开时焦点跳 drawer 第一个链接，关闭时返回汉堡按钮。

**相关文件**：[src/components/nav/MobileDrawer.astro](../../src/components/nav/MobileDrawer.astro)、[src/components/nav/SiteNav.astro](../../src/components/nav/SiteNav.astro)

### `backdrop-filter` 创建 containing block 的坑

`.site-nav` 有 `backdrop-filter: blur(16px)` 做磨砂玻璃效果。**这会为其 `position: fixed` 后代创建 containing block**——drawer / backdrop 会被限制在 nav 的 64px 高度里，而不是 viewport。现象：drawer 打开后只有一条 64px 的横条。

CSS 规范（containing block）明确：`filter`、`backdrop-filter`、`transform`、`perspective`、`will-change` 任一属性非 `none` 就会让元素成为后代 `position: fixed` 的 containing block，绕过 viewport。

**修复**：组件 script 里把 drawer 和 backdrop 节点 `appendChild` 到 `document.body`，脱离 SiteNav 的 stacking context：

```ts
if (drawer && drawer.parentElement !== document.body) {
  document.body.appendChild(drawer);
}
if (backdrop && backdrop.parentElement !== document.body) {
  document.body.appendChild(backdrop);
}
```

Astro 没有 React `Portal` 这样的声明式 API，用 DOM `appendChild` 是最直接的办法。因为幂等（检查 `parentElement`）所以热重载多次也安全。

**相关文件**：[src/components/nav/MobileDrawer.astro](../../src/components/nav/MobileDrawer.astro)

### Body scroll lock 用属性选择器

Drawer 打开时需要锁住 body 滚动，否则用户可以继续滚背景。简单到位：

```css
body[data-drawer-open] { overflow: hidden; }
```

打开时 `document.body.setAttribute("data-drawer-open", "")`，关闭时 `removeAttribute`。drawer 自身再加 `overscroll-behavior: contain` 防止内部滚动链传到外层。

不推荐的替代：动态设 `body.style.overflow` 会覆盖原 inline style；用 class `.drawer-open` 也可，但 attribute 语义更清晰（data-* 是"状态"，class 是"样式组"）。

### FeatureTabs 横滚 + 边缘渐隐 + 自动滚入

Mobile（≤768px）下 tabs 改 `flex-wrap: nowrap; overflow-x: auto`，每个 `.ft-tab` 加 `flex: 0 0 auto` 保持原宽。关键三件套：

1. **隐藏滚动条**：`scrollbar-width: none` (Firefox) + `::-webkit-scrollbar { display: none }`（Chromium/Safari）
2. **边缘渐隐**：`mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 24px), transparent 100%)` 让右侧有淡出暗示还有更多内容
3. **Scroll snap**：`scroll-snap-type: x proximity` + `.ft-tab { scroll-snap-align: start }` 提升手指滑动手感

自动轮播激活时，给 JS 补一行：

```ts
tabs[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
```

否则 mobile 下激活的 tab 可能在视口外，用户看不到"当前展示的是哪个功能"。

**相关文件**：[src/components/home/FeatureTabs.astro](../../src/components/home/FeatureTabs.astro)

Desktop 的 `.ft-right { min-height: 380px; flex: 1 }` 在 mobile 下（panel 变单列堆叠）会变成一个 380px 高的竖长条——非常丑。修：

```css
@media (max-width: 768px) {
  .ft-right {
    width: 100%;
    flex: initial;
    min-height: 0;           /* 必须显式清零，否则继承 380px */
    aspect-ratio: 16 / 9;    /* 预留 16:9 比例槽位 */
  }
}
```

注意 `min-height: 0` 不能省——desktop 规则的 `min-height: 380px` 会被继承过来。

### Hero CTAs 真·全宽的坑

Hero `.hero-inner` 是 `display: flex; flex-direction: column; align-items: center`，**每个子元素默认 `align-self: auto` → shrink-to-content**。即使 `.hero-ctas { width: 100% }`，实际只有子元素内容宽度。

要真全宽：`.hero-ctas { align-self: stretch }` **同时** 去掉 `max-width: 320px`。两者缺一不可。

### 移动端断点统一 768px

原本 SiteNav 用 900px，Hero/FeatureTabs/CTA 用 768px——造成 769–899px 区段 Hero 已进 mobile 样式但 nav 还是桌面的割裂。现统一 768px（docs variant 的 `Header.astro` 保持 `@media (max-width: 50rem)` 对齐 Starlight 的 `sl-hidden md:sl-flex` 阈值）。

## SiteNav：首页与 Starlight Header 共用导航

### 为什么要抽共用组件

首页 (MarketingLayout) 和帮助中心 (Starlight) 原本是两套 header 实现，容易漂移。抽 [src/components/nav/SiteNav.astro](../../src/components/nav/SiteNav.astro) 让视觉一致，品牌升级时只改一处。

SiteNav 用 `variant` prop 区分：

| variant | 场景 | 右侧内容 | mega menu |
|---|---|---|---|
| `marketing` | 首页等 Marketing 页 | 语言切换链接 + "登录" CTA | 显示「文档」下拉 |
| `docs` | Starlight 帮助中心 | `<slot name="right-extras">`：Starlight 的 Search / SocialIcons / ThemeSelect / LanguageSelect | **隐藏**（用户已在文档里，再显示是冗余） |

### Starlight 组件如何复用

覆盖 Starlight 的 Header 组件（在 `astro.config.mjs` 的 `components.Header`）时，可以直接 import 默认子组件保留原生功能：

```astro
---
import Search from "@astrojs/starlight/components/Search.astro";
import SocialIcons from "@astrojs/starlight/components/SocialIcons.astro";
import ThemeSelect from "@astrojs/starlight/components/ThemeSelect.astro";
import LanguageSelect from "@astrojs/starlight/components/LanguageSelect.astro";
import SiteNav from "../nav/SiteNav.astro";
---
<SiteNav variant="docs" lang={...}>
  <div slot="right-extras">
    <Search {...Astro.props} />
    <SocialIcons {...Astro.props} />
    <ThemeSelect {...Astro.props} />
    <LanguageSelect {...Astro.props} />
  </div>
</SiteNav>
```

`{...Astro.props}` 透传很重要——Starlight 内部组件依赖 `labels` 等 props。

**相关文件**：[src/components/overrides/Header.astro](../../src/components/overrides/Header.astro)

### 自定义 nav 高度必须同步 `--sl-nav-height`

Starlight 的 sidebar / TOC / content 区域顶部偏移都依赖 `--sl-nav-height`（默认 `3.5rem`）。我们的 SiteNav 是 `4rem`，不同步的话 sidebar 顶部会被 header 遮盖。

在 Header 覆盖里用 `<style is:global>:root { --sl-nav-height: 4rem; }</style>` 显式覆盖。改 SiteNav 高度时记得同步这个变量。

**相关文件**：[src/components/overrides/Header.astro](../../src/components/overrides/Header.astro)

## Mega Menu：full-width drawer + 自适应列

### Full-width 而非贴着 trigger

Accio / 主流 SaaS 的 mega menu 是**铺满整个屏幕宽度**的 drawer，不是贴着 trigger 的小卡片。实现：

```css
.nav-dropdown {
  position: static; /* 不能是 relative，否则 fixed mega 会基于 nav-dropdown */
}
.mega-menu {
  position: fixed;
  top: var(--landing-header-height);
  left: 0;
  right: 0;
}
.mega-inner {
  max-width: 1200px;
  margin: 0 auto; /* 内容居中 */
}
```

关键点：`.nav-dropdown` 要 `position: static`（不是 `relative`）——否则 `position: fixed` 的子元素会相对 `.nav-dropdown` 而不是 viewport（如果父级有 `transform` 或 `filter`，fixed 也会被它限制）。

### 长组自动分两列

不同分组条目数差距大时（5 / 3 / 6），硬塞 3 列会让某列特别长。用两条规则：

1. `items.length > 5` 的组标记为 "wide"，在 `.mega-inner` 的 grid 里跨 2 列
2. wide 组的 `.mega-list` 内部用 `grid-template-columns: 1fr 1fr` 把 items 自动分成 2 列

外层 grid 的列数用 inline style 动态生成：

```astro
---
const groupCols = helpNavGroups.map(g => g.items.length > 5 ? 2 : 1);
const totalCols = groupCols.reduce((a, b) => a + b, 0);
---
<div class="mega-inner" style={`grid-template-columns: repeat(${totalCols}, minmax(0, 1fr));`}>
```

`minmax(0, 1fr)` 避免内容把列撑超——在 mega item 里的文字如果很长，`1fr` 会让列变宽，`minmax(0, 1fr)` 才严格等分。

**相关文件**：[src/components/nav/SiteNav.astro](../../src/components/nav/SiteNav.astro)

### Hover bridge 必须放在 trigger 上，不能放在浮层上

Trigger 按钮和全宽 mega menu 之间有 14px 左右的垂直 gap（trigger 在 header 内居中，mega menu 从 header 底部开始）。鼠标经过 gap 时 `:hover` 失效 → 菜单闪关。

**错误做法**：给 `.mega-menu` 加 `::before` 透明延伸。看起来合理，但：
- `.mega-menu` 在关闭态是 `pointer-events: none`，**伪元素也一起 none**（父元素 hit-test 被阻断）
- 所以 bridge 只在菜单**已打开**时才 hover-able——而我们恰恰需要它在"从 trigger 移到菜单的途中"保持 hover，这时菜单可能正在 opacity 过渡中

**正确做法**：把 bridge 加在 `.nav-dropdown` 上（trigger 的外层容器），它始终 hover-able：

```css
.nav-dropdown {
  position: relative;
}
.nav-dropdown::after {
  content: "";
  position: absolute;
  top: 100%;
  left: -8px;
  right: -8px;
  height: 24px; /* 覆盖 trigger bottom 到 mega menu top 的 gap 并留出 overlap */
}
```

bridge 属于 `.nav-dropdown`，鼠标在 bridge 上时 `.nav-dropdown:hover` 成立，mega menu 保持打开。**验证方法**：playwright 用 `mouse.move(x, y)` 精确落到 gap 的 y 坐标（trigger bottom ~50，mega top ~64，gap 中间 y=57），检查 `document.querySelector('.nav-dropdown').matches(':hover')` 是否还 true。

注意 `position: relative` 不会影响子元素 `position: fixed` 的参考框架（fixed 只被 transform/filter/perspective 等祖先影响）。

### hover 触发的三重保险

`.nav-dropdown` 下的 `.mega-menu` 默认 `opacity: 0; pointer-events: none;`。触发通过 3 种方式，覆盖桌面 hover / 键盘 focus / 移动端点击：

```css
.nav-dropdown:hover .mega-menu,
.nav-dropdown:focus-within .mega-menu,
.nav-dropdown[data-open="true"] .mega-menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}
```

`data-open` 由 JS 控制（移动端点击 trigger 切换），点击外部关闭。这样无 JS 环境也能 hover 用，有 JS 时移动端也可用。

chevron 旋转同样绑三种状态，避免"hover 打开了但 chevron 没转"的割裂感。

### 数据源：help-nav.ts

mega menu 的 3 组内容来自 [src/data/help-nav.ts](../../src/data/help-nav.ts)——独立于 `astro.config.mjs` 的 Starlight sidebar，因为 mega menu 需要 `desc` / `descEn` 副描述字段而 sidebar 不需要。

**权衡**：两份数据（sidebar + help-nav.ts）需要在**新增/删除帮助中心页面时同步更新**。抽成真正的 SSOT 需要把 sidebar 也从 help-nav.ts 生成（需要改 `astro.config.mjs` import `.ts` — 在纯 ESM 环境下可行但要小心 Astro 启动链）。当前条目数 ~14 手动同步成本低，未来条目膨胀再优化。

**相关文件**：[src/data/help-nav.ts](../../src/data/help-nav.ts)、[astro.config.mjs](../../astro.config.mjs)

## 素材托管：public/ 还是 OSS？

首页有两类大文件：

| 类型 | 体积 | 方案 |
|---|---|---|
| Hero 主视频（营销流程.mp4） | 2.2 MB | **阿里云 OSS**（`edgemind-oss.oss-cn-hangzhou.aliyuncs.com`），客户侧已有 bucket |
| FeatureTabs 4 个 feature 视频 | ~1-2 MB/个 | **`public/videos/*.mp4`** |
| Score Section 4 张产品截图 | ~135 KB/张 | **`public/images/score/*.png`** |
| AgentShowcase 9 张轮播图 | ~115-170 KB/张 | **`public/images/agents/*.png`** |

**判断依据**：
- 单文件 > 1 MB 且客户自己有 CDN/OSS → 走 OSS，组件里写绝对 URL
- 单文件 < 500 KB 或客户无 CDN → 放 `public/`，通过 `withBase()` 拼相对路径
- Hero 视频虽然也是 2 MB，但它是首屏首要资源，走 OSS 能用 CDN 加速 + 不让 GitHub Pages 仓库膨胀

GitHub Pages 单仓库文件大小限制 100 MB，总大小 1 GB 软限制——本项目目前 `public/` 视频 + 图片 ~8.5 MB，可控。如果未来再加 10 个视频就要重新考虑迁 OSS。

### 中文文件名统一改英文

素材原文件（`对话即触发.mp4` / `图片1.png` / `搭门店.png` ...）在进入 `public/` 时**必须重命名为英文**：

```
对话即触发.mp4  → public/videos/chat.mp4
定时任务.mp4    → public/videos/schedule.mp4
连接微信.mp4    → public/videos/im.mp4
浏览器打开.mp4  → public/videos/browser.mp4

搭门店.png → public/images/score/store.png
做货架.png → public/images/score/goods.png
扩流量.png → public/images/score/traffic.png
拿收益.png → public/images/score/revenue.png

图片1-3.png → public/images/agents/analyst-{1,2,3}.png
图片4-6.png → public/images/agents/planner-{1,2,3}.png
图片7-9.png → public/images/agents/operator-{1,2,3}.png
```

**为什么**：
1. 避免 URL encoding 踩坑（中文在 `withBase()` 拼接后浏览器要 `%E6%90%AD%E9%97%A8%E5%BA%97` 编码，出 bug 时调试麻烦）
2. 语义清晰——文件名直接告诉你它是哪个 agent 或哪个 feature，和 i18n key 一一对应
3. 搜索可靠——grep 英文稳定，grep 中文受终端编码影响

**相关文件**：[public/videos/](../../public/videos/)、[public/images/](../../public/images/)

## 通用 Carousel 子组件

### 为什么抽组件

首页 3 处会有图片轮播需求：AgentShowcase 的 3 个 agent row 都是同样的"3 张截图 + prev/next + dots + 自动切换"模式。原本每个 row 内联一份 CSS + markup + JS，3 份代码完全重复——改一处要改 3 处。

抽出 [src/components/home/Carousel.astro](../../src/components/home/Carousel.astro)，父组件只传 `images` 数组：

```astro
<Carousel images={[src1, src2, src3]} alt="分析 Agent" />
```

### 数据驱动设计

Carousel 组件不假设图片张数——父传几张就渲几张。JS 通过 `data-slides` 属性读取张数：

```astro
<div class="qt-carousel" data-slides={images.length} data-interval={interval}>
```

```ts
const total = Number(carousel.dataset.slides ?? "1");
const interval = Number(carousel.dataset.interval ?? "4000");
if (total < 2) return;  // 单图不挂 JS，不显示 btn/dots
```

`data-interval="0"` 可关闭自动切换（手动场景用）。

**不要**把轮播的 `cur` 状态放在 DOM class 切换里——track 的 translateX 直接从 `cur * 100%` 计算出来更直观。dots active 状态用 `classList.toggle` 同步。

### 过渡期抓包看起来像 bug，实际不是

`.carousel-track` 上 `transition: transform 0.5s ease`——自动切换时截图有 500ms 窗口会抓到 "两张图并排" 的瞬间（track 正在 translateX 过渡）。首次排查以为是 `flex: 0 0 100%` 没生效，但用 `getBoundingClientRect` 测 slide width = 容器 width 是对的，只是过渡动画未结束。

**验证方法**：`getComputedStyle(track).transform` 如果是 `matrix(1, 0, 0, 1, 0, 0)` 说明在稳定态，不是 `matrix(..., -450, 0)` 这种中间值。

**相关文件**：[src/components/home/Carousel.astro](../../src/components/home/Carousel.astro)、[src/components/home/AgentShowcase.astro](../../src/components/home/AgentShowcase.astro)

## Astro dev server：scoped CSS 大改后需重启

改 `.astro` 组件的 `<style>` 里涉及**结构性变化**（新增/删除选择器、大改 flex/grid 骨架）时，Astro Vite 的 HMR 有时不能可靠把旧的 scoped class (`astro-xxxxx` 后缀) 替换成新的——浏览器上看到的是混合状态：HTML 用新的 markup，CSS 还是旧 rule。

**现象**：浏览器 DevTools 里 computed style 能看到旧版 CSS 规则（比如 `height: 420px`），但磁盘上文件已经是新值（`height: 440px`）。

**判断方法**：对比 dev server A（刚启）和 dev server B（早启且经历了大改）在同一文件、同一选择器上的 computed style。A 是最新的，B 保留旧值 → 就是 HMR 卡住。

**修复**：`Ctrl+C` 停掉 dev server，重新 `pnpm dev`。完全刷新。

这不是 bug 是 Astro HMR 的已知权衡——scoped 组件 CSS 做 AST 级 diff 太贵，某些情况下保留旧 rule 更快。大改时直接重启，省得排查 20 分钟。

## 外链常量集中：src/lib/links.ts

"登录""免费体验""立即体验巨象"CTA 在 SiteNav / Hero / CTA / MobileDrawer 4 处出现，全部跳同一个 Agent 控制台 URL。写 4 次字符串容易漏改（换域名时）。

修：[src/lib/links.ts](../../src/lib/links.ts) 导出 `AGENT_CONSOLE_URL`，4 处都从这里 import。未来换域名只改一行。

`withBase` 属于站内 URL 拼接工具，`links.ts` 专管外部品牌域。两者不要混——`withBase(AGENT_CONSOLE_URL)` 会错误加 `/quicktion-website` 前缀。

**相关文件**：[src/lib/links.ts](../../src/lib/links.ts)
