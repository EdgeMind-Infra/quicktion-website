// @ts-check

import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 部署：仓库在 EdgeMind-Infra/quicktion-website 下
  // 切换自定义域名时：移除 base，把 site 改为正式域名
  site: "https://edgemind-infra.github.io",
  base: "/quicktion-website",

  integrations: [
    starlight({
      title: {
        "zh-CN": "巨象",
        en: "Quicktion",
      },
      defaultLocale: "root",
      locales: {
        // 源语言是中文，放在根路径下（和 edgemind-web 保持一致）
        root: { label: "简体中文", lang: "zh-CN" },
        en: { label: "English", lang: "en" },
      },
      customCss: ["./src/styles/global.css"],
      components: {
        SiteTitle: "./src/components/overrides/SiteTitle.astro",
        Header: "./src/components/overrides/Header.astro",
        MobileMenuFooter: "./src/components/overrides/MobileMenuFooter.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/EdgeMind-Infra/quicktion-website",
        },
      ],
      sidebar: [
        {
          label: "快速开始",
          translations: { en: "Quick Start" },
          items: [
            {
              label: "了解 Quicktion",
              slug: "help/quick-start/what-is",
              translations: { en: "What is Quicktion" },
            },
            {
              label: "这是真的零门槛吗？",
              slug: "help/quick-start/zero-threshold",
              translations: { en: "Is it really zero-threshold?" },
            },
            {
              label: "如何连接微信和飞书",
              slug: "help/quick-start/connect-im",
              translations: { en: "Connect WeChat & Feishu" },
            },
            {
              label: "抖音来客授权",
              slug: "help/quick-start/douyin-auth",
              translations: { en: "Authorize Douyin Laike" },
            },
          ],
        },
        {
          label: "使用入门",
          translations: { en: "Getting Started" },
          items: [
            {
              label: "Agent 如何帮你提高经营分",
              slug: "help/getting-started/boost-score",
              translations: { en: "How Agents lift your operations score" },
            },
            {
              label: "指挥官 Agent 如何驱动执行专家",
              slug: "help/getting-started/commander-agent",
              translations: { en: "How the Commander drives specialists" },
            },
            {
              label: "手机端能干什么",
              slug: "help/getting-started/mobile",
              translations: { en: "What you can do on mobile" },
            },
            {
              label: "定时任务能解决什么",
              slug: "help/getting-started/scheduled-tasks",
              translations: { en: "What scheduled tasks solve" },
            },
          ],
        },
        {
          label: "更多了解",
          translations: { en: "Learn More" },
          items: [
            {
              label: "未来还会上架哪些 Agent",
              slug: "help/advanced/roadmap",
              translations: { en: "Upcoming Agents" },
            },
          ],
        },
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
