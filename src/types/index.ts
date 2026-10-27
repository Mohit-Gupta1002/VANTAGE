export type DomainType =
  | "Artificial Intelligence"
  | "Startups & VC"
  | "Finance & Economics"
  | "Education & Fellowships"
  | "Government Policy"
  | "Climate & Energy"
  | "Healthcare & Biotech"
  | "Real Estate & Infrastructure"
  | "Legaltech & Operations"
  | "Competitions & Grants";

export type OpportunityCategory =
  | "Career & Skill"
  | "Startup & Business"
  | "Research & Innovation"
  | "Investment Themes"
  | "Competitions & Grants"
  | "Emerging Industries & Gaps"
  | "Geographic & Community";

export type OpportunityStatus =
  | "discovered"
  | "investigating"
  | "validating"
  | "executing"
  | "archived";

export type VerificationStatus =
  | "Verified Sourced"
  | "Peer Reviewed"
  | "Direct Regulatory Filing"
  | "Market Signal"
  | "Hypothetical / Modeled";

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  background: string;
  skills: string[];
  interests: string[];
  experience: string;
  capitalRange: "Bootstrap (<$1k)" | "Seed ($1k-$10k)" | "Growth ($10k-$50k)" | "Institutional ($50k+)";
  availableHours: number; // hours per week
  geography: string;
  networkAccess: string[];
  goals: string[];
  riskTolerance: "Conservative" | "Moderate" | "Aggressive" | "Contrarian High-Risk";
  preferredTimeHorizon: "6-12 Months" | "1-2 Years" | "3-5 Years" | "5+ Years";
  workDNA: {
    archetype: "Builder / Architect" | "Operator / Scaler" | "Researcher / Theorist" | "Dealmaker / Connector";
    workStyle: "Async Deep Work" | "Rapid Iteration & Prototyping" | "Community-Centric";
    primarySuperpower: string;
  };
  constraints: string[];
}

export interface IntelligenceSignal {
  id: string;
  title: string;
  summary: string;
  domain: DomainType;
  geography: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  retrievedAt: string;
  signalType: "Policy" | "Breakthrough" | "Capital Influx" | "Adoption Shift" | "Regulatory" | "Grant / Competition";
  whyItMatters: string;
  potentialOpportunities: string[];
  evidenceQuality: number; // 0 - 100
  confidence: "High" | "Medium" | "Low";
  verificationStatus: VerificationStatus;
  isSampleData: boolean;
  tags: string[];
}

export interface ScoreDimensions {
  evidenceQuality: number; // 25%
  problemStrength: number; // 20%
  timingMomentum: number; // 15%
  feasibility: number; // 15%
  valueCreation: number; // 15%
  strategicDifferentiation: number; // 10%
  totalOpportunityScore: number; // weighted sum
  isInsufficientEvidence: boolean;
  dimensionReasoning: {
    evidenceQuality: string;
    problemStrength: string;
    timingMomentum: string;
    feasibility: string;
    valueCreation: string;
    strategicDifferentiation: string;
  };
}

export interface PersonalFitAnalysis {
  personalFitScore: number; // 0 - 100
  whyItMatches: string[];
  advantagesPossessed: string[];
  skillGaps: string[];
  suitabilityRisks: string[];
  recommendedNextStep: string;
}

export interface OpportunityEvidenceSource {
  title: string;
  url: string;
  publisher: string;
  date: string;
  quote?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  category: OpportunityCategory;
  domains: DomainType[];
  geography: string;
  timeHorizon: "6-12 months" | "1-2 years" | "3-5 years";
  
  // Why It Matters
  whyItMatters: {
    underlyingChange: string;
    historicalContext: string;
    currentSignals: string[];
    futureImplications: string;
  };

  // Evidence
  evidence: {
    supportingSources: OpportunityEvidenceSource[];
    counterEvidence: string[];
    assumptions: string[];
    dataGaps: string[];
    confidenceLevel: "High" | "Medium" | "Low" | "Insufficient";
  };

  // Value Capture
  valueCapture: {
    whoBenefits: string[];
    businessModelsOrCareerPathways: string[];
    requiredSkillsAndResources: string[];
    potentialBarriers: string[];
    waysToTest: string[];
  };

  // Recommended Action
  recommendedAction: {
    immediateNextStep: string;
    sevenDayValidationPlan: string[];
    thirtyDayExecutionPlan: string[];
    suggestedMilestones: string[];
    clearSuccessCriteria: string[];
  };

  // Scores
  scores: ScoreDimensions;
  personalFit?: PersonalFitAnalysis;

  // Status & Metadata
  status: OpportunityStatus;
  isSampleData: boolean;
  featured?: boolean;
}

export interface HistoricalEvent {
  id: string;
  domain: DomainType;
  year: number;
  title: string;
  description: string;
  category: "Technological" | "Regulatory" | "Adoption" | "Capital Shift" | "Market Model";
  impact: string;
  keyLessons: string[];
  recurringPattern: string;
  limitOfAnalogy: string;
  sources: Array<{ title: string; url: string }>;
}

export interface IntersectionHypothesis {
  id: string;
  domainA: DomainType;
  domainB: DomainType;
  changesInA: string;
  changesInB: string;
  interactionReason: string;
  emergingUnmetNeed: string;
  whoCouldBenefit: string[];
  supportingEvidence: string[];
  unverifiedAssumptions: string[];
  cheapTestExperiment: string;
  estimatedTimeframe: string;
  confidenceScore: number;
  recommendedCategory: OpportunityCategory;
}

export interface ScenarioDetail {
  timeframe: "1 Year" | "3 Years" | "5 Years" | "10 Years";
  title: string;
  narrative: string;
  probability: "High" | "Moderate" | "Plausible Edge";
  keyDrivers: string[];
  earlyIndicators: string[];
}

export interface FutureScenario {
  id: string;
  topic: string;
  domain: DomainType;
  timeframe: "1 Year" | "3 Years" | "5 Years" | "10 Years";
  baseScenario: ScenarioDetail;
  upsideScenario: ScenarioDetail;
  downsideScenario: ScenarioDetail;
  winners: string[];
  losers: string[];
  emergingOpportunities: string[];
  invalidatingAssumptions: string[];
}

export interface UserOpportunityRecord {
  id: string;
  opportunityId: string;
  status: OpportunityStatus;
  notes: string;
  nextAction: string;
  targetDate: string;
  progress: number; // 0 - 100
  experiments: Array<{
    id: string;
    date: string;
    hypothesis: string;
    result: string;
    learning: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchReport {
  id: string;
  query: string;
  title: string;
  domain: DomainType;
  historicalContext: string;
  currentSignals: string[];
  crossDomainConnections: string[];
  scenarios: string[];
  sources: Array<{ title: string; url: string }>;
  generatedAt: string;
  confidence: "High" | "Medium" | "Low";
  isDemo: boolean;
}
