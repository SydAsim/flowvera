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
    <div className="space-y-12">
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 pb-3 border-b border-card-border">
        {DEMO_SYSTEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-5 py-3.5 rounded-full text-sm font-bold tracking-wide border transition-all cursor-pointer ${
              activeTab === item.id
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/30 shadow-lg shadow-cyan-500/5 font-extrabold"
                : "bg-card text-muted-foreground border-card-border hover:text-foreground"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Side: Simulation Steps & Visual Map */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-muted text-xs text-muted-foreground uppercase tracking-widest font-mono font-bold">
                {activeDemo.category}
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-sm text-emerald-400 font-mono">Sim Sandbox Sandbox-v1.4</span>
            </div>

            <h4 className="text-3xl font-bold font-display text-foreground">{activeDemo.title}</h4>
            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              <span className="text-cyan-400 font-bold">Trigger:</span> {activeDemo.trigger}
            </p>

            {/* Simulated Steps Progress Visualizer */}
            <div className="space-y-4 mt-8">
              {activeDemo.flow.map((stepText, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div
                    key={index}
                    className={`glass-card-hover p-5 rounded-2xl border transition-all duration-300 flex gap-4 items-start ${
                      isCurrent
                        ? "bg-cyan-500/10 border-cyan-400/40 shadow-md shadow-cyan-400/10 translate-x-1 backdrop-blur-xl"
                        : isCompleted
                        ? "glass-card opacity-80"
                        : "glass-card opacity-50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5 ${
                        isCurrent
                          ? "bg-cyan-400 text-background animate-bounce"
                          : isCompleted
                          ? "bg-emerald-500 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div>
                      <p
                        className={`text-sm md:text-base font-bold ${
                          isCurrent ? "text-cyan-300" : isCompleted ? "text-muted-foreground" : "text-muted-foreground"
                        }`}
                      >
                        Step {index + 1}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{stepText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="glass-card p-6 flex flex-wrap gap-4 items-center justify-between rounded-2xl">
            <div className="flex gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="rounded-lg px-5 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-background text-sm font-extrabold transition-all flex items-center gap-2 shadow-md shadow-cyan-400/10 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Initialize Simulation
              </button>

              <button
                onClick={resetSimulation}
                className="rounded-lg p-3 bg-card border border-card-border text-foreground hover:bg-white/10 text-sm font-bold transition-all cursor-pointer flex items-center justify-center"
                title="Reset Sim"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs md:text-sm font-mono text-muted-foreground flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
              {isRunning ? "Simulating execution steps..." : "Simulation Standby"}
            </div>
          </div>
        </div>

        {/* Right Side: Virtual Simulator Devices (Phone Screen & Console Logs) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Virtual Mobile Screen */}
          <div className="glass-card w-full shrink-0 h-[420px] p-6 flex flex-col justify-between relative shadow-2xl overflow-hidden self-center rounded-3xl">
            {/* Phone Top Notch decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-input-bg rounded-b-xl border-x border-b border-card-border z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-background" />
            </div>

            {/* Virtual Sim Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-card-border pt-3 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Flowvero Auto-Triage v4.9</span>
            </div>

            {/* Messages body (overflow scroll) */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 scrollbar-none text-xs md:text-sm pr-1">
              {phoneMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-16">
                  <Smartphone className="w-10 h-10 text-muted-foreground mb-3 animate-bounce" />
                  <p className="text-sm">Visual phone simulator waiting...<br/>Press 'Initialize' to start</p>
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
                      className={`px-4 py-2.5 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-cyan-500 text-background rounded-tr-none font-bold"
                          : msg.sender === "system"
                          ? "bg-muted/80 border border-card-border text-[11px] text-muted-foreground text-center w-full"
                          : "bg-surface text-foreground border border-card-border rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1.5 font-mono">{msg.time}</span>
                  </div>
                ))
              )}
            </div>

            {/* Phone bottom input decoration */}
            <div className="h-10 border-t border-card-border flex items-center justify-between px-1 shrink-0 pt-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs font-bold">+</span>
              </div>
              <div className="flex-1 bg-input-bg border border-card-border mx-2 rounded-full h-6 text-xs text-muted-foreground px-4 flex items-center">
                Read-only simulation
              </div>
              <MessageSquare className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          {/* Terminal Diagnostics System Outputs */}
          <div className="glass-card flex-1 min-h-[180px] p-5 font-mono text-xs flex flex-col gap-3 shadow-inner overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 pb-3 border-b border-card-border font-bold text-xs text-muted-foreground">
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>FLOWVERO LOG CONTROLLER MONITOR</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-muted-foreground scrollbar-none pr-1">
              {logMessages.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-muted-foreground font-bold">[{new Date().toLocaleTimeString()}]</span>{" "}
                  <span
                    className={
                      log.includes("Completed")
                        ? "text-emerald-400 font-bold"
                        : log.includes("Entity") || log.includes("Fired")
                        ? "text-cyan-400 font-bold"
                        : "text-muted-foreground"
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
