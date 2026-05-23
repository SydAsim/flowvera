import { useState, useMemo } from "react";
import { DollarSign, AlertCircle, TrendingUp, CheckCircle2, ChevronRight, Calculator } from "lucide-react";

interface RoiCalculatorProps {
  onOpenAudit: (notes?: string) => void;
}

export default function RoiCalculator({ onOpenAudit }: RoiCalculatorProps) {
  const [ticketSize, setTicketSize] = useState<number>(500);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(100);
  const [missedPercentage, setMissedPercentage] = useState<number>(35);

  // Math variables
  const calculations = useMemo(() => {
    const missedLeadsCount = Math.round((monthlyLeads * missedPercentage) / 100);
    
    // Conservative conversion rate if followed up instantly (e.g., 30% of recovered leads would close)
    const missedConversionRate = 0.30;
    const potentialLostCloses = Math.max(1, Math.round(missedLeadsCount * missedConversionRate));
    
    // Total monthly leak amount
    const monthlyLeakVal = potentialLostCloses * ticketSize;

    // Flowvero Conservative Recovery (minimum 45% recovery rate of those lost sales through our automated sequences)
    const flowveroRecoveryRate = 0.45;
    const recoveredSalesCount = Math.max(1, Math.round(potentialLostCloses * flowveroRecoveryRate));
    const monthlyRecoveredValue = recoveredSalesCount * ticketSize;
    const yearlyRecoveredValue = monthlyRecoveredValue * 12;

    return {
      missedLeadsCount,
      potentialLostCloses,
      monthlyLeakVal,
      recoveredSalesCount,
      monthlyRecoveredValue,
      yearlyRecoveredValue
    };
  }, [ticketSize, monthlyLeads, missedPercentage]);

  const handleApplyLeak = () => {
    const auditNotes = `Checked Calculator: Ticket $${ticketSize}, Leads ${monthlyLeads}/mo, Missed ${missedPercentage}%. Est monthly Recovered: $${calculations.monthlyRecoveredValue}`;
    onOpenAudit(auditNotes);
  };

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5  rounded-full blur-3xl pointer-events-none -ml-12 -mb-12" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-400/20 text-cyan-400">
          <Calculator className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white font-display">Revenue Leak Calculator</h3>
          <p className="text-xs text-slate-400 mt-0.5">See how much revenue slips through the cracks each month.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Sliders Area */}
        <div className="space-y-6">
          {/* Slider 1: Average Ticket Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Average Deal / Ticket Value</span>
              <span className="text-cyan-300 font-semibold font-mono flex items-center">
                <DollarSign className="w-3.5 h-3.5 inline" />
                {ticketSize.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={ticketSize}
              onChange={(e) => setTicketSize(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((ticketSize - 50) / 4950) * 100}%, #1e293b ${((ticketSize - 50) / 4950) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$50</span>
              <span>$2,500</span>
              <span>$5,000</span>
            </div>
          </div>

          {/* Slider 2: Estimated Inquiries / Month */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Monthly Leads / Inquiries</span>
              <span className="text-cyan-300 font-semibold font-mono">
                {monthlyLeads} leads
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((monthlyLeads - 10) / 990) * 100}%, #1e293b ${((monthlyLeads - 10) / 990) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10 leads</span>
              <span>500 leads</span>
              <span>1,000 leads</span>
            </div>
          </div>

          {/* Slider 3: Estimated Missed / Slow Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">Estimated Missed/Slow Follow-up</span>
              <span className="text-amber-400 font-semibold font-mono">
                {missedPercentage}%
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="95"
              step="5"
              value={missedPercentage}
              onChange={(e) => setMissedPercentage(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              style={{
                background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((missedPercentage - 5) / 90) * 100}%, #1e293b ${((missedPercentage - 5) / 90) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5% (Best)</span>
              <span>50% (Avg)</span>
              <span>95% (Critical)</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Column */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 space-y-5">
          {/* Leak Overview */}
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/5">
            <div>
              <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Missed Inquiries</span>
              <span className="text-xl font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
                {calculations.missedLeadsCount} <span className="text-xs text-slate-500 font-normal">/mo</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-amber-400/80 tracking-wider">Estimated Leak</span>
              <span className="text-xl font-bold text-amber-400 font-mono flex items-center mt-0.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                {calculations.monthlyLeakVal.toLocaleString()}
                <span className="text-xs text-slate-500 font-normal ml-0.5">/mo</span>
              </span>
            </div>
          </div>

          {/* Flowvero Impact Highlight */}
          <div className="space-y-3 bg-cyan-950/10 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-semibold text-cyan-200 uppercase tracking-widest">FLOWVERO CAPTURED REVENUE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Monthly Recovered</span>
                <span className="text-2xl font-bold text-cyan-300 font-mono flex items-baseline">
                  <DollarSign className="w-5 h-5" />
                  {calculations.monthlyRecoveredValue.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Yearly Revenue Saved</span>
                <span className="text-2xl font-black text-white text-glow font-mono flex items-baseline bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  {calculations.yearlyRecoveredValue.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-start gap-1.5 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Calculated with a highly realistic 45% retrieval rate based on automated instant text-backs and visual schedules.</span>
            </div>
          </div>

          {/* CTAs */}
          <button
            onClick={handleApplyLeak}
            className="w-full rounded-xl py-3 px-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:via-blue-400 hover:to-indigo-500 text-slate-950 font-bold text-sm tracking-tight transition-colors shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer group"
          >
            Claim This Recoverable Revenue
            <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
