import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  MessageSquare,
  Flame,
  PhoneCall,
  DollarSign,
  Play,
  TrendingUp,
  Mail,
  Check
} from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import RoiCalculator from "./components/RoiCalculator";
import DemoVisualizer from "./components/DemoVisualizer";
import AuditModal from "./components/AuditModal";
import BeforeAfter from "./components/BeforeAfter";
import FlowveroFAQSection from "./components/FlowveroFAQSection";
import { CanvasRevealEffect } from "./components/CanvasRevealEffect";

// Data
import {
  PROBLEMS_DATA,
  SOLUTIONS_DATA,
  SERVICES_DATA,
  PROCESS_STEPS,
  INDUSTRIES_DATA,
  PRICING_DATA
} from "./data";

// Helper component for dynamic icon resolution
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}

export default function App() {

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [auditNotes, setAuditNotes] = useState<string>("");

  // Tracking which section is visible in screen for styling active nav bullets
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0px -60% 0px",
    });

    const targetSections = ["hero", "problems", "workflows", "services", "process", "faq"];
    targetSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openAuditModal = (notes: string = "") => {
    setAuditNotes(notes);
    setIsAuditOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-cyan-500 selection:text-background overflow-x-hidden">

      {/* Structural Glowing Radial Background Layers */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-10 w-[450px] h-[450px] bg-violet-500/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Navigation bar Header */}
      <Navbar onOpenAudit={openAuditModal} activeSection={activeSection} />

      {/* 2. Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen overflow-hidden flex items-center bg-background z-10"
      >
        {/* Background Cinematic Autoplay Muted Loop Video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/Video%20Object%20Remover-1779562961115.mp4?alt=media&token=2b54e225-5407-44b7-9d05-97e368e36edd"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-95 z-0 scale-100 object-center"
        />

        {/* Backdrop color protection overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 dark:via-[#050816]/20 to-background z-1" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-36 pb-24 w-full text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="space-y-8 flex flex-col items-center">

            {/* Marketing Badge */}
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-bold tracking-[0.2em] text-cyan-200 uppercase mb-4">
              AI AUTOMATION AGENCY
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight text-foreground font-display">
              Stop Losing Leads.<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Automate the Follow-Up.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mx-auto">
              We build AI agents that reply to inquiries, log every lead automatically, and recover revenue leaks before they disappear.
            </p>

            {/* Call to Actions buttons */}
            <div className="flex flex-wrap items-center justify-center gap-5 pt-6">
              <button
                onClick={() => openAuditModal("Hero CTA Primary")}
                className="px-10 py-4 bg-cyan-400 text-background font-extrabold rounded-xl shadow-xl shadow-cyan-500/20 text-base tracking-tight cursor-pointer hover:bg-cyan-300 transition-all"
              >
                Start Your Audit
              </button>
              <a
                href="#workflows"
                className="px-10 py-4 bg-card backdrop-blur-md border border-card-border rounded-xl font-bold text-foreground text-base tracking-tight inline-flex items-center gap-2.5 cursor-pointer hover:bg-white/10 transition-all"
              >
                View Workflows
              </a>
            </div>

            {/* Trust statement footer */}
            <div className="pt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground border-t border-card-border max-w-2xl w-full">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee] shrink-0" />
              <span>Custom solutions operational with clinics, home trades, real estate, and ecommerce.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section
        id="problems"
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* Header */}
          <div className="max-w-4xl mb-20 space-y-5">
            <span className="text-sm font-bold text-rose-400 uppercase tracking-widest block font-mono">
              THE LEAKING FUNNEL VULNERABILITY
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Your business is not losing because of bad leads.<br />
              <span className="font-bold text-rose-300">It is losing because follow-up is slow.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Most businesses already attract organic views from web portals, call routes, WhatsApp listings, Facebook ads, and map tags. The threat isn't demand — it is that leads are scattered, waiting, or forgotten.
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROBLEMS_DATA.map((prob) => (
              <div
                key={prob.id}
                className="glass-card glass-card-hover p-8 group flex flex-col justify-between rounded-3xl"
              >
                <div className="space-y-5">
                  <div className="p-3 w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={prob.iconName} className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-display">{prob.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{prob.description}</p>
                </div>

                <div className="mt-8 pt-5 border-t border-card-border flex items-center justify-between text-xs md:text-sm font-mono">
                  <span className="text-rose-400 font-bold uppercase">{prob.metricsText}</span>
                  <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick inline conversion prompt to capture lead right away */}
          <div className="mt-16 p-8 md:p-10 glass-card flex flex-col md:flex-row justify-between items-center gap-8 rounded-3xl">
            <div className="space-y-2 text-left">
              <h4 className="text-base md:text-lg font-bold text-foreground">Wondering where your local business gets stuck?</h4>
              <p className="text-sm text-muted-foreground">Let us analyze your operational flow manually for zero service fee.</p>
            </div>
            <button
              onClick={() => openAuditModal("Problems Section Inline CTA")}
              className="px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-extrabold hover:opacity-90 transition-all shrink-0 cursor-pointer"
            >
              Request Free Flow Scan
            </button>
          </div>

        </div>
      </section>

      {/* 4. Solution Section */}
      <section
        id="solutions"
        className="py-32 relative z-20 border-t border-card-border bg-background"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 animate-in duration-300">

          {/* Header */}
          <div className="max-w-4xl mb-20 space-y-5 text-center mx-auto">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              PRACTICAL CORE INFRASTRUCTURE
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Flowvero installs simple systems that<br />
              <span className="font-bold bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                reply, track, remind, and recover.
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We do not sell AI hype or abstract philosophies. We build and deploy deterministic automations that save staff time and help companies convert prospects faster.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((sol, index) => {
              // Custom colors and icons for each card to create unique themes
              const cardThemes = [
                {
                  colors: [[6, 182, 212], [14, 165, 233]], // Cyan/Sky
                  icon: <MessageSquare className="w-10 h-10 text-cyan-400 text-glow" />,
                  glowClass: "shadow-[0_0_30px_rgba(6,182,212,0.25)] border-cyan-500/30 bg-cyan-500/10",
                  btnClass: "text-cyan-400 hover:text-cyan-300"
                },
                {
                  colors: [[59, 130, 246], [139, 92, 246]], // Blue/Purple
                  icon: <Icons.Cpu className="w-10 h-10 text-blue-400 text-glow" />,
                  glowClass: "shadow-[0_0_30px_rgba(59,130,246,0.25)] border-blue-500/30 bg-blue-500/10",
                  btnClass: "text-blue-400 hover:text-blue-300"
                },
                {
                  colors: [[99, 102, 241], [16, 185, 129]], // Indigo/Emerald
                  icon: <ShieldCheck className="w-10 h-10 text-emerald-400 text-glow" />,
                  glowClass: "shadow-[0_0_30px_rgba(16,185,129,0.25)] border-emerald-500/30 bg-emerald-500/10",
                  btnClass: "text-emerald-400 hover:text-emerald-300"
                }
              ];

              const theme = cardThemes[index % cardThemes.length];

              return (
                <div
                  key={sol.id}
                  className="glass-card relative overflow-hidden group rounded-3xl h-[480px] flex flex-col justify-between border border-card-border transition-all duration-500 hover:border-white/10 hover:shadow-2xl"
                >
                  {/* Canvas Reveal Effect Background Overlay (fades in on hover) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0">
                    <CanvasRevealEffect
                      animationSpeed={0.5}
                      colors={theme.colors}
                      revealRadius={160}
                      dotSize={1.5}
                      dotSpacing={14}
                      showGradient={true}
                    />
                    {/* Dark gradient mask on hover to maintain perfect text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/75 via-[#050816]/85 to-[#050816]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>

                  {/* DEFAULT STATE: Centered Icon & Title (fades out and slides up on hover) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:-translate-y-8 z-10 pointer-events-none group-hover:pointer-events-none">
                    <div className="absolute top-6 right-8 text-6xl font-black text-foreground/5 font-mono select-none">
                      {`0${index + 1}`}
                    </div>

                    {/* Glowing Circular Icon Base */}
                    <div className={`p-6 rounded-full border mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-90 ${theme.glowClass}`}>
                      {theme.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-foreground font-display leading-snug max-w-[200px]">
                      {sol.title}
                    </h3>

                    <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground font-mono opacity-80">
                      <span>Hover to configure</span>
                      <ArrowRight className="w-3 h-3 animate-pulse" />
                    </div>
                  </div>

                  {/* HOVER STATE: Detailed list & action button (slides and fades in on hover) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 pointer-events-none group-hover:pointer-events-auto">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-mono text-cyan-400 font-bold uppercase tracking-widest">
                          MODULE {`0${index + 1}`}
                        </span>
                        <div className={`p-2.5 rounded-full border ${theme.glowClass} scale-75`}>
                          {theme.icon}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white font-display leading-tight">
                          {sol.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed font-medium">
                          {sol.description}
                        </p>
                      </div>

                      <hr className="border-white/10" />

                      <ul className="space-y-3">
                        {sol.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex gap-2.5 text-sm text-gray-300 items-start">
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => openAuditModal(`Solution Card: ${sol.title}`)}
                      className={`text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer group-hover:translate-x-1 w-fit mt-6 ${theme.btnClass}`}
                    >
                      Configure This Module
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. AI Workflow Engine Section */}
      <section
        id="workflows"
        className="relative py-32 bg-background overflow-hidden flex items-center z-10 border-t border-card-border"
      >
        {/* Background Cinematic Autoplay Muted Loop Video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/WORKFLOW_VIDEO.mp4?alt=media&token=68a2ddd3-4611-488d-a240-8aafb6f59b95"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-85 z-0 scale-100 object-center"
        />

        {/* Backdrop color protection overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/65 to-background dark:from-[#050816]/10 dark:via-[#050816]/65 dark:to-background z-1" />

        {/* Workflow Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center justify-center">
          <div className="space-y-8 flex flex-col items-center">

            {/* Marketing Badge */}
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-bold tracking-[0.2em] text-cyan-200 uppercase mb-4">
              THE AUTOMATION MAP ENGINE
            </div>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-foreground font-display">
              AI agents and workflows<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                working together.
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mx-auto">
              Flowvero builds clean workflow sequences where every step serves a precise purpose: capture the raw lead parameters, format the data fields, route it to CRM tables, alert the right agent, follow up, and log the outcome.
            </p>

            {/* Bullet List inside Glass card backdrop to maintain pristine contrast */}
            <div className="w-full max-w-3xl glass-card p-8 md:p-12 text-left rounded-3xl">
              <span className="text-xs font-mono tracking-widest text-cyan-300 font-bold block uppercase mb-6 text-center">
                LOGICAL SEQUENCE SYSTEM
              </span>
              <ul className="grid sm:grid-cols-2 gap-6">
                {[
                  "Lead capture from website forms, VOIP call lines, and central WhatsApp triggers",
                  "AI intelligent matching and category routing",
                  "CRM or central Google Sheet tracking logging",
                  "Immediate staff alerts, desk warnings, and calendar reminders",
                  "Smart human fallback and automated error alerts if API fails"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3.5 text-sm text-muted-foreground items-start">
                    <div className="w-5 h-5 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 border border-cyan-400/20">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Actions button */}
            <div className="pt-6 flex items-center justify-center">
              <button
                onClick={() => openAuditModal("AI Workflow Engine Video Side CTA")}
                className="px-10 py-4 bg-cyan-400 text-background font-extrabold rounded-xl shadow-xl shadow-cyan-500/20 text-base tracking-tight cursor-pointer hover:bg-cyan-300 transition-all"
              >
                Map Your Workflow
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Services & Offers Section */}
      <section
        id="services"
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* Header */}
          <div className="max-w-4xl mb-20 space-y-5">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              PRODUCTIZED SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Offers that are <span className="font-bold underline decoration-cyan-400 decoration-wavy">easy to understand.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Start small, prove the exact workflow model captures lost leads, and scale your integrations as your operations grow.
            </p>
          </div>

          {/* Services Cards Grid -- 6 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((svc) => (
              <div
                key={svc.id}
                className="glass-card glass-card-hover p-10 flex flex-col justify-between group relative rounded-3xl"
              >
                <div>
                  {/* Badge & Estimate value */}
                  <div className="flex justify-between items-start gap-3 mb-8">
                    <span className="text-xs uppercase tracking-wider font-mono px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 font-bold shrink-0">
                      {svc.badge}
                    </span>
                    {svc.priceEstimate && (
                      <span className="text-sm text-foreground font-mono font-bold bg-card px-2.5 py-1 rounded border border-card-border">
                        {svc.priceEstimate}
                      </span>
                    )}
                  </div>

                  {/* Header Area */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <DynamicIcon name={svc.iconName} className="w-6 h-6 text-glow" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground font-display group-hover:text-cyan-300 transition-colors leading-snug">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-cyan-200/90 font-mono font-medium mt-1 leading-tight">{svc.resultStatement}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <hr className="border-card-border mb-6" />

                  {/* Includes List */}
                  <p className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider mb-4">INCLUDED HOOKS:</p>
                  <ul className="space-y-3 mb-10">
                    {svc.includes.map((incl, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-muted-foreground items-start">
                        <Check className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{incl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openAuditModal(`Services Setup: ${svc.title}`)}
                  className="w-full text-center rounded-xl py-4 border border-card-border bg-card text-foreground hover:bg-cyan-400 hover:text-background font-extrabold text-sm transition-colors cursor-pointer block"
                >
                  {svc.ctaText}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Comparison Before After component */}
      <section className="py-32 bg-background relative z-20 border-t border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="max-w-4xl mb-20 space-y-5 text-center mx-auto">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              THE CONTRAST ASSESSMENT
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Transitioning from manual chaos<br />
              <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text">
                to pristine automation control.
              </span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Observe exactly how Flowvero reforms silent pipeline losses into organized response systems inside your organization.
            </p>
          </div>

          {/* Render the BeforeAfter card comparison blocks */}
          <BeforeAfter />

        </div>
      </section>

      {/* ROI Calculator Section Hooked here */}
      <section className="py-32 bg-background relative z-20 border-t border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl mb-16 text-center mx-auto space-y-4">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest font-mono block">REVENUE AUDIT MATH</span>
            <h2 className="text-4xl font-normal text-foreground font-display">Calculate Your Recoverable Losses</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">Input your current lead estimates below to see what automatic text-backs could store to your bottom line monthly.</p>
          </div>

          <RoiCalculator onOpenAudit={openAuditModal} />
        </div>
      </section>

      {/* 8. Globe & Stats Section */}
      <section className="relative py-44 md:py-56 min-h-[75vh] bg-background overflow-hidden flex items-center z-10 border-t border-card-border">
        {/* Background looping Globe video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/aabbccddeeff_videomp_.mp4?alt=media&token=2f2a9ac1-215e-42a1-a71d-9e1a83b72097"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-100 z-0 scale-125 md:scale-150 object-center transition-transform duration-700"
        />

        {/* Bottom blending transition fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-1" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center justify-center">
          <div className="space-y-8 flex flex-col items-center">

            {/* Tag */}
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] font-mono block">
              CLIENT SUCCESS
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-foreground font-display max-w-4xl mx-auto">
              Automate tasks.{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text">
                Save time. Scale faster.
              </span>
            </h2>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl pt-12">
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">100+</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Hours Saved</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">10+</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Workflows Built</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">24/7</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Automation Monitoring</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">Fast</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Delivery & Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 9. FAQ Section */}
      <FlowveroFAQSection />

      {/* 10. Integrations Section */}
      <section
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">

          <span className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] font-mono block">
            INTEGRATIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground font-display mt-4">
            Integrations
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Seamlessly connects with your existing tools.
          </p>

          {/* Grid of 8 integrations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">

            {/* Salesforce */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.1 11.2c-.3-2.1-2-3.7-4.1-3.7-.8 0-1.5.2-2.2.6C12.1 6.5 10.5 5.5 8.7 5.5c-2.8 0-5.1 2.3-5.1 5.1 0 .3 0 .6.1.9C1.6 12.3.5 13.9.5 15.8c0 2.4 2 4.4 4.4 4.4h13.9c2.7 0 4.9-2.2 4.9-4.9.1-2.4-1.8-4.6-4.6-5.1z" fill="#00A1E0" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Salesforce
              </span>
            </div>

            {/* HubSpot */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 10.3a2.53 2.53 0 0 0-2.3-1.78l-3.32-.23c-.3-.98-1.07-1.74-2.07-2.02l.66-3.23A2.54 2.54 0 1 0 13 2.54c0 .32.06.63.17.92L12.5 6.7a3.02 3.02 0 0 0-3.3 3.3l-3.23-.66c-.3-.98-1.07-1.74-2.07-2.02l.66-3.23A2.54 2.54 0 1 0 2 3.54c0 .32.06.63.17.92l-.7 3.47a2.54 2.54 0 0 0 2.3 2.3l3.32.23c.3.98 1.07 1.74 2.07 2.02l-.66 3.23A2.54 2.54 0 1 0 11 16.27c0-.32-.06-.63-.17-.92l.7-3.47a3.02 3.02 0 0 0 3.3-3.3l3.23.66c.29.98 1.06 1.74 2.06 2.02l-.66 3.23a2.54 2.54 0 1 0 2.54.55c0-.32-.06-.63-.17-.92l.7-3.47a2.53 2.53 0 0 0 1.26-4.35z" fill="#FF7A59" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                HubSpot
              </span>
            </div>

            {/* Zapier */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="#FF4F00" />
                  <polygon points="12,6 15,11 13,11 13,18 9,18 11,13 9,13" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Zapier
              </span>
            </div>

            {/* Intercom */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="10" fill="#1F8EFA" />
                  <path d="M14 16v16M20 12v24M26 12v24M32 16v16" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M20 28c2 2 4 2 6 0" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Intercom
              </span>
            </div>

            {/* Zendesk */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.25 15.65H8.35L20.25 3.75v11.9z" fill="#03363D" />
                  <path d="M3.75 8.35h11.9L3.75 20.25V8.35z" fill="#03363D" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Zendesk
              </span>
            </div>

            {/* Slack */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path d="M5.04 15.96a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zm1.26 0a2.52 2.52 0 1 1 5.04 0v5.04a2.52 2.52 0 1 1-5.04 0v-5.04z" fill="#36C5F0" />
                    <path d="M8.04 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H8.04zm0 1.26a2.52 2.52 0 1 1 0 5.04H3a2.52 2.52 0 1 1 0-5.04h5.04z" fill="#2EB67D" />
                    <path d="M18.96 8.04a2.52 2.52 0 1 1 2.52 2.52h-2.52V8.04zm-1.26 0a2.52 2.52 0 1 1-5.04 0V3a2.52 2.52 0 1 1 5.04 0v5.04z" fill="#E01E5A" />
                    <path d="M15.96 18.96a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52zm0-1.26a2.52 2.52 0 1 1 0-5.04H21a2.52 2.52 0 1 1 0 5.04h-5.04z" fill="#ECB22E" />
                  </g>
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Slack
              </span>
            </div>

            {/* Twilio */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#F22F46" />
                  <circle cx="9" cy="9" r="1.8" fill="#FFFFFF" />
                  <circle cx="15" cy="9" r="1.8" fill="#FFFFFF" />
                  <circle cx="9" cy="15" r="1.8" fill="#FFFFFF" />
                  <circle cx="15" cy="15" r="1.8" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Twilio
              </span>
            </div>

            {/* Google Sheets */}
            <div className="glass-card glass-card-hover p-10 flex flex-col items-center justify-center text-center aspect-square group rounded-3xl">
              <div className="w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#0F9D58" />
                  <rect x="6" y="8" width="12" height="8" rx="1" fill="#FFFFFF" />
                  <line x1="10" y1="8" x2="10" y2="16" stroke="#0F9D58" strokeWidth="1.5" />
                  <line x1="14" y1="8" x2="14" y2="16" stroke="#0F9D58" strokeWidth="1.5" />
                  <line x1="6" y1="10.5" x2="18" y2="10.5" stroke="#0F9D58" strokeWidth="1.5" />
                  <line x1="6" y1="13.5" x2="18" y2="13.5" stroke="#0F9D58" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-muted-foreground group-hover:text-foreground tracking-widest uppercase transition-colors">
                Google Sheets
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 11. Process Section */}
      <section
        id="process"
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          {/* Header */}
          <div className="max-w-4xl mb-20 space-y-5">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              THE DEVELOPMENT TIMELINE
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Simple blueprint. <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text">Clear outcome.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We eliminate complex code friction. Our systematic approach prioritizes early proof and clean handovers so that you understand everything inside the system.
            </p>
          </div>

          {/* Process Grid Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

            {PROCESS_STEPS.map((step, index) => {
              const theme = [
                { // Cyan
                  glow: "rgba(6,182,212,0.48)",
                  bright: "rgba(207,250,254,0.98)",
                  mid: "rgba(6,182,212,0.74)",
                  dark: "rgba(21,94,117,0.46)",
                  shadow: "shadow-[0_0_48px_rgba(6,182,212,0.25)]",
                },
                { // Blue
                  glow: "rgba(59,130,246,0.48)",
                  bright: "rgba(219,234,254,0.98)",
                  mid: "rgba(59,130,246,0.74)",
                  dark: "rgba(30,64,175,0.46)",
                  shadow: "shadow-[0_0_48px_rgba(59,130,246,0.25)]",
                },
                { // Violet
                  glow: "rgba(139,92,246,0.48)",
                  bright: "rgba(237,233,254,0.98)",
                  mid: "rgba(139,92,246,0.74)",
                  dark: "rgba(91,33,182,0.46)",
                  shadow: "shadow-[0_0_48px_rgba(139,92,246,0.25)]",
                },
                { // Sky
                  glow: "rgba(14,165,233,0.48)",
                  bright: "rgba(224,242,254,0.98)",
                  mid: "rgba(14,165,233,0.74)",
                  dark: "rgba(3,105,161,0.46)",
                  shadow: "shadow-[0_0_48px_rgba(14,165,233,0.25)]",
                }
              ][index % 4];

              return (
                <div
                  key={index}
                  className={`group relative h-[380px] overflow-hidden rounded-[24px] border border-white/15 bg-[#07090d]/80 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 flex flex-col justify-between ${theme.shadow}`}
                  style={{
                    "--glow": theme.glow,
                    "--bright": theme.bright,
                    "--mid": theme.mid,
                    "--dark": theme.dark,
                    animationDelay: `${index * 0.45}s`,
                  } as any}
                >
                  {/* Deep glass base */}
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.025)_28%,rgba(0,0,0,0)_60%)] z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_12%,var(--glow),transparent_36%)] opacity-35 z-0" />

                  {/* Full-card moving aurora lights */}
                  <div className="absolute -inset-24 opacity-90 blur-3xl animate-auroraOne bg-[radial-gradient(circle,var(--bright)_0%,var(--mid)_22%,transparent_58%)] z-0 pointer-events-none" />
                  <div className="absolute -inset-28 opacity-70 blur-3xl animate-auroraTwo bg-[radial-gradient(circle,var(--mid)_0%,var(--dark)_30%,transparent_62%)] z-0 pointer-events-none" />
                  <div className="absolute -inset-16 opacity-45 blur-2xl animate-auroraThree bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,var(--glow)_80deg,transparent_155deg,var(--bright)_230deg,transparent_310deg)] z-0 pointer-events-none" />

                  {/* Strong bottom light */}
                  <div className="absolute inset-x-[-18%] bottom-[-35%] h-[78%] blur-2xl opacity-95 bg-[radial-gradient(circle_at_50%_55%,var(--bright)_0%,var(--mid)_28%,var(--dark)_56%,transparent_78%)] transition-opacity duration-500 group-hover:opacity-100 z-0 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-[42%] opacity-80 bg-[radial-gradient(circle_at_50%_100%,var(--bright)_0%,var(--mid)_32%,transparent_74%)] z-0 pointer-events-none" />

                  {/* Animated light sweep across the entire card */}
                  <div className="absolute inset-0 opacity-55 animate-cardSweep bg-[linear-gradient(115deg,transparent_0%,transparent_28%,rgba(255,255,255,0.16)_42%,rgba(255,255,255,0.08)_48%,transparent_62%,transparent_100%)] z-0 pointer-events-none" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.14),transparent_35%)] z-0 pointer-events-none" />

                  {/* Keep upper card readable and premium */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,4,6,0.82)_0%,rgba(3,4,6,0.58)_42%,rgba(3,4,6,0.08)_100%)] z-0 pointer-events-none" />
                  <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/5 z-0 pointer-events-none" />
                  <div className="absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent z-0 pointer-events-none" />
                  <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-80 z-0 pointer-events-none" />

                  {/* Tiny floating particles */}
                  <span className="absolute left-[18%] top-[28%] h-1 w-1 rounded-full bg-white/50 blur-[1px] animate-floatDotOne z-0 pointer-events-none" />
                  <span className="absolute right-[22%] top-[22%] h-1 w-1 rounded-full bg-white/40 blur-[1px] animate-floatDotTwo z-0 pointer-events-none" />
                  <span className="absolute left-[70%] top-[58%] h-[3px] w-[3px] rounded-full bg-white/40 blur-[1px] animate-floatDotThree z-0 pointer-events-none" />

                  {/* Content (z-index adjusted) */}
                  <div className="relative z-10 flex flex-col h-full space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-4xl font-black font-mono text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
                          {step.stepNumber}
                        </span>
                        <span className="text-[11px] font-mono text-white bg-white/10 px-2.5 py-1 rounded border border-white/20 uppercase tracking-widest backdrop-blur-md">
                          {step.timeline}
                        </span>
                      </div>

                      <h3 className="text-[19px] font-extrabold tracking-tight text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)] mb-3 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[13px] font-medium leading-relaxed text-gray-300/90">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-5 border-t border-white/10 text-xs font-mono text-gray-400">
                      <span className="text-white block font-bold mb-1.5 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] tracking-wide">SYSTEM OUTPUT:</span>
                      <span className="text-gray-300 font-medium leading-relaxed">{step.output}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. Demo Proof & interactive simulator Section */}
      <section className="py-32 bg-background relative z-20 border-t border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="max-w-4xl mb-20 space-y-5">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              ACTIVE REVENUE BLUEPRINTS
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-foreground font-display">
              Example systems we can <span className="font-bold underline decoration-indigo-400 decoration-wavy">build for your business.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Select one of our standard business templates below and press 'Initialize Simulation' to see the exact webhook flow, AI classification triage, and customer texts run live inside our virtual simulator.
            </p>
          </div>

          {/* Interactive Demo components */}
          <DemoVisualizer />

        </div>
      </section>

      {/* 13. Industries Section */}
      <section className="py-32 bg-background relative z-20 border-t border-card-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="max-w-4xl text-center mx-auto mb-20 space-y-5">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              TARGET SECTOR INTEGRATIONS
            </span>
            <h2 className="text-4xl font-normal text-foreground font-display">
              Businesses where every missed inquiry has value.
            </h2>
            <p className="text-sm text-muted-foreground">
              Flowvero helps operators secure leads across active high-value sectors securely.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className="glass-card glass-card-hover p-8 group flex flex-col justify-between rounded-3xl"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={ind.iconName} className="w-6 h-6 text-glow" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground font-display">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="text-rose-400/90 font-bold uppercase block text-xs mb-1.5">Critical Pain Point:</span>
                    {ind.painPoint}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-card-border text-sm text-muted-foreground leading-relaxed">
                  <span className="text-emerald-400 font-bold uppercase block text-xs mb-1">Flowvero Outcome:</span>
                  {ind.solutionOutcome}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. Pricing / Starter Offers Section */}
      <section
        id="services"
        className="py-32 bg-background relative z-20 border-t border-card-border overflow-hidden"
      >
        <div className="relative mx-auto px-6 md:px-8 max-w-7xl">
          {/* Giant Background Text */}
          <div className="relative h-[150px] md:h-[250px] lg:h-[300px] w-full flex items-center justify-center mb-12">
            <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[92px] font-black uppercase leading-none tracking-[-0.08em] text-transparent opacity-70 blur-[2px] md:text-[190px] lg:text-[230px]">
              <span className="bg-gradient-to-b from-cyan-200/80 via-blue-500/40 to-transparent bg-clip-text drop-shadow-[0_0_60px_rgba(34,211,238,0.5)]">
                Pricing
              </span>
            </div>

            {/* Keeping the subtitle for context overlaid on top */}
            <div className="relative z-20 text-center space-y-3 pt-10 md:pt-20">
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
                TRANSPARENT SYSTEM INVESTMENT
              </span>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Zero hidden percentages, zero subscription hooks. Simple flat-rate build pricing.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 place-items-center gap-8 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-10">
            <div className="pointer-events-none absolute inset-x-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[70px]" />

            {PRICING_DATA.map((plan) => (
              <div
                key={plan.id}
                className={`glass-card glass-card-hover p-8 md:p-10 flex flex-col justify-between relative overflow-hidden rounded-3xl w-full h-full ${plan.popular
                  ? "glass-card-premium !border-cyan-400/80 shadow-2xl shadow-cyan-500/15 lg:-translate-y-3"
                  : ""
                  }`}
              >
                {/* Popular Glow Ribbons */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-cyan-400 text-background text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                    RECOMMENDED
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground font-display">{plan.name}</h3>
                    <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Pricing Rate */}
                  <div className="py-3 flex items-baseline gap-1.5">
                    <span className="text-4xl md:text-5xl font-black text-foreground font-mono">{plan.price}</span>
                    {plan.period && <span className="text-xs text-muted-foreground font-medium lowercase">/ {plan.period}</span>}
                  </div>

                  <hr className="border-card-border" />

                  {/* Lists */}
                  <p className="text-[11px] font-mono font-bold uppercase text-muted-foreground tracking-wider">Plan Inclusions:</p>
                  <ul className="space-y-3">
                    {plan.includes.map((inc, iIdx) => (
                      <li key={iIdx} className="flex gap-2.5 text-[13px] text-muted-foreground items-start">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => openAuditModal(`Tier Build: ${plan.name} ${plan.price}`)}
                    className={`w-full text-center rounded-xl py-3.5 font-extrabold text-[13px] tracking-tight transition-all cursor-pointer ${plan.popular
                      ? "bg-cyan-400 text-background hover:bg-cyan-300 shadow-md shadow-cyan-400/20"
                      : "bg-card text-foreground border border-card-border hover:bg-white/10"
                      }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing warning footnote */}
          <p className="text-center text-[11px] text-muted-foreground font-mono mt-16 max-w-xl mx-auto leading-relaxed relative z-20">
            * Note: Tool/API runtime costs (such as SMS rates via Twilio, Meta WhatsApp API fees, or direct AI lookup keys) are separate and depend directly on your monthly volume. Most small operations spend less than $15/mo.
          </p>

        </div>
      </section>

      {/* 14. Final CTA Section */}
      <section className="py-32 bg-background relative z-20 border-t border-card-border overflow-hidden">

        {/* Glow point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center space-y-10 relative z-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-200 uppercase">
            REVENUE RECOVERY BLUEPRINTS
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-foreground max-w-4xl mx-auto leading-tight font-display tracking-tight">
            Ready to <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text">stop losing leads?</span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Send your business parameters or current website. Flowvero will map exactly where leads are leaking and draft a custom 5-minute video walkthrough outlining what to automate first.
          </p>

          <div className="flex flex-wrap justify-center gap-5 pt-3">
            <button
              onClick={() => openAuditModal("Bottom CTA Section")}
              className="rounded-full px-10 py-5 bg-cyan-400 text-background font-extrabold hover:bg-cyan-300 transition-colors shadow-xl shadow-cyan-400/20 text-base tracking-tight cursor-pointer"
            >
              Get Free Audit
            </button>
            <a
              href="#workflows"
              className="rounded-full px-8 py-5 border border-card-border bg-card hover:bg-white/10 text-foreground font-bold transition-all backdrop-blur text-base tracking-tight cursor-pointer"
            >
              See Workflow Examples
            </a>
          </div>

          <p className="text-xs text-muted-foreground font-mono pt-6">
            No AI hype. Just practical systems that reply, track, remind, and recover.
          </p>
        </div>
      </section>

      {/* 15. Footer — Premium Kresna-style dark */}
      <footer className="fv-footer-section">
        <div className="fv-footer-wrapper">

          {/* Left panel — video + logo + socials */}
          <div className="fv-footer-left">
            <video
              className="fv-footer-left-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
            </video>



            <div className="fv-footer-logo">
              <div className="fv-footer-logo-mark">FV</div>
              <span className="fv-footer-logo-name">Flowvero</span>
            </div>

            <div className="fv-footer-tagline-container">
              <p className="fv-footer-tagline">
                Smarter lead recovery,<br />
                <span>powered by AI automation.</span>
              </p>
            </div>

            <div className="fv-footer-social-row">
              <div className="fv-footer-social-label">Stay in touch!</div>
              <div className="fv-footer-social-icons" aria-label="Social links">
                {/* Discord */}
                <div className="fv-social-icon" aria-label="Discord">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" width="15" height="15">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.298 12.298 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.095 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
                  </svg>
                </div>
                {/* X / Twitter */}
                <div className="fv-social-icon" aria-label="X">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" width="15" height="15">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                {/* LinkedIn */}
                <div className="fv-social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" width="15" height="15">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </div>
                {/* GitHub */}
                <div className="fv-social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" width="15" height="15">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — nav + subscribe */}
          <div className="fv-footer-right">

            {/* Lucky cube graphic */}
            <div className="fv-footer-lucky-graphic" aria-hidden="true">
              <div className="fv-lucky-cube">
                <span className="fv-lucky-cube-mark">FV</span>
              </div>
              <div className="fv-lucky-text-row">
                <svg className="fv-lucky-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
                <span className="fv-lucky-text">Feeling lucky?</span>
              </div>
            </div>

            <div className="fv-footer-right-top">
              <div className="fv-footer-nav-cols">
                <div className="fv-footer-col">
                  <h3 className="fv-footer-col-title">Navigation</h3>
                  <a href="#hero">How it works</a>
                  <a href="#workflows">Workflows</a>
                  <a href="#services">Pricing</a>
                  <a href="#solutions">Solutions</a>
                  <a href="#faq">FAQ</a>
                </div>
                <div className="fv-footer-col">
                  <h3 className="fv-footer-col-title">Company</h3>
                  <a href="#">Blog</a>
                  <a href="#">About</a>
                  <a href="#">Terms & Conditions</a>
                  <a href="#">Privacy Policy</a>
                </div>
              </div>
            </div>

            <div className="fv-footer-bottom">
              <p className="fv-footer-copyright">© 2026 Flowvero. All rights reserved.</p>

              <div className="fv-footer-cta-mini">
                <h4>
                  AI moves fast.<br />
                  <strong>Stay ahead with Flowvero.</strong>
                </h4>
                <div className="fv-footer-subscribe-row">
                  <input type="email" placeholder="Enter email address" aria-label="Email address" />
                  <button type="button">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Watermark */}
        <div className="fv-footer-watermark" aria-hidden="true">
          <svg id="fvWatermarkSvg" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <text id="fvWatermarkText" x="500" y="175" textAnchor="middle" fontSize="320" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="-0.03em" fill="rgba(255,255,255,0.035)">Flowvero</text>
          </svg>
        </div>
      </footer>

      {/* Pop-up Custom Setup Audit request popup modal */}
      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        presetNotes={auditNotes}
      />

    </div>
  );
}
