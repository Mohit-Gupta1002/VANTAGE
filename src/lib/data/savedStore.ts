import { UserOpportunityRecord } from "@/types";

// In-memory store for API fallback
export const SAVED_OPPORTUNITIES_STORE: UserOpportunityRecord[] = [
  {
    id: "user-opp-1",
    opportunityId: "opp-001",
    status: "validating",
    notes: "Completed initial mapping of EU AI Act Article 53 requirements. Spoke with 2 enterprise CTOs in Berlin who confirmed high willingness to pay for programmatic audits.",
    nextAction: "Build the CLI scanner prototype and test against 3 open model repos.",
    targetDate: "2026-04-15",
    progress: 45,
    experiments: [
      {
        id: "exp-1",
        date: "2026-03-20",
        hypothesis: "Founders are unaware of systemic risk reporting requirements.",
        result: "Confirmed: 4 out of 5 founders surveyed had not read Article 53.",
        learning: "Position the initial hook as a free 'Liability Risk Check' rather than just a compliance tool.",
      },
    ],
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-22T14:30:00Z",
  },
  {
    id: "user-opp-2",
    opportunityId: "opp-002",
    status: "investigating",
    notes: "Reviewing CAISO API documentation for negative wholesale spot electricity intervals.",
    nextAction: "Calculate net cloud egress fees vs local compute electricity savings.",
    targetDate: "2026-04-30",
    progress: 20,
    experiments: [],
    createdAt: "2026-03-18T12:00:00Z",
    updatedAt: "2026-03-18T12:00:00Z",
  },
];
