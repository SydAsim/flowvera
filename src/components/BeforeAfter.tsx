import { XCircle, CheckCircle2, AlertCircle, Sparkles, Building2, Flame } from "lucide-react";

export default function BeforeAfter() {
  const beforePoints = [
    { title: "Missed Calls Disappear", desc: "Line is busy or call goes unanswered. Prospective buyers call your competitor instead." },
    { title: "Forms Sit in Inbox", desc: "No immediate reply. Over 12 hours go by before anyone opens the submission email manual." },
    { title: "Leads Are Not Logged", desc: "Inquiries sit scattered inside emails, personal cellphones, or a desk note with zero trace." },
    { title: "Follow-Up Depends on Memory", desc: "Sales staff fail to execute regular touches. 80%+ of leads are left completely abandoned." },
    { title: "Owner Has No Visibility", desc: "Zero reporting dashboards or notification logs. Absolute mystery if marketing spend worked." }
  ];

  const afterPoints = [
    { title: "Instant Text & Reply Sent", desc: "A text message and email secure the customer automatically in under 60-seconds." },
    { title: "Saved Automatically", desc: "Lead info auto-populates HubSpot CRM or Google Sheet tracker instantly." },
    { title: "Immediate Team Alert", desc: "WhatsApp push alerts flash key staff or plumbers detailing the scope of inquiry." },
    { title: "Follow-Up Reminders Run", desc: "Automated sequence checks in on non-bookers 15m, 1d, and 3d later automatically." },
    { title: "Full Inquiry Tracking", desc: "Centralized analytics logs every channel click. Complete visibility of marketing return." }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      {/* Before Flowvero - Red/Amber Glass Card */}
      <div className="rounded-3xl border border-rose-500/10 bg-rose-950/5 hover:border-rose-500/25 transition-all duration-300 p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
        
        <div>
          {/* Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-[10px] font-mono tracking-wider font-semibold text-rose-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              BEFORE FLOWVERO
            </span>
            <AlertCircle className="w-5 h-5 text-rose-400" />
          </div>

          <h3 className="text-2xl font-bold font-display text-white mb-2">The Scattered Revenue Leak</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Standard operations lose prospects at every stage due to late follow-up and clerical errors.
          </p>

          <hr className="border-rose-500/10 mb-6" />

          {/* List */}
          <div className="space-y-5">
            {beforePoints.map((item, index) => (
              <div key={index} className="flex gap-3.5 items-start">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-200">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-rose-500/10 mt-8 text-[11px] font-mono text-rose-400 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Prospects lost to instant-reply competitors.</span>
        </div>
      </div>

      {/* After Flowvero - Cyan/Green Glass Card */}
      <div className="rounded-3xl border border-cyan-500/15 bg-slate-900/60 hover:border-cyan-400/30 transition-all duration-300 p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-8 -mb-8" />

        <div>
          {/* Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[10px] font-mono tracking-wider font-semibold text-cyan-300 text-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              AFTER FLOWVERO
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>

          <h3 className="text-2xl font-bold font-display text-white mb-2">The Automated Response Engine</h3>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Predictable workflows hook and nurture prospective clients without using team manual effort.
          </p>

          <hr className="border-cyan-500/15 mb-6" />

          {/* List */}
          <div className="space-y-5">
            {afterPoints.map((item, index) => (
              <div key={index} className="flex gap-3.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-cyan-200">{item.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="pt-8 border-t border-cyan-500/15 mt-8 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Pipeline fully visible. Lead qualification secured.</span>
        </div>
      </div>
    </div>
  );
}
