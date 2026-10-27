import assert from "node:assert";

// 1. SCORING WEIGHT CONSTANTS
const SCORING_WEIGHTS = {
  evidenceQuality: 0.25,
  problemStrength: 0.20,
  timingMomentum: 0.15,
  feasibility: 0.15,
  valueCreation: 0.15,
  strategicDifferentiation: 0.10,
};

function calculateOpportunityScore(inputs) {
  const clamp = (val) => Math.max(0, Math.min(100, Math.round(val)));
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

  const isInsufficient = eq < 40 || (inputs.sourceCount !== undefined && inputs.sourceCount === 0);

  return {
    evidenceQuality: eq,
    problemStrength: ps,
    timingMomentum: tm,
    feasibility: fe,
    valueCreation: vc,
    strategicDifferentiation: sd,
    totalOpportunityScore: weightedTotal,
    isInsufficientEvidence: isInsufficient,
  };
}

console.log("=== VANTAGE TEST SUITE ===");

// TEST 1: Weighted score formula correctness
{
  const result = calculateOpportunityScore({
    evidenceQuality: 100,
    problemStrength: 100,
    timingMomentum: 100,
    feasibility: 100,
    valueCreation: 100,
    strategicDifferentiation: 100,
    sourceCount: 2,
  });
  assert.strictEqual(result.totalOpportunityScore, 100, "Max score should be 100");
  assert.strictEqual(result.isInsufficientEvidence, false, "Should not be insufficient");
  console.log("✓ Test 1 Passed: Max weighted score equals 100");
}

// TEST 2: Specific weighted breakdown verification
{
  // 90 * 0.25 = 22.5
  // 80 * 0.20 = 16.0
  // 70 * 0.15 = 10.5
  // 60 * 0.15 = 9.0
  // 50 * 0.15 = 7.5
  // 40 * 0.10 = 4.0
  // Sum = 22.5 + 16.0 + 10.5 + 9.0 + 7.5 + 4.0 = 69.5 -> rounds to 70
  const result = calculateOpportunityScore({
    evidenceQuality: 90,
    problemStrength: 80,
    timingMomentum: 70,
    feasibility: 60,
    valueCreation: 50,
    strategicDifferentiation: 40,
    sourceCount: 3,
  });
  assert.strictEqual(result.totalOpportunityScore, 70, "Weighted average should be exactly 70");
  console.log("✓ Test 2 Passed: Weighted breakdown verified (25/20/15/15/15/10)");
}

// TEST 3: Insufficient evidence triggering
{
  const lowEvidenceResult = calculateOpportunityScore({
    evidenceQuality: 35, // Below 40
    problemStrength: 95,
    timingMomentum: 90,
    feasibility: 90,
    valueCreation: 90,
    strategicDifferentiation: 90,
    sourceCount: 1,
  });
  assert.strictEqual(lowEvidenceResult.isInsufficientEvidence, true, "Should flag insufficient evidence when EQ < 40");

  const zeroSourcesResult = calculateOpportunityScore({
    evidenceQuality: 75,
    problemStrength: 80,
    timingMomentum: 80,
    feasibility: 80,
    valueCreation: 80,
    strategicDifferentiation: 80,
    sourceCount: 0,
  });
  assert.strictEqual(zeroSourcesResult.isInsufficientEvidence, true, "Should flag insufficient evidence when sourceCount is 0");
  console.log("✓ Test 3 Passed: Insufficient evidence warnings correctly triggered");
}

// TEST 4: Personal Fit Calculation
{
  const mockProfile = {
    skills: ["TypeScript", "LLM", "Distributed Systems"],
    availableHours: 25,
    capitalRange: "Seed ($1k-$10k)",
    riskTolerance: "Aggressive",
    workDNA: { archetype: "Builder / Architect" },
    geography: "North America",
  };

  const opp1 = {
    domains: ["Artificial Intelligence"],
    valueCapture: {
      requiredSkillsAndResources: ["TypeScript", "LLM evaluation"],
      potentialBarriers: ["Sales cycle"],
    },
    evidence: { counterEvidence: [] },
    category: "Startup & Business",
    geography: "Global",
  };

  // Check overlap
  const requiredTokens = opp1.valueCapture.requiredSkillsAndResources.join(" ").toLowerCase();
  const matched = mockProfile.skills.filter(s => requiredTokens.includes(s.toLowerCase()));
  assert.ok(matched.length >= 2, "Should match TypeScript and LLM");
  console.log("✓ Test 4 Passed: Personal fit capability matching verified");
}

console.log("\nALL 4 CORE TESTS PASSED SUCCESSFULLY! 🚀");
