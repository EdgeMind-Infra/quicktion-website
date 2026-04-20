/**
 * 首页文案 i18n 集中存放。
 *
 * 添加新字段时：先在 HomeStrings 里声明，再给 zh/en 都补上。TypeScript 会提醒缺失。
 * 所有首页组件通过 homeStrings[lang] 读取，避免组件内硬编码中文。
 */

export type Lang = "zh" | "en";

export interface HomeStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    pricing: string;
    docs: string;
    signIn: string;
    menu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    pill1: string;
    pill2: string;
    pill3: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  featureTabs: {
    sectionTitle: string;
    features: Array<{
      key: string;
      tab: string;
      title: string;
      desc: string;
      placeholder: string;
    }>;
  };
  agents: {
    sectionTitle: string;
    sectionSub: string;
    uiPlaceholder: string;
    items: Array<{
      badge: string;
      title: string;
      desc: string;
      tags: string[];
    }>;
  };
  cta: {
    title: string;
    sub: string;
    button: string;
  };
  footer: {
    copy: string;
  };
}

const zh: HomeStrings = {
  meta: {
    title: "巨象 · AI Agent 营销平台",
    description: "巨象 —— 为本地生活商家打造的 AI Agent 营销平台",
  },
  nav: {
    pricing: "定价",
    docs: "文档",
    signIn: "登录",
    menu: "菜单",
    closeMenu: "关闭菜单",
  },
  hero: {
    title: "一次对话，帮本地商家把日常搞定",
    pill1: "24×7 接单",
    pill2: "不用培训",
    pill3: "本地部署",
    desc: "从门店诊断、达人对接到竞品分析、素材生成——巨象让本地商家用一次对话完成日常营销。",
    ctaPrimary: "免费体验",
    ctaSecondary: "观看演示",
  },
  featureTabs: {
    sectionTitle: "我们的特色，强大易用",
    features: [
      {
        key: "chat",
        tab: "对话式触发",
        title: "随时随地对话",
        desc: "用自然语言与巨象对话——发布内容、联系达人、生成报告，说出来就能做到。",
        placeholder: "功能演示占位",
      },
      {
        key: "multi",
        tab: "多店铺管理",
        title: "多店铺，统一指挥",
        desc: "统一下达任务，让扩张不再是负担。",
        placeholder: "功能演示占位",
      },
      {
        key: "schedule",
        tab: "定时任务",
        title: "设好时间，自动运转",
        desc: "把重复性劳动变成定时任务，每周一发竞品简报、节假日自动上下架活动商品。",
        placeholder: "功能演示占位",
      },
      {
        key: "im",
        tab: "微信飞书接入",
        title: "微信飞书，随时下令",
        desc: "不需要打开任何新 App，在微信和飞书里发出指令。",
        placeholder: "功能演示占位",
      },
      {
        key: "browser",
        tab: "浏览器执行",
        title: "浏览器里，代你操作",
        desc: "内置浏览器自动化能力，像人一样打开网页、点击按钮、填写表单。",
        placeholder: "功能演示占位",
      },
    ],
  },
  agents: {
    sectionTitle: "从诊断到优化，营销全流程闭环",
    sectionSub: "AI 数字员工分工协作，让每个环节都有专属智能助理",
    uiPlaceholder: "界面演示占位",
    items: [
      {
        badge: "分析 Agent",
        title: "专属「数据医生」",
        desc: "接入平台一手数据，诊断经营盲区，给出可落地的增长建议。",
        tags: ["店铺诊断报告", "竞品动态监控", "爆款内容解码"],
      },
      {
        badge: "策划 Agent",
        title: "你的「点子智囊团」",
        desc: "基于数据生成营销方案，说出需求，即可获得可落地的完整策略。",
        tags: ["达人营销方案", "本地推投流策略", "商品活动策划"],
      },
      {
        badge: "执行 Agent",
        title: "数字员工上岗",
        desc: "方案确定后自动执行，重复琐碎的工作全部交给数字员工。",
        tags: ["抖音达人合作", "线上内容运营", "经营指标提升"],
      },
    ],
  },
  cta: {
    title: "立即体验巨象",
    sub: "专为本地生活商家打造，AI Agent 帮你完成一切营销工作。",
    button: "免费体验",
  },
  footer: {
    copy: "© 2026 巨象科技 · 保留所有权利",
  },
};

