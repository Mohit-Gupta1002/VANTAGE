import { NextRequest, NextResponse } from "next/server";
import { executeResearchQuery } from "@/lib/research";
import { DomainType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const report = await executeResearchQuery({
      query,
      domain: body.domain as DomainType | undefined,
      deepSynthesize: Boolean(body.deepSynthesize),
    });

    return NextResponse.json({ report });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to execute research synthesis: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
