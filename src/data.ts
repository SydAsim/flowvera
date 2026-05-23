import { 
  ProblemCard, 
  SolutionCard, 
  ServiceCard, 
  ProcessStep, 
  DemoSystem, 
  IndustryItem, 
  PricingCard, 
  FAQItem 
} from "./types";

export const PROBLEMS_DATA: ProblemCard[] = [
  {
    id: "missed-calls",
    title: "Missed Calls After Hours",
    description: "62% of calls to small businesses go unanswered. When they call your office after 5 PM and get an answering machine, they call your competitor next.",
    iconName: "PhoneMissed",
    metricsText: "Avg. Lost Deal Rate: 45%"
  },
  {
    id: "slow-reply",
    title: "No Instant Web Form Reply",
    description: "Leads responded to within 5 minutes are 9x more likely to convert. Most businesses take 4-24 hours to reply. By then, the prospect has moved on.",
    iconName: "Clock",
    metricsText: "Conversion Drop: -80%"
  },
  {
    id: "whatsapp-chaos",
    title: "Siloed WhatsApp Messages",
    description: "Prospective customers reach out on WhatsApp, but conversations are stuck inside a single team member's phone. No central track, no follow-ups.",
    iconName: "MessageCircle",
    metricsText: "Conversations Lost: 30%+"
  },
  {
    id: "memory-followup",
    title: "Follow-Ups Depend On Memory",
    description: "80% of sales require 5 follow-ups, but only 8% of reps make it past the first touch. If it isn't automated, your team forgets or runs out of time.",
    iconName: "ClipboardList",
    metricsText: "Leaking Pipelines: Huge"
  }
];

