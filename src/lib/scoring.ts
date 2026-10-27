import { Opportunity, ScoreDimensions, UserProfile, PersonalFitAnalysis } from "@/types";

export const SCORING_WEIGHTS = {
  evidenceQuality: 0.25,
  problemStrength: 0.20,
  timingMomentum: 0.15,
  feasibility: 0.15,
  valueCreation: 0.15,
  strategicDifferentiation: 0.10,
} as const;

export const INSUFFICIENT_EVIDENCE_THRESHOLD = 40;

export interface DimensionInputs {
  evidenceQuality: number;
  problemStrength: number;
  timingMomentum: number;
  feasibility: number;
  valueCreation: number;
  strategicDifferentiation: number;
  dimensionReasoning?: Partial<ScoreDimensions["dimensionReasoning"]>;
  sourceCount?: number;
}

/**
 * Calculates weighted opportunity score based on the 6 standard dimensions.
 * Strictly adheres to 25/20/15/15/15/10 breakdown.
 */
export function calculateOpportunityScore(inputs: DimensionInputs): ScoreDimensions {
  const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

  const eq = clamp(inputs.evidenceQuality);
  const ps = clamp(inputs.problemStrength);
  const tm = clamp(inputs.timingMomentum);
  const fe = clamp(inputs.feasibility);
  const vc = clamp(inputs.valueCreation);
  const sd = clamp(inputs.strategicDifferentiation);

  const weightedTotal = Math.round(
    eq * SCORING_WEIGHTS.evidenceQuality +
    ps * SCORING_WEIGHTS.problemStrength +
    tm * SCORING_WEIGHTS.timingMomentum +
    fe * SCORING_WEIGHTS.feasibility +
    vc * SCORING_WEIGHTS.valueCreation +
    sd * SCORING_WEIGHTS.strategicDifferentiation
  );

  const isInsufficient = eq < INSUFFICIENT_EVIDENCE_THRESHOLD || (inputs.sourceCount !== undefined && inputs.sourceCount === 0);

  return {
    evidenceQuality: eq,
    problemStrength: ps,
    timingMomentum: tm,
    feasibility: fe,
    valueCreation: vc,
    strategicDifferentiation: sd,
    totalOpportunityScore: weightedTotal,
    isInsufficientEvidence: isInsufficient,
    dimensionReasoning: {
      evidenceQuality: inputs.dimensionReasoning?.evidenceQuality || 
        (isInsufficient 
          ? "Critical lack of verified primary datasets or independent citations." 
          : `Supported by verifiable external sources with ${eq}/100 rigor.`),
      problemStrength: inputs.dimensionReasoning?.problemStrength || 
        `Acute economic, structural, or career bottleneck with ${ps}/100 severity.`,
      timingMomentum: inputs.dimensionReasoning?.timingMomentum || 
        `Catalyzed by recent regulatory, technological, or capital inflection points (${tm}/100).`,
      feasibility: inputs.dimensionReasoning?.feasibility || 
        `Execution friction evaluated at ${fe}/100 based on resource requirements and technical difficulty.`,
      valueCreation: inputs.dimensionReasoning?.valueCreation || 
        `Long-term upside leverage and value retention potential assessed at ${vc}/100.`,
      strategicDifferentiation: inputs.dimensionReasoning?.strategicDifferentiation || 
        `Barrier against crowded competitor entry and commoditization rated at ${sd}/100.`,
    },
  };
}

/**
 * Calculates Personal Fit Score (0-100) independently from Opportunity Score.
 * Analyzes skill overlaps, time budget, capital range, risk tolerance, and work DNA.
 */
