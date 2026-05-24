import React, { useState, useEffect } from "react";
import { X, Check, ArrowRight, ArrowLeft, Send, Sparkles, Building2, ShieldCheck, Mail, Phone, ExternalLink } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetNotes?: string;
}

export default function AuditModal({ isOpen, onClose, presetNotes }: AuditModalProps) {
  const [step, setStep] = useState<number>(1);
  const [businessName, setBusinessName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [industry, setIndustry] = useState<string>("Dental Clinic");
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [estInquiries, setEstInquiries] = useState<number>(100);
  const [avgTicket, setAvgTicket] = useState<number>(500);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  // Populate info if presetNotes is present
  useEffect(() => {
    if (presetNotes) {
      if (presetNotes.includes("Ticket ")) {
        const ticketMatch = presetNotes.match(/Ticket \$(\d+)/);
        if (ticketMatch) setAvgTicket(Number(ticketMatch[1]));
      }
      if (presetNotes.includes("Leads ")) {
        const leadsMatch = presetNotes.match(/Leads (\d+)/);
        if (leadsMatch) setEstInquiries(Number(leadsMatch[1]));
      }
    }
  }, [presetNotes]);

  if (!isOpen) return null;

  const painPointOptions = [
    { id: "missed-calls", label: "Unanswered after-hours phone calls" },
    { id: "slow-forms", label: "Website contact forms with slow reply times" },
    { id: "whatsapp-lost", label: "WhatsApp conversations scattered in personal phone" },
    { id: "forgotten-drips", label: "Leads get cold with zero follow-up sequences" },
    { id: "no-shows", label: "Client appointment no-shows and rescheduling delays" }
  ];

  const togglePainPoint = (id: string) => {
    setPainPoints((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save submission records to localStorage mock database
    const submissions = JSON.parse(localStorage.getItem("flowvero_audits") || "[]");
    const newSubmission = {
      id: "audit-" + Date.now(),
      businessName,
      website,
      industry,
      painPoints,
      estInquiries,
      avgTicket,
      clientName,
      clientEmail,
      clientPhone,
      submittedAt: new Date().toISOString(),
      presetNotes
    };
    
    submissions.push(newSubmission);
    localStorage.setItem("flowvero_audits", JSON.stringify(submissions));

    setStep(5); // Show Success State screen
  };

  // Safe calculated recovery preview
  const monthlyLeakedSales = Math.round(estInquiries * 0.35 * 0.30); // 35% missed, 30% convert normally if saved
  const computedPipelineRecoverValue = Math.round(monthlyLeakedSales * 0.45 * avgTicket); // Flowvero retrieves 45%

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top Glow decoration */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-card-border bg-background/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <span className="text-base md:text-lg font-bold text-foreground font-display">
              Flowvero Setup: Custom Automation Audit
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
            id="audit-modal-close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Frame (Scrollable to prevent cutoff) */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          {/* Steps Indicator Progress line */}
          {step < 5 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs md:text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                <span>Step {step} of 4</span>
                <span className="text-cyan-400">
                  {step === 1 && "Business Context"}
                  {step === 2 && "Vulnerabilities Mapping"}
                  {step === 3 && "Volume Assessment"}
                  {step === 4 && "Submit Contact Details"}
                </span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Business Profile */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">Tell us about your business</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We customize every single audit workflow to fit your specific industry and technical toolset.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Company Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oak Dental Group or Apex Plumbing"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full rounded-xl bg-background border border-card-border px-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. www.yourcompany.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl bg-background border border-card-border px-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Industry Sector
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-xl bg-background border border-card-border px-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <option value="Dental Clinic">Dental Clinic</option>
                    <option value="Medical / Wellness Clinic">Medical / Wellness Clinic</option>
                    <option value="Home Services & Plumbing/HVAC">Home Services & Trades</option>
                    <option value="Real Estate Team">Real Estate Team</option>
                    <option value="Ecommerce Brand">Ecommerce Brand</option>
                    <option value="Salons & Local Service">Salon / Spa / Local Service</option>
                    <option value="Coaches & Consulting">Coaches & Consultants</option>
                    <option value="Agencies & Marketing B2B">Agencies & Marketing B2B</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  disabled={!businessName}
                  onClick={handleNext}
                  className="disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4 bg-cyan-400 text-background text-sm font-extrabold transition-all flex items-center gap-2 hover:bg-cyan-300 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Pain Points mapping */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">Where do you drop incoming inquiries?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Select all categories that feel like an active bottleneck (we will design recovery automations for these).
                </p>
              </div>

              <div className="space-y-3.5">
                {painPointOptions.map((opt) => {
                  const isChecked = painPoints.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => togglePainPoint(opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 ${
                        isChecked
                          ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-200 backdrop-blur-xl"
                          : "glass-card text-muted-foreground hover:border-cyan-400/25"
                      }`}
                    >
                      <span className="text-sm md:text-base font-semibold leading-relaxed">{opt.label}</span>
                      <div
                        className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "border-cyan-400 bg-cyan-400 text-background"
                            : "border-card-border bg-input-bg"
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[3px]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="rounded-xl px-6 py-4 bg-card border border-card-border text-foreground text-sm font-bold transition-all flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="rounded-xl px-6 py-4 bg-cyan-400 text-background text-sm font-bold transition-all flex items-center gap-2 hover:bg-cyan-300 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Volume and estimation assessment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">Provide basic volume numbers</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This helps Flowvero build a precise return on investment (ROI) projection map before our consultation.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {/* Avg monthly leads */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Est. Inquiries / Month</span>
                    <span className="text-cyan-400 font-mono font-bold text-base bg-cyan-500/10 px-3 py-1 rounded">{estInquiries} leads</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={estInquiries}
                    onChange={(e) => setEstInquiries(Number(e.target.value))}
                    className="w-full h-2 rounded-lg accent-cyan-400"
                  />
                </div>

                {/* Avg Ticket Size */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Average Deal / Customer Lifetime Value</span>
                    <span className="text-cyan-400 font-mono font-bold text-base bg-cyan-500/10 px-3 py-1 rounded">${avgTicket}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full h-2 rounded-lg accent-cyan-400"
                  />
                </div>

                <div className="glass-card p-6 grid grid-cols-2 gap-6 items-center mt-6 rounded-2xl">
                  <div>
                    <span className="text-xs text-muted-foreground font-mono uppercase font-semibold">Leaked Pipeline Value:</span>
                    <p className="text-lg md:text-xl font-bold text-amber-400 font-mono mt-1">
                      ${Math.round(estInquiries * 0.35 * avgTicket).toLocaleString()}/mo
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-cyan-400 font-mono uppercase font-semibold">Flowvero Est. Retrieval:</span>
                    <p className="text-xl md:text-2xl font-extrabold text-cyan-300 text-glow font-mono mt-1">
                      +${computedPipelineRecoverValue.toLocaleString()}/mo
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="rounded-xl px-6 py-4 bg-card border border-card-border text-foreground text-sm font-bold transition-all flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="rounded-xl px-6 py-4 bg-cyan-400 text-background text-sm font-bold transition-all flex items-center gap-2 hover:bg-cyan-300 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact details */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">Where should we deliver your audit map?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our agency engineers will review your inputs manually and draft a customized 5-minute video walkthrough.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Smith"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-xl bg-background border border-card-border px-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Work Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. js@yourcompany.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full rounded-xl bg-background border border-card-border pl-12 pr-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    Phone Number (For test SMS mockups) <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 123-4567"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-xl bg-background border border-card-border pl-12 pr-5 py-4 text-base text-foreground focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 block leading-relaxed">
                    We will never sell or spam your phone number. Used exclusively to demonstrate interactive lead text-back alerts during audit reviews.
                  </span>
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-xl px-6 py-4 bg-card border border-card-border text-foreground text-sm font-bold transition-all flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-6 py-4 bg-cyan-400 text-background text-sm font-extrabold transition-all flex items-center gap-2 hover:bg-cyan-300 cursor-pointer shadow-lg shadow-cyan-400/20"
                >
                  Generate Free Audit Report
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 5: Beautiful Success Summary State */}
          {step === 5 && (
            <div className="space-y-8 text-center py-8 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <Check className="w-8 h-8 stroke-[3px]" />
              </div>

              <div className="space-y-3">
                <h3 className="text-3xl font-bold font-display text-foreground">Audit Blueprint Form Inbound!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Excellent, <span className="text-cyan-300 font-bold">{clientName}</span>. Your custom lead rescue framework has been updated in our CRM system.
                </p>
              </div>

              <div className="max-w-xl mx-auto glass-card p-8 text-left space-y-6 rounded-2xl">
                <div className="flex items-center gap-2.5 pb-4 border-b border-card-border justify-between">
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">VULNERABILITY REPORT CARD</span>
                  <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded">AUTO-PARSED SUCCESS</span>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    🏢 <span className="text-muted-foreground font-semibold">Business Unit:</span>{" "}
                    <span className="text-foreground font-bold">{businessName}</span> ({industry})
                  </p>
                  <p>
                    🌐 <span className="text-muted-foreground font-semibold">Website scanned:</span>{" "}
                    <span className="text-foreground font-mono break-all font-bold">
                      {website || "Pending URL submission"}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (website) window.open(website, "_blank");
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 font-bold mt-1"
                  >
                    Launch Site Scan <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="pt-4 border-t border-card-border space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Selected vulnerabilities detected:</span>
                    <span className="text-foreground font-mono font-bold">{painPoints.length} leaks tagged</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-cyan-300 font-bold uppercase tracking-wider text-xs">RECOVERABLE PIPELINE EXPECTED:</span>
                    <span className="text-cyan-300 font-mono font-black text-lg md:text-xl text-glow">
                      +${computedPipelineRecoverValue.toLocaleString()} /mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-3">
                <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Our core builder teammate will review your website and formulate a 5-minute Loom video walking through what to automate first. Look out for an email from <span className="text-cyan-300 font-bold">hello@flowvero.co</span> in your inbox at <span className="text-foreground font-semibold">{clientEmail}</span> shortly.
                </p>
                <div className="pt-6 flex justify-center">
                  <button
                    onClick={onClose}
                    className="rounded-xl px-8 py-3.5 bg-cyan-400 text-background text-sm font-extrabold hover:bg-cyan-300 transition-colors cursor-pointer"
                  >
                    Done, Back to Landing Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
