/**
 * 帮助中心的分组 + 条目数据源。
 *
 * 被两处消费：
 * 1. src/components/nav/SiteNav.astro —— 渲染顶部导航的 mega menu
 * 2. astro.config.mjs —— 手动同步到 Starlight sidebar（未来可抽 SSOT）
 *
 * 新增/删除帮助中心页面时**同步更新这里和 astro.config.mjs 的 sidebar**。
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
        label: "这是真的零门槛吗？",
        labelEn: "Is it really zero-threshold?",
        slug: "help/quick-start/zero-threshold",
        desc: "不用学、不用敲字、全程可看",
        descEn: "No learning, no typing, full visibility",
      },
      {
        label: "如何连接微信和飞书",
        labelEn: "Connect WeChat & Feishu",
        slug: "help/quick-start/connect-im",
        desc: "扫码即接入，视频演示",
        descEn: "Scan to connect, with video demos",
      },
      {
        label: "抖音来客授权",
        labelEn: "Authorize Douyin Laike",
        slug: "help/quick-start/douyin-auth",
        desc: "三步完成门店授权",
        descEn: "Authorize your store in 3 steps",
      },
    ],
  },
  {
    label: "使用入门",
    labelEn: "Getting Started",
    items: [
      {
        label: "Agent 如何帮你提高经营分",
        labelEn: "How Agents lift your score",
        slug: "help/getting-started/boost-score",
        desc: "诊断、匹配达人、竞品情报",
        descEn: "Diagnose, match creators, market intel",
      },
      {
        label: "指挥官 Agent 如何驱动执行专家",
        labelEn: "Commander & specialists",
        slug: "help/getting-started/commander-agent",
        desc: "一条指令，多 Agent 协作",
        descEn: "One command, multi-agent workflow",
      },
      {
        label: "手机端能干什么",
        labelEn: "What you can do on mobile",
        slug: "help/getting-started/mobile",
        desc: "微信/飞书一体化操作",
        descEn: "All-in-one chat-based ops",
      },
      {
        label: "定时任务能解决什么",
        labelEn: "What scheduled tasks solve",
        slug: "help/getting-started/scheduled-tasks",
        desc: "监控、分析、提醒自动化",
        descEn: "Automate monitoring and alerts",
      },
    ],
  },
  {
    label: "更多了解",
    labelEn: "Learn More",
    items: [
      {
        label: "未来还会上架哪些 Agent",
        labelEn: "Upcoming Agents",
        slug: "help/advanced/roadmap",
        desc: "搭门店 / 直播 / 本地推……",
        descEn: "Storefront / Live / Local ads…",
      },
    ],
  },
];
