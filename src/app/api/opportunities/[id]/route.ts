import { NextRequest, NextResponse } from "next/server";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed";
import { DEFAULT_USER_PROFILE } from "@/lib/data/profile";
import { calculatePersonalFit } from "@/lib/scoring";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const opp = SEED_OPPORTUNITIES.find((o) => o.id === id);

  if (!opp) {
    return NextResponse.json(
      { error: `Opportunity with id '${id}' not found` },
      { status: 404 }
    );
  }

  const enriched = {
    ...opp,
    personalFit: calculatePersonalFit(opp, DEFAULT_USER_PROFILE),
  };

  return NextResponse.json({ opportunity: enriched });
}
