import { UserProfile } from "@/types";

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "usr_vantage_default",
  name: "Alex Vance",
  role: "Aspiring Tech Founder & AI Systems Engineer",
  background: "Computer Science graduate with 3 years software engineering experience at a high-growth fintech startup. Built distributed pipelines and LLM evaluation benchmarks.",
  skills: [
    "TypeScript / Python",
    "LLM Fine-Tuning & RAG",
    "Distributed Systems",
    "System Architecture",
    "Data Pipelines",
    "Financial Data APIs",
    "Rapid Prototyping"
  ],
  interests: [
    "Autonomous Enterprise Agents",
    "Legal & Compliance Automation",
    "Climate Energy Grid Orchestration",
    "Cross-Domain Intelligence",
    "Open Source Tooling"
  ],
  experience: "Led backend architecture for real-time compliance ledger; published benchmark paper on prompt caching efficiency.",
  capitalRange: "Seed ($1k-$10k)",
  availableHours: 25,
  geography: "North America & Remote",
  networkAccess: [
    "Alumni network in Bay Area & NYC",
    "YC founder group chats",
    "University AI lab researchers"
  ],
  goals: [
    "Launch an evidence-backed B2B AI venture within 9 months",
    "Identify underserved regulatory and legal workflow gaps",
    "Build a defensible data flywheel with minimal upfront capital"
  ],
  riskTolerance: "Aggressive",
  preferredTimeHorizon: "1-2 Years",
  workDNA: {
    archetype: "Builder / Architect",
    workStyle: "Rapid Iteration & Prototyping",
    primarySuperpower: "Distilling complex fragmented datasets into tight technical APIs and functional software.",
  },
  constraints: [
    "Full-time day job commitment until seed validation",
    "Budget capped at $8,000 for upfront infrastructure and data licensing",
    "Prefers software-first margins without heavy initial physical hardware"
  ],
};
