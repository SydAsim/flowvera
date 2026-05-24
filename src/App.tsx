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
  Check,
  ChevronDown
} from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import RoiCalculator from "./components/RoiCalculator";
import DemoVisualizer from "./components/DemoVisualizer";
import AuditModal from "./components/AuditModal";
import BeforeAfter from "./components/BeforeAfter";

// Data
import {
  PROBLEMS_DATA,
  SOLUTIONS_DATA,
  SERVICES_DATA,
  PROCESS_STEPS,
  INDUSTRIES_DATA,
  PRICING_DATA,
  FAQ_DATA
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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
            {SOLUTIONS_DATA.map((sol, index) => (
              <div
                key={sol.id}
                className="glass-card glass-card-hover p-10 flex flex-col justify-between relative overflow-hidden group rounded-3xl"
              >
                {/* Visual gradient backdrop */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/[0.02] rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-6">
                  <div className="text-4xl font-black text-foreground/5 font-mono">{`0${index + 1}`}</div>
                  <h3 className="text-2xl font-bold text-foreground font-display leading-tight">{sol.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>

                  <hr className="border-card-border" />

                  <ul className="space-y-3">
                    {sol.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5 text-sm text-muted-foreground items-start">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openAuditModal(`Solution Card: ${sol.title}`)}
                  className="mt-10 text-sm font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2 transition-colors cursor-pointer group-hover:translate-x-1"
                >
                  Configure This Module
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
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
      <section className="relative py-32 bg-background overflow-hidden flex items-center z-10 border-t border-card-border">
        {/* Background looping Globe video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/GLOBAL_VIDEO.mp4?alt=media&token=d40f66b7-14f8-41f6-bacb-be87229688c5"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-100 z-0 scale-100 object-center"
        />

        {/* Backdrop color protection overlay (adapts to background color) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-background/95 dark:from-[#050816]/10 dark:via-[#050816]/30 dark:to-background/95 z-1" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center justify-center">
          <div className="space-y-8 flex flex-col items-center">

            {/* Tag */}
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] font-mono block">
              CLIENT SUCCESS
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-foreground font-display max-w-4xl mx-auto">
              Flowvero automation solutions has made over{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text">
                $10M+ in revenue
              </span>{" "}
              for our clients
            </h2>

            {/* Subtitle */}
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed mx-auto">
              Flowvero automation solutions has built robust initiatives that made over $10M+ in revenue worldwide for our clients.
            </p>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl pt-12">
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">$10M+</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Revenues Generated</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">50k+</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Hours Saved</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">200+</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Clients Served</span>
              </div>
              <div className="glass-card glass-card-hover p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-4xl font-black text-foreground font-mono mb-2">50%</span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase font-medium">Higher Conversion Rate</span>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 9. FAQ Section */}
      <section
        id="faq"
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8">

          {/* Header */}
          <div className="text-center space-y-4 mb-20">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground font-display">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-5">
            {FAQ_DATA.map((faq, index) => {
              const isOpened = activeFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card overflow-hidden transition-all duration-300 rounded-3xl"
                >
                  <button
                    onClick={() => setActiveFaq(isOpened ? null : index)}
                    className="w-full text-left px-8 py-6 flex justify-between items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <span className="text-lg font-semibold text-foreground leading-normal pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-cyan-400 shrink-0 transition-transform duration-300 ${isOpened ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {isOpened && (
                    <div className="px-8 pb-8 pt-3 text-base text-muted-foreground leading-relaxed border-t border-card-border bg-background/20 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

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

            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 relative flex flex-col justify-between group rounded-3xl"
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-black font-mono text-foreground group-hover:text-cyan-400/40 transition-colors">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-400/10">
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground font-display">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-8 pt-5 border-t border-card-border text-xs font-mono text-muted-foreground">
                  <span className="text-cyan-300 block font-bold mb-1 uppercase">SYSTEM OUTPUT:</span>
                  {step.output}
                </div>
              </div>
            ))}
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
        className="py-32 bg-background relative z-20 border-t border-card-border"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="max-w-4xl text-center mx-auto mb-20 space-y-5 animate-in duration-300">
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              TRANSPARENT SYSTEM INVESTMENT
            </span>
            <h2 className="text-4xl md:text-5xl font-normal text-foreground font-display">
              Start with one workflow. <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text">Scale after proof.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Choose an implementation tier. Zero hidden percentages, zero subscription hooks. Simple flat-rate build pricing.
            </p>
          </div>

          {/* Pricing Grid cards */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {PRICING_DATA.map((plan) => (
              <div
                key={plan.id}
                className={`glass-card glass-card-hover p-10 flex flex-col justify-between relative overflow-hidden rounded-3xl ${plan.popular
                    ? "glass-card-premium !border-cyan-400/80 shadow-2xl shadow-cyan-500/15 lg:-translate-y-3"
                    : ""
                  }`}
              >
                {/* Popular Glow Ribbons */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-cyan-400 text-background text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                    RECOMMENDED SETUP
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-display">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Pricing Rate */}
                  <div className="py-3 flex items-baseline gap-1.5">
                    <span className="text-4xl md:text-5xl font-black text-foreground font-mono">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground font-medium lowercase">/ {plan.period}</span>}
                  </div>

                  <hr className="border-card-border" />

                  {/* Lists */}
                  <p className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider">Plan Inclusions:</p>
                  <ul className="space-y-3">
                    {plan.includes.map((inc, iIdx) => (
                      <li key={iIdx} className="flex gap-2.5 text-sm text-muted-foreground items-start">
                        <Check className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <button
                    onClick={() => openAuditModal(`Tier Build: ${plan.name} ${plan.price}`)}
                    className={`w-full text-center rounded-xl py-4 font-extrabold text-sm tracking-tight transition-all cursor-pointer ${plan.popular
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
          <p className="text-center text-xs text-muted-foreground font-mono mt-16 max-w-xl mx-auto leading-relaxed">
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

      {/* 15. Footer */}
      <footer className="py-16 bg-background border-t border-card-border relative z-20 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-4 gap-10 pb-12 mb-12 border-b border-card-border">

            {/* Logo description */}
            <div className="space-y-5 md:col-span-2">
              <a href="#hero" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-xs text-background font-black">FV</span>
                </div>
                <span className="text-xl font-bold text-foreground font-display">Flowvero</span>
              </a>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                We build practical, error-proof lead recovery sequences and remote workflow integrations for dentists, clinics, trade agencies, and ecommerce channels globally.
              </p>
            </div>

            {/* Quick sections */}
            <div className="space-y-4">
              <h4 className="text-foreground font-bold tracking-wider text-xs uppercase font-mono">FLOWS:</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#hero" className="hover:text-foreground transition-colors">Start Page</a></li>
                <li><a href="#problems" className="hover:text-foreground transition-colors">Funnel Problems</a></li>
                <li><a href="#workflows" className="hover:text-foreground transition-colors">Simulation engine</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">Productized Offers</a></li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <h4 className="text-foreground font-bold tracking-wider text-xs uppercase font-mono">SUPPORT:</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#process" className="hover:text-foreground transition-colors">Our Process</a></li>
                <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ & Support</a></li>
                <li className="text-muted-foreground font-mono">Inbound: hello@flowvero.co</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-muted-foreground font-mono">
            <span>© 2026 Flowvero. All rights reserved. Built for supreme lead operations.</span>
            <div className="flex gap-6">
              <span className="hover:text-muted-foreground transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-muted-foreground transition-colors cursor-pointer">Privacy Principles</span>
            </div>
          </div>

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
