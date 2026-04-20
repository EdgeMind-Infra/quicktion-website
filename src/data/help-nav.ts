/**
 * 帮助中心的分组 + 条目数据源。
 *
 * 被两处消费：
 * 1. src/components/nav/SiteNav.astro —— 渲染顶部导航的 mega menu
 * 2. astro.config.mjs —— （未来可选）生成 Starlight sidebar，避免重复维护
 *
 * 注意：新增帮助中心页面时**同步更新这里**和 astro.config.mjs 的 sidebar。
 */

export interface HelpNavItem {
  label: string;
  labelEn: string;
  /** 相对 src/content/docs 的路径，不带 locale、不带 base 前缀 */
  slug: string;
  /** mega menu 副描述（可选，不填则只显示 label） */
  desc?: string;
  descEn?: string;
}

export interface HelpNavGroup {
  label: string;
  labelEn: string;
  items: HelpNavItem[];
}

export const helpNavGroups: HelpNavGroup[] = [
  {
    label: "快速开始",
    labelEn: "Quick Start",
    items: [
      {
        label: "了解 Quicktion",
        labelEn: "What is Quicktion",
        slug: "help/quick-start/what-is",
        desc: "产品介绍、核心能力",
        descEn: "Product intro and core features",
      },
      {
        label: "登录与账号",
        labelEn: "Login & Account",
        slug: "help/quick-start/account",
        desc: "邀请码、账号切换",
        descEn: "Invite code, account switching",
      },
      {
        label: "安装与更新",
        labelEn: "Install & Update",
        slug: "help/quick-start/install",
        desc: "客户端下载、版本升级",
        descEn: "Client download and updates",
      },
      {
        label: "积分与额度",
        labelEn: "Credits & Quota",
        slug: "help/quick-start/credits",
        desc: "每日积分、消耗规则",
        descEn: "Daily credits and usage rules",
      },
      {
        label: "付费与订阅",
        labelEn: "Billing & Subscription",
        slug: "help/quick-start/subscription",
        desc: "套餐对比、升级流程",
        descEn: "Plan comparison and upgrades",
      },
    ],
  },
  {
    label: "使用入门",
    labelEn: "Getting Started",
    items: [
      {
        label: "5 分钟快速上手",
        labelEn: "5-Minute Quick Start",
        slug: "help/getting-started/five-min",
        desc: "从安装到首个任务",
        descEn: "From install to first task",
      },
      {
        label: "创建你的第一个 Agent",
        labelEn: "Create Your First Agent",
        slug: "help/getting-started/first-agent",
        desc: "模板选择、配置技巧",
        descEn: "Template selection and config",
      },
      {
        label: "常用操作指南",
        labelEn: "Common Operations",
        slug: "help/getting-started/common-ops",
        desc: "文件管理、对话导出",
        descEn: "File management and exports",
      },
    ],
  },
  {
    label: "更多了解",
    labelEn: "Learn More",
    items: [
      {
        label: "技能管理",
        labelEn: "Skill Management",
        slug: "help/advanced/skills",
        desc: "安装、配置与自建",
        descEn: "Install, config, and build",
      },
      {
        label: "即时通讯渠道",
        labelEn: "IM Channels",
        slug: "help/advanced/im-channels",
        desc: "微信、飞书、Telegram",
        descEn: "WeChat, Feishu, Telegram",
      },
      {
        label: "连接第三方应用",
        labelEn: "Integrations",
        slug: "help/advanced/integrations",
        desc: "API、Webhook 接入",
        descEn: "API and webhook setup",
      },
      {
        label: "权限与安全",
        labelEn: "Permissions & Security",
        slug: "help/advanced/permissions",
        desc: "权限策略、审计日志",
        descEn: "Policies and audit logs",
      },
      {
        label: "自动化任务",
        labelEn: "Automation",
        slug: "help/advanced/automation",
        desc: "定时、循环执行",
        descEn: "Scheduled and recurring tasks",
      },
      {
        label: "Agent 工具",
        labelEn: "Agent Tools",
        slug: "help/advanced/agent-tools",
        desc: "内置工具能力",
        descEn: "Built-in tool capabilities",
      },
    ],
  },
];
