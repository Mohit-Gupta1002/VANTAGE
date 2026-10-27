import {
  DomainType,
  IntelligenceSignal,
  Opportunity,
  ResearchReport,
  FutureScenario,
} from "@/types";
import {
  RAW_SIGNALS,
  SEED_OPPORTUNITIES,
  RAW_HISTORICAL_EVENTS,
  RAW_FUTURE_SCENARIOS,
} from "../data/seed";
import { analyzeDomainIntersection } from "./intersections";

export interface ResearchQueryParams {
  query: string;
  domain?: DomainType;
  deepSynthesize?: boolean;
}

/**
 * Executes a structured intelligence query across historical data, current signals,
 * cross-domain connections, and future scenarios.
 */
export async function executeResearchQuery(
  params: ResearchQueryParams
): Promise<ResearchReport> {
  const q = params.query.toLowerCase().trim();

  // Find relevant signals
  const matchingSignals = RAW_SIGNALS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      (params.domain && s.domain === params.domain)
  );

  const fallbackSignals = matchingSignals.length > 0 ? matchingSignals : RAW_SIGNALS.slice(0, 3);

  // Find relevant historical events
  const matchingHistory = RAW_HISTORICAL_EVENTS.filter(
    (h) =>
      h.title.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      (params.domain && h.domain === params.domain)
  );

  const histContext =
    matchingHistory.length > 0
      ? matchingHistory.map((h) => `${h.year}: ${h.title} — ${h.impact}`).join("\n\n")
      : "Historical precedents demonstrate that rapid technological or regulatory inflection points trigger capital reallocation, followed by specialized compliance and infrastructure layer consolidation.";

  // Generate cross-domain connection
  const domainA: DomainType = params.domain || "Artificial Intelligence";
  const domainB: DomainType =
    domainA === "Artificial Intelligence" ? "Legaltech & Operations" : "Artificial Intelligence";
  const intersection = analyzeDomainIntersection(domainA, domainB);

  const crossDomainText = [
    `Convergence between ${intersection.domainA} and ${intersection.domainB}:`,
    `- Shift in A: ${intersection.changesInA}`,
    `- Shift in B: ${intersection.changesInB}`,
    `- Unmet Need: ${intersection.emergingUnmetNeed}`,
    `- Rapid Test: ${intersection.cheapTestExperiment}`,
  ];

  const reportId = `rep-${Date.now()}`;
  const title = `Strategic Intelligence Assessment: ${params.query}`;

  const sources = fallbackSignals.map((s) => ({
    title: s.sourceName,
    url: s.sourceUrl,
  }));

  return {
    id: reportId,
    query: params.query,
    title,
    domain: params.domain || "Artificial Intelligence",
    historicalContext: histContext,
    currentSignals: fallbackSignals.map((s) => `[${s.domain}] ${s.title}: ${s.summary}`),
    crossDomainConnections: crossDomainText,
    scenarios: [
      `1-Year Horizon: Initial early-adopter pilot deployments and protocol standardization.`,
      `3-Year Horizon: Regulatory mandates and enterprise ROI pressures enforce consolidation around verified platforms.`,
      `5-Year Horizon: Maturation into standard business infrastructure with established market leaders.`,
    ],
    sources,
    generatedAt: new Date().toISOString(),
    confidence: fallbackSignals.length >= 2 ? "High" : "Medium",
    isDemo: true,
  };
}

/**
 * Returns scenarios for a given topic or domain.
 */
export function getScenariosForTopic(
  topic?: string,
  domain?: DomainType
): FutureScenario[] {
  if (topic) {
    const matched = RAW_FUTURE_SCENARIOS.filter(
      (s) =>
        s.topic.toLowerCase().includes(topic.toLowerCase()) ||
        (domain && s.domain === domain)
    );
    if (matched.length > 0) return matched;
  }
  if (domain) {
    const matched = RAW_FUTURE_SCENARIOS.filter((s) => s.domain === domain);
    if (matched.length > 0) return matched;
  }
  return RAW_FUTURE_SCENARIOS;
}
