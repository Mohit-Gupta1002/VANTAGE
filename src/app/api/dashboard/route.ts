import { NextResponse } from "next/server";
import { RAW_SIGNALS, SEED_OPPORTUNITIES, RAW_INTERSECTIONS, RAW_FUTURE_SCENARIOS } from "@/lib/data/seed";
import { DEFAULT_USER_PROFILE } from "@/lib/data/profile";

export async function GET() {
  const dailyBriefing = {
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    headline: "Frontier AI Governance & Behind-The-Meter Energy Inflections Converge",
    summary:
      "Enterprise software transitions toward deterministic autonomous agents face strict EU AI Act compliance deadlines, while power grid interconnection delays drive direct behind-the-meter clean energy partnerships for AI computing clusters.",
    signalCount: RAW_SIGNALS.length,
    highConvictionCount: SEED_OPPORTUNITIES.filter((o) => o.scores.totalOpportunityScore >= 85).length,
    actionItemsCount: 4,
  };

  const actionQueue = [
    {
      id: "act-1",
      priority: "Urgent",
      title: "Run 7-Day Validation for EU AI Act Audit Middleware",
      description: "Map Article 53/55 disclosure checklist and test against 3 open model repos.",
      opportunityId: "opp-001",
      deadline: "2 Days Left",
      status: "In Progress",
    },
    {
      id: "act-2",
      priority: "High",
      title: "Evaluate Spot CAISO Pricing for Carbon-Aware Scheduler",
      description: "Extract negative pricing telemetry to calculate net electricity arbitrage.",
      opportunityId: "opp-002",
      deadline: "5 Days Left",
      status: "Pending",
    },
    {
      id: "act-3",
      priority: "Medium",
      title: "Review M&A Indemnity SEC EDGAR Benchmarks",
      description: "Test clause extraction on 5 public merger agreements.",
      opportunityId: "opp-003",
      deadline: "Next Week",
      status: "Pending",
    },
  ];

  return NextResponse.json({
    dailyBriefing,
    emergingSignals: RAW_SIGNALS.slice(0, 5),
    recommendedOpportunities: SEED_OPPORTUNITIES.slice(0, 3),
    featuredIntersections: RAW_INTERSECTIONS.slice(0, 2),
    actionQueue,
    profileSummary: {
      name: DEFAULT_USER_PROFILE.name,
      role: DEFAULT_USER_PROFILE.role,
      availableHours: DEFAULT_USER_PROFILE.availableHours,
      capitalRange: DEFAULT_USER_PROFILE.capitalRange,
    },
  });
}
