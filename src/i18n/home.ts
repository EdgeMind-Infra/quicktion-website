/**
 * 首页文案 i18n 集中存放。
 *
 * 添加新字段时：先在 HomeStrings 里声明，再给 zh/en 都补上。TypeScript 会提醒缺失。
 * 所有首页组件通过 homeStrings[lang] 读取，避免组件内硬编码中文。
 */

export type Lang = "zh" | "en";

/** Score section 4 张卡片的 key —— 与 ScoreSection 的 cardConfig / 图片文件名严格对齐 */
export type ScoreCardKey = "store" | "goods" | "traffic" | "revenue";

export interface HomeStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    docs: string;
    signIn: string;
    menu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    subtitle: string;
    pill1: string;
    pill2: string;
    pill3: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** aria-label：视频静音切换，状态在两者之间切 */
    unmuteLabel: string;
    muteLabel: string;
  };
  score: {
    sectionTitleLeading: string;
    sectionTitleAccent: string;
    sectionSub: string;
    cards: Array<{
      key: ScoreCardKey;
      title: string;
      points: string[];
    }>;
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
    items: Array<{
      badge: string;
      title: string;
      desc: string;
      tags: string[];
    }>;
  };
  faq: {
    sectionTitle: string;
    items: Array<{ q: string; a: string }>;
  };
  cta: {
    title: string;
    sub: string;
    button: string;
  };
  footer: {
    copy: string;
  };
  videoLightbox: {
    /** aria-label: dialog（role="dialog"）的无障碍名称 */
    dialogLabel: string;
    /** aria-label: 关闭按钮 */
    closeLabel: string;
    /** aria-label: 可点击视频触发器的默认名称（各触发器可用 data-video-title 覆盖） */
    triggerLabel: string;
  };
}

