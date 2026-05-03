import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronDown,
  Check,
  CheckCircle2,
  ExternalLink,
  FileText,
  Image,
  LockKeyhole,
  MessageSquare,
  Plus,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Upload,
  X,
} from "lucide-react";

const scenes = [
  {
    id: "market",
    title: "Market",
    eyebrow: "AI CAPABILITY MARKET",
    subtitle: "Describe a goal. Find AI capability.",
    image: "/images/market-slice.svg",
    index: "01",
  },
  {
    id: "experience",
    title: "Experience",
    eyebrow: "PRODUCT TRIAL SCENE",
    subtitle: "See it. Try it. Understand it.",
    image: "/images/experience-slice.svg",
    index: "02",
  },
  {
    id: "creator",
    title: "Creator Studio",
    eyebrow: "CREATOR CONTROL ROOM",
    subtitle: "Turn a brief into a market listing.",
    image: "/images/creator-studio-slice.svg",
    index: "03",
  },
];

const marketSolutions = [
  ["01", "Predictive Intelligence", "Forecast outcomes with confidence using advanced time-series and causal models.", "Prediction", "Advanced"],
  ["02", "Intelligent Automation", "Streamline processes and decisions with autonomous AI agents and orchestration.", "Automation", "Advanced"],
  ["03", "Natural Language Understanding", "Extract meaning and intent from text, documents, and conversations.", "Language", "Intermediate"],
  ["04", "Anomaly Detection", "Identify outliers and emerging patterns before they impact your business.", "Monitoring", "Intermediate"],
];

const experienceListings = [
  {
    id: "contract-risk-scanner",
    listingMode: "controlled",
    title: "Contract Risk Scanner",
    summary: "粘贴合同，查看风险条款、严重程度和修改建议。",
    category: "Legal Ops",
    tags: ["Contract Review", "Risk Scan", "Bilingual"],
    coverImage: "/images/experience-slice.svg",
    galleryImages: ["/images/experience-slice.svg", "/images/market-slice.svg", "/images/creator-studio-slice.svg"],
    demoUrl: "",
    targetUsers: ["创业团队", "采购负责人", "法务助理"],
    useCases: ["供应商合同初筛", "服务协议复核", "付款条款检查"],
    notFor: ["替代律师意见", "扫描版图片合同", "诉讼策略判断"],
    requiredInputs: ["合同文本", "合同类型", "关注风险"],
    outputs: ["风险条款", "严重程度", "修改建议"],
    demoLimits: "每日 3 次试用",
    fitScore: 92,
    fitCriteria: {
      matches: ["需要快速发现合同风险", "合同文本可直接粘贴", "关注付款、违约、续约条款"],
      gaps: ["不能替代正式法律意见", "图片扫描件需要先转文字"],
      nextStep: "粘贴合同片段，优先选择你最关心的风险。",
    },
    pricingText: "$19 / scan",
    creatorContact: "legalops@ai-market.demo",
    trialConfig: {
      endpoint: "https://api.creator-demo.local/contract-scan",
      method: "POST",
      trialLimit: "3 / day",
      resultType: "risk-list",
      inputSchema: [
        {
          id: "contractText",
          label: "合同文本",
          type: "textarea",
          required: true,
          rows: 8,
          placeholder: "粘贴合同核心条款，例如付款、违约、终止、续约、保密条款。",
          defaultValue:
            "供应商应在收到发票后 90 日内付款。若客户未提前 60 日书面通知，本协议将自动续约 12 个月。供应商可在服务中断时不承担间接损失责任。",
        },
        {
          id: "contractType",
          label: "合同类型",
          type: "select",
          options: ["供应商合同", "SaaS 服务协议", "采购协议", "保密协议"],
          defaultValue: "供应商合同",
        },
        {
          id: "focusAreas",
          label: "关注风险",
          type: "checkboxGroup",
          options: ["付款周期", "自动续约", "责任限制", "数据隐私"],
          defaultValue: ["付款周期", "自动续约", "责任限制"],
        },
        {
          id: "referenceFile",
          label: "合同附件",
          type: "file",
          accept: ".pdf,.doc,.docx,.txt",
          placeholder: "上传合同文件",
        },
      ],
    },
  },
  {
    id: "short-video-script-agent",
    listingMode: "basic",
    title: "Short Video Script Agent",
    summary: "输入产品和人群，打开作品生成短视频脚本。",
    category: "Creative Ops",
    tags: ["Video Script", "TikTok", "Campaign"],
    coverImage: "/images/creator-studio-slice.svg",
    galleryImages: ["/images/creator-studio-slice.svg", "/images/market-slice.svg"],
    demoUrl: "https://example.com/short-video-agent",
    embedUrl: "https://example.com/short-video-agent",
    targetUsers: ["独立品牌", "内容团队", "电商运营"],
    useCases: ["新品短视频", "直播预热视频", "广告脚本草稿"],
    notFor: ["自动剪辑成片", "真人拍摄服务", "投放预算管理"],
    requiredInputs: ["产品卖点", "目标人群", "发布平台"],
    outputs: ["脚本结构", "开头钩子", "分镜提示"],
    demoLimits: "打开作品试用",
    fitScore: 86,
    fitCriteria: {
      matches: ["需要快速产出脚本方向", "已有产品卖点", "想测试多个创意角度"],
      gaps: ["不直接生成成片", "不替代投放策略"],
      nextStep: "准备产品卖点，打开作品生成第一版脚本。",
    },
    pricingText: "$12 / pack",
    creatorContact: "creator@ai-market.demo",
  },
];

const fallbackListings = [
  {
    id: "vendor-security-checker",
    title: "Vendor Security Checker",
    category: "Security",
    summary: "检查供应商安全问卷、隐私条款和数据处理风险。",
    tags: ["Vendor Review", "Privacy", "Security"],
  },
  {
    id: "invoice-dispute-assistant",
    title: "Invoice Dispute Assistant",
    category: "Finance Ops",
    summary: "整理发票争议、付款证据和对账回复。",
    tags: ["Invoice", "Dispute", "Operations"],
  },
  {
    id: "policy-redline-agent",
    title: "Policy Redline Agent",
    category: "Legal Ops",
    summary: "对比政策文本，标出冲突条款和修改优先级。",
    tags: ["Policy", "Redline", "Compliance"],
  },
];

