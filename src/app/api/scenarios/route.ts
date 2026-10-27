import { NextRequest, NextResponse } from "next/server";
import { getScenariosForTopic } from "@/lib/research";
import { DomainType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { topic, domain, timeframe } = body;

    let scenarios = getScenariosForTopic(topic, domain as DomainType | undefined);

    if (timeframe && timeframe !== "All") {
      scenarios = scenarios.filter((s) => s.timeframe === timeframe);
    }

    return NextResponse.json({
      total: scenarios.length,
      scenarios,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate scenarios: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