export const SOLUTIONS_DATA: SolutionCard[] = [
  {
    id: "instant-reply",
    title: "Instant Lead Response",
    description: "Every form, phone call, or message triggers an instant automated interactive SMS, email, or chat response in less than 60 seconds. Grab attention while they are highly motivated.",
    benefits: [
      "Secures lead before they contact competitors",
      "Immediate owner & manager push alerts",
      "Qualifying questions asked instantly"
    ]
  },
  {
    id: "workflow-auto",
    title: "Workflow Automation",
    description: "We connect your website forms, calendar bookings, CRMs, Google Sheets, email, and chats into one perfectly failure-proof sync loop. No copy-pasting required.",
    benefits: [
      "Zero human translation required between tools",
      "Automatic centralized tracking logs",
      "Automated follow-up sequence for non-bookers"
    ]
  },
  {
    id: "guardrail-ai",
    title: "AI Agents with Guardrails",
    description: "We deploy task-specific AI models that read incoming leads, lookup real-time data, draft compliant responses, and update statuses, with safe boundaries.",
    benefits: [
      "Smart classification (VIP, Urgent, Refund, Spam)",
      "Dynamic booking calendar link generation",
      "Seamless escalation handoff to human agents"
    ]
  }
];

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: "lead-rescue",
    title: "Lead Rescue Starter",
    resultStatement: "No new lead gets ignored.",
    description: "Never let another website visitor bounce. Secure immediate responses, record logs, and notify key staff the second they hit submit.",
    includes: [
      "Website form capture trigger",
      "Instant SMS & Email greeting (under 60s)",
      "Slack/WhatsApp Owner notification",
      "Google Sheets & CRM centralized logging",
      "3-step automated drip sequence"
    ],
    ctaText: "Explore this system",
    badge: "Most Popular First Step",
    priceEstimate: "From $150",
    iconName: "Zap"
  },
  {
    id: "missed-call",
    title: "Missed Call Recovery",
    resultStatement: "Missed calls get instant text-back.",
    description: "Turn missed business inquiries into instant text conversations. If you can't answer, our system immediately text-responses to save the customer.",
    includes: [
      "Unanswered incoming call hook detection",
      "Instant auto-response text/SMS within 15 seconds",
      "Custom interactive appointment booking link",
      "Owner email alert with caller info",
      "No-answer trigger loop"
    ],
    ctaText: "Explore this system",
    badge: "Highest Return on Investment",
    priceEstimate: "From $250",
    iconName: "PhoneCall"
  },
  {
    id: "appointment-reminders",
    title: "Appointment Reminder System",
    resultStatement: "Reduce no-shows and rebooking gaps.",
    description: "Stop losing precious billable hours to empty chairs and forgotten slots. Automate calendar sync, patient reminders, and cancellation recovery.",
    includes: [
      "Google Calendar, Outlook or CRM sync",
      "Multi-channel sequences (SMS, Email, WhatsApp)",
      "Interactive (Confirm/Reschedule) response hooks",
      "Automated fallback if confirmation is missed",
      "No-show follow-up reactivation sequence"
    ],
    ctaText: "Explore this system",
    badge: "Perfect for Clinics & Salons",
    priceEstimate: "From $300",
    iconName: "Calendar"
  },
  {
    id: "whatsapp-crm",
    title: "WhatsApp Mini CRM",
    resultStatement: "Stop losing conversations inside one phone.",
    description: "Empower your entire sales or clinic admin team with shared numbers, visual pipelines, tags, templates, and safety templates for chat flow routing.",
    includes: [
      "Official Meta WhatsApp API setup",
      "Shared multi-agent team communications dashboard",
      "Custom customer tags and automated pipeline stages",
      "Predefined response shortcuts and template messages",
      "Interactive auto-responder menu flow"
    ],
    ctaText: "Explore this system",
    badge: "Essential for WhatsApp Markets",
    priceEstimate: "From $350",
    iconName: "Maximize2"
  },
  {
    id: "ecommerce-helper",
    title: "Ecommerce Support Helper",
    resultStatement: "Reduce repetitive customer support.",
    description: "Deflect up to 60% of common 'Where is my order?' or exchange inquiries by linking your shopify checkout to smart workflow scripts.",
    includes: [
      "Shopify, WooCommerce, or Stripe transaction hooks",
      "Instant status lookups via email or order number",
      "Smart FAQ reply assistant draft pre-generation",
      "Auto-tagging for high-priority/VIP support cases",
      "Manual refund and return escalation routing"
    ],
    ctaText: "Explore this system",
    badge: "Great for Shopify Brands",
    priceEstimate: "From $400",
    iconName: "ShoppingBag"
  },
  {
    id: "ai-agent-pro",
    title: "AI Agent Pro",
    resultStatement: "AI handles defined tasks with safety.",
    description: "Deploy a highly structured, context-trained AI agent to answer advanced questions, screen files, and handle booking logistics with absolute safety.",
    includes: [
      "Custom business knowledge database injection",
      "CRM interaction interface & scheduling credentials",
      "Strict system boundaries (No hallucinations, friendly)",
      "Structured output logs for human manager review",
      "Weekly performance summary and diagnostic data"
    ],
    ctaText: "Explore this system",
    badge: "Full Custom Intelligence",
    priceEstimate: "From $1,000",
    iconName: "Cpu"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Friction Audit",
    description: "We analyze your existing website forms, incoming phone routes, communication silos, and CRM steps. We point out precisely where leads are currently dropping offline.",
    timeline: "Takes 2 days",
    output: "Interactive Visual Leak Map & Strategy document"
  },
  {
    stepNumber: "02",
    title: "Sandbox Proof-of-Concept Demo",
    description: "Before you pay us anything significant, we build an interactive workflow demo in a sandbox environment showing how we process a mockup customer response.",
    timeline: "Takes 3 days",
    output: "Loom video walk-through of your custom mockup flow"
  },
  {
    stepNumber: "03",
    title: "Seamless Integration Run",
    description: "We connect your internal tools (CRM, calendars, sheets, phones) cleanly. We conduct comprehensive multi-case error handling and testing to make sure nothing skips.",
    timeline: "Takes 7 days",
    output: "Operational Production Workflow with Fail-safes"
  },
  {
    stepNumber: "04",
    title: "Handover & Active Monitoring",
    description: "We record clear, simple video tutorials and standard operating procedures (SOPs). We monitor your active executions for 30 days to optimize flows.",
    timeline: "Ongoing Care",
    output: "Handover Dashboard, SOP Docs + 30-Day Tech Support"
  }
];

