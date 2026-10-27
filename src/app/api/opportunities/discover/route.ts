import { NextRequest, NextResponse } from "next/server";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed";
import { DEFAULT_USER_PROFILE } from "@/lib/data/profile";
import { calculatePersonalFit } from "@/lib/scoring";
import { OpportunityCategory, DomainType, UserProfile } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { category, domain, geography, timeHorizon, minScore, userProfile } = body;

    const profile: UserProfile = userProfile || DEFAULT_USER_PROFILE;

    let results = SEED_OPPORTUNITIES.map((opp) => ({
      ...opp,
      personalFit: calculatePersonalFit(opp, profile),
    }));

    if (category && category !== "All") {
      results = results.filter((o) => o.category === category);
    }

    if (domain && domain !== "All") {
      results = results.filter((o) => o.domains.includes(domain as DomainType));
    }

    if (geography && geography !== "All") {
      results = results.filter((o) => o.geography.toLowerCase().includes(geography.toLowerCase()));
    }

    if (timeHorizon && timeHorizon !== "All") {
      results = results.filter((o) => o.timeHorizon === timeHorizon);
    }

    if (minScore) {
      results = results.filter((o) => o.scores.totalOpportunityScore >= minScore);
    }

    // Sort by Opportunity Score descending by default
    results.sort((a, b) => b.scores.totalOpportunityScore - a.scores.totalOpportunityScore);

    return NextResponse.json({
      total: results.length,
      opportunities: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to discover opportunities: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
