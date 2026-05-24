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
    <div className="glass-card p-8 lg:p-12 relative overflow-hidden shadow-2xl rounded-3xl">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5  rounded-full blur-3xl pointer-events-none -ml-12 -mb-12" />

      {/* Header */}
      <div className="flex items-center gap-4.5 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-400/20 text-cyan-400">
          <Calculator className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground font-display">Revenue Leak Calculator</h3>
          <p className="text-sm text-muted-foreground mt-1">See how much revenue slips through the cracks each month.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Sliders Area */}
        <div className="space-y-8">
          {/* Slider 1: Average Ticket Size */}
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground font-medium">Average Deal / Ticket Value</span>
              <span className="text-cyan-300 font-bold font-mono text-xl flex items-center">
                <DollarSign className="w-4 h-4 inline" />
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
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((ticketSize - 50) / 4950) * 100}%, var(--card-border) ${((ticketSize - 50) / 4950) * 100}%, var(--card-border) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>$50</span>
              <span>$2,500</span>
              <span>$5,000</span>
            </div>
          </div>

          {/* Slider 2: Estimated Inquiries / Month */}
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground font-medium">Monthly Leads / Inquiries</span>
              <span className="text-cyan-300 font-bold font-mono text-xl">
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
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              style={{
                background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${((monthlyLeads - 10) / 990) * 100}%, var(--card-border) ${((monthlyLeads - 10) / 990) * 100}%, var(--card-border) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>10 leads</span>
              <span>500 leads</span>
              <span>1,000 leads</span>
            </div>
          </div>

          {/* Slider 3: Estimated Missed / Slow Rate */}
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground font-medium">Estimated Missed/Slow Follow-up</span>
              <span className="text-amber-400 font-bold font-mono text-xl">
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
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-amber-400"
              style={{
                background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((missedPercentage - 5) / 90) * 100}%, var(--card-border) ${((missedPercentage - 5) / 90) * 100}%, var(--card-border) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>5% (Best)</span>
              <span>50% (Avg)</span>
              <span>95% (Critical)</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Column */}
        <div className="glass-card p-8 space-y-6 rounded-2xl">
          {/* Leak Overview */}
          <div className="grid grid-cols-2 gap-6 pb-5 border-b border-card-border">
            <div>
              <span className="block text-xs uppercase text-muted-foreground tracking-wider font-semibold">Missed Inquiries</span>
              <span className="text-2xl font-bold text-foreground font-mono flex items-center gap-1.5 mt-1.5">
                {calculations.missedLeadsCount} <span className="text-sm text-muted-foreground font-normal">/mo</span>
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase text-amber-400/80 tracking-wider font-semibold">Estimated Leak</span>
              <span className="text-2xl font-bold text-amber-400 font-mono flex items-center mt-1.5">
                <DollarSign className="w-5 h-5 text-amber-400" />
                {calculations.monthlyLeakVal.toLocaleString()}
                <span className="text-sm text-muted-foreground font-normal ml-0.5">/mo</span>
              </span>
            </div>
          </div>

          {/* Flowvero Impact Highlight */}
          <div className="space-y-4 bg-cyan-950/10 border border-cyan-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-200 uppercase tracking-widest">FLOWVERO CAPTURED REVENUE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Monthly Recovered</span>
                <span className="text-3xl font-bold text-cyan-300 font-mono flex items-baseline mt-1">
                  <DollarSign className="w-6 h-6" />
                  {calculations.monthlyRecoveredValue.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/mo</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Yearly Revenue Saved</span>
                <span className="text-3xl font-black text-foreground text-glow font-mono flex items-baseline mt-1 bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  {calculations.yearlyRecoveredValue.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground flex items-start gap-2 mt-4 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Calculated with a highly realistic 45% retrieval rate based on automated instant text-backs and visual schedules.</span>
            </div>
          </div>

          {/* CTAs */}
          <button
            onClick={handleApplyLeak}
            className="w-full rounded-xl py-4 px-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:via-blue-400 hover:to-indigo-500 text-background font-extrabold text-base tracking-tight transition-colors shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            Claim This Recoverable Revenue
            <ChevronRight className="w-5 h-5 text-background group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
