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
              label: "登录与账号",
              slug: "help/quick-start/account",
              translations: { en: "Login & Account" },
            },
            {
              label: "安装与更新",
              slug: "help/quick-start/install",
              translations: { en: "Install & Update" },
            },
            {
              label: "积分与额度",
              slug: "help/quick-start/credits",
              translations: { en: "Credits & Quota" },
            },
            {
              label: "付费与订阅",
              slug: "help/quick-start/subscription",
              translations: { en: "Billing & Subscription" },
            },
          ],
        },
        {
          label: "使用入门",
          translations: { en: "Getting Started" },
          items: [
            {
              label: "5 分钟快速上手",
              slug: "help/getting-started/five-min",
              translations: { en: "5-Minute Quick Start" },
            },
            {
              label: "创建你的第一个 Agent",
              slug: "help/getting-started/first-agent",
              translations: { en: "Create Your First Agent" },
            },
            {
              label: "常用操作指南",
              slug: "help/getting-started/common-ops",
              translations: { en: "Common Operations" },
            },
          ],
        },
        {
          label: "更多了解",
          translations: { en: "Learn More" },
          items: [
            {
              label: "技能管理",
              slug: "help/advanced/skills",
              translations: { en: "Skill Management" },
            },
            {
              label: "即时通讯渠道",
              slug: "help/advanced/im-channels",
              translations: { en: "IM Channels" },
            },
            {
              label: "连接第三方应用",
              slug: "help/advanced/integrations",
              translations: { en: "Integrations" },
            },
            {
              label: "权限与安全",
              slug: "help/advanced/permissions",
              translations: { en: "Permissions & Security" },
            },
            {
              label: "自动化任务",
              slug: "help/advanced/automation",
              translations: { en: "Automation" },
            },
            {
              label: "Agent 工具",
              slug: "help/advanced/agent-tools",
              translations: { en: "Agent Tools" },
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
