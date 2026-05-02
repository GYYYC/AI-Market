import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, RotateCcw, Search, X } from "lucide-react";

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

export default function AICapabilityMarketExperience() {
  const [route, setRoute] = useState("landing");

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-[#f7efe4]">
      <AnimatePresence mode="wait">
        {route === "landing" && <LandingPage key="landing" onEnter={setRoute} />}
        {route === "market" && <MarketPage key="market" onBack={() => setRoute("landing")} />}
        {route === "experience" && <ExperiencePage key="experience" onBack={() => setRoute("landing")} />}
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

function MarketPage({ onBack }) {
  return (
    <PageShell onBack={onBack} label="Market Page" tone="gold">
      <section className="relative overflow-hidden border-b border-white/8 pb-14 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_10%,rgba(214,165,98,0.18),transparent_24%)]" />
        <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#d6a562]/85">AI CAPABILITY MARKET</p>
        <h1 className="font-serif text-[clamp(88px,13vw,220px)] leading-[0.86] tracking-[-0.075em] text-[#fff6ea]">Market</h1>
        <p className="mt-5 font-serif text-[clamp(20px,2.1vw,34px)] text-white/72">Describe a goal. Find AI capability.</p>
        <div className="relative mx-auto mt-10 max-w-[760px] rounded-[40px] border border-[#d7b182]/25 bg-black/35 px-7 py-5 shadow-[0_0_40px_rgba(214,165,98,0.08)] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 shrink-0 text-white/70" />
            <input className="w-full bg-transparent text-lg text-white/85 outline-none placeholder:text-white/28" placeholder="Describe your goal..." />
            <button className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d7b182]/35 text-white/80 transition hover:border-[#d7b182]/70 hover:bg-white/5" aria-label="Search">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
          <span className="text-[#d7b182]/90">Try:</span><span>Forecast customer churn</span><span>Automate document analysis</span><span>Personalize marketing</span>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 xl:grid-cols-[1.55fr_.72fr]">
        <div className="border-r border-white/8 pr-0 xl:pr-10">
          <div className="mb-7 flex items-start justify-between gap-6">
            <div><h2 className="font-serif text-[clamp(34px,3vw,56px)] leading-tight">AI-matched solutions</h2><p className="mt-2 text-white/50">Top capabilities matched to your goal.</p></div>
            <button className="text-sm text-white/45 transition hover:text-white">Why these?</button>
          </div>
          <div className="border-t border-white/10">
            {marketSolutions.map(([id, title, desc, category, complexity]) => (
              <div key={id} className="group grid grid-cols-[48px_1fr_44px] items-start gap-4 border-b border-white/10 py-8 transition hover:bg-white/[0.015] md:grid-cols-[56px_1.35fr_.55fr_.55fr_52px] md:gap-6">
                <div className="pt-2 font-serif text-[34px] leading-none text-white/55">{id}</div>
                <div><h3 className="font-serif text-[clamp(28px,2.2vw,42px)] leading-tight text-[#fff6ea] transition group-hover:translate-x-[2px]">{title}</h3><p className="mt-3 max-w-[680px] text-[15px] leading-7 text-white/55">{desc}</p></div>
                <Meta className="col-start-2 md:col-auto" label="Category" value={category} />
                <Meta className="col-start-2 md:col-auto" label="Complexity" value={complexity} />
                <button className="col-start-3 row-start-1 mt-1 grid h-11 w-11 place-items-center rounded-full border border-[#d7b182]/28 text-white/70 transition group-hover:border-[#d7b182]/60 group-hover:text-white md:col-auto md:row-auto md:h-12 md:w-12" aria-label={`Add ${title}`}>
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <aside className="border border-white/10 bg-white/[0.015] p-8">
          <h3 className="font-serif text-[clamp(30px,2.3vw,46px)] leading-tight">Your selections</h3>
          <p className="mt-2 text-white/45">Capabilities you’ve selected.</p>
          <div className="mt-7 border-t border-white/10">
            {["Predictive Intelligence", "Anomaly Detection", "Intelligent Automation"].map((title) => (
              <div key={title} className="flex items-start justify-between border-b border-white/10 py-6"><div><div className="font-serif text-[28px] leading-tight text-[#fff6ea]">{title}</div><div className="mt-2 text-white/45">Selected capability</div></div><button className="text-white/40 transition hover:text-white" aria-label={`Remove ${title}`}><X className="h-5 w-5" /></button></div>
            ))}
          </div>
          <button className="mt-8 flex w-full items-center justify-between border border-[#d7b182]/35 px-6 py-5 text-left text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]"><span>Compare selections</span><ArrowRight className="h-5 w-5" /></button>
        </aside>
      </section>
    </PageShell>
  );
}

function ExperiencePage({ onBack }) {
  return (
    <PageShell onBack={onBack} label="Experience Page" tone="blue">
      <section className="relative overflow-hidden border-b border-white/8 pb-12 text-center">
        <div className="pointer-events-none absolute left-0 top-[36%] h-px w-[42%] bg-gradient-to-r from-transparent via-[#d7924e]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-[36%] h-px w-[42%] bg-gradient-to-l from-transparent via-[#7297e8]/80 to-transparent" />
        <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#d6a562]/85">PRODUCT TRIAL SCENE</p>
        <h1 className="font-serif text-[clamp(88px,13vw,220px)] leading-[0.86] tracking-[-0.075em] text-[#fff6ea]">Experience</h1>
        <p className="mt-5 font-serif text-[clamp(20px,2.1vw,34px)] text-white/72">See it. Try it. Understand it.</p>
        <div className="mx-auto mt-10 h-14 w-[420px] max-w-[80vw] rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[.85fr_1.3fr]">
        <div className="border border-white/10 bg-white/[0.015] p-8">
          <div className="border-b border-white/10 pb-7"><div className="text-sm uppercase tracking-[0.28em] text-[#d7b182]/85">Product capability</div><h2 className="mt-4 font-serif text-[clamp(34px,3vw,56px)] leading-tight">Predictive Intelligence</h2><p className="mt-4 max-w-[620px] text-[16px] leading-8 text-white/55">Forecast outcomes with confidence using advanced time-series, signals analysis, and causal models.</p></div>
          <div className="divide-y divide-white/10">
            {[["Input", "Provide the context, signals, or data you want the model to understand.", "text-[#e4bc85]"], ["Process", "Our models analyze patterns, relationships, and uncertainty to generate insight.", "text-[#d7b182]"], ["Output", "Receive a clear, actionable response with confidence you can trust.", "text-[#8eb0ff]"]].map(([title, desc, color]) => (
              <div key={title} className="flex items-start justify-between gap-6 py-8"><div><h3 className={`font-serif text-[36px] leading-tight ${color}`}>{title}</h3><p className="mt-3 max-w-[500px] text-[15px] leading-7 text-white/52">{desc}</p></div><ArrowRight className="mt-3 h-5 w-5 shrink-0 text-white/30" /></div>
            ))}
          </div>
        </div>
        <div className="border border-white/10 bg-white/[0.015] p-8">
          <div className="mb-8 flex items-center justify-between"><div><div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Trial console</div><h3 className="mt-3 font-serif text-[clamp(28px,2vw,40px)]">Test the capability live</h3></div><button className="inline-flex items-center gap-2 text-white/40 transition hover:text-white"><RotateCcw className="h-4 w-4" />Reset</button></div>
          <ConsoleTextarea />
          <div className="mt-8 border border-white/10 px-5 py-6"><div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">Process</div><div className="mb-4 text-white/40">Analyzing patterns, relationships, and uncertainty...</div><div className="relative h-px bg-white/10"><div className="absolute left-0 top-0 h-px w-[54%] bg-gradient-to-r from-[#d58c4a] via-[#f2dfc5] to-[#78a0ff]" /><div className="absolute left-[53%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" /></div></div>
          <div className="mt-8 border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.015))] p-6">
            <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#7ea4ff]">Output</div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_1fr]"><div><div className="grid h-24 w-24 place-items-center rounded-full border-4 border-[#7ea4ff]/55 text-[42px] font-light text-white">87</div><div className="mt-4 text-white/55">Confidence</div><div className="mt-1 font-serif text-[22px] text-[#fff6ea]">High</div></div><div><h4 className="font-serif text-[clamp(26px,2vw,40px)] leading-tight text-[#fff6ea]">Demand is projected to increase 24.6% next quarter, driven by seasonal uplift and sustainability demand.</h4><div className="mt-6 flex flex-wrap gap-3">{["Seasonality", "Sustainability trends", "Market growth"].map((tag) => <span key={tag} className="border border-white/10 px-3 py-2 text-sm text-white/60">{tag}</span>)}</div></div></div>
          </div>
        </div>
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
        <p className="mt-5 font-serif text-[clamp(20px,2.1vw,34px)] text-white/72">Turn a brief into a market listing.</p>
      </section>
      <section className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1.05fr]">
        <div className="border border-white/10 bg-white/[0.015] p-8"><div className="mb-8"><div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Product brief</div><h2 className="mt-4 font-serif text-[clamp(32px,2.6vw,50px)] leading-tight">Input your product introduction</h2><p className="mt-4 max-w-[660px] text-[16px] leading-8 text-white/55">Describe the product, audience, differentiation, key benefits, tone, and commercial context.</p></div><CreatorInput /></div>
        <div className="border border-white/10 bg-white/[0.015] p-8"><div className="mb-8 flex items-start justify-between gap-6 border-b border-white/10 pb-7"><div><div className="text-[11px] uppercase tracking-[0.28em] text-[#d7b182]/85">Generated report</div><h2 className="mt-4 font-serif text-[clamp(32px,2.6vw,50px)] leading-tight">Listing analysis</h2><p className="mt-4 max-w-[680px] text-[16px] leading-8 text-white/55">A refined publishing view with strategic recommendations, creative direction, and listing risk checks.</p></div><div className="border border-white/10 px-4 py-3 text-center"><div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Score</div><div className="mt-2 font-serif text-[42px] text-[#fff6ea]">82</div></div></div><GeneratedReport /></div>
      </section>
    </PageShell>
  );
}

function Meta({ label, value, className = "" }) {
  return <div className={`pt-1 ${className}`}><div className="text-[11px] uppercase tracking-[0.24em] text-white/30">{label}</div><div className="mt-3 text-white/72">{value}</div></div>;
}

function ConsoleTextarea() {
  return <div><div className="text-[11px] uppercase tracking-[0.24em] text-[#d7b182]/85">Input</div><p className="mt-3 text-white/52">Describe your goal, question, or context.</p><div className="mt-4 border border-white/10 bg-black/35 p-5"><textarea rows={6} className="w-full resize-none bg-transparent text-[17px] leading-8 text-white/85 outline-none placeholder:text-white/25" placeholder="e.g., Forecast next quarter’s demand for eco-friendly packaging based on market trends and seasonality." /><div className="mt-4 flex flex-wrap gap-3">{["Add context", "Time range", "Advanced settings"].map((tag) => <button key={tag} className="border border-white/10 px-4 py-2 text-sm text-white/65 transition hover:bg-white/[0.03] hover:text-white">{tag}</button>)}</div></div></div>;
}

function CreatorInput() {
  return <div className="space-y-6"><div className="border border-white/10 bg-black/35 p-5"><div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-white/35">Product overview</div><textarea rows={8} className="w-full resize-none bg-transparent text-[17px] leading-8 text-white/82 outline-none placeholder:text-white/22" placeholder="Describe your product in one clear paragraph..." /></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2">{["Target audience", "Differentiation", "Key benefits", "Tone of voice"].map((field) => <div key={field} className="border border-white/10 bg-black/25 p-4"><div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/32">{field}</div><input className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/22" placeholder={`Add ${field.toLowerCase()}...`} /></div>)}</div><div className="flex flex-wrap items-center gap-4 pt-2"><button className="border border-[#d7b182]/35 px-5 py-3 text-[#f0dcc0] transition hover:border-[#d7b182]/65 hover:bg-white/[0.02]">Generate listing</button><button className="border border-white/10 px-5 py-3 text-white/70 transition hover:bg-white/[0.03] hover:text-white">Save draft</button></div></div>;
}

function GeneratedReport() {
  return <div className="space-y-7"><ReportBlock title="Suggested title">AI Workflow Assistant for Modern Teams</ReportBlock><ReportBlock title="Short description">Save hours and ship faster with an intelligent workflow assistant designed to streamline repetitive decisions and help teams move from intent to execution with clarity.</ReportBlock><ReportBlock title="Recommended tags"><div className="flex flex-wrap gap-3">{["Productivity", "Workflow", "Automation", "SaaS", "Operations"].map((tag) => <span key={tag} className="border border-white/10 px-3 py-2 text-sm text-white/62">{tag}</span>)}</div></ReportBlock><div className="grid grid-cols-1 gap-5 md:grid-cols-2"><ReportBlock title="Pricing suggestion">$29–49 / seat / month</ReportBlock><ReportBlock title="Positioning">Strong relevance for startup operators, growth teams, and lean internal ops.</ReportBlock></div><ReportBlock title="Risk reminders"><ul className="space-y-3 text-white/62"><li>• Avoid overclaiming autonomous capabilities without scope clarification.</li><li>• Clarify data handling and privacy posture in the final listing.</li><li>• Support “time saved” claims with a real benchmark or case example.</li></ul></ReportBlock></div>;
}

function ReportBlock({ title, children }) {
  return <div className="border border-white/10 bg-black/25 p-5"><div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/34">{title}</div><div className="font-serif text-[clamp(22px,1.6vw,32px)] leading-[1.45] text-[#fff6ea]">{children}</div></div>;
}
