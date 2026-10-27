import { NextRequest, NextResponse } from "next/server";
import { analyzeDomainIntersection } from "@/lib/research/intersections";
import { DomainType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domainA, domainB, geography, timeHorizon, riskTolerance, capital } = body;

    if (!domainA || !domainB) {
      return NextResponse.json(
        { error: "domainA and domainB are required" },
        { status: 400 }
      );
    }

    const hypothesis = analyzeDomainIntersection(
      domainA as DomainType,
      domainB as DomainType,
      { geography, timeHorizon, riskTolerance, capital }
    );

    return NextResponse.json({ hypothesis });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to compute intersection hypothesis: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