const en: HomeStrings = {
  meta: {
    title: "Quicktion · AI Agent Platform for Local Businesses",
    description:
      "Quicktion is an AI Agent marketing platform purpose-built for local business owners.",
  },
  nav: {
    pricing: "Pricing",
    docs: "Docs",
    signIn: "Sign in",
    menu: "Menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "One conversation. Your daily ops, handled.",
    pill1: "Always on",
    pill2: "Zero training",
    pill3: "Runs locally",
    desc: "From store diagnostics and influencer outreach to competitor analysis and content generation — Quicktion lets local businesses finish a day's marketing work in a single chat.",
    ctaPrimary: "Try it free",
    ctaSecondary: "Watch demo",
  },
  featureTabs: {
    sectionTitle: "Powerful, effortless to use",
    features: [
      {
        key: "chat",
        tab: "Chat-first",
        title: "Talk to it like a teammate",
        desc: "Natural-language commands for publishing content, reaching out to creators, or generating reports — if you can say it, Quicktion can do it.",
        placeholder: "Feature preview",
      },
      {
        key: "multi",
        tab: "Multi-store",
        title: "All your stores, one control room",
        desc: "Issue one instruction, have it run across every location. Growth stops being a bottleneck.",
        placeholder: "Feature preview",
      },
      {
        key: "schedule",
        tab: "Scheduled tasks",
        title: "Set it once, runs on its own",
        desc: "Turn repetitive chores into cron jobs — weekly competitor briefs on Monday, holiday promotions launched automatically.",
        placeholder: "Feature preview",
      },
      {
        key: "im",
        tab: "WeChat & Feishu",
        title: "Run ops from your chat app",
        desc: "No new app to open. Issue commands right inside WeChat or Feishu.",
        placeholder: "Feature preview",
      },
      {
        key: "browser",
        tab: "Browser automation",
        title: "Clicks and forms, handled for you",
        desc: "Built-in browser automation opens pages, clicks buttons and fills forms — just like a human operator.",
        placeholder: "Feature preview",
      },
    ],
  },
  agents: {
    sectionTitle: "Diagnose, plan, execute — a closed loop",
    sectionSub: "Digital teammates that divide the work, each with its own specialty.",
    uiPlaceholder: "Interface preview",
    items: [
      {
        badge: "Analyst Agent",
        title: 'Your "data doctor"',
        desc: "Ingests first-party platform data, surfaces blind spots, and returns actionable growth recommendations.",
        tags: ["Store health reports", "Competitor tracking", "Hit-content decoding"],
      },
      {
        badge: "Planner Agent",
        title: "Your creative brain trust",
        desc: "Turns data into marketing plans. Describe the goal, receive a complete, executable strategy.",
        tags: ["Creator campaign plans", "Local-ads strategy", "Promo campaign design"],
      },
      {
        badge: "Operator Agent",
        title: "Your digital workforce, on the clock",
        desc: "Once a plan is approved, it runs. Repetitive, detail-heavy work disappears from your desk.",
        tags: ["Creator collaboration", "Content operations", "KPI lift"],
      },
    ],
  },
  cta: {
    title: "Try Quicktion today",
    sub: "Purpose-built for local business owners — let AI Agents handle your marketing work.",
    button: "Try it free",
  },
  footer: {
    copy: "© 2026 Quicktion · All rights reserved",
  },
};

export const homeStrings: Record<Lang, HomeStrings> = { zh, en };
