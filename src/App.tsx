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
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState<string>("");
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

  // Filter FAQ based on category and search query
  const filteredFaqs = FAQ_DATA.filter(faq => {
    const query = faqSearch.toLowerCase();
    const matchesSearch = faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
    const matchesCategory = activeTab === "all" || faq.category.toLowerCase() === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Structural Glowing Radial Background Layers */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-10 w-[450px] h-[450px] bg-violet-500/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Navigation bar Header */}
      <Navbar onOpenAudit={openAuditModal} activeSection={activeSection} />

      {/* 2. Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen overflow-hidden flex items-center bg-[#050816] z-10"
      >
        {/* Background Cinematic Autoplay Muted Loop Video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/Video%20Object%20Remover-1779562961115.mp4?alt=media&token=2b54e225-5407-44b7-9d05-97e368e36edd"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-95 z-0 scale-105"
        />

        {/* Backdrop color protection overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/20 to-[#050816] z-1" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-32 pb-20 w-full text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="space-y-6 flex flex-col items-center">
            
            {/* Marketing Badge */}
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cyan-200 uppercase mb-4">
              AI AUTOMATION AGENCY
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-white font-display">
              Stop Losing Leads.<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Automate the Follow-Up.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto">
              We build AI agents that reply to inquiries, log every lead automatically, and recover revenue leaks before they disappear.
            </p>

            {/* Call to Actions buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openAuditModal("Hero CTA Primary")}
                className="px-8 py-3.5 bg-cyan-400 text-[#050816] font-bold rounded-xl shadow-xl shadow-cyan-500/20 text-sm tracking-tight cursor-pointer hover:bg-cyan-300 transition-all"
              >
                Start Your Audit
              </button>
              <a
                href="#workflows"
                className="px-8 py-3.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-semibold text-white text-sm tracking-tight inline-flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all"
              >
                View Workflows
              </a>
            </div>

            {/* Trust statement footer */}
            <div className="pt-6 flex items-center justify-center gap-2.5 text-xs text-slate-400 border-t border-white/5 max-w-xl w-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee] shrink-0" />
              <span>Custom solutions operational with clinics, home trades, real estate, and ecommerce.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section 
        id="problems" 
        className="py-24 bg-brand-bg relative z-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block font-mono">
              THE LEAKING FUNNEL VULNERABILITY
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Your business is not losing because of bad leads.<br />
              <span className="font-bold text-rose-300">It is losing because follow-up is slow.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Most businesses already attract organic views from web portals, call routes, WhatsApp listings, Facebook ads, and map tags. The threat isn't demand — it is that leads are scattered, waiting, or forgotten.
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS_DATA.map((prob) => (
              <div 
                key={prob.id} 
                className="rounded-3xl bg-white/[0.02] border border-white/8 p-6 hover:bg-white/[0.06] transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={prob.iconName} className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">{prob.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{prob.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rose-400 font-semibold uppercase">{prob.metricsText}</span>
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick inline conversion prompt to capture lead right away */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-rose-950/10 via-slate-900 to-cyan-950/10 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Wondering where your local business gets stuck?</h4>
              <p className="text-xs text-slate-400">Let us analyze your operational flow manually for zero service fee.</p>
            </div>
            <button
              onClick={() => openAuditModal("Problems Section Inline CTA")}
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              Request Free Flow Scan
            </button>
          </div>

        </div>
      </section>

      {/* 4. Solution Section */}
      <section 
        id="solutions" 
        className="py-24 relative z-20 border-t border-white/5 bg-brand-bg"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 animate-in duration-300">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4 text-center mx-auto">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              PRACTICAL CORE INFRASTRUCTURE
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Flowvero installs simple systems that<br />
              <span className="font-bold bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
                reply, track, remind, and recover.
              </span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We do not sell AI hype or abstract philosophies. We build and deploy deterministic automations that save staff time and help companies convert prospects faster.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((sol, index) => (
              <div 
                key={sol.id} 
                className="rounded-3xl bg-slate-900/45 border border-white/8 p-8 flex flex-col justify-between relative overflow-hidden hover:border-cyan-400/35 transition-all group"
              >
                {/* Visual gradient backdrop */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/[0.02] rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-5">
                  <div className="text-3xl font-black text-white/5 font-mono">{`0${index + 1}`}</div>
                  <h3 className="text-xl font-bold text-white font-display leading-tight">{sol.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sol.description}</p>
                  
                  <hr className="border-white/5" />

                  <ul className="space-y-2.5">
                    {sol.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-xs text-slate-300 items-start">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => openAuditModal(`Solution Card: ${sol.title}`)}
                  className="mt-8 text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-1"
                >
                  Configure This Module
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. AI Workflow Engine Section */}
      <section 
        id="workflows" 
        className="relative py-24 bg-[#050816] overflow-hidden flex items-center z-10 border-t border-white/5"
      >
        {/* Background Cinematic Autoplay Muted Loop Video */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/WORKFLOW_VIDEO.mp4?alt=media&token=68a2ddd3-4611-488d-a240-8aafb6f59b95"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-85 z-0 scale-105"
        />

        {/* Backdrop color protection overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/10 via-[#050816]/65 to-[#050816] z-1" />

        {/* Workflow Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center justify-center">
          <div className="space-y-6 flex flex-col items-center">
            
            {/* Marketing Badge */}
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cyan-200 uppercase mb-4">
              THE AUTOMATION MAP ENGINE
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white font-display">
              AI agents and workflows<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                working together.
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-base text-slate-300 max-w-2xl leading-relaxed mx-auto">
              Flowvero builds clean workflow sequences where every step serves a precise purpose: capture the raw lead parameters, format the data fields, route it to CRM tables, alert the right agent, follow up, and log the outcome.
            </p>

            {/* Bullet List inside Glass card backdrop to maintain pristine contrast */}
            <div className="w-full max-w-2xl bg-slate-950/65 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8 text-left">
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-bold block uppercase mb-4 text-center">
                LOGICAL SEQUENCE SYSTEM
              </span>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Lead capture from website forms, VOIP call lines, and central WhatsApp triggers",
                  "AI intelligent matching and category routing",
                  "CRM or central Google Sheet tracking logging",
                  "Immediate staff alerts, desk warnings, and calendar reminders",
                  "Smart human fallback and automated error alerts if API fails"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-300 items-start">
                    <div className="w-4.5 h-4.5 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 border border-cyan-400/20">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Actions button */}
            <div className="pt-4 flex items-center justify-center">
              <button
                onClick={() => openAuditModal("AI Workflow Engine Video Side CTA")}
                className="px-8 py-3 bg-cyan-400 text-[#050816] font-bold rounded-xl shadow-xl shadow-cyan-500/20 text-sm tracking-tight cursor-pointer hover:bg-cyan-300 transition-all"
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
        className="py-24 bg-brand-bg relative z-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              PRODUCTIZED SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Offers that are <span className="font-bold underline decoration-cyan-400 decoration-wavy">easy to understand.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              Start small, prove the exact workflow model captures lost leads, and scale your integrations as your operations grow.
            </p>
          </div>

          {/* Services Cards Grid -- 6 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((svc) => (
              <div 
                key={svc.id} 
                className="rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/30 transition-all p-7 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Badge & Estimate value */}
                  <div className="flex justify-between items-start gap-3 mb-6">
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 font-bold shrink-0">
                      {svc.badge}
                    </span>
                    {svc.priceEstimate && (
                      <span className="text-xs text-white font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {svc.priceEstimate}
                      </span>
                    )}
                  </div>

                  {/* Header Area */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <DynamicIcon name={svc.iconName} className="w-5 h-5 text-glow" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors leading-snug">
                        {svc.title}
                      </h3>
                      <p className="text-[11px] text-cyan-200/90 font-mono font-medium mt-0.5 leading-tight">{svc.resultStatement}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <hr className="border-white/5 mb-5" />

                  {/* Includes List */}
                  <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">INCLUDED HOOKS:</p>
                  <ul className="space-y-2 mb-8">
                    {svc.includes.map((incl, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-slate-300 items-start">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{incl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => openAuditModal(`Services Setup: ${svc.title}`)}
                  className="w-full text-center rounded-xl py-3 border border-white/10 bg-white/5 text-white hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer block"
                >
                  {svc.ctaText}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Comparison Before After component */}
      <section className="py-24 bg-brand-bg relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4 text-center mx-auto">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              THE CONTRAST ASSESSMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Transitioning from manual chaos<br />
              <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text">
                to pristine automation control.
              </span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              Observe exactly how Flowvero reforms silent pipeline losses into organized response systems inside your organization.
            </p>
          </div>

          {/* Render the BeforeAfter card comparison blocks */}
          <BeforeAfter />

        </div>
      </section>

      {/* ROI Calculator Section Hooked here */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-brand-bg relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12 text-center mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono block">REVENUE AUDIT MATH</span>
            <h2 className="text-3xl font-normal text-white font-display">Calculate Your Recoverable Losses</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">Input your current lead estimates below to see what automatic text-backs could store to your bottom line monthly.</p>
          </div>

          <RoiCalculator onOpenAudit={openAuditModal} />
        </div>
      </section>

      {/* 8. Global Remote Partner Section */}
      <section className="relative py-24 bg-[#050816] overflow-hidden flex items-center z-10 border-t border-white/5">
        {/* Background looping Globe video directly from Storage */}
        <video
          src="https://firebasestorage.googleapis.com/v0/b/fourth-case-416809.firebasestorage.app/o/GLOBAL_VIDEO.mp4?alt=media&token=d40f66b7-14f8-41f6-bacb-be87229688c5"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-85 z-0 scale-105"
        />
        
        {/* Backdrop color protection overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/10 via-[#050816]/65 to-[#050816] z-1" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center justify-center">
          <div className="space-y-6 flex flex-col items-center">
            
            {/* Marketing Badge */}
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-cyan-200 uppercase mb-4">
              GLOBAL OPERATIONS CAPABLE
            </span>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white font-display">
              Remote automation partner for<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                modern businesses.
              </span>
            </h2>

            {/* Subheading */}
            <p className="text-base text-slate-300 max-w-2xl leading-relaxed mx-auto">
              Flowvero works remotely with local dental practices, service operations, and scaling brands across key global zones (US, UK, GCC). Get continuous technical support, clean Loom walkthroughs, interactive spreadsheets, and bulletproof fail-safes.
            </p>

            {/* Layout Box with stats & key metrics using glass backdrops for perfect readability */}
            <div className="grid md:grid-cols-12 gap-6 w-full max-w-3xl pt-4">
              
              {/* Left Side: Handover and operations standards */}
              <div className="md:col-span-7 bg-slate-950/65 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-left flex flex-col justify-between space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-bold block uppercase">
                  DELIVERY STANDARDS
                </span>
                
                <div className="space-y-3">
                  {[
                    "60-sec response structures",
                    "Custom sandbox demos first",
                    "Detailed handover video & SOP documentation"
                  ].map((stat, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-3 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-3 mt-2 text-[11px] text-slate-400">
                  Global active support coverage across multiple regions with continuous system logging.
                </div>
              </div>

              {/* Right Side: statistics and Call to action */}
              <div className="md:col-span-5 bg-slate-950/65 backdrop-blur-md rounded-2xl border border-white/10 p-6 text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">REAL-TIME STATS</span>
                  </div>

                  <div className="space-y-2.5 pb-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Response Speed:</span>
                      <span className="text-emerald-400 font-mono font-bold">&lt; 45s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recovery rate:</span>
                      <span className="text-cyan-400 font-mono font-semibold">45% - 60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-mono">Team hours saved:</span>
                      <span className="text-white font-mono font-semibold">15h/wk</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openAuditModal("Global Partner Module Request")}
                  className="w-full text-center rounded-xl py-3 bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/10 cursor-pointer mt-4"
                >
                  Initiate Setup
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 9. Process Section */}
      <section 
        id="process" 
        className="py-24 bg-brand-bg relative z-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              THE DEVELOPMENT TIMELINE
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Simple blueprint. <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text">Clear outcome.</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We eliminate complex code friction. Our systematic approach prioritizes early proof and clean handovers so that you understand everything inside the system.
            </p>
          </div>

          {/* Process Grid Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl bg-white/[0.01] border border-white/5 p-6 relative flex flex-col justify-between hover:border-white/15 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black font-mono text-zinc-800 group-hover:text-cyan-400/40 transition-colors">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/10">
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-400">
                  <span className="text-cyan-300 block font-bold mb-0.5 uppercase">SYSTEM OUTPUT:</span>
                  {step.output}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Demo Proof & interactive simulator Section */}
      <section className="py-24 bg-brand-bg relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              ACTIVE REVENUE BLUEPRINTS
            </span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white font-display">
              Example systems we can <span className="font-bold underline decoration-indigo-400 decoration-wavy">build for your business.</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Select one of our standard business templates below and press 'Initialize Simulation' to see the exact webhook flow, AI classification triage, and customer texts run live inside our virtual simulator.
            </p>
          </div>

          {/* Interactive Demo components */}
          <DemoVisualizer />

        </div>
      </section>

      {/* 11. Industries Section */}
      <section className="py-24 bg-brand-bg relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="max-w-2xl text-center mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              TARGET SECTOR INTEGRATIONS
            </span>
            <h2 className="text-3xl font-normal text-white font-display">
              Businesses where every missed inquiry has value.
            </h2>
            <p className="text-xs text-slate-400">
              Flowvero helps operators secure leads across active high-value sectors securely.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES_DATA.map((ind) => (
              <div 
                key={ind.id} 
                className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cyan-400/20 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={ind.iconName} className="w-5 h-5 text-glow" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-display">{ind.name}</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    <span className="text-rose-400/90 font-bold uppercase block text-[9px] mb-1">Critical Pain Point:</span>
                    {ind.painPoint}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 text-[10px] text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold uppercase block text-[9px] mb-0.5">Flowvero Outcome:</span>
                  {ind.solutionOutcome}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. Pricing / Starter Offers Section */}
      <section 
        id="services" 
        className="py-24 bg-brand-bg relative z-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="max-w-2xl text-center mx-auto mb-16 space-y-4 animate-in duration-300">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              TRANSPARENT SYSTEM INVESTMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-white font-display">
              Start with one workflow. <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text">Scale after proof.</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Choose an implementation tier. Zero hidden percentages, zero subscription hooks. Simple flat-rate build pricing.
            </p>
          </div>

          {/* Pricing Grid cards */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {PRICING_DATA.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  plan.popular 
                    ? "bg-slate-900 border-2 border-cyan-400 shadow-xl shadow-cyan-500/5 -translate-y-2" 
                    : "bg-white/[0.02] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular Glow Ribbons */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-cyan-400 text-slate-950 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                    RECOMMENDED SETUP
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Pricing Rate */}
                  <div className="py-2 flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black text-white font-mono">{plan.price}</span>
                    {plan.period && <span className="text-xs text-slate-500 font-medium lowercase">/ {plan.period}</span>}
                  </div>

                  <hr className="border-white/5" />

                  {/* Lists */}
                  <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Plan Inclusions:</p>
                  <ul className="space-y-2.5">
                    {plan.includes.map((inc, iIdx) => (
                      <li key={iIdx} className="flex gap-2 text-xs text-slate-300 items-start">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => openAuditModal(`Tier Build: ${plan.name} ${plan.price}`)}
                    className={`w-full text-center rounded-xl py-3 font-semibold text-xs tracking-tight transition-all cursor-pointer ${
                      plan.popular 
                        ? "bg-cyan-400 text-slate-950 font-extrabold hover:bg-cyan-300 shadow-md shadow-cyan-400/20" 
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing warning footnote */}
          <p className="text-center text-[10px] text-slate-500 font-mono mt-12 max-w-lg mx-auto leading-relaxed">
            * Note: Tool/API runtime costs (such as SMS rates via Twilio, Meta WhatsApp API fees, or direct AI lookup keys) are separate and depend directly on your monthly volume. Most small operations spend less than $15/mo.
          </p>

        </div>
      </section>

      {/* 13. FAQ Section */}
      <section 
        id="faq" 
        className="py-24 bg-brand-bg relative z-20 border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-mono">
              COMMON INQUIRIES
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-white font-display">
              Frequently Asked <span className="font-bold">Questions.</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Everything you need to know about lead recovery implementation.
            </p>
          </div>

          {/* FAQ Selectors & Filter menu */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {["all", "general", "ai & tech", "clinics", "support"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setActiveFaq(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  activeTab === cat
                    ? "bg-cyan-400 text-slate-950 border-cyan-400 font-extrabold"
                    : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar helper */}
          <div className="mb-8 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search answers..."
              value={faqSearch}
              onChange={(e) => {
                setFaqSearch(e.target.value);
                setActiveFaq(null);
              }}
              className="w-full text-xs text-white rounded-xl bg-slate-900 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-10">No matching questions found in this category.</p>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpened = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="rounded-2xl bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-350"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpened ? null : index)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-semibold text-white leading-normal pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-300 ${
                          isOpened ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpened && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/20 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>

      {/* 14. Final CTA Section */}
      <section className="py-28 bg-gradient-to-b from-slate-950 to-brand-bg relative z-20 border-t border-white/5 overflow-hidden">
        
        {/* Glow point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center space-y-8 relative z-10">
          
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-bold tracking-widest text-cyan-200 uppercase">
            REVENUE RECOVERY BLUEPRINTS
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white max-w-3xl mx-auto leading-tight font-display tracking-tight">
            Ready to <span className="font-bold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text">stop losing leads?</span>
          </h2>

          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Send your business parameters or current website. Flowvero will map exactly where leads are leaking and draft a custom 5-minute video walkthrough outlining what to automate first.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openAuditModal("Bottom CTA Section")}
              className="rounded-full px-8 py-4 bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-colors shadow-xl shadow-cyan-400/20 text-sm tracking-tight cursor-pointer"
            >
              Get Free Audit
            </button>
            <a
              href="#workflows"
              className="rounded-full px-7 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all backdrop-blur text-sm tracking-tight cursor-pointer"
            >
              See Workflow Examples
            </a>
          </div>

          <p className="text-[10px] text-slate-500 font-mono pt-4">
            No AI hype. Just practical systems that reply, track, remind, and recover.
          </p>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="py-12 bg-brand-bg border-t border-white/5 relative z-20 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-4 gap-8 pb-10 mb-10 border-b border-white/5">
            
            {/* Logo description */}
            <div className="space-y-4 md:col-span-2">
              <a href="#hero" className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-[10px] text-slate-950 font-bold">FV</span>
                </div>
                <span className="text-lg font-bold text-white font-display">Flowvero</span>
              </a>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                We build practical, error-proof lead recovery sequences and remote workflow integrations for dentists, clinics, trade agencies, and ecommerce channels globally.
              </p>
            </div>

            {/* Quick sections */}
            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-wider text-[10px] uppercase font-mono">FLOWS:</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Start Page</a></li>
                <li><a href="#problems" className="hover:text-white transition-colors">Funnel Problems</a></li>
                <li><a href="#workflows" className="hover:text-white transition-colors">Simulation engine</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Productized Offers</a></li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <h4 className="text-white font-bold tracking-wider text-[10px] uppercase font-mono">SUPPORT:</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#process" className="hover:text-white transition-colors">Our Process</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
                <li className="text-slate-500 font-mono">Inbound: hello@flowvero.co</li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>© 2026 Flowvero. All rights reserved. Built for supreme lead operations.</span>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 transition-colors">Terms of Service</span>
              <span className="hover:text-slate-300 transition-colors">Privacy Principles</span>
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