export default function AICapabilityMarketExperience() {
  const [route, setRoute] = useState("landing");
  const [selectedListingId, setSelectedListingId] = useState("contract-risk-scanner");

  const openListing = (listingId) => {
    setSelectedListingId(listingId);
    setRoute("experience");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-[#f7efe4]">
      <AnimatePresence mode="wait">
        {route === "landing" && <LandingPage key="landing" onEnter={setRoute} />}
        {route === "market" && <MarketPage key="market" onBack={() => setRoute("landing")} onOpenListing={openListing} />}
        {route === "experience" && <ExperiencePage key="experience" selectedListingId={selectedListingId} onBack={() => setRoute("landing")} />}
        {route === "creator" && <CreatorStudioPage key="creator" onBack={() => setRoute("landing")} />}
      </AnimatePresence>
    </main>
  );
}

function AmbientBackground({ tone = "gold" }) {
  const secondGlow = tone === "blue" ? "rgba(97,136,255,0.13)" : tone === "violet" ? "rgba(151,103,216,0.14)" : "rgba(214,165,98,0.10)";

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#060606,#020202)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 8%, rgba(214,165,98,.16), transparent 26%), radial-gradient(circle at 82% 66%, ${secondGlow}, transparent 30%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_46%,rgba(0,0,0,.72)_100%)]" />
    </>
  );
}

function BrandHeader({ onBack, label }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <div className="h-5 w-5 shrink-0 rounded-full bg-[radial-gradient(circle,#f3d0a0_0%,rgba(243,208,160,0.25)_45%,transparent_70%)] shadow-[0_0_18px_rgba(243,208,160,.25)]" />
          <div className="hidden text-[11px] uppercase tracking-[0.38em] text-[#d7b182] sm:block">
            AI Capability Market
          </div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white/72 transition hover:border-white/20 hover:bg-white/[0.03] hover:text-white sm:px-4"
            title="Back to Landing Reel"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline">Back to Landing Reel</span>
            <span className="md:hidden">Back</span>
          </button>
        </div>

        <div className="hidden text-[12px] uppercase tracking-[0.32em] text-white/45 lg:block">{label}</div>

        <div className="flex shrink-0 items-center gap-3 text-sm text-white/60 sm:gap-5">
          <button className="transition hover:text-white">Saved</button>
          <div className="grid h-9 w-9 place-items-center rounded-full border border-white/15">A</div>
        </div>
      </div>
    </header>
  );
}

