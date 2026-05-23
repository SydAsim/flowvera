import { useState, useEffect, useRef } from "react";
import { DEMO_SYSTEMS } from "../data";
import { Play, RotateCcw, Flame, CheckCircle2, MessageSquare, ArrowRight, Smartphone, Terminal, ShieldCheck } from "lucide-react";

export default function DemoVisualizer() {
  const [activeTab, setActiveTab] = useState<string>("demo-home-service");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [phoneMessages, setPhoneMessages] = useState<Array<{ sender: "user" | "bot" | "system"; text: string; time: string }>>([]);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeDemo = DEMO_SYSTEMS.find((d) => d.id === activeTab) || DEMO_SYSTEMS[0];

  // Reset simulation state when changing tabs
  useEffect(() => {
    resetSimulation();
  }, [activeTab]);

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStep(-1);
    setPhoneMessages([]);
    setLogMessages(["[System] Ready to initialize sandbox simulation..."]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    setPhoneMessages([]);
    
    const messagesTimeline: Record<string, Array<{ delay: number; msg: { sender: "user" | "bot" | "system"; text: string; time: string }; log: string }>> = {
      "demo-home-service": [
        {
          delay: 0,
          msg: { sender: "system", text: "📋 New form lead captured: John Doe (Leaking Boiler)", time: "Now" },
          log: "▶️ Webhook triggered from Website Contact Form. Parsing fields..."
        },
        {
          delay: 2000,
          msg: { sender: "bot", text: "📱 Auto-Textback sent: 'Hey John! Got your plumbing request. I can book you in 5 mins. What is your street address?'", time: "10s later" },
          log: "🧪 Flowvero Node #1: Instant SMS dispatcher fired with dynamic contact context."
        },
        {
          delay: 4500,
          msg: { sender: "user", text: "💬 John replies: '124 Maple Street'", time: "30s later" },
          log: "📩 Inbound Text Message received. Directing to AI Classifier Router Node..."
        },
        {
          delay: 7000,
          msg: { sender: "bot", text: "⚡ AI extracted zipcode (07452). Sent dispatch WhatsApp to plumber & saved quote draft internally.", time: "42s later" },
          log: "🤖 AI Entity Node: Successfully extracted zip code & dispatched owner notifications!"
        }
      ],
      "demo-real-estate": [
        {
          delay: 0,
          msg: { sender: "system", text: "🎯 Lead captured: Sarah (Zillow Listing Property)", time: "Now" },
          log: "▶️ API listener captured property inquiry ticket. Syncing CRM pipeline..."
        },
        {
          delay: 2000,
          msg: { sender: "bot", text: "📱 SMS: 'Hey Sarah! Thanks for checking out 45 Oak Drive. Are you looking to buy within 30 days, or just browsing?'", time: "8s later" },
          log: "🧪 Flowvero Node #2: Initiated Qualification auto-sequence."
        },
        {
          delay: 4500,
          msg: { sender: "user", text: "💬 Sarah: 'Need to buy before August! Already pre-approved.'", time: "18s later" },
          log: "📩 Customer response analyzed. Sentiment detected: [Urgent / High Intent]."
        },
        {
          delay: 7000,
          msg: { sender: "bot", text: "🏆 Tagged as [HIGH INTENT]. Dispatched agent calendar link: 'Excellent Sarah! Here is my list: flowvero.co/booking'", time: "25s later" },
          log: "🤖 Workflow Complete: Opportunity updated in HubSpot CRM. Appointment link dispatched!"
        }
      ],
      "demo-shopify": [
        {
          delay: 0,
          msg: { sender: "system", text: "📧 Email received from order info: order #8952", time: "Now" },
          log: "▶️ Mail parse listener extracted order identification block."
        },
        {
          delay: 2000,
          msg: { sender: "bot", text: "💻 API check Shopify DB: Order #8952, shipped yesterday via DHL.", time: "4s later" },
          log: "🔗 Customer lookup node: DHL tracking string is verified active."
        },
        {
          delay: 4500,
          msg: { sender: "bot", text: "🤖 Draft response prepared: 'Your order was fulfilled on Thursday. Here is your tracking ID...'", time: "9s later" },
          log: "🤖 AI draft pre-generated with dynamic parameters. Saved inside Helpdesk pending human review."
        },
        {
          delay: 7000,
          msg: { sender: "system", text: "✅ Auto-assigned ticket tag [DHL Info Drafted] and notified receptionist.", time: "12s later" },
          log: "🎯 Workflow Complete: Ticket priority categorized and routed smoothly."
        }
      ],
      "demo-clinic": [
        {
          delay: 0,
          msg: { sender: "system", text: "📞 Unanswered call detected from caller ID (+1 555-014)", time: "Now" },
          log: "▶️ VOIP hook recorded missed incoming call after 15-second timeout."
        },
        {
          delay: 2000,
          msg: { sender: "bot", text: "📱 Text-back sent: 'Hi there! We missed your call. Need to schedule dental intake? Fill out: flowvero.co/dentist'", time: "12s later" },
          log: "🧪 Flowvero Node #2: SMS auto-recovery dispatched. Waiting on forms..."
        },
        {
          delay: 4500,
          msg: { sender: "user", text: "📋 Client submitted HIPAA dental form securely", time: "3m later" },
          log: "📩 Intake webhook received. Parsing dental fields and insurance metrics."
        },
        {
          delay: 7000,
          msg: { sender: "bot", text: "✅ Appointment verified in Orthodontic Scheduler. Auto-synced patient folder inside database.", time: "Instant" },
          log: "🤖 Workflow Complete: Google Calendar sync done. Intake records updated."
        }
      ]
    };

    const script = messagesTimeline[activeTab] || messagesTimeline["demo-home-service"];

    script.forEach((step, idx) => {
      setTimeout(() => {
        setCurrentStep(idx);
        setPhoneMessages((prev) => [...prev, step.msg]);
        setLogMessages((prev) => [...prev, `[System] ${step.log}`]);
        if (idx === script.length - 1) {
          setIsRunning(false);
          setLogMessages((prev) => [...prev, "🏆 [Workflow] Simulation Completed successfully with 0 latency errors!"]);
        }
      }, step.delay);
    });
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
        {DEMO_SYSTEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              activeTab === item.id
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/30 shadow-lg shadow-cyan-500/5 font-bold"
                : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Simulation Steps & Visual Map */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 uppercase tracking-widest font-mono font-medium">
                {activeDemo.category}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-xs text-emerald-400 font-mono">Sim Sandbox Sandbox-v1.4</span>
            </div>

            <h4 className="text-2xl font-bold font-display text-white">{activeDemo.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              <span className="text-cyan-400 font-semibold">Trigger:</span> {activeDemo.trigger}
            </p>

            {/* Simulated Steps Progress Visualizer */}
            <div className="space-y-3.5 mt-6">
              {activeDemo.flow.map((stepText, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div
                    key={index}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex gap-3 items-start ${
                      isCurrent
                        ? "bg-cyan-950/15 border-cyan-400/30 shadow-md shadow-cyan-400/5 translate-x-1"
                        : isCompleted
                        ? "bg-white/[0.01] border-white/10 opacity-75"
                        : "bg-white/[0.01] border-white/5 opacity-55"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5 ${
                        isCurrent
                          ? "bg-cyan-400 text-slate-950 animate-bounce"
                          : isCompleted
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          isCurrent ? "text-cyan-300" : isCompleted ? "text-slate-300" : "text-slate-400"
                        }`}
                      >
                        Step {index + 1}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{stepText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="rounded-lg px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-400/10 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                Initialize Simulation
              </button>

              <button
                onClick={resetSimulation}
                className="rounded-lg p-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 text-xs font-bold transition-all cursor-pointer flex items-center justify-center"
                title="Reset Sim"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
              {isRunning ? "Simulating execution steps..." : "Simulation Standby"}
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Simulator Devices (Phone Screen & Console Logs) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Virtual Mobile Screen */}
          <div className="w-full shrink-0 h-[340px] rounded-3xl bg-slate-950 border border-white/15 p-4 flex flex-col justify-between relative shadow-2xl overflow-hidden self-center">
            {/* Phone Top Notch decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-b-xl border-x border-b border-white/10 z-20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
            </div>

            {/* Virtual Sim Header */}
            <div className="flex items-center gap-2 pb-2.5 border-b border-white/10 pt-2 z-10">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Flowvero Auto-Triage v4.9</span>
            </div>

            {/* Messages body (overflow scroll) */}
            <div className="flex-1 overflow-y-auto space-y-3 py-3 scrollbar-none text-[11px] pr-1">
              {phoneMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                  <Smartphone className="w-8 h-8 text-slate-700 mb-2 animate-bounce" />
                  <p className="text-xs">Visual phone simulator waiting...<br/>Press 'Initialize' to start</p>
                </div>
              ) : (
                phoneMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === "user" ? "ml-auto items-end" : msg.sender === "system" ? "mx-auto w-full items-center" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-cyan-500 text-slate-950 rounded-tr-none font-medium"
                          : msg.sender === "system"
                          ? "bg-zinc-900/80 border border-zinc-800 text-[10px] text-zinc-400 text-center w-full"
                          : "bg-slate-900 text-slate-200 border border-white/5 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                  </div>
                ))
              )}
            </div>

            {/* Phone bottom input decoration */}
            <div className="h-8 border-t border-white/5 flex items-center justify-between px-1 shrink-0 pt-1">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-400 text-[10px]">+</span>
              </div>
              <div className="flex-1 bg-slate-900/70 border border-white/5 mx-2 rounded-full h-5 text-[9px] text-zinc-500 px-3 flex items-center">
                Read-only simulation
              </div>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* Terminal Diagnostics System Outputs */}
          <div className="flex-1 min-h-[140px] rounded-2xl bg-zinc-950 border border-red-500/10 p-3.5 font-mono text-[10px] flex flex-col gap-2 shadow-inner overflow-hidden">
            <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 font-bold text-[9px] text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>FLOWVERO LOG CONTROLLER MONITOR</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 text-zinc-400 scrollbar-none pr-1">
              {logMessages.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-slate-600 font-bold">[{new Date().toLocaleTimeString()}]</span>{" "}
                  <span
                    className={
                      log.includes("Completed")
                        ? "text-emerald-400"
                        : log.includes("Entity") || log.includes("Fired")
                        ? "text-cyan-400"
                        : "text-zinc-400"
                    }
                  >
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
