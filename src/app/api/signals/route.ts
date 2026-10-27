import { NextRequest, NextResponse } from "next/server";
import { RAW_SIGNALS } from "@/lib/data/seed";
import { DomainType } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain") as DomainType | null;
  const geography = searchParams.get("geography");
  const signalType = searchParams.get("signalType");
  const minEvidence = searchParams.get("minEvidenceQuality");
  const query = searchParams.get("q")?.toLowerCase();

  let signals = [...RAW_SIGNALS];

  if (domain) {
    signals = signals.filter((s) => s.domain === domain);
  }

  if (geography && geography !== "All") {
    signals = signals.filter((s) => s.geography.toLowerCase().includes(geography.toLowerCase()));
  }

  if (signalType && signalType !== "All") {
    signals = signals.filter((s) => s.signalType === signalType);
  }

  if (minEvidence) {
    const min = parseInt(minEvidence, 10);
    if (!isNaN(min)) {
      signals = signals.filter((s) => s.evidenceQuality >= min);
    }
  }

  if (query) {
    signals = signals.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.summary.toLowerCase().includes(query) ||
        s.whyItMatters.toLowerCase().includes(query) ||
        s.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    total: signals.length,
    signals,
    domainsAvailable: Array.from(new Set(RAW_SIGNALS.map((s) => s.domain))),
  });
}