export const DEMO_SYSTEMS: DemoSystem[] = [
  {
    id: "demo-home-service",
    title: "Home Service Lead Rescue",
    trigger: "Visitor submits 'Get Free Quote' form or calls after-hours phone line",
    flow: [
      "Capture customer details instantly and populate real-time Google Sheet",
      "Send SMS auto-reply back: 'Hey [Name]! Got your quote request. Standard response is in 5 mins. What is your street address?'",
      "If user replies, AI extracts address, categorizes zip code, and flags owner's phone via instant WhatsApp alert.",
      "If no reply, follow-up ping triggers automatically 15 minutes later to keep lead active."
    ],
    result: "Saves 4 hours/day of owner's manual phone call screening. Boosts reply rate by 180%.",
    category: "Home Services & Trades",
    accentColor: "cyan"
  },
  {
    id: "demo-real-estate",
    title: "Real Estate Buyer Qualification",
    trigger: "New property lead arrives from Facebook Ads, Zillow, or website form",
    flow: [
      "Instant multi-channel notifications dispatch directly to listing agent's desktop",
      "AI Assistant texts caller: 'Hi, thanks for checking [Property]. Are you looking to buy within 30 days, or just browsing?'",
      "Based on response, update CRM opportunity and assign high/low hot-lead score tags",
      "Instantly send personalized booking calendar link of agent to hot buyers."
    ],
    result: "Screens out unqualified cold leads. Real estate agents focus 100% of their time only on pre-screened warm buyers.",
    category: "Real Estate Teams",
    accentColor: "sky"
  },
  {
    id: "demo-shopify",
    title: "Shopify VIP Response & Support Deflection",
    trigger: "Customer emails request or submits order help form on storefront helpdesk",
    flow: [
      "Query Shopify store database back-end for order state using consumer email address",
      "AI detects sentiment. If ticket indicates 'angry order delay', automatically fetch courier track-link",
      "Draft a complete context-rich reply containing live tracker link, saving it for one-click human review",
      "If high-lifetime-value VIP customer, route straight to senior account manager."
    ],
    result: "Reduces client ticket processing times by 75%. Resolves shipping inquiries instantly.",
    category: "Ecommerce Brands",
    accentColor: "indigo"
  },
  {
    id: "demo-clinic",
    title: "Clinic Intake & Recall Flow",
    trigger: "A past dentist patient reaches out, or missed call triggers recall list cycle",
    flow: [
      "Intake system texts patient custom SMS link pointing to digital HIPAA-compliant pre-treatment intake form",
      "Confirm completed paperwork. Sync responses directly to Patient Management Software records",
      "Generate Google Calendar slot. Trigger staggered reminder sequence (24h before, 2h before)",
      "If patient misses appointment, initiate reactivation sequence 30 minutes later instantly."
    ],
    result: "Reduces patient no-shows down to less than 3.5%. Lessens receptionist administrative workload.",
    category: "Dental & Medical Clinics",
    accentColor: "emerald"
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "industry-dental",
    name: "Dental Clinics",
    iconName: "Stethoscope",
    painPoint: "Reception is on the line with patients; missed callers bounce immediately to nearby dentists.",
    solutionOutcome: "Instant text-back triggers call-recovery, schedules booking, and reduces no-shows securely."
  },
  {
    id: "industry-medical",
    name: "Medical Clinics",
    iconName: "HeartPulse",
    painPoint: "Administrative overload with manual intake forms, reminder calls, and appointment reschedules.",
    solutionOutcome: "HIPAA-aligned auto-intake collection, central spreadsheets, and automated schedule reminders."
  },
  {
    id: "industry-homeservice",
    name: "Home Services",
    iconName: "Home",
    painPoint: "Contractors are on-site fixing roofs or plumbing and cannot answer client phone calls physically.",
    solutionOutcome: "Automated SMS quote routing, instant qualification gathering, and scheduler link dispatch."
  },
  {
    id: "industry-realestate",
    name: "Real Estate",
    iconName: "MapPin",
    painPoint: "High ad spend on social media networks, but hot leads go cold because agents take horas to reply.",
    solutionOutcome: "Sub-60s buyer screening and rating automations, paired with direct calendar scheduling triggers."
  },
  {
    id: "industry-ecom",
    name: "Ecommerce",
    iconName: "ShoppingBag",
    painPoint: "Inundated with simple questions about delivery times, tracking numbers, and refund questions.",
    solutionOutcome: "System checks shipping API instantly and drafted precise emails waiting for rapid staff review."
  },
  {
    id: "industry-salons",
    name: "Salons & Local Service",
    iconName: "Scissors",
    painPoint: "Staff is busy providing physical services. No one answers inquiries, leading to lost revenue.",
    solutionOutcome: "Missed-call rescue auto-books empty spots and schedules client follow-ups automatically."
  },
  {
    id: "industry-coaches",
    name: "Coaches & Consultants",
    iconName: "UserCheck",
    painPoint: "Wasting hours talking to cold prospects who aren't qualified or can't afford the package.",
    solutionOutcome: "Custom front-end application questionnaires filter candidates before they book zoom slots."
  },
  {
    id: "industry-agencies",
    name: "Agencies & Partners",
    iconName: "Briefcase",
    painPoint: "Scattered data across Slack, email, Google sheets, and messaging tools with zero workflow transparency.",
    solutionOutcome: "Robust central CRM and communication routing ensures team alignment and client retention."
  }
];

