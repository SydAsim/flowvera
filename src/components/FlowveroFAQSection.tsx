import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { FAQ_DATA } from "../data";

export default function FlowveroFAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative z-20 border-t border-card-border overflow-hidden"
      style={{ background: "#030406" }}
    >
      {/* Ambient background glow blobs */}
      <div
        className="absolute top-[10%] left-[15%] w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[5%] right-[10%] w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 py-20">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: "#64748b" }}>
            Everything you need to know before starting your automation system.
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-13 items-start">
          {/* ─── Left: Animated CTA Card ─── */}
          <div className="w-full lg:w-[60%] xl:w-[65%] lg:-ml-8 xl:-ml-20 lg:sticky lg:top-24 shrink-0">
            <div
              className="c5-animated-gradient rounded-[28px] py-40 px-20 text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: `0 24px 85px rgba(14, 165, 233, 0.45), 0 0 120px rgba(30, 64, 175, 0.4), inset 0 0 50px rgba(15, 23, 42, 0.28)`
              }}
            >
              <span className="uppercase tracking-[0.18em] text-[0.72rem] opacity-80 mb-4 font-mono font-bold">
                REVENUE RECOVERY BLUEPRINTS
              </span>
              <h3 className="font-normal leading-[1.1] mb-[15px] text-[2.5rem] md:text-[3.5rem] tracking-[-0.03em] font-display">
                Ready to Stop Losing Leads?
              </h3>
              <p className="text-[0.95rem] mb-[30px] font-normal opacity-85 max-w-[520px] leading-[1.7]">
                Send your business parameters or current website. Flowvero will map exactly where leads are leaking and draft a custom workflow plan.
              </p>
              <button
                className="bg-neutral-950 text-white font-semibold cursor-pointer border border-white/10 text-[0.95rem] transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center justify-center"
                style={{
                  padding: "14px 32px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 24px rgba(0,0,0,0.35)"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 16px 35px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.35)";
                }}
              >
                Get Free Audit
              </button>
              <p className="mt-5 text-[0.8rem] opacity-75">
                No AI hype. Just practical systems that reply, track, remind, and recover.
              </p>
            </div>
          </div>

          {/* ─── Right: FAQ Accordion ─── */}
          <div className="w-full lg:w-[54%] space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="fv-faq-item rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(15, 23, 42, 0.55)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: `1px solid ${isOpen ? "rgba(56, 189, 248, 0.45)" : "rgba(96, 165, 250, 0.16)"}`,
                    boxShadow: isOpen
                      ? "0 0 20px rgba(56, 189, 248, 0.08), 0 4px 16px rgba(0,0,0,0.3)"
                      : "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer transition-colors duration-200"
                    style={{ background: "transparent" }}
                    onMouseEnter={(e) => {
                      if (!isOpen) {
                        (e.currentTarget.parentElement as HTMLElement).style.borderColor = "rgba(96, 165, 250, 0.35)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) {
                        (e.currentTarget.parentElement as HTMLElement).style.borderColor = "rgba(96, 165, 250, 0.16)";
                      }
                    }}
                  >
                    <span className="text-[15px] md:text-base font-semibold text-white leading-normal pr-3">
                      {faq.question}
                    </span>
                    <span
                      className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isOpen ? "rgba(56,189,248,0.15)" : "rgba(96,165,250,0.08)",
                      }}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" style={{ color: "#38bdf8" }} />
                      ) : (
                        <ChevronDown className="w-4 h-4" style={{ color: "#60a5fa" }} />
                      )}
                    </span>
                  </button>

                  <div
                    className="fv-faq-answer overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className="px-6 pb-5 pt-1 text-sm md:text-[15px] leading-relaxed"
                      style={{
                        color: "#94a3b8",
                        borderTop: "1px solid rgba(96, 165, 250, 0.1)",
                      }}
                    >
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
