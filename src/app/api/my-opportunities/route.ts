import { NextRequest, NextResponse } from "next/server";
import { SAVED_OPPORTUNITIES_STORE } from "@/lib/data/savedStore";
import { SEED_OPPORTUNITIES } from "@/lib/data/seed";
import { UserOpportunityRecord } from "@/types";

export async function GET() {
  const enriched = SAVED_OPPORTUNITIES_STORE.map((record) => {
    const opp = SEED_OPPORTUNITIES.find((o) => o.id === record.opportunityId);
    return {
      ...record,
      opportunity: opp || null,
    };
  });

  return NextResponse.json({
    total: enriched.length,
    myOpportunities: enriched,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { opportunityId, status, notes, nextAction, targetDate } = body;

    if (!opportunityId) {
      return NextResponse.json(
        { error: "opportunityId is required" },
        { status: 400 }
      );
    }

    const existingIndex = SAVED_OPPORTUNITIES_STORE.findIndex(
      (r) => r.opportunityId === opportunityId
    );

    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      // Update existing
      SAVED_OPPORTUNITIES_STORE[existingIndex] = {
        ...SAVED_OPPORTUNITIES_STORE[existingIndex],
        status: status || SAVED_OPPORTUNITIES_STORE[existingIndex].status,
        notes: notes ?? SAVED_OPPORTUNITIES_STORE[existingIndex].notes,
        nextAction: nextAction ?? SAVED_OPPORTUNITIES_STORE[existingIndex].nextAction,
        targetDate: targetDate ?? SAVED_OPPORTUNITIES_STORE[existingIndex].targetDate,
        updatedAt: now,
      };

      return NextResponse.json({
        message: "Updated saved opportunity",
        record: SAVED_OPPORTUNITIES_STORE[existingIndex],
      });
    }

    const newRecord: UserOpportunityRecord = {
      id: `user-opp-${Date.now()}`,
      opportunityId,
      status: status || "discovered",
      notes: notes || "",
      nextAction: nextAction || "Conduct initial 5-question validation interview.",
      targetDate: targetDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      progress: 0,
      experiments: [],
      createdAt: now,
      updatedAt: now,
    };

    SAVED_OPPORTUNITIES_STORE.unshift(newRecord);

    return NextResponse.json({
      message: "Opportunity saved to tracker",
      record: newRecord,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to save opportunity: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
