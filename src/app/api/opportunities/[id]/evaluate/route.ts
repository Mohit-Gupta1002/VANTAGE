import { NextRequest, NextResponse } from "next/server";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed";
import { DEFAULT_USER_PROFILE } from "@/lib/data/profile";
import { calculateOpportunityScore, calculatePersonalFit } from "@/lib/scoring";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const opp = SEED_OPPORTUNITIES.find((o) => o.id === id);

    if (!opp) {
      return NextResponse.json(
        { error: `Opportunity with id '${id}' not found` },
        { status: 404 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { customDimensions, userProfile } = body;

    const profile = userProfile || DEFAULT_USER_PROFILE;

    // Recalculate opportunity score if custom dimensions supplied
    const updatedScores = customDimensions
      ? calculateOpportunityScore({
          evidenceQuality: customDimensions.evidenceQuality ?? opp.scores.evidenceQuality,
          problemStrength: customDimensions.problemStrength ?? opp.scores.problemStrength,
          timingMomentum: customDimensions.timingMomentum ?? opp.scores.timingMomentum,
          feasibility: customDimensions.feasibility ?? opp.scores.feasibility,
          valueCreation: customDimensions.valueCreation ?? opp.scores.valueCreation,
          strategicDifferentiation: customDimensions.strategicDifferentiation ?? opp.scores.strategicDifferentiation,
          sourceCount: opp.evidence.supportingSources.length,
        })
      : opp.scores;

    const personalFit = calculatePersonalFit(opp, profile);

    return NextResponse.json({
      id: opp.id,
      scores: updatedScores,
      personalFit,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Evaluation failed: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