function LandingPage({ onEnter }) {
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState({ cardH: 520, gap: 144, step: 664, baseY: 120 });
  const dragStartRef = useRef(null);
  const wheelLockRef = useRef(false);
  const current = scenes[active];

  const goTo = (next) => setActive(Math.max(0, Math.min(scenes.length - 1, next)));

  useLayoutEffect(() => {
    const updateLayout = () => {
      const viewportH = window.innerHeight;
      const cardH = Math.min(Math.max(viewportH * 0.58, 380), 640);
      const gap = Math.min(viewportH * 0.16, 150);
      const step = cardH + gap;
      const baseY = viewportH / 2 - cardH / 2;
      setLayout({ cardH, gap, step, baseY });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (wheelLockRef.current || Math.abs(event.deltaY) < 18) return;
      wheelLockRef.current = true;
      setActive((prev) => (event.deltaY > 0 ? Math.min(prev + 1, scenes.length - 1) : Math.max(prev - 1, 0)));
      window.setTimeout(() => (wheelLockRef.current = false), 760);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handlePointerDown = (event) => (dragStartRef.current = event.clientY);
  const handlePointerUp = (event) => {
    if (dragStartRef.current === null) return;
    const delta = event.clientY - dragStartRef.current;
    if (Math.abs(delta) > 70) {
      setActive((prev) => (delta < 0 ? Math.min(prev + 1, scenes.length - 1) : Math.max(prev - 1, 0)));
    }
    dragStartRef.current = null;
  };

  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.5 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <AmbientBackground tone={current.id === "experience" ? "blue" : current.id === "creator" ? "violet" : "gold"} />

      <header className="absolute left-8 right-8 top-7 z-40 flex items-start justify-between">
        <div className="select-none">
          <div className="text-[10px] uppercase tracking-[0.34em] text-[#d9b07b]/75">AI Capability Market</div>
          <div className="mt-1 font-serif text-[30px] leading-none tracking-[-0.04em] text-[#fff5e8]">Landing Reel</div>
        </div>
        <div className="hidden gap-8 text-[12px] uppercase tracking-[0.28em] text-white/58 md:flex">
          {scenes.map((scene, index) => (
            <button key={scene.id} className={`transition ${active === index ? "text-white" : "hover:text-white"}`} onClick={() => goTo(index)}>
              {scene.title}
            </button>
          ))}
        </div>
      </header>

      <section className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-0 w-[min(1120px,86vw)]"
          animate={{ x: "-50%", y: layout.baseY - active * layout.step }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {scenes.map((scene, index) => {
            const isActive = active === index;
            const isCreator = scene.id === "creator";

            return (
            <motion.article
              key={scene.id}
              onClick={() => isActive && onEnter(scene.id)}
              className={`relative w-full overflow-hidden rounded-[30px] border border-white/10 bg-black shadow-2xl ${isActive ? "cursor-pointer" : "cursor-default"}`}
              style={{ height: `${layout.cardH}px`, marginBottom: index === scenes.length - 1 ? 0 : `${layout.gap}px`, transformOrigin: "center center" }}
              animate={{
                opacity: isActive ? 0.98 : 0.34,
                scale: isActive ? 1 : 0.9,
                rotate: isActive ? -5 : -4,
                filter: isActive ? "brightness(0.9) blur(0px)" : "brightness(0.42) blur(1.4px)",
              }}
              transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 rounded-[30px] border border-[#f3d0a0]/15" />
              <div className={`absolute inset-[30px] overflow-hidden rounded-[20px] ${isCreator ? "bg-[radial-gradient(circle_at_50%_45%,rgba(255,244,226,.055),transparent_36%),linear-gradient(135deg,rgba(255,255,255,.025),rgba(151,103,216,.045)),#020202]" : "bg-[radial-gradient(circle_at_50%_35%,rgba(255,210,150,.20),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.015)),#050505]"}`} />
              <div className="absolute inset-[30px] overflow-hidden rounded-[20px]">
                <div
                  className={`absolute bg-cover bg-center ${isCreator ? "-inset-8 translate-y-[38%] scale-[1.16] opacity-14 blur-[16px] brightness-[0.38] saturate-[0.7]" : "-inset-5 scale-[1.04] opacity-55 blur-[7px] brightness-[0.58] saturate-[0.72]"}`}
                  style={{ backgroundImage: `url(${scene.image})` }}
                />
              </div>
              <div className="absolute left-0 top-0 z-20 h-full w-[20px] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,.32)_0px,rgba(255,255,255,.32)_10px,transparent_10px,transparent_24px)] opacity-35" />
              <div className="absolute right-0 top-0 z-20 h-full w-[20px] bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,.32)_0px,rgba(255,255,255,.32)_10px,transparent_10px,transparent_24px)] opacity-35" />
              <div className={`absolute inset-[30px] z-10 rounded-[20px] ${isCreator ? "bg-[radial-gradient(circle_at_center,rgba(0,0,0,.12)_0%,rgba(0,0,0,.48)_46%,rgba(0,0,0,.92)_100%),linear-gradient(to_bottom,rgba(0,0,0,.32),rgba(0,0,0,.82))]" : "bg-[radial-gradient(circle_at_center,rgba(0,0,0,.34)_0%,rgba(0,0,0,.46)_42%,rgba(0,0,0,.86)_100%),linear-gradient(to_bottom,rgba(0,0,0,.18),rgba(0,0,0,.68))]"}`} />
              <div className="absolute left-10 top-10 z-30 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/55 backdrop-blur-md">Scene {scene.index}</div>

              <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center text-center">
                <motion.div className="px-8" animate={{ opacity: isActive ? 1 : 0.12, scale: isActive ? 1 : 0.95, y: isActive ? 0 : 12, rotate: isActive ? 5 : 4 }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
                  <p className={`text-xs uppercase tracking-[0.62em] text-[#d8ac72]/85 ${isCreator ? "mb-10" : "mb-7"}`}>{scene.eyebrow}</p>
                  <h1 className={`font-serif font-medium text-[#fff7ea] drop-shadow-[0_12px_42px_rgba(0,0,0,0.82)] ${isCreator ? "whitespace-nowrap text-[clamp(54px,10.2vw,164px)] leading-[0.86]" : "text-[clamp(72px,12.2vw,200px)] leading-[0.84] tracking-[-0.075em]"}`}>{scene.title}</h1>
                  <p className={`font-serif text-white/78 drop-shadow-[0_8px_28px_rgba(0,0,0,0.86)] ${isCreator ? "mt-11 text-[clamp(22px,2.45vw,38px)]" : "mt-7 text-[clamp(20px,2.2vw,34px)]"}`}>{scene.subtitle}</p>
                </motion.div>
              </div>
              {isActive && (
                <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onEnter(scene.id);
                    }}
                    className="grid h-14 w-14 place-items-center rounded-full border border-[#d8ac72]/35 bg-black/45 text-white/80 backdrop-blur-md transition hover:scale-105 hover:border-[#d8ac72]/70 hover:bg-white/[0.04]"
                    aria-label={`Open ${scene.title}`}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </motion.article>
            );
          })}
        </motion.div>
      </section>

      <aside className="absolute bottom-8 right-8 z-40 flex flex-col items-end gap-4">
        <div className="text-xs uppercase tracking-[0.32em] text-white/45">{current.index} / 03</div>
        <div className="flex flex-col gap-3">
          {scenes.map((scene, index) => (
            <button key={scene.id} className={`h-2 rounded-full transition-all ${active === index ? "w-12 bg-[#f3d0a0]" : "w-6 bg-white/25 hover:bg-white/50"}`} onClick={() => goTo(index)} aria-label={`Go to ${scene.title}`} />
          ))}
        </div>
      </aside>
    </motion.section>
  );
}

function PageShell({ children, onBack, label, tone }) {
  return (
    <motion.section className="relative min-h-screen overflow-hidden pt-[88px]" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
      <AmbientBackground tone={tone} />
      <BrandHeader onBack={onBack} label={label} />
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 pb-20 pt-8 sm:px-8 sm:pt-10">{children}</div>
    </motion.section>
  );
}

function MarketPage({ onBack, onOpenListing }) {
  const [query, setQuery] = useState("检查合同风险");
  const normalizedQuery = query.trim().toLowerCase();
  const matchedListings = experienceListings.filter((listing) => {
    if (!normalizedQuery) return true;
    const haystack = [listing.title, listing.summary, listing.category, ...listing.tags, ...listing.useCases, ...listing.requiredInputs].join(" ").toLowerCase();
    return normalizedQuery.split(/\s+/).some((word) => haystack.includes(word)) || listing.fitScore > 80;
  });

  return (
    <PageShell onBack={onBack} label="Market Page" tone="gold">
      <section className="relative overflow-hidden border-b border-white/8 pb-14 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_10%,rgba(214,165,98,0.18),transparent_24%)]" />
        <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#d6a562]/85">AI CAPABILITY MARKET</p>
        <h1 className="font-serif text-[clamp(88px,13vw,220px)] leading-[0.86] tracking-[-0.075em] text-[#fff6ea]">Market</h1>
        <p className="mt-5 font-serif text-[clamp(20px,2.1vw,34px)] text-white/72">输入需求，找到 AI 工具。</p>
        <div className="relative mx-auto mt-10 max-w-[760px] rounded-[40px] border border-[#d7b182]/25 bg-black/35 px-7 py-5 shadow-[0_0_40px_rgba(214,165,98,0.08)] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 shrink-0 text-white/70" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-lg text-white/85 outline-none placeholder:text-white/28" placeholder="输入需求" />
            <button className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d7b182]/35 text-white/80 transition hover:border-[#d7b182]/70 hover:bg-white/5" aria-label="Search">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
          <span className="text-[#d7b182]/90">试试:</span><button onClick={() => setQuery("检查合同风险")}>检查合同风险</button><button onClick={() => setQuery("生成短视频脚本")}>生成短视频脚本</button><button onClick={() => setQuery("处理发票争议")}>处理发票争议</button>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-[1.55fr_.72fr]">
        <div className="border-r border-white/8 pr-0 xl:pr-10">
          <div className="mb-7 flex items-start justify-between gap-6">
            <div><h2 className="font-serif text-[clamp(34px,3vw,56px)] leading-tight">匹配工具</h2><p className="mt-2 text-white/50">{matchedListings.length} 个结果</p></div>
            <button className="text-sm text-white/45 transition hover:text-white">刷新</button>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {matchedListings.map((listing) => (
              <MarketListingCard key={listing.id} listing={listing} onOpen={() => onOpenListing(listing.id)} />
            ))}
          </div>
        </div>
        <aside className="border border-white/10 bg-white/[0.015] p-8">
          <h3 className="font-serif text-[clamp(30px,2.3vw,46px)] leading-tight">已选工具</h3>
          <p className="mt-2 text-white/45">进入体验前先加入对比。</p>
          <div className="mt-7 border-t border-white/10">
            {experienceListings.map((listing) => (
              <div key={listing.id} className="flex items-start justify-between border-b border-white/10 py-6"><div><div className="font-serif text-[28px] leading-tight text-[#fff6ea]">{listing.title}</div><div className="mt-2 text-white/45">{listing.listingMode === "controlled" ? "受控试用" : "快速上架"}</div></div><button className="text-white/40 transition hover:text-white" aria-label={`Remove ${listing.title}`}><X className="h-5 w-5" /></button></div>
            ))}
          </div>
          <button onClick={() => onOpenListing(experienceListings[0].id)} className="mt-8 flex w-full items-center justify-between border border-[#d7b182]/35 px-6 py-5 text-left text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]"><span>进入体验</span><ArrowRight className="h-5 w-5" /></button>
        </aside>
      </section>
    </PageShell>
  );
}

function ExperiencePage({ selectedListingId = "contract-risk-scanner", onBack }) {
  const listing = experienceListings.find((item) => item.id === selectedListingId) || experienceListings[0];
  const demoFields = listing.trialConfig?.inputSchema || [];
  const [need, setNeed] = useState("我需要快速检查供应商合同里的付款、自动续约和责任限制风险。");
  const [demoValues, setDemoValues] = useState(() => getInitialDemoValues(demoFields));
  const [demoResult, setDemoResult] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDemoValues(getInitialDemoValues(demoFields));
    setDemoResult(null);
    setFeedback("");
    setRecommendations([]);
    setStatus("");
  }, [selectedListingId]);

  const runDemo = () => {
    setDemoResult(createMockDemoResult(listing, demoValues));
    setStatus("已生成风险条款");
  };

  const resetDemo = () => {
    setDemoValues(getInitialDemoValues(demoFields));
    setDemoResult(null);
    setFeedback("");
    setRecommendations([]);
    setStatus("");
  };

  const submitFeedback = () => {
    if (!feedback.trim()) return;
    setRecommendations(createMockRecommendations(feedback));
    setStatus("已换一组工具");
  };

  const contactCreator = () => setStatus(`已发送给 ${listing.creatorContact}`);
  const mockPurchase = () => setStatus("模拟购买已完成");
  const openWork = () => setStatus("已打开作品入口");

  return (
    <PageShell onBack={onBack} label="Experience Page" tone="blue">
      <section className="relative overflow-hidden border-b border-white/8 pb-12">
        <div className="pointer-events-none absolute left-0 top-[36%] h-px w-[42%] bg-gradient-to-r from-transparent via-[#d7924e]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-[36%] h-px w-[42%] bg-gradient-to-l from-transparent via-[#7297e8]/80 to-transparent" />
        <div className="relative mx-auto max-w-[1180px] text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#d6a562]/85">{listing.category}</p>
          <h1 className="font-serif text-[clamp(58px,9.2vw,150px)] leading-[0.9] tracking-[-0.065em] text-[#fff6ea]">{listing.title}</h1>
          <p className="mx-auto mt-6 max-w-[760px] font-serif text-[clamp(20px,2vw,32px)] leading-tight text-white/72">{listing.summary}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="border border-[#7ea4ff]/55 bg-[#7ea4ff]/10 px-4 py-2 text-sm text-white">{listing.listingMode === "controlled" ? "受控试用" : "快速上架"} · {listing.title}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {listing.tags.map((tag) => (
              <span key={tag} className="border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/62">{tag}</span>
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 border border-white/10 bg-white/[0.015] sm:grid-cols-3">
            <HeroMetric label="适配度" value={`${listing.fitScore}%`} />
            <HeroMetric label="试用限制" value={listing.demoLimits} />
            <HeroMetric label="价格" value={listing.pricingText} />
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[.82fr_1.18fr]">
        <aside className="space-y-8">
          <WorkMedia listing={listing} />

          <div className="border border-white/10 bg-white/[0.015] p-6 sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-6 border-b border-white/10 pb-7">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Fit check</div>
                <h2 className="mt-4 font-serif text-[clamp(32px,2.8vw,52px)] leading-tight">需求适配</h2>
              </div>
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-[#7ea4ff]/55 text-[34px] font-light text-white shadow-[0_0_34px_rgba(126,164,255,0.12)]">{listing.fitScore}</div>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/35">你的需求</span>
              <textarea
                rows={4}
                value={need}
                onChange={(event) => setNeed(event.target.value)}
                className="mt-4 w-full resize-none border border-white/10 bg-black/35 p-4 text-[15px] leading-7 text-white/82 outline-none placeholder:text-white/22 focus:border-[#7ea4ff]/45"
                placeholder="写下你要检查的合同、行业和最担心的问题。"
              />
            </label>

            <div className="mt-7 grid grid-cols-1 gap-4">
              <FitBlock icon={<CheckCircle2 className="h-5 w-5" />} title="匹配" items={listing.fitCriteria.matches} tone="text-[#8eb0ff]" />
              <FitBlock icon={<AlertTriangle className="h-5 w-5" />} title="留意" items={listing.fitCriteria.gaps} tone="text-[#e4bc85]" />
              <div className="border border-white/10 bg-black/25 p-5">
                <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85"><ShieldCheck className="h-5 w-5" />试用方式</div>
                <p className="text-[15px] leading-7 text-white/62">{listing.fitCriteria.nextStep}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-1">
            <InfoList title="适合场景" items={listing.useCases} />
            <InfoList title="输入要求" items={listing.requiredInputs} />
            <InfoList title="主要输出" items={listing.outputs} />
          </div>
        </aside>

        {listing.listingMode === "controlled" ? (
          <ControlledExperiencePanel
            listing={listing}
            demoFields={demoFields}
            demoValues={demoValues}
            setDemoValues={setDemoValues}
            runDemo={runDemo}
            resetDemo={resetDemo}
            contactCreator={contactCreator}
            mockPurchase={mockPurchase}
            status={status}
            demoResult={demoResult}
            feedback={feedback}
            setFeedback={setFeedback}
            submitFeedback={submitFeedback}
            recommendations={recommendations}
          />
        ) : (
          <BasicExperiencePanel
            listing={listing}
            openWork={openWork}
            contactCreator={contactCreator}
            status={status}
            feedback={feedback}
            setFeedback={setFeedback}
            submitFeedback={submitFeedback}
            recommendations={recommendations}
          />
        )}
      </section>
    </PageShell>
  );
}

function CreatorStudioPage({ onBack }) {
  return (
    <PageShell onBack={onBack} label="Creator Studio Page" tone="violet">
      <section className="relative overflow-hidden border-b border-white/8 pb-14 text-center">
        <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#d6a562]/85">CREATOR CONTROL ROOM</p>
        <h1 className="font-serif text-[clamp(76px,11vw,180px)] leading-[0.88] tracking-[-0.07em] text-[#fff6ea]">Creator Studio</h1>
        <p className="mt-5 font-serif text-[clamp(20px,2.1vw,34px)] text-white/72">上传作品，发布到市场。</p>
      </section>
      <section className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1.05fr]">
        <div className="border border-white/10 bg-white/[0.015] p-8"><div className="mb-8"><div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Submit work</div><h2 className="mt-4 font-serif text-[clamp(32px,2.6vw,50px)] leading-tight">上传 AI 作品</h2><p className="mt-4 max-w-[660px] text-[16px] leading-8 text-white/55">填写作品、封面、链接和价格。</p></div><CreatorInput /></div>
        <div className="border border-white/10 bg-white/[0.015] p-8"><div className="mb-8 flex items-start justify-between gap-6 border-b border-white/10 pb-7"><div><div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Preview</div><h2 className="mt-4 font-serif text-[clamp(32px,2.6vw,50px)] leading-tight">发布预览</h2><p className="mt-4 max-w-[680px] text-[16px] leading-8 text-white/55">检查卡片、价格、标签和试用入口。</p></div><div className="border border-white/10 px-4 py-3 text-center"><div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Fit</div><div className="mt-2 font-serif text-[42px] text-[#fff6ea]">82</div></div></div><GeneratedReport /></div>
      </section>
    </PageShell>
  );
}

function Meta({ label, value, className = "" }) {
  return <div className={`pt-1 ${className}`}><div className="text-[11px] uppercase tracking-[0.24em] text-white/30">{label}</div><div className="mt-3 text-white/72">{value}</div></div>;
}

function MarketListingCard({ listing, onOpen }) {
  return (
    <article className="group grid grid-cols-1 overflow-hidden border border-white/10 bg-white/[0.015] transition hover:border-white/18 hover:bg-white/[0.025] lg:grid-cols-[260px_1fr]">
      <div className="relative min-h-[220px] overflow-hidden bg-black">
        <img src={listing.coverImage} alt={`${listing.title} cover`} className="h-full w-full object-cover opacity-62 brightness-75 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.74)_100%)]" />
        <div className="absolute left-4 top-4 border border-white/10 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/52">{listing.listingMode === "controlled" ? "受控试用" : "快速上架"}</div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">{listing.category}</div>
            <h3 className="mt-3 font-serif text-[clamp(32px,3vw,54px)] leading-tight text-[#fff6ea]">{listing.title}</h3>
            <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-white/58">{listing.summary}</p>
          </div>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-[#7ea4ff]/45 text-[28px] font-light text-white">{listing.fitScore}</div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {listing.tags.map((tag) => <span key={tag} className="border border-white/10 px-3 py-2 text-sm text-white/56">{tag}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button onClick={onOpen} className="inline-flex items-center gap-3 border border-[#d7b182]/35 px-5 py-3 text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]">
            进入体验 <ArrowRight className="h-5 w-5" />
          </button>
          <span className="text-sm text-white/42">{listing.pricingText}</span>
        </div>
      </div>
    </article>
  );
}

function HeroMetric({ label, value }) {
  return (
    <div className="border-b border-white/10 p-5 text-center sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/32">{label}</div>
      <div className="mt-3 font-serif text-[clamp(22px,2vw,34px)] leading-tight text-[#fff6ea]">{value}</div>
    </div>
  );
}

function FitBlock({ icon, title, items, tone }) {
  return (
    <div className="border border-white/10 bg-black/25 p-5">
      <div className={`mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] ${tone}`}>{icon}{title}</div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-[15px] leading-7 text-white/62">
            <Check className="mt-1 h-4 w-4 shrink-0 text-white/32" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoList({ title, items }) {
  return (
    <div className="border border-white/10 bg-white/[0.015] p-5">
      <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">{title}</div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="border-l border-white/10 pl-4 text-[15px] leading-6 text-white/62">{item}</div>
        ))}
      </div>
    </div>
  );
}

function WorkMedia({ listing }) {
  return (
    <div className="border border-white/10 bg-white/[0.015] p-5">
      <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black">
        <img src={listing.coverImage} alt={`${listing.title} cover`} className="h-full w-full object-cover opacity-70 blur-[1px] brightness-75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.72)_100%)]" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="mb-3 w-fit border border-white/10 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/48">{listing.listingMode === "controlled" ? "受控试用" : "快速上架"}</div>
          <div className="font-serif text-[clamp(30px,3vw,52px)] leading-none text-[#fff6ea]">{listing.title}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {listing.galleryImages.map((image) => (
          <div key={image} className="aspect-[4/3] overflow-hidden border border-white/10 bg-black">
            <img src={image} alt="" className="h-full w-full object-cover opacity-55 brightness-75" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ControlledExperiencePanel({
  listing,
  demoFields,
  demoValues,
  setDemoValues,
  runDemo,
  resetDemo,
  contactCreator,
  mockPurchase,
  status,
  demoResult,
  feedback,
  setFeedback,
  submitFeedback,
  recommendations,
}) {
  return (
    <section className="border border-white/10 bg-white/[0.015] p-6 sm:p-8">
      <div className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">受控试用</div>
          <h3 className="mt-3 font-serif text-[clamp(30px,2.4vw,46px)] leading-tight">粘贴合同，查看风险条款</h3>
        </div>
        <button onClick={resetDemo} className="inline-flex w-fit items-center gap-2 text-white/40 transition hover:text-white">
          <RotateCcw className="h-4 w-4" />重置
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {demoFields.map((field) => (
          <DemoField key={field.id} field={field} value={demoValues[field.id]} onChange={(value) => setDemoValues((current) => ({ ...current, [field.id]: value }))} />
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button onClick={runDemo} className="inline-flex items-center gap-3 border border-[#7ea4ff]/35 px-5 py-3 text-[#dce6ff] transition hover:border-[#7ea4ff]/70 hover:bg-white/[0.03]">
          <FileText className="h-5 w-5" />查看风险条款
        </button>
        <button onClick={contactCreator} className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-white/70 transition hover:bg-white/[0.03] hover:text-white">
          <MessageSquare className="h-5 w-5" />联系创建者
        </button>
        <button onClick={mockPurchase} className="inline-flex items-center gap-3 border border-[#d7b182]/35 px-5 py-3 text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]">
          <ShoppingBag className="h-5 w-5" />模拟购买
        </button>
      </div>

      {status && <div className="mt-5 border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/58">{status}</div>}

      <DemoResult result={demoResult} />

      <FeedbackPanel feedback={feedback} setFeedback={setFeedback} onSubmit={submitFeedback} recommendations={recommendations} />
    </section>
  );
}

function BasicExperiencePanel({ listing, openWork, contactCreator, status, feedback, setFeedback, submitFeedback, recommendations }) {
  const embedSrc = listing.embedUrl || listing.demoUrl;

  return (
    <section className="border border-white/10 bg-white/[0.015] p-6 sm:p-8">
      <div className="mb-8 border-b border-white/10 pb-7">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">快速上架</div>
        <h3 className="mt-3 font-serif text-[clamp(30px,2.4vw,46px)] leading-tight">体验作品</h3>
      </div>

      <div className="overflow-hidden border border-white/10 bg-black">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="truncate text-sm text-white/48">{embedSrc}</div>
          <a href={listing.demoUrl} target="_blank" rel="noreferrer" onClick={openWork} className="ml-4 shrink-0 text-sm text-[#dce6ff] transition hover:text-white">打开作品</a>
        </div>
        <div className="h-[520px] bg-[#050505]">
          <iframe
            title={`${listing.title} demo`}
            src={embedSrc}
            className="h-full w-full border-0 bg-white"
            loading="lazy"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-downloads"
          />
        </div>
      </div>

      <div className="mt-7 border border-white/10 bg-black/25 p-5">
        <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/35">作品链接</div>
        <div className="break-all font-serif text-[clamp(22px,1.8vw,32px)] leading-tight text-[#fff6ea]">{listing.demoUrl}</div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <a href={listing.demoUrl} target="_blank" rel="noreferrer" onClick={openWork} className="inline-flex items-center gap-3 border border-[#7ea4ff]/35 px-5 py-3 text-[#dce6ff] transition hover:border-[#7ea4ff]/70 hover:bg-white/[0.03]">
          <ExternalLink className="h-5 w-5" />打开作品
        </a>
        <button onClick={contactCreator} className="inline-flex items-center gap-3 border border-white/10 px-5 py-3 text-white/70 transition hover:bg-white/[0.03] hover:text-white">
          <MessageSquare className="h-5 w-5" />联系创建者
        </button>
      </div>

      {status && <div className="mt-5 border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/58">{status}</div>}

      <div className="mt-8 border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.035),rgba(255,255,255,.012))] p-6">
        <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]">试用前准备</div>
        <div className="space-y-3">
          {listing.requiredInputs.map((item) => (
            <div key={item} className="flex gap-3 text-[15px] leading-7 text-white/62">
              <Check className="mt-1 h-4 w-4 shrink-0 text-white/32" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <FeedbackPanel feedback={feedback} setFeedback={setFeedback} onSubmit={submitFeedback} recommendations={recommendations} />
    </section>
  );
}

function DemoField({ field, value, onChange }) {
  const label = <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-white/35">{field.label}</div>;

  if (field.type === "textarea") {
    return (
      <label className="block border border-white/10 bg-black/35 p-5">
        {label}
        <textarea
          rows={field.rows || 5}
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="w-full resize-none bg-transparent text-[16px] leading-8 text-white/85 outline-none placeholder:text-white/25"
          placeholder={field.placeholder}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block border border-white/10 bg-black/25 p-5">
        {label}
        <select
          value={value || ""}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-white/82 outline-none [&>option]:bg-[#080808]"
        >
          {field.options.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
    );
  }

  if (field.type === "checkboxGroup") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="border border-white/10 bg-black/25 p-5">
        {label}
        <div className="flex flex-wrap gap-3">
          {field.options.map((option) => {
            const active = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(active ? selected.filter((item) => item !== option) : [...selected, option])}
                className={`border px-4 py-2 text-sm transition ${active ? "border-[#7ea4ff]/55 bg-[#7ea4ff]/10 text-white" : "border-white/10 text-white/58 hover:text-white"}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <label className="block border border-dashed border-white/15 bg-black/20 p-5 transition hover:border-[#7ea4ff]/45">
        {label}
        <input
          type="file"
          accept={field.accept}
          className="hidden"
          onChange={(event) => onChange(event.target.files?.[0]?.name || "")}
        />
        <div className="flex items-center justify-between gap-4 text-white/58">
          <span>{value || field.placeholder}</span>
          <Upload className="h-5 w-5 shrink-0" />
        </div>
      </label>
    );
  }

  return (
    <label className="block border border-white/10 bg-black/25 p-5">
      {label}
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-white/82 outline-none placeholder:text-white/22"
        placeholder={field.placeholder}
      />
    </label>
  );
}

function DemoResult({ result }) {
  if (!result) {
    return (
      <div className="mt-8 border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.035),rgba(255,255,255,.012))] p-6">
        <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]">结果</div>
        <div className="font-serif text-[clamp(24px,2vw,36px)] leading-tight text-[#fff6ea]">点击查看风险条款</div>
      </div>
    );
  }

  return (
    <div className="mt-8 border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] p-6">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]">风险条款</div>
          <h4 className="font-serif text-[clamp(26px,2.2vw,42px)] leading-tight text-[#fff6ea]">{result.headline}</h4>
        </div>
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-[#7ea4ff]/55 text-[36px] font-light text-white">{result.confidence}</div>
      </div>
      <div className="space-y-4">
        {result.risks.map((risk) => (
          <div key={risk.title} className="grid grid-cols-1 gap-4 border border-white/10 bg-black/25 p-5 lg:grid-cols-[120px_1fr]">
            <div>
              <div className={`w-fit border px-3 py-1 text-xs uppercase tracking-[0.2em] ${risk.level === "High" ? "border-[#d58c4a]/45 text-[#e4bc85]" : "border-[#7ea4ff]/35 text-[#8eb0ff]"}`}>{risk.level}</div>
              <div className="mt-3 text-sm text-white/35">{risk.clause}</div>
            </div>
            <div>
              <div className="font-serif text-[26px] leading-tight text-[#fff6ea]">{risk.title}</div>
              <p className="mt-3 text-[15px] leading-7 text-white/58">{risk.action}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white/62 transition hover:text-white">
          <Bookmark className="h-4 w-4" />保存结果
        </button>
        <button className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-white/62 transition hover:text-white">
          <ShieldCheck className="h-4 w-4" />查看修改建议
        </button>
      </div>
    </div>
  );
}

function FeedbackPanel({ feedback, setFeedback, onSubmit, recommendations }) {
  return (
    <div className="mt-8 border border-white/10 bg-black/25 p-6">
      <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">反馈</div>
      <textarea
        rows={4}
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
        className="w-full resize-none border border-white/10 bg-black/35 p-4 text-[15px] leading-7 text-white/82 outline-none placeholder:text-white/24 focus:border-[#7ea4ff]/45"
        placeholder="告诉我们哪里不合适，也可以写推荐很符合。"
      />
      <div className="mt-4 flex flex-wrap gap-3">
        {["行业不匹配", "输出太浅", "需要处理文件", "推荐很符合"].map((item) => (
          <button key={item} onClick={() => setFeedback((current) => current ? `${current}；${item}` : item)} className="border border-white/10 px-3 py-2 text-sm text-white/56 transition hover:text-white">{item}</button>
        ))}
      </div>
      <button onClick={onSubmit} className="mt-5 inline-flex items-center gap-3 border border-[#7ea4ff]/35 px-5 py-3 text-[#dce6ff] transition hover:border-[#7ea4ff]/70 hover:bg-white/[0.03]">
        <Send className="h-5 w-5" />换一个更匹配的工具
      </button>

      {recommendations.length > 0 && (
        <div className="mt-7 border-t border-white/10 pt-6">
          <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]">新的推荐</div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {recommendations.map((item) => (
              <div key={item.id} className="border border-white/10 bg-white/[0.015] p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/34">{item.category}</div>
                <div className="mt-3 font-serif text-[24px] leading-tight text-[#fff6ea]">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-white/55">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => <span key={tag} className="border border-white/10 px-2 py-1 text-xs text-white/48">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getInitialDemoValues(fields) {
  return fields.reduce((values, field) => ({ ...values, [field.id]: field.defaultValue || (field.type === "checkboxGroup" ? [] : "") }), {});
}

function createMockDemoResult(listing, values) {
  const focusAreas = Array.isArray(values.focusAreas) ? values.focusAreas : [];
  return {
    outputType: listing.trialConfig?.resultType || "mock-result",
    headline: `${values.contractType || "合同"}发现 3 个优先处理风险`,
    confidence: 89,
    risks: [
      {
        level: "High",
        clause: focusAreas.includes("付款周期") ? "付款周期" : "付款",
        title: "付款周期偏长",
        action: "建议把 90 日付款改为 30-45 日，并加入逾期利息或暂停服务权利。",
      },
      {
        level: "High",
        clause: focusAreas.includes("自动续约") ? "自动续约" : "续约",
        title: "自动续约提醒不足",
        action: "建议把提前通知窗口缩短为 30 日，并要求续约前发送明确提醒。",
      },
      {
        level: "Medium",
        clause: focusAreas.includes("责任限制") ? "责任限制" : "责任",
        title: "间接损失责任过宽",
        action: "建议保留数据泄露、保密违约、重大过失的责任例外。",
      },
    ],
  };
}

function createMockRecommendations(feedback) {
  const lowerFeedback = feedback.toLowerCase();
  if (lowerFeedback.includes("文件") || lowerFeedback.includes("隐私") || lowerFeedback.includes("security")) {
    return [fallbackListings[0], fallbackListings[2], fallbackListings[1]];
  }
  if (lowerFeedback.includes("付款") || lowerFeedback.includes("发票") || lowerFeedback.includes("invoice")) {
    return [fallbackListings[1], fallbackListings[0], fallbackListings[2]];
  }
  return fallbackListings;
}

function CreatorInput() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const basicFields = [
    ["作品名称", "例如 Contract Risk Scanner"],
    ["适合人群", "填写 target users"],
    ["使用场景", "填写 use cases"],
    ["不适合", "填写 not for"],
    ["价格", "例如 $19 / scan"],
    ["标签", "用逗号分隔"],
  ];
  const apiFields = [
    ["API 地址", "https://api.yourtool.com/demo"],
    ["请求方式", "POST"],
    ["鉴权密钥", "sk_..."],
    ["试用次数", "每日 3 次"],
    ["输入字段", "contractText, contractType, focusAreas"],
    ["结果样式", "risk-list"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_.72fr]">
        <label className="block border border-dashed border-[#d7b182]/30 bg-black/25 p-5 transition hover:border-[#d7b182]/55">
          <input type="file" accept="image/*" className="hidden" />
          <div className="flex min-h-[210px] flex-col items-center justify-center text-center">
            <Image className="mb-5 h-9 w-9 text-[#d7b182]/80" />
            <div className="font-serif text-[32px] leading-tight text-[#fff6ea]">上传封面</div>
            <div className="mt-3 text-sm text-white/42">至少 1 张</div>
          </div>
        </label>
        <label className="block border border-dashed border-white/15 bg-black/20 p-5 transition hover:border-[#7ea4ff]/45">
          <input type="file" accept="image/*" multiple className="hidden" />
          <div className="flex h-full min-h-[210px] flex-col items-center justify-center text-center">
            <Plus className="mb-5 h-9 w-9 text-white/46" />
            <div className="font-serif text-[28px] leading-tight text-[#fff6ea]">添加展示图</div>
            <div className="mt-3 text-sm text-white/42">截图、海报、结果预览</div>
          </div>
        </label>
      </div>

      <div className="border border-white/10 bg-black/35 p-5">
        <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-white/35">作品介绍</div>
        <textarea rows={7} className="w-full resize-none bg-transparent text-[17px] leading-8 text-white/82 outline-none placeholder:text-white/22" placeholder="写清楚工具解决什么问题、适合谁、交付什么结果。" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {basicFields.map(([field, placeholder]) => (
          <div key={field} className="border border-white/10 bg-black/25 p-4">
            <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/32">{field}</div>
            <input className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/22" placeholder={placeholder} />
          </div>
        ))}
      </div>

      <div className="border border-white/10 bg-black/25 p-5">
        <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">快速上架</div>
        <input className="w-full bg-transparent text-[17px] text-white/82 outline-none placeholder:text-white/22" placeholder="填写作品链接" />
      </div>

      <div className="border border-white/10 bg-black/25">
        <button
          type="button"
          onClick={() => setControlledOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 p-5 text-left"
        >
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]"><LockKeyhole className="h-5 w-5" />开启受控试用</span>
          <ChevronDown className={`h-5 w-5 text-white/42 transition ${controlledOpen ? "rotate-180" : ""}`} />
        </button>
        {controlledOpen && (
          <div className="grid grid-cols-1 gap-5 border-t border-white/10 p-5 md:grid-cols-2">
            {apiFields.map(([field, placeholder]) => (
              <label key={field} className="block border border-white/10 bg-black/25 p-4">
                <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/32">{field}</div>
                <input className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/22" placeholder={placeholder} />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button className="border border-[#d7b182]/35 px-5 py-3 text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]">保存作品</button>
        <button className="border border-white/10 px-5 py-3 text-white/70 transition hover:bg-white/[0.03] hover:text-white">预览卡片</button>
      </div>
    </div>
  );
}

function GeneratedReport() {
  return <div className="space-y-7"><ReportBlock title="作品名称">Contract Risk Scanner</ReportBlock><ReportBlock title="卡片描述">粘贴合同，查看风险条款、严重程度和修改建议。</ReportBlock><ReportBlock title="推荐标签"><div className="flex flex-wrap gap-3">{["Legal Ops", "Contract Review", "Risk Scan", "Bilingual"].map((tag) => <span key={tag} className="border border-white/10 px-3 py-2 text-sm text-white/62">{tag}</span>)}</div></ReportBlock><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><ReportBlock title="价格">$19 / scan</ReportBlock><ReportBlock title="试用入口">受控试用</ReportBlock></div><ReportBlock title="发布前检查"><ul className="space-y-3 text-white/62"><li>上传封面。</li><li>填写作品链接。</li><li>检查价格和标签。</li></ul></ReportBlock></div>;
}

function ReportBlock({ title, children }) {
  return <div className="border border-white/10 bg-black/25 p-5"><div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/34">{title}</div><div className="font-serif text-[clamp(22px,1.6vw,32px)] leading-[1.45] text-[#fff6ea]">{children}</div></div>;
}