export function calculatePersonalFit(
  opportunity: Pick<Opportunity, "title" | "category" | "domains" | "geography" | "valueCapture" | "evidence">,
  profile: UserProfile
): PersonalFitAnalysis {
  let score = 50; // baseline
  const whyItMatches: string[] = [];
  const advantagesPossessed: string[] = [];
  const skillGaps: string[] = [];
  const suitabilityRisks: string[] = [];

  const requiredTokens = opportunity.valueCapture.requiredSkillsAndResources
    .join(" ")
    .toLowerCase();

  // 1. Skill & Background Match
  const userSkillMatches = profile.skills.filter(s =>
    requiredTokens.includes(s.toLowerCase()) ||
    opportunity.domains.some(d => d.toLowerCase().includes(s.toLowerCase()))
  );

  if (userSkillMatches.length > 0) {
    score += Math.min(25, userSkillMatches.length * 8);
    advantagesPossessed.push(`Direct capability overlap: ${userSkillMatches.join(", ")}`);
    whyItMatches.push(`Your background in ${userSkillMatches.slice(0, 2).join(" & ")} dramatically lowers execution latency.`);
  } else {
    score -= 10;
    skillGaps.push("Requires ramping up on core domain technologies or partner co-founder.");
  }

  // 2. Weekly Time Horizon & Availability
  if (profile.availableHours >= 25) {
    score += 10;
    advantagesPossessed.push(`High available bandwidth (${profile.availableHours}h/wk) allows rapid multi-variant experimentation.`);
  } else if (profile.availableHours < 12 && opportunity.category === "Startup & Business") {
    score -= 15;
    suitabilityRisks.push(`Limited availability (${profile.availableHours}h/wk) may bottleneck a venture requiring intensive operational execution.`);
  } else {
    score += 5;
  }

  // 3. Capital & Resource Alignment
  if (profile.capitalRange === "Bootstrap (<$1k)") {
    if (opportunity.valueCapture.potentialBarriers.some(b => b.toLowerCase().includes("capital") || b.toLowerCase().includes("hardware"))) {
      score -= 12;
      suitabilityRisks.push("Opportunity exhibits capital-intensive barriers; lean bootstrapping will require grants or strategic partners.");
    } else {
      score += 8;
      whyItMatches.push("High software/intellectual leverage allows low-capital pilot validation.");
    }
  } else {
    score += 10;
    advantagesPossessed.push(`Capital range (${profile.capitalRange}) provides sufficient runway for 6-12 month validation phase.`);
  }

  // 4. Risk Tolerance & Uncertainty
  const hasHighUncertainty = opportunity.evidence.counterEvidence.length > 1;
  if (profile.riskTolerance === "Conservative" && hasHighUncertainty) {
    score -= 10;
    suitabilityRisks.push("Elevated domain ambiguity and counter-evidence conflict with conservative risk posture.");
  } else if (profile.riskTolerance === "Aggressive" || profile.riskTolerance === "Contrarian High-Risk") {
    score += 7;
    whyItMatches.push("High-risk upside profile aligns with your contrarian tolerance.");
  }

  // 5. Work DNA alignment
  if (profile.workDNA.archetype === "Builder / Architect" && (opportunity.category === "Startup & Business" || opportunity.category === "Research & Innovation")) {
    score += 8;
    advantagesPossessed.push("Builder DNA enables shipping quick functional prototypes to test real market willingness-to-pay.");
  }

  // 6. Geography
  if (opportunity.geography === "Global" || opportunity.geography.toLowerCase().includes(profile.geography.toLowerCase())) {
    score += 5;
  } else {
    suitabilityRisks.push(`Primary focus area is ${opportunity.geography}; remote execution may require local distribution partners.`);
  }

  const finalFitScore = Math.max(15, Math.min(98, Math.round(score)));

  let recommendedNextStep = "Conduct 5 discovery conversations with prospective users to test the core value assumption.";
  if (finalFitScore >= 75) {
    recommendedNextStep = "Execute the 7-day validation sprint: launch a minimal test landing page or targeted cold outreach to 10 buyers.";
  } else if (finalFitScore < 50) {
    recommendedNextStep = "Address core capability and time constraints first before committing capital or deep hours.";
  }

  return {
    personalFitScore: finalFitScore,
    whyItMatches: whyItMatches.length > 0 ? whyItMatches : ["Relevant to your forward-looking interest profile."],
    advantagesPossessed: advantagesPossessed.length > 0 ? advantagesPossessed : ["Foundational interest and general domain literacy."],
    skillGaps: skillGaps.length > 0 ? skillGaps : ["Specialized regulatory or enterprise distribution workflows."],
    suitabilityRisks: suitabilityRisks.length > 0 ? suitabilityRisks : ["General market execution risks."],
    recommendedNextStep,
  };
}
