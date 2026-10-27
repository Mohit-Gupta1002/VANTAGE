import { NextRequest, NextResponse } from "next/server";
import { SAVED_OPPORTUNITIES_STORE } from "@/lib/data/savedStore";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const recordIndex = SAVED_OPPORTUNITIES_STORE.findIndex(
      (r) => r.id === id || r.opportunityId === id
    );

    if (recordIndex === -1) {
      return NextResponse.json(
        { error: `User opportunity record '${id}' not found` },
        { status: 404 }
      );
    }

    const current = SAVED_OPPORTUNITIES_STORE[recordIndex];
    const updated = {
      ...current,
      status: body.status ?? current.status,
      notes: body.notes ?? current.notes,
      nextAction: body.nextAction ?? current.nextAction,
      targetDate: body.targetDate ?? current.targetDate,
      progress: body.progress !== undefined ? Number(body.progress) : current.progress,
      experiments: body.newExperiment
        ? [...current.experiments, { ...body.newExperiment, id: `exp-${Date.now()}` }]
        : current.experiments,
      updatedAt: new Date().toISOString(),
    };

    SAVED_OPPORTUNITIES_STORE[recordIndex] = updated;

    return NextResponse.json({
      message: "Updated successfully",
      record: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update record: " + (error?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