const zh: HomeStrings = {
  meta: {
    title: "巨象 · AI Agent 营销平台",
    description: "巨象 —— 为本地生活商家打造的 AI Agent 营销平台",
  },
  nav: {
    docs: "帮助中心",
    signIn: "登录",
    menu: "菜单",
    closeMenu: "关闭菜单",
  },
  hero: {
    title: "巨象AI",
    subtitle: "帮你轻松搞定门店营销",
    pill1: "全天候",
    pill2: "零门槛",
    pill3: "主动服务",
    desc: "你只需轻松发令，店铺诊断、达人对接、竞品分析——所有工作都在对话中完成。",
    ctaPrimary: "免费体验",
    ctaSecondary: "观看演示",
    unmuteLabel: "开启声音",
    muteLabel: "关闭声音",
  },
  score: {
    sectionTitleLeading: "帮你",
    sectionTitleAccent: "提升经营分",
    sectionSub: "经营分决定曝光与流量，AI 驱动持续增长。",
    cards: [
      { key: "store", title: "搭门店", points: ["门店信息补全", "招牌相册美化"] },
      { key: "goods", title: "做货架", points: ["商品折扣上架", "在售状态监控"] },
      { key: "traffic", title: "扩流量", points: ["达人流量推广", "营销活动预热"] },
      { key: "revenue", title: "拿收益", points: ["核销量提升"] },
    ],
  },
  featureTabs: {
    sectionTitle: "功能特色，强大易用",
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
        tags: ["抖音达人合作", "线上内容运营", "经营分提升"],
      },
    ],
  },
  faq: {
    sectionTitle: "常见问题",
    items: [
      {
        q: "如何注册并开始使用巨象？",
        a: "访问巨象官网，点击「免费体验」按钮完成手机号注册。注册成功后，按照引导完成平台连接（微信或飞书），即可在对话框中直接发出营销指令，Agent 会自动接收并执行。",
      },
      {
        q: "如何连接微信和飞书？",
        a: "进入「平台连接」设置页，选择对应平台：微信使用手机扫描二维码授权登录，连接后可直接在微信对话框发指令；飞书按照页面提示完成 OAuth 授权，授权后 @巨象 即可发出指令。两者全程约 1 分钟完成。",
      },
      {
        q: "如何完成抖音来客授权巨象？",
        a: "进入「门店管理」→「添加门店」，选择「抖音来客」平台，系统会跳转至授权页面。使用抖音商家账号扫码登录，确认授权巨象读取经营数据及执行营销操作权限，完成后返回巨象平台即授权成功。授权后，分析 Agent 可直接读取来客数据生成诊断报告。",
      },
      {
        q: "Agent 如何帮你提高经营分？",
        a: "巨象 Agent 持续接入平台数据，分析内容质量、达人合作频率、用户互动率等经营短板，给出针对性优化建议，并由执行 Agent 自动落地，帮你在日常运营中稳步提升经营分。",
      },
      {
        q: "指挥官 Agent 是如何驱动执行专家干活的？",
        a: "指挥官 Agent 负责理解你的指令、拆解任务目标，再将子任务分发给各执行专家 Agent（如内容发布、达人联系、数据采集等）。各专家并行工作，完成后汇报给指挥官整合反馈给你，整个过程你只需下达一条指令。",
      },
      {
        q: "Agent 浏览器操作，我也可以参与吗？",
        a: "可以。Agent 执行浏览器操作时，你可以随时切换「接管模式」手动操作页面，完成后再交还给 Agent 继续执行，既保证灵活性，又不影响自动化流程的连贯性。",
      },
      {
        q: "如何设置定时任务？",
        a: "在平台「定时任务」页面，点击「新建任务」，用自然语言描述任务内容（例如「每天上午 9 点发布一条小红书笔记」），选择执行频率和时间，保存后即自动生效，无需人工干预。",
      },
      {
        q: "任务没有按时执行，怎么排查？",
        a: "请检查：1）平台连接是否正常（微信/飞书授权是否过期）；2）账号是否有足够执行额度；3）任务描述是否清晰完整。如以上均无问题，请联系客服并提供任务 ID，我们将协助排查。",
      },
      {
        q: "如何添加多个门店？",
        a: "进入「门店管理」页面，点击「添加门店」，输入门店名称和平台账号信息完成授权即可。一个账号可管理无限数量的门店，所有门店数据在同一控制台统一查看。",
      },
      {
        q: "我的店铺数据和账号信息安全吗？",
        a: "巨象对所有传输数据进行加密处理，平台账号授权采用 OAuth 标准协议，不存储明文密码。数据仅用于 Agent 执行你明确下达的指令，不会用于其他用途。",
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
  videoLightbox: {
    dialogLabel: "视频播放",
    closeLabel: "关闭视频",
    triggerLabel: "播放视频",
  },
};

const en: HomeStrings = {
  meta: {
    title: "Quicktion · AI Agent Platform for Local Businesses",
    description:
      "Quicktion is an AI Agent marketing platform purpose-built for local business owners.",
  },
  nav: {
    docs: "Help Center",
    signIn: "Sign in",
    menu: "Menu",
    closeMenu: "Close menu",
  },
  hero: {
    title: "Quicktion AI",
    subtitle: "Run your store's marketing, effortlessly.",
    pill1: "Always on",
    pill2: "Zero training",
    pill3: "Proactive",
    desc: "Just give a command — store diagnostics, creator outreach, competitive analysis. Everything happens inside one conversation.",
    ctaPrimary: "Try it free",
    ctaSecondary: "Watch demo",
    unmuteLabel: "Unmute",
    muteLabel: "Mute",
  },
  score: {
    sectionTitleLeading: "Lift your ",
    sectionTitleAccent: "operations score",
    sectionSub: "Your operations score drives reach and traffic. AI keeps pushing it up.",
    cards: [
      {
        key: "store",
        title: "Set up store",
        points: ["Profile completion", "Storefront & album polish"],
      },
      {
        key: "goods",
        title: "Build catalog",
        points: ["Promo listings", "Live-status monitoring"],
      },
      {
        key: "traffic",
        title: "Grow traffic",
        points: ["Creator-driven reach", "Campaign warm-up"],
      },
      {
        key: "revenue",
        title: "Capture revenue",
        points: ["Higher redemption"],
      },
    ],
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
  faq: {
    sectionTitle: "Frequently asked questions",
    items: [
      {
        q: "How do I sign up and get started with Quicktion?",
        a: "Visit the Quicktion site, click Try it free, register with your phone number, then follow the onboarding to connect WeChat or Feishu. Once connected, issue marketing commands directly in chat and Agents pick them up automatically.",
      },
      {
        q: "How do I connect WeChat and Feishu?",
        a: "Go to Platform Connections, pick the platform and authorize: WeChat uses a QR-code scan from mobile; Feishu runs an OAuth flow. After connecting, send commands in chat (WeChat) or @Quicktion (Feishu). Takes about a minute end-to-end.",
      },
      {
        q: "How do I authorize Douyin Laike for Quicktion?",
        a: "In Store Management → Add Store, pick Douyin Laike; the system redirects to its authorization page. Scan-login with your merchant account, grant Quicktion permission to read operations data and execute marketing actions, and return. After authorization, the Analyst Agent can pull Laike data into diagnostic reports.",
      },
      {
        q: "How does an Agent lift my operations score?",
        a: "Quicktion Agents continuously ingest platform data, spot weak points (content quality, creator-collaboration cadence, engagement rate), generate targeted recommendations, and execute them via the Operator Agent — raising your operations score steadily in daily use.",
      },
      {
        q: "How does the Commander Agent drive execution specialists?",
        a: "The Commander Agent parses your instruction, decomposes the goal, and dispatches sub-tasks to specialist Agents (content posting, creator outreach, data capture). Specialists work in parallel, report back for Commander consolidation, and return a single synthesized answer to you. You issue one command.",
      },
      {
        q: "Can I intervene in Agent browser automation?",
        a: "Yes. At any point during browser automation you can switch to Takeover Mode, operate the page manually, then hand control back to the Agent. The flow stays intact while you keep full flexibility.",
      },
      {
        q: "How do I set up scheduled tasks?",
        a: "On the Scheduled Tasks page, click New Task, describe the task in natural language (e.g. 'post a Xiaohongshu note at 9 AM daily'), pick frequency and time, save. It runs automatically — no further intervention needed.",
      },
      {
        q: "A scheduled task didn't run — how do I diagnose?",
        a: "Check: 1) platform connection (WeChat/Feishu authorization not expired); 2) account has sufficient execution quota; 3) task description is clear and complete. If all three are fine, contact support with the task ID and we'll help trace it.",
      },
      {
        q: "How do I add multiple stores?",
        a: "Open Store Management, click Add Store, enter the store name and platform credentials to authorize. One account manages unlimited stores; all of them share a single dashboard.",
      },
      {
        q: "Is my store data and account information safe?",
        a: "All transport is encrypted. Platform authorizations use the OAuth standard — no plaintext passwords stored. Data is used only to execute the commands you explicitly issue, nothing else.",
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
  videoLightbox: {
    dialogLabel: "Video player",
    closeLabel: "Close video",
    triggerLabel: "Play video",
  },
};

export const homeStrings: Record<Lang, HomeStrings> = { zh, en };
