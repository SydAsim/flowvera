export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metricsText: string;
}

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  benefits: string[];
}

export interface ServiceCard {
  id: string;
  title: string;
  resultStatement: string;
  description: string;
  includes: string[];
  ctaText: string;
  badge: string;
  priceEstimate?: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  timeline: string;
  output: string;
}

export interface DemoSystem {
  id: string;
  title: string;
  trigger: string;
  flow: string[];
  result: string;
  category: string;
  accentColor: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  painPoint: string;
  solutionOutcome: string;
}

export interface PricingCard {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  includes: string[];
  cta: string;
  popular: boolean;
  accent: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