export const PRICING_DATA: PricingCard[] = [
  {
    id: "price-starter",
    name: "Starter Automation",
    price: "$150",
    period: "one-time",
    description: "Get started with your first single workflow. Perfect for small local businesses starting to eliminate leaks.",
    includes: [
      "1 Core Automation workflow",
      "1 Lead Capture channel (Form/Web)",
      "Centralized Google Sheet lead tracker",
      "Owner SMS or Gmail notification alerts",
      "Detailed asynchronous video walkthrough SOP",
      "14 days post-launch error support"
    ],
    cta: "Start Small",
    popular: false,
    accent: "slate"
  },
  {
    id: "price-growth",
    name: "Growth System",
    price: "$350",
    period: "one-time",
    description: "The complete setup. Perfect for active service teams, clinics, and brands seeking fully integrated routing and recovery.",
    includes: [
      "Up to 3 interconnected workflow maps",
      "Missed Call to SMS Auto-Textback rescue",
      "Full CRM pipeline integration & sync",
      "Multiple staff Slack/WhatsApp team alerts",
      "No-Show cancellation follow-up sequence",
      "Handover training video & written SOP folder",
      "30 days tech support & updates monitoring"
    ],
    cta: "Build My System",
    popular: true,
    accent: "cyan"
  },
  {
    id: "price-pro",
    name: "AI Agent Pro",
    price: "$1,000",
    period: "one-time build fee",
    description: "For companies requiring conversational AI triage, intelligent knowledge retrieval, or high-tier routing capabilities.",
    includes: [
      "Custom system-trained AI core engine",
      "Detailed proprietary company knowledge-base",
      "Interactive multi-step text screening & classification",
      "Human manager approval control toggle",
      "Seamless calendar appointment hook routing",
      "Full custom developer-crafted dashboard interface",
      "60 days dedicated technical monitoring"
    ],
    cta: "Discuss AI Agent",
    popular: false,
    accent: "violet"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What does Flowvero actually do?",
    answer: "We are practical engineers, not theoretical visualizers. We map where your prospective clients go offline, connect your existing tools (like website forms, phone channels, CRM spreadsheets, Slack/WhatsApp hubs, lists) into automated loops. This ensures every inquiry gets a response in seconds, and your team is immediately notified without clerical work.",
    category: "General"
  },
  {
    question: "Is this only for AI agents?",
    answer: "Absolutely not. In fact, we start with reliable standard automation first! Traditional APIs and conditional triggers are 100% stable, deterministic, and free. We add AI models selectively, such as analyzing complex text, drafting email messages, or classifying service categories under safe guardrails to prevent errors.",
    category: "AI & Tech"
  },
  {
    question: "Do I need a CRM or expensive software to start?",
    answer: "No. We can build incredibly robust workflows using your current tools, Google Sheets, Airtable, or free tiers of popular systems. If you eventually need a dedicated CRM, we assist with simple set-up so you don't waste budget on giant, overbuilt systems.",
    category: "General"
  },
  {
    question: "How does it help clinics and dental offices?",
    answer: "Clinics love our Systems because receptionist resources are often busy with physical checking-in or insurance. Common setups include Missed-Call Recovery (auto-SMS if front-desk is busy), Intake Form dispatch, customized multi-step SMS appointment reminders, and automated reactivation protocols for patients who missed their annual recall checks.",
    category: "Clinics"
  },
  {
    question: "What if something in the automation breaks?",
    answer: "All our workflows include reliable human-fallback and built-in error notification loops. If an API key expires or a layout changes, our system instantly flags our support email, bypassing silent failures. Every project includes 14 to 60 days of post-launch technical monitoring, with cheap optional monthly upkeep if you want us to constantly optimize your systems.",
    category: "Support"
  },
  {
    question: "How long does it take to deploy, and how do we begin?",
    answer: "Simple Starters are deployed in 3 to 5 business days, while comprehensive growth setups take 7 to 10 days. We start by analyzing your process. If we find immediate revenue leaks, we offer an interactive Loom video dashboard demo. You can easily schedule an audit by pressing the 'Get Free Audit' CTA buttons across our landing page!",
    category: "General"
  }
];
