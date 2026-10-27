import { DomainType, IntersectionHypothesis, OpportunityCategory } from "@/types";
import { RAW_INTERSECTIONS } from "../data/seed";

const DOMAIN_SHIFTS: Record<DomainType, { change: string; trends: string[] }> = {
  "Artificial Intelligence": {
    change: "Transition from conversational interfaces to verifiable autonomous execution agents with structured tool use.",
    trends: ["Multi-agent state machines", "Post-quantum cryptanalysis", "Edge reasoning models", "Automated benchmarking"],
  },
  "Startups & VC": {
    change: "Capital allocation pivoting to capital-efficient unit economics, secondary liquidity markets, and sovereign AI compute access.",
    trends: ["Secondary share liquidity", "Non-dilutive grant stacking", "Founder-led lean engineering teams", "Vertical micro-SaaS"],
  },
  "Finance & Economics": {
    change: "High structural baseline interest rates requiring clear ROI software, alongside SEC climate and cybersecurity reporting mandates.",
    trends: ["Mandatory Scope 1/2 ESG audit trails", "Real-time algorithmic treasury management", "Instant cross-border settlement", "Alternative fee financing"],
  },
  "Education & Fellowships": {
    change: "Displacement of classical degree prerequisites by verified competency benchmarks and project-backed cohort fellowships.",
    trends: ["AI-proctored project credentialing", "Micro-cohort academies", "Corporate sponsored technical fellowships", "Open-source work resumes"],
  },
  "Government Policy": {
    change: "Direct statutory regulation of algorithmic systems (EU AI Act, NIST PQC standards) paired with sovereign industrial subsidies (CHIPS, IRA).",
    trends: ["Enforceable AI audit standards", "Domestic supply chain verification", "Stricter antitrust in big tech", "National security export restrictions"],
  },
  "Climate & Energy": {
    change: "Grid interconnection delays exceeding 4 years, pushing industrial and compute consumers to direct behind-the-meter clean power.",
    trends: ["Curtailed solar and wind arbitrage", "Small modular reactor deployments", "Microgrid dynamic load-shedding", "Heat recovery integration"],
  },
  "Healthcare & Biotech": {
    change: "Point-of-care diagnostics, generative synthetic biology, and ARPA-H funded decentralized therapeutics production.",
    trends: ["In-silico antibody design", "Automated clinical trial matching", "Decentralized biomedical trials", "Synthetic genomics"],
  },
  "Real Estate & Infrastructure": {
    change: "Distressed commercial real estate re-zoning into hybrid suburban edge compute data centers and last-mile logistics hubs.",
    trends: ["Office-to-datacenter retrofits", "Suburban power node hosting", "Automated zoning clearance", "Micro-fulfillment lockers"],
  },
  "Legaltech & Operations": {
    change: "Law firm transition from hourly billing to fixed-fee value models, unleashing massive demand for high-throughput contract review.",
    trends: ["Automated M&A discrepancy audits", "Liability indemnification scoring", "Continuous regulatory diff tracking", "Algorithmic due diligence"],
  },
  "Competitions & Grants": {
    change: "Explosion of non-dilutive government programs (ARPA-H, SBIR, Horizon Europe) with stringent domestic tracking compliance.",
    trends: ["Autonomous grant proposal matching", "Provenance verification", "Defense dual-use prize challenges", "University commercialization grants"],
  },
};

/**
 * Returns pre-computed or dynamically synthesizes an intersection hypothesis between any 2 domains.
 */
export function analyzeDomainIntersection(
  domainA: DomainType,
  domainB: DomainType,
  filters?: {
    geography?: string;
    timeHorizon?: string;
    riskTolerance?: string;
    capital?: string;
  }
): IntersectionHypothesis {
  // Check if we have an existing curated intersection
  const existing = RAW_INTERSECTIONS.find(
    (item) =>
      (item.domainA === domainA && item.domainB === domainB) ||
      (item.domainA === domainB && item.domainB === domainA)
  );

  if (existing) {
    return existing;
  }

  // Synthesize dynamically based on domain knowledge vectors
  const shiftA = DOMAIN_SHIFTS[domainA] || { change: `Evolving market patterns and efficiency demands in ${domainA}.`, trends: [] };
  const shiftB = DOMAIN_SHIFTS[domainB] || { change: `Structural shifts and regulatory adjustments in ${domainB}.`, trends: [] };

  const id = `int-${domainA.toLowerCase().slice(0, 3)}-${domainB.toLowerCase().slice(0, 3)}-${Date.now()}`;
  const interactionReason = `As ${domainA} advances with ${shiftA.change.toLowerCase()}, ${domainB} is simultaneously pressured by ${shiftB.change.toLowerCase()}. The intersection enables removing historical friction points where neither domain could solve the bottleneck alone.`;

  const unmetNeed = `A targeted cross-disciplinary operating platform integrating ${domainA}'s technical capabilities directly into ${domainB}'s operational workflow, eliminating manual handoffs and regulatory ambiguity.`;

  const category: OpportunityCategory =
    domainA === "Education & Fellowships" || domainB === "Education & Fellowships"
      ? "Career & Skill"
      : domainA === "Competitions & Grants" || domainB === "Competitions & Grants"
      ? "Competitions & Grants"
      : "Startup & Business";

  return {
    id,
    domainA,
    domainB,
    changesInA: shiftA.change,
    changesInB: shiftB.change,
    interactionReason,
    emergingUnmetNeed: unmetNeed,
    whoCouldBenefit: [
      `Forward-thinking operators in ${domainB} seeking operational margin leverage`,
      `Engineers and entrepreneurs with cross-domain background in ${domainA} and ${domainB}`,
      `Early enterprise customers seeking to automate legacy bottlenecks before competitors`
    ],
    supportingEvidence: [
      `Accelerating convergence of ${shiftA.trends[0] || domainA} and ${shiftB.trends[0] || domainB}.`,
      `Industry feedback indicating existing single-domain tools fail to bridge the operational gap between both sectors.`
    ],
    unverifiedAssumptions: [
      `End users in ${domainB} are willing to adopt tools originating from ${domainA} without extensive custom onboarding.`,
      `Economic willingness-to-pay exceeds customer acquisition cost in this specific intersection niche.`
    ],
    cheapTestExperiment: `Draft a 1-page speculative whitepaper or product brief describing how ${domainA} solves ${domainB}'s primary challenge; run a targeted poll or LinkedIn message campaign to 20 industry practitioners to measure response rate.`,
    estimatedTimeframe: filters?.timeHorizon || "1-2 Years",
    confidenceScore: 78,
    recommendedCategory: category,
  };
}
