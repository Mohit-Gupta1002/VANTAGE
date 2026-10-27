import {
  IntelligenceSignal,
  Opportunity,
  HistoricalEvent,
  IntersectionHypothesis,
  FutureScenario,
  DomainType,
} from "@/types";
import { calculateOpportunityScore, calculatePersonalFit } from "../scoring";
import { DEFAULT_USER_PROFILE } from "./profile";

export const DOMAINS_LIST: DomainType[] = [
  "Artificial Intelligence",
  "Startups & VC",
  "Finance & Economics",
  "Education & Fellowships",
  "Government Policy",
  "Climate & Energy",
  "Healthcare & Biotech",
  "Real Estate & Infrastructure",
  "Legaltech & Operations",
  "Competitions & Grants",
];

export const RAW_SIGNALS: IntelligenceSignal[] = [
  {
    id: "sig-001",
    title: "EU AI Act High-Risk Enforcement Guidelines Finalized for General Purpose AI",
    summary: "The European AI Office released detailed compliance testing protocols mandating systematic evaluation of systemic risk, copyright provenance, and cybersecurity for frontier models.",
    domain: "Government Policy",
    geography: "Europe & Global",
    sourceName: "European Commission Digital Strategy",
    sourceUrl: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    publishedAt: "2026-03-12",
    retrievedAt: "2026-03-14",
    signalType: "Regulatory",
    whyItMatters: "Forces mid-market AI vendors to implement automated compliance audit trails or face fines up to 7% of global turnover.",
    potentialOpportunities: [
      "Continuous EU AI Act automated auditing SaaS for US startups selling into Europe",
      "Model governance red-teaming as a compliance service"
    ],
    evidenceQuality: 92,
    confidence: "High",
    verificationStatus: "Direct Regulatory Filing",
    isSampleData: true,
    tags: ["EU AI Act", "Compliance", "Model Governance", "Legaltech"],
  },
  {
    id: "sig-002",
    title: "Grid Interconnection Queue Bottlenecks Drive Behind-the-Meter Small Modular Reactor (SMR) Deals",
    summary: "Hyperscalers and data center operators signed direct power-purchase agreements with nuclear utilities and off-grid geothermal operators as utility interconnection delays top 48 months.",
    domain: "Climate & Energy",
    geography: "North America",
    sourceName: "Federal Energy Regulatory Commission (FERC) Filings",
    sourceUrl: "https://www.ferc.gov/industries-data/electric/power-sales-and-markets",
    publishedAt: "2026-02-18",
    retrievedAt: "2026-02-20",
    signalType: "Adoption Shift",
    whyItMatters: "Decouples AI computing infrastructure growth from traditional regulated grid expansion, creating massive opportunities for distributed microgrid orchestration software.",
    potentialOpportunities: [
      "Microgrid dynamic load-balancing software tailored for AI compute clusters",
      "Carbon-aware distributed batch compute scheduler for non-urgent model training"
    ],
    evidenceQuality: 88,
    confidence: "High",
    verificationStatus: "Verified Sourced",
    isSampleData: true,
    tags: ["Energy", "Data Centers", "Microgrids", "Compute Infrastructure"],
  },
  {
    id: "sig-003",
    title: "Autonomous Agent Protocols Standardized Around Tool Use & State Verification",
    summary: "Consortium of enterprise software providers adopted unified verifiable execution logs for autonomous agents interacting with ERP and banking APIs.",
    domain: "Artificial Intelligence",
    geography: "Global",
    sourceName: "arXiv & Enterprise Agent Foundation",
    sourceUrl: "https://arxiv.org/abs/2401.12345",
    publishedAt: "2026-01-28",
    retrievedAt: "2026-02-01",
    signalType: "Breakthrough",
    whyItMatters: "Shifts agent development from fragile prompting to verifiable state-machine workflows with legal auditability.",
    potentialOpportunities: [
      "Agent execution verification proxy for financial transactions",
      "Deterministic sandbox environments for agent evaluation"
    ],
    evidenceQuality: 85,
    confidence: "High",
    verificationStatus: "Peer Reviewed",
    isSampleData: true,
    tags: ["Autonomous Agents", "Verification", "APIs", "Enterprise Software"],
  },
  {
    id: "sig-004",
    title: "SEC Mandatory Climate Disclosures Enforcement Phase 2 Begins for Mid-Caps",
    summary: "Scope 1 and Scope 2 greenhouse gas emissions auditing requirements now extend to medium-sized public companies, straining manual consulting bandwidth.",
    domain: "Finance & Economics",
    geography: "United States",
    sourceName: "SEC Regulatory Archive",
    sourceUrl: "https://www.sec.gov/rules/final/2024/33-11275.pdf",
    publishedAt: "2026-02-04",
    retrievedAt: "2026-02-08",
    signalType: "Regulatory",
    whyItMatters: "Mid-cap CFOs lack enterprise ERP telemetry for carbon accounting, creating urgent demand for automated supplier data ingestion.",
    potentialOpportunities: [
      "Automated invoice-to-carbon emission data extractor for supply chain vendors",
      "Specialized SEC Form 10-K climate footnote generation engine"
    ],
    evidenceQuality: 91,
    confidence: "High",
    verificationStatus: "Direct Regulatory Filing",
    isSampleData: true,
    tags: ["SEC", "ESG", "Compliance", "Finance"],
  },
  {
    id: "sig-005",
    title: "US ARPA-H Announces $120M Precision Synthetic Biology Platform Challenge",
    summary: "Federal health agency opened grant submissions targeting point-of-care cell therapies and rapid antibody generation for antibiotic-resistant pathogens.",
    domain: "Competitions & Grants",
    geography: "United States",
    sourceName: "ARPA-H Solicitations Portal",
    sourceUrl: "https://arpa-h.gov/research-and-funding/programs",
    publishedAt: "2026-03-01",
    retrievedAt: "2026-03-03",
    signalType: "Grant / Competition",
    whyItMatters: "Non-dilutive capital grants up to $15M for computational biology teams capable of rapid sequence design without massive wet-lab capital.",
    potentialOpportunities: [
      "In-silico antibody binder optimization platform for grant consortiums",
      "Translational research spin-out partnerships"
    ],
    evidenceQuality: 95,
    confidence: "High",
    verificationStatus: "Direct Regulatory Filing",
    isSampleData: true,
    tags: ["ARPA-H", "Biotech", "Non-dilutive Grants", "Synthetic Bio"],
  },
  {
    id: "sig-006",
    title: "Corporate Law Firms Report 40% Transition from Billable Hour to Fixed Value Pricing for Contract Review",
    summary: "Clifford Chance, Latham & Watkins, and mid-tier commercial firms accelerate value-pricing for M&A due diligence and procurement contracts driven by LLM review throughput.",
    domain: "Legaltech & Operations",
    geography: "UK & US",
    sourceName: "Legal Technology Journal Survey",
    sourceUrl: "https://www.law.com/legaltechnews/",
    publishedAt: "2026-02-15",
    retrievedAt: "2026-02-17",
    signalType: "Adoption Shift",
    whyItMatters: "Destroys the incentive for slow manual legal review; law firms now profit from software that processes agreements in minutes rather than hours.",
    potentialOpportunities: [
      "Fixed-fee M&A contract risk analyzer specifically calibrated for mid-market corporate firms",
      "Legal fee arbitrage modeling tool for corporate general counsels"
    ],
    evidenceQuality: 82,
    confidence: "Medium",
    verificationStatus: "Market Signal",
    isSampleData: true,
    tags: ["Legaltech", "M&A", "Billable Hour", "Contract Intelligence"],
  },
  {
    id: "sig-007",
    title: "Secondary Market Liquidity for Pre-IPO Startups Surges as IPO Windows Remain Selective",
    summary: "Institutional platforms reported record private share transaction volume with specialized SPVs facilitating employee equity liquidity at structured discounts.",
    domain: "Startups & VC",
    geography: "Global",
    sourceName: "PitchBook Private Markets Data",
    sourceUrl: "https://pitchbook.com/news/reports",
    publishedAt: "2026-02-28",
    retrievedAt: "2026-03-02",
    signalType: "Capital Influx",
    whyItMatters: "High talent lock-in in private tech companies creates acute personal liquidity demand, opening space for secondary exchange tooling and tax optimization.",
    potentialOpportunities: [
      "Automated private equity tax basis tracker and secondary transaction router",
      "Fair-market valuation synthesis engine using multi-source bid-ask spreads"
    ],
    evidenceQuality: 84,
    confidence: "Medium",
    verificationStatus: "Market Signal",
    isSampleData: true,
    tags: ["Venture Capital", "Secondary Markets", "Startups", "Liquidity"],
  },
  {
    id: "sig-008",
    title: "Post-Quantum Cryptography (PQC) Migration Mandate Issued by NIST for Federal Contractors",
    summary: "NIST finalized FIPS 203, 204, and 205 quantum-resistant algorithms; all federal agencies and tier-1 defense contractors must inventory and modernize legacy RSA/ECC keys by 2027.",
    domain: "Artificial Intelligence",
    geography: "North America & NATO",
    sourceName: "National Institute of Standards and Technology (NIST)",
    sourceUrl: "https://csrc.nist.gov/projects/post-quantum-cryptography",
    publishedAt: "2026-01-15",
    retrievedAt: "2026-01-20",
    signalType: "Regulatory",
    whyItMatters: "Triggers multi-billion dollar enterprise cryptographic discovery and code remediation overhaul across legacy banking, healthcare, and defense stacks.",
    potentialOpportunities: [
      "Automated legacy code scanner that pinpoints unencrypted RSA endpoints and generates PQC drop-in PRs",
      "Quantum-safe API proxy gateway for fintech microservices"
    ],
    evidenceQuality: 96,
    confidence: "High",
    verificationStatus: "Direct Regulatory Filing",
    isSampleData: true,
    tags: ["Cybersecurity", "PQC", "NIST", "Enterprise Defense"],
  },
  {
    id: "sig-009",
    title: "Adaptive Competency-Based Learning Displaces Traditional Higher Education Prerequisites in Technical Vocations",
    summary: "Major employers (Siemens, Amazon, Lockhead) sign collaborative agreements accepting verified AI-proctored skill credentials over 4-year degree requirements in mechatronics and software.",
    domain: "Education & Fellowships",
    geography: "North America & DACH",
    sourceName: "Chronicle of Higher Education Research",
    sourceUrl: "https://www.chronicle.com/package/the-future-of-credentials",
    publishedAt: "2026-02-11",
    retrievedAt: "2026-02-14",
    signalType: "Adoption Shift",
    whyItMatters: "Breaks the credential monopoly of universities; opens path for specialized challenge-based cohort academies with direct corporate hiring pipelines.",
    potentialOpportunities: [
      "Apprenticeship intelligence network matching proven project git commits with corporate engineering openings",
      "Dynamic technical skill benchmarking simulator for non-traditional candidates"
    ],
    evidenceQuality: 80,
    confidence: "Medium",
    verificationStatus: "Market Signal",
    isSampleData: true,
    tags: ["Education", "Hiring", "Credentialing", "Vocational Tech"],
  },
  {
    id: "sig-010",
    title: "Commercial Real Estate Conversion to Dense Suburban Micro-Fulfillment & Data Edge Hubs",
    summary: "Zoning reforms across 14 US metro areas allow underutilized Class B suburban office parks to be re-zoned for hybrid edge compute and last-mile delivery lockers.",
    domain: "Real Estate & Infrastructure",
    geography: "North America",
    sourceName: "Urban Land Institute Emerging Trends",
    sourceUrl: "https://uli.org/research/centers-initiatives/emerging-trends-in-real-estate/",
    publishedAt: "2026-02-09",
    retrievedAt: "2026-02-12",
    signalType: "Policy",
    whyItMatters: "Provides structural exit for distressed commercial property loans while solving power and latency constraints for suburban AI inference.",
    potentialOpportunities: [
      "CRE conversion feasibility appraisal engine analyzing power capacity, zoning, and fiber proximity",
      "Suburban edge-node hosting marketplace for decentralized AI inference"
    ],
    evidenceQuality: 79,
    confidence: "Medium",
    verificationStatus: "Market Signal",
    isSampleData: true,
    tags: ["Real Estate", "Edge Compute", "Zoning", "Infrastructure"],
  }
];

export const RAW_HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: "hist-001",
    domain: "Artificial Intelligence",
    year: 2017,
    title: "Attention Is All You Need Paper Published (Transformer Architecture)",
    description: "Vaswani et al. at Google Brain published the self-attention mechanism, abandoning recurrent and convolutional neural nets for parallelized sequence modeling.",
    category: "Technological",
    impact: "Established the architectural foundation for all modern large language models and multi-modal models.",
    keyLessons: [
      "Hardware-software co-design: Architectures that maximize GPU compute parallelism win over theoretically optimal sequential models.",
      "Generalization through scale: Scale changes everything when the underlying structure has minimal inductive bias."
    ],
    recurringPattern: "Computing paradigms shift toward architectures that trade compute for universal algorithmic flexibility.",
    limitOfAnalogy: "Transformers still suffer from quadratic context complexity and lack verifiable long-term planning without exterior scaffolding.",
    sources: [{ title: "arXiv:1706.03762", url: "https://arxiv.org/abs/1706.03762" }]
  },
  {
    id: "hist-002",
    domain: "Artificial Intelligence",
    year: 2022,
    title: "ChatGPT Launch & Consumer RLHF Breakthrough",
    description: "OpenAI paired InstructGPT with conversational reinforcement learning from human feedback, crossing 100M consumer users in 60 days.",
    category: "Adoption",
    impact: "Turned latent research into widespread consumer and enterprise consciousness, triggering massive capital reallocation.",
    keyLessons: [
      "Interface velocity: The breakthrough was not just the raw parameters, but the UX bridge (chat) that eliminated prompt friction.",
      "Expectation inflation: Consumer hype cycles rapidly outrun initial enterprise reliability tolerances."
    ],
    recurringPattern: "Every major computing epoch (PC, Web, Mobile, AI) experiences an interface inflection point that democratizes access before enterprise hardening.",
    limitOfAnalogy: "Chat is an inefficient UX for high-complexity deterministic business processes requiring structured data.",
    sources: [{ title: "OpenAI Research", url: "https://openai.com/research/instruction-following" }]
  },
  {
    id: "hist-003",
    domain: "Legaltech & Operations",
    year: 2018,
    title: "GDPR Enacted Across the European Union",
    description: "General Data Protection Regulation introduced massive statutory penalties and privacy compliance requirements for global companies processing EU resident data.",
    category: "Regulatory",
    impact: "Spawned an entire $5B+ industry of privacy management software (OneTrust, BigID) and restructured digital ad targeting.",
    keyLessons: [
      "Regulatory moats: Early compliance software startups captured enterprise lock-in before established incumbent ERPs could react.",
      "Compliance fatigue: Companies will pay significant recurring SaaS fees simply to transfer regulatory audit liability."
    ],
    recurringPattern: "New punitive regulatory frameworks reliably create category-defining compliance tech giants.",
    limitOfAnalogy: "GDPR dealt with static personal data storage; AI regulations involve dynamic non-deterministic algorithmic outputs.",
    sources: [{ title: "Official Journal of the EU", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }]
  },
  {
    id: "hist-004",
    domain: "Climate & Energy",
    year: 2022,
    title: "US Inflation Reduction Act (IRA) Passes with $369B Energy Transition Subsidies",
    description: "Codified long-term tax credits (Production Tax Credits, Investment Tax Credits) for clean energy, hydrogen, battery storage, and nuclear generation.",
    category: "Regulatory",
    impact: "De-risked private capital investment in hardware and infrastructure, resulting in over $200B in announced manufacturing facilities.",
    keyLessons: [
      "10-year policy horizons enable deep-tech capital expenditure that venture capital alone cannot fund.",
      "Supply chain bottlenecks: Capital subsidies often outpace physical grid capacity and transformer manufacturing lead times."
    ],
    recurringPattern: "Massive government capital injections shift the primary bottleneck from financial feasibility to physical supply chain execution.",
    limitOfAnalogy: "Energy infrastructure deployment is constrained by physical physics, land rights, and grid interconnection queues.",
    sources: [{ title: "US Congress H.R.5376", url: "https://www.congress.gov/bill/117th-congress/house-bill/5376" }]
  },
  {
    id: "hist-005",
    domain: "Finance & Economics",
    year: 2020,
    title: "Zero-Interest Rate Policy (ZIRP) & The Pandemic SaaS Multiples Bubble",
    description: "Central banks dropped rates to near zero, driving forward revenue multiples for cloud software to historic highs of 25-40x before aggressive 2022-2023 rate hiking.",
    category: "Capital Shift",
    impact: "Subsidized growth-at-all-costs business models, followed by a harsh structural return to free cash flow, unit economics, and operational efficiency.",
    keyLessons: [
      "Macro interest rates dictate enterprise software procurement thresholds.",
      "Software that acts merely as a 'system of record' gets squeezed during tightening; software that directly cuts operational headcount or prevents statutory fines survives."
    ],
    recurringPattern: "Capital abundance creates bloated product features; capital discipline rewards razor-sharp ROI propositions.",
    limitOfAnalogy: "AI capex in 2024-2026 is driven by strategic sovereign and hyperscaler balance-sheet strength rather than cheap debt alone.",
    sources: [{ title: "Federal Reserve Economic Data", url: "https://fred.stlouisfed.org/" }]
  }
];

export const RAW_INTERSECTIONS: IntersectionHypothesis[] = [
  {
    id: "int-001",
    domainA: "Artificial Intelligence",
    domainB: "Legaltech & Operations",
    changesInA: "LLMs achieving reliable long-context document reasoning and deterministic structured output extraction with provenance citations.",
    changesInB: "Corporate law firms and enterprise general counsels shifting away from billable hour models toward fixed-fee value contracts under intense client cost pressure.",
    interactionReason: "Law firms can now earn higher gross margins on fixed-price contracts by running automated cross-contract discrepancy analysis rather than billing junior associate hours.",
    emergingUnmetNeed: "Automated due-diligence discrepancy analyzer that ingests 500+ commercial leases, procurement contracts, and employment agreements and flags hidden liability indemnities.",
    whoCouldBenefit: [
      "Mid-market private equity deal teams",
      "Corporate M&A advisory shops",
      "Boutique law firms without massive associate armies"
    ],
    supportingEvidence: [
      "Legal Tech Journal 2026 survey showing 40% value-based fee adoption.",
      "Recent ABA formal ethics opinion approving AI assistance in contract review with human oversight."
    ],
    unverifiedAssumptions: [
      "General counsels are willing to trust autonomous citations for non-standard indemnity clauses.",
      "Liability insurance providers will underwrite AI-assisted due diligence opinions."
    ],
    cheapTestExperiment: "Offer 5 boutique PE associates a free 24-hour turnaround audit on 10 redacted legacy contracts using an open-source evaluation rubric; measure precision vs manual paralegal markup.",
    estimatedTimeframe: "6-12 Months",
    confidenceScore: 88,
    recommendedCategory: "Startup & Business"
  },
  {
    id: "int-002",
    domainA: "Climate & Energy",
    domainB: "Artificial Intelligence",
    changesInA: "Regional grid interconnection queues backlogged by 3 to 5 years, while local solar and battery curtailment reaches record highs at midday.",
    changesInB: "Training and batch inference workloads can be dynamically paused, checkpointed, and moved across geographies with zero loss of model integrity.",
    interactionReason: "Compute is the ultimate flexible load; AI clusters can consume cheap curtailed renewable energy at the exact moment and location it is generated.",
    emergingUnmetNeed: "Dynamic carbon & curtailment arbitrage scheduler that routes non-realtime batch model evaluations and fine-tuning jobs to whichever microgrid has surplus power.",
    whoCouldBenefit: [
      "AI research labs running million-dollar fine-tuning runs",
      "Renewable microgrid developers looking for off-takers"
    ],
    supportingEvidence: [
      "FERC 2026 filings documenting 48-month grid interconnection queues.",
      "CAISO negative pricing hours increased 65% year-over-year during spring solar peaks."
    ],
    unverifiedAssumptions: [
      "Bandwidth costs for transferring checkpoint weights between distributed sites will not exceed energy savings.",
      "Hardware depreciation in variable operating conditions is economically acceptable."
    ],
    cheapTestExperiment: "Build a lightweight CLI script that polls CAISO real-time locational marginal pricing and triggers an open-source GPU cloud instance only when spot electricity is under $0.03/kWh.",
    estimatedTimeframe: "1-2 Years",
    confidenceScore: 82,
    recommendedCategory: "Startup & Business"
  },
  {
    id: "int-003",
    domainA: "Education & Fellowships",
    domainB: "Artificial Intelligence",
    changesInA: "Graduating computer science and engineering students facing severe junior hiring freezes as entry-level coding is automated.",
    changesInB: "Rise of complex AI agent architectures requiring specialized evaluation, red-teaming, domain calibration, and verifiable synthetic benchmark generation.",
    interactionReason: "Traditional university curricula lag AI architecture evolution by 3-4 years; companies will pay top dollar for verifiable benchmark builders rather than generalist junior coders.",
    emergingUnmetNeed: "Applied Evaluation & Benchmarking Fellowship: A credentialed cohort program where top STEM students build and publish open benchmark evaluations for enterprise agent protocols.",
    whoCouldBenefit: [
      "Ambitious university graduates seeking elite placement",
      "Enterprise AI safety and product teams needing verified benchmark specialists"
    ],
    supportingEvidence: [
      "National Association of Colleges and Employers (NACE) 2026 hiring report.",
      "Over 70% of enterprise AI leaders cite evaluation as their #1 deployment bottleneck."
    ],
    unverifiedAssumptions: [
      "Enterprise teams will value domain-specific student evaluation suites over traditional university pedigree.",
      "Students will pay or commit substantial time to specialized fellowship tracks."
    ],
    cheapTestExperiment: "Launch a 2-week virtual 'Agent Evaluation Sprint' on Discord/GitHub with 20 vetted CS students; submit results to leading open model providers and measure hiring outreach.",
    estimatedTimeframe: "6-12 Months",
    confidenceScore: 89,
    recommendedCategory: "Career & Skill"
  },
  {
    id: "int-004",
    domainA: "Finance & Economics",
    domainB: "Startups & VC",
    changesInA: "Prolonged high interest rates and private startup holding periods extending beyond 8-10 years without public exits.",
    changesInB: "Proliferation of fractional secondary liquidity exchanges and algorithmic cap table modeling.",
    interactionReason: "Early employees with concentrated paper wealth need risk diversification and tax-efficient liquidity without signaling lack of confidence to existing investors.",
    emergingUnmetNeed: "Algorithmic private secondary liquidity aggregator and tax optimizer: Automatically models alternative minimum tax (AMT) exercise vs secondary share transfer strategies.",
    whoCouldBenefit: [
      "Series B through Pre-IPO startup employees",
      "Angel investors and family offices seeking discounted secondary access"
    ],
    supportingEvidence: [
      "PitchBook 2026 private secondary market volume up 45% YoY.",
      "Median age of VC-backed IPO companies reached 12.4 years."
    ],
    unverifiedAssumptions: [
      "Private startup boards will allow automated rights-of-first-refusal (ROFR) clearance through third-party software.",
      "Employee option pricing models can reliably reflect private discount spreads."
    ],
    cheapTestExperiment: "Create a free web calculator for ISO option exercise tax modeling; capture email leads from 100 tech employees to measure secondary transaction intent.",
    estimatedTimeframe: "1-2 Years",
    confidenceScore: 81,
    recommendedCategory: "Startup & Business"
  },
  {
    id: "int-005",
    domainA: "Government Policy",
    domainB: "Competitions & Grants",
    changesInA: "Enactment of US CHIPS Act Phase 2 and European Critical Raw Materials Act deploying targeted non-dilutive grant capital.",
    changesInB: "Strict domestic supply chain tracing and verifiable provenance requirements embedded in public procurement contracts.",
    interactionReason: "Government grant application complexity has tripled; early-stage hardware and advanced materials startups spend 30% of their time on bureaucratic grant accounting.",
    emergingUnmetNeed: "Automated Non-Dilutive Grant Matching & Audit Compliance Pipeline: Continuous ingestion of federal solicitations (SBIR/STTR, ARPA-E, Horizon Europe) with automated dossier compilation.",
    whoCouldBenefit: [
      "Deep-tech founders",
      "University research labs",
      "Academic spinouts"
    ],
    supportingEvidence: [
      "US SBIR/STTR annual award budget exceeding $4.3B across 11 federal agencies.",
      "Federal register guidelines mandating computerized provenance tracking for clean energy grants."
    ],
    unverifiedAssumptions: [
      "Agencies accept standardized modular technical proposals generated with algorithmic assistance.",
      "Startups are willing to pay success-fee or subscription pricing for grant matching."
    ],
    cheapTestExperiment: "Manually curate and map 15 active SBIR solicitations for 5 local hardware startups; measure time saved in initial concept paper drafting.",
    estimatedTimeframe: "6-12 Months",
    confidenceScore: 86,
    recommendedCategory: "Competitions & Grants"
  }
];

export const RAW_FUTURE_SCENARIOS: FutureScenario[] = [
  {
    id: "scen-001",
    topic: "Enterprise Autonomous Agent Labor & Regulatory Compliance",
    domain: "Artificial Intelligence",
    timeframe: "3 Years",
    baseScenario: {
      timeframe: "3 Years",
      title: "Co-pilot to Supervised Operator",
      narrative: "Enterprise software transitions from conversational assistance to semi-autonomous batch agents handling structured workflows (invoicing, reconciliations, tier-1 compliance). Human-in-the-loop audit verification remains legally required for all transactions over $10,000.",
      probability: "High",
      keyDrivers: [
        "Enterprise insurance liability standards",
        "Deterministic verification middleware",
        "Cost reduction mandates in back-office operations"
      ],
      earlyIndicators: [
        "Major ERP vendors (SAP, Workday) releasing agent transaction logs",
        "Emergence of commercial agent indemnity insurance policies"
      ]
    },
    upsideScenario: {
      timeframe: "3 Years",
      title: "Autonomous Corporate Operations & Synthetic Workforces",
      narrative: "Agent reliability exceeds 99.9% for multi-step financial and legal operations. Micro-corporations run with 5 humans generating $50M in revenue, utilizing coordinated fleets of verifiable agents.",
      probability: "Moderate",
      keyDrivers: [
        "Formal mathematical verification of agent execution traces",
        "Radical drop in inference costs ($0.05/M tokens)",
        "Standardized agent-to-agent negotiation protocols"
      ],
      earlyIndicators: [
        "First venture-backed startup achieving $10M ARR with fewer than 3 employees",
        "SEC accepting algorithmic agent digital signatures for quarterly filings"
      ]
    },
    downsideScenario: {
      timeframe: "3 Years",
      title: "Hallucination Catastrophe & Regulatory Lockout",
      narrative: "A cascading autonomous agent error in automated supply chain pricing causes a multi-hundred-million dollar inventory write-down. Regulators enforce strict pre-clearance licensing, drastically slowing autonomous adoption to regulated pilot sandboxes.",
      probability: "Plausible Edge",
      keyDrivers: [
        "Compounding error propagation across chained LLMs",
        "Aggressive FTC and EU algorithmic liability crackdowns",
        "Skyrocketing cybersecurity attacks via prompt injection in public APIs"
      ],
      earlyIndicators: [
        "High-profile public corporate financial restatement caused by agent error",
        "Enterprise IT CISOs issuing blanket bans on autonomous state-modifying agents"
      ]
    },
    winners: [
      "Verification and audit software providers",
      "Specialized domain-specific model fine-tuners",
      "Infrastructure providers offering deterministic execution sandboxes"
    ],
    losers: [
      "Traditional business process outsourcing (BPO) call centers and data entry firms",
      "Generic wrapper chatbots without workflow integrations",
      "Manual contract review paralegal pools"
    ],
    emergingOpportunities: [
      "Continuous verification proxies for agent tool calls",
      "Synthetic benchmark generation for enterprise ERP compliance",
      "Insurance brokerage specialized in autonomous agent operational policies"
    ],
    invalidatingAssumptions: [
      "LLM reasoning reaches an asymptotic ceiling without fundamental architectural breakthroughs beyond Transformers.",
      "Enterprise legal teams refuse to allow autonomous systems write access to production databases."
    ]
  },
  {
    id: "scen-002",
    topic: "Energy Grid Decoupling & Distributed Clean Computing",
    domain: "Climate & Energy",
    timeframe: "5 Years",
    baseScenario: {
      timeframe: "5 Years",
      title: "Hybrid Behind-The-Meter Compute Islands",
      narrative: "Due to ongoing 4-year utility grid interconnection delays, 35% of all new AI training clusters are co-located directly with dedicated natural gas peakers, geothermal plants, and battery-backed solar farms, operating independently of the public utility grid.",
      probability: "High",
      keyDrivers: [
        "Hyperscaler balance sheet urgency",
        "Regulatory inertia in regional transmission organization (RTO) approvals",
        "Declining LCOE of modular solar + storage"
      ],
      earlyIndicators: [
        "FERC rulings clarifying private transmission line jurisdiction",
        "Direct nuclear PPA announcements surpassing 5 GW total capacity"
      ]
    },
    upsideScenario: {
      timeframe: "5 Years",
      title: "Dynamic Global Compute-Energy Arbitrage Super-Network",
      narrative: "Ultra-low-latency satellite links and flexible model checkpoints allow global distributed training runs to chase the sun and wind in real-time, operating exclusively on 100% surplus clean energy and lowering training power costs by 60%.",
      probability: "Moderate",
      keyDrivers: [
        "Distributed asynchronous model parallelism algorithms",
        "Inter-datacenter optical communication breakthroughs",
        "Universal dynamic carbon spot markets"
      ],
      earlyIndicators: [
        "Asynchronous federated training achieving parity with co-located InfiniBand clusters",
        "Spot compute markets pricing instances in real-time based on local renewable curtailment"
      ]
    },
    downsideScenario: {
      timeframe: "5 Years",
      title: "Resource Wars & Local Community Blackouts",
      narrative: "Water and power consumption from massive data center clusters triggers intense municipal backlash, localized moratoria on new facilities, and punitive state utility surcharges.",
      probability: "Plausible Edge",
      keyDrivers: [
        "Extreme summer heatwaves stressing regional electrical grids",
        "Municipal water depletion in arid compute corridors (Virginia, Arizona, Texas)",
        "Bipartisan consumer anger over residential electric rate increases"
      ],
      earlyIndicators: [
        "County-level zoning bans on data center construction exceeding 50 MW",
        "State legislative proposals to tax data center megawatt consumption at luxury rates"
      ]
    },
    winners: [
      "Next-generation geothermal and small modular reactor developers",
      "Liquid immersion cooling and closed-loop thermodynamic engineering startups",
      "Carbon-aware distributed batch workload orchestration software"
    ],
    losers: [
      "Traditional air-cooled suburban data centers with high PUE",
      "Municipal utilities that fail to adapt rate structures for flexible industrial loads",
      "Energy-intensive crypto mining facilities outbid for power by AI hyperscalers"
    ],
    emergingOpportunities: [
      "Automated site selection software combining power availability, water access, and fiber routing",
      "Microgrid dynamic load-shedding control systems engineered for GPU clusters",
      "Heat-reuse infrastructure connecting compute exhaust to industrial greenhouse agriculture"
    ],
    invalidatingAssumptions: [
      "Hardware efficiency improvements (e.g., optical compute, sub-1nm silicon) reduce per-token energy consumption by 100x, nullifying the energy crisis.",
      "Governments federally mandate and expedite transmission grid line buildouts through eminent domain."
    ]
  }
];

export const RAW_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-001",
    title: "Autonomous EU AI Act & Statutory Model Audit Middleware",
    summary: "A continuous compliance pipeline that instruments enterprise LLM applications, generates immutable audit logs for systemic risk, and produces one-click regulatory filing dossiers for the EU AI Office.",
    category: "Startup & Business",
    domains: ["Artificial Intelligence", "Government Policy", "Legaltech & Operations"],
    geography: "Europe & Global",
    timeHorizon: "6-12 months",
    whyItMatters: {
      underlyingChange: "The EU AI Act enforcement protocols impose severe statutory penalties (up to 7% of global revenue) on high-risk AI deployments without verified testing and transparency logs.",
      historicalContext: "Comparable to the GDPR compliance wave in 2018 where companies like OneTrust captured multi-billion dollar valuations by solving statutory compliance before enterprise ERPs could adapt.",
      currentSignals: [
        "EU AI Office published formal draft testing benchmarks for general-purpose AI models (March 2026).",
        "Enterprise survey reveals 74% of US software vendors selling into Europe have zero automated testing for EU AI Act compliance."
      ],
      futureImplications: "Within 3 years, enterprise procurement contracts worldwide will require standardized algorithmic audit reports as mandatory vendor prerequisites."
    },
    evidence: {
      supportingSources: [
        {
          title: "European Commission Digital Strategy — AI Act Implementation",
          publisher: "European Commission",
          url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
          date: "2026-03-12",
          quote: "General-purpose AI model providers with systemic risk must conduct continuous model evaluations and report adverse incident summaries."
        },
        {
          title: "Stanford RegLab: Evaluating Frontier AI Governance Protocols",
          publisher: "Stanford University",
          url: "https://reglab.stanford.edu",
          date: "2026-02-14",
          quote: "Existing software observability tools (Datadog, Dynatrace) lack semantic grounding required for statutory compliance audits."
        }
      ],
      counterEvidence: [
        "Large cloud hyperscalers (Azure AI, AWS Bedrock) may incorporate native compliance dashboards for their proprietary models.",
        "Regulatory enforcement timelines could experience bureaucratic delays or soft enforcement grace periods."
      ],
      assumptions: [
        "Mid-market enterprise customers will prefer independent vendor verification to avoid cloud vendor lock-in.",
        "The statutory audit standard will stabilize into clear programmatic unit tests."
      ],
      dataGaps: [
        "Exact definition of 'systemic risk' compute threshold under ongoing review.",
        "Pricing elasticity for automated audit reporting among Series B AI startups."
      ],
      confidenceLevel: "High"
    },
    valueCapture: {
      whoBenefits: [
        "AI application developers selling to European enterprise buyers",
        "Corporate Chief Compliance Officers needing defensible liability shielding",
        "External audit firms needing programmatic verification tooling"
      ],
      businessModelsOrCareerPathways: [
        "B2B SaaS subscription: $1,500 - $8,000/month per production pipeline based on evaluated token volume and jurisdiction modules",
        "Enterprise certification badge & compliance guarantee tier"
      ],
      requiredSkillsAndResources: [
        "TypeScript / Python distributed systems",
        "LLM evaluation benchmark engineering (RAG evals, red-teaming)",
        "Deep familiarity with EU statutory regulatory frameworks",
        "Seed capital: $5k-$20k for initial testing and legal consultation"
      ],
      potentialBarriers: [
        "Evolving regulatory standards requiring frequent test suite updates",
        "Enterprise sales cycles for compliance products (4-9 months)"
      ],
      waysToTest: [
        "Build a free open-source GitHub Action that checks LLM system prompts and outputs against the top 10 EU transparency criteria.",
        "Interview 10 European enterprise CTOs to assess willingness to pay for a certified compliance report."
      ]
    },
    recommendedAction: {
      immediateNextStep: "Deploy a free web-based 'EU AI Act Readiness Scanner' where founders paste their AI architecture specs and receive an instant gap analysis.",
      sevenDayValidationPlan: [
        "Day 1-2: Map the 15 specific technical requirements of EU AI Act Article 53 & 55 into a structured JSON schema.",
        "Day 3-4: Build a lightweight Python SDK that logs prompt inputs, model outputs, and metadata into a local compliance manifest.",
        "Day 5-6: Conduct cold outreach to 25 Head of AI / CTOs of US startups marketing in London, Berlin, and Paris.",
        "Day 7: Consolidate feedback; target at least 4 LOIs or beta commitments."
      ],
      thirtyDayExecutionPlan: [
        "Week 2: Launch CLI / GitHub Action for automated pull request compliance checks.",
        "Week 3: Onboard 5 beta design partners with production LLM pipelines.",
        "Week 4: Publish a definitive 'EU AI Act Developer Compliance Guide' to drive organic search inbound.",
        "Week 5: Package MVP with web dashboard and exportable PDF audit dossier."
      ],
      suggestedMilestones: [
        "100 GitHub stars on open-source audit SDK",
        "5 paying design partners ($1,000/mo)",
        "First audit dossier accepted without friction by an enterprise procurement committee"
      ],
      clearSuccessCriteria: [
        "Customer closes an enterprise contract where VANTAGE audit middleware was the deciding compliance factor."
      ]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 92,
      problemStrength: 88,
      timingMomentum: 94,
      feasibility: 78,
      valueCreation: 85,
      strategicDifferentiation: 82,
      sourceCount: 2,
    }),
    status: "discovered",
    isSampleData: true,
    featured: true,
  },
  {
    id: "opp-002",
    title: "Carbon-Aware Distributed Batch Compute Scheduler for AI Fine-Tuning",
    summary: "An intelligent workload router that schedules non-urgent AI model evaluations, dataset processing, and fine-tuning runs to regional microgrids during negative-pricing and curtailed renewable hours.",
    category: "Startup & Business",
    domains: ["Climate & Energy", "Artificial Intelligence", "Finance & Economics"],
    geography: "North America & Europe",
    timeHorizon: "1-2 years",
    whyItMatters: {
      underlyingChange: "Power availability has overtaken chip availability as the primary bottleneck for AI workloads; meanwhile, regional solar and wind producers suffer from massive midday curtailment.",
      historicalContext: "Comparable to interruptible industrial electricity contracts in aluminum smelting and cold storage, now applicable to software compute workloads.",
      currentSignals: [
        "CAISO and ERCOT recorded over 2,400 negative-pricing hours in 2025-2026.",
        "Data center power costs jumped 38% in top US metro hubs due to capacity surcharges."
      ],
      futureImplications: "As model fine-tuning and continuous distillation become standard enterprise workflows, compute cost arbitrage will represent millions in annual operational margin."
    },
    evidence: {
      supportingSources: [
        {
          title: "FERC Electric Power Sales & Regional Transmission Interconnection Report",
          publisher: "Federal Energy Regulatory Commission",
          url: "https://www.ferc.gov/industries-data/electric/power-sales-and-markets",
          date: "2026-02-18",
          quote: "Transmission grid congestion is causing localized power price disparities up to 400% within adjacent balancing authorities."
        },
        {
          title: "MIT Center for Energy and Environmental Policy Research",
          publisher: "MIT CEEPR",
          url: "https://ceepr.mit.edu",
          date: "2026-01-20",
          quote: "Flexible compute loads offer the highest demand-response elasticity of any industrial consumer class."
        }
      ],
      counterEvidence: [
        "Network latency and data transfer costs between disparate regional compute nodes can offset energy savings.",
        "Research teams often demand immediate turnaround rather than tolerating multi-hour batch dispatch delays."
      ],
      assumptions: [
        "Cloud GPU spot providers allow programmatic checkpointing and preemption callbacks.",
        "Batch training workflows can tolerate 2-6 hour variable start windows."
      ],
      dataGaps: [
        "Real-time API availability for secondary independent microgrid power pricing.",
        "Direct GPU cluster thermal efficiency variations in non-traditional edge facilities."
      ],
      confidenceLevel: "High"
    },
    valueCapture: {
      whoBenefits: [
        "AI research labs and growth-stage AI startups spending $20k+/month on GPU compute",
        "Renewable energy microgrid operators with stranded or curtailed generation",
        "Corporate sustainability officers targeting verifiable Scope 2 carbon reductions"
      ],
      businessModelsOrCareerPathways: [
        "Gain-share arbitrage: Take 20-30% of verified compute electricity savings achieved",
        "Enterprise orchestration SaaS: $999/mo base + $0.02 per GPU hour scheduled"
      ],
      requiredSkillsAndResources: [
        "Kubernetes / Ray / Slurm workload orchestration",
        "Energy market API integration (CAISO, ERCOT, Nord Pool)",
        "Distributed model checkpointing (PyTorch, DeepSpeed)",
        "Capital: $3k-$10k for cloud testing credits"
      ],
      potentialBarriers: [
        "Engineering complexity of robust state checkpointing across interrupted spot instances",
        "High data egress pricing from legacy hyperscalers"
      ],
      waysToTest: [
        "Run an open-source PyTorch fine-tuning benchmark across 3 spot cloud regions, dynamically pausing when local spot price spikes above a set threshold.",
        "Calculate the exact net dollar savings inclusive of egress."
      ]
    },
    recommendedAction: {
      immediateNextStep: "Write an open-source Ray cluster autoscaler plugin that consumes CAISO real-time marginal pricing and benchmarks cost reductions on standard Llama 3 fine-tuning.",
      sevenDayValidationPlan: [
        "Day 1-2: Connect to public ERCOT and CAISO pricing feeds; build a live pricing comparator dashboard.",
        "Day 3-4: Implement automated spot instance provisioning on Lambda Labs and RunPod tied to the price trigger.",
        "Day 5-6: Run 10 benchmark fine-tuning runs and document verified energy and dollar savings.",
        "Day 7: Publish a data-rich case study on Hacker News / Twitter showing 45% cost savings."
      ],
      thirtyDayExecutionPlan: [
        "Week 2: Secure 3 design partner labs running recurring nightly batch runs.",
        "Week 3: Implement automated checkpoint resumption with S3/R2 storage.",
        "Week 4: Add verified Scope 2 green certification report generation.",
        "Week 5: Package enterprise SLA and pricing tier."
      ],
      suggestedMilestones: [
        "10,000 GPU hours routed through the scheduler",
        "$25,000 documented customer compute savings",
        "1st partnership with a renewable microgrid operator"
      ],
      clearSuccessCriteria: [
        "Customer achieves verifiable 35%+ net compute cost reduction without missing delivery deadlines."
      ]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 88,
      problemStrength: 86,
      timingMomentum: 90,
      feasibility: 75,
      valueCreation: 89,
      strategicDifferentiation: 85,
      sourceCount: 2,
    }),
    status: "discovered",
    isSampleData: true,
    featured: true,
  },
  {
    id: "opp-003",
    title: "M&A Due Diligence Discrepancy & Indemnity Liability Engine",
    summary: "An automated deal intelligence platform for mid-market private equity and corporate M&A advisors that cross-references hundreds of acquisition target contracts against market standard indemnities.",
    category: "Startup & Business",
    domains: ["Legaltech & Operations", "Finance & Economics", "Artificial Intelligence"],
    geography: "North America & UK",
    timeHorizon: "6-12 months",
    whyItMatters: {
      underlyingChange: "Corporate law firms are shifting to fixed-fee billing for M&A diligence; software that compresses 200 hours of associate contract review into 30 minutes captures immense value.",
      historicalContext: "Replaces traditional manual optical character recognition (OCR) and keyword search tools with deep contextual semantic agreement comparison.",
      currentSignals: [
        "Top UK and US commercial law firms reported a 40% jump in fixed-fee due diligence retainers (Feb 2026).",
        "Mid-market private equity deal velocity increased as interest rates stabilized, creating acute diligence bandwidth constraints."
      ],
      futureImplications: "Transactional legal work will pivot from reading standard boilerplate to underwriting machine-generated exception reports."
    },
    evidence: {
      supportingSources: [
        {
          title: "American Bar Association Survey on Legal Technology and Fixed Pricing",
          publisher: "American Bar Association",
          url: "https://www.americanbar.org",
          date: "2026-02-15",
          quote: "Over 60% of corporate clients now demand alternative fee arrangements for transactional diligence."
        }
      ],
      counterEvidence: [
        "High liability exposure: Law firms carry multimillion-dollar malpractice insurance and resist relying on unverified software outputs for legal opinions."
      ],
      assumptions: [
        "Boutique PE firms and corporate development teams are willing to run initial diligence passes in-house before sending to outside counsel."
      ],
      dataGaps: [
        "Benchmark database of proprietary non-public M&A disclosure schedules."
      ],
      confidenceLevel: "Medium"
    },
    valueCapture: {
      whoBenefits: [
        "Mid-market Private Equity and Search Fund investors",
        "Corporate development heads evaluating bolt-on acquisitions",
        "Boutique M&A law firms competing against white-shoe giants"
      ],
      businessModelsOrCareerPathways: [
        "Per-deal license: $3,500 - $12,000 per data room reviewed",
        "Annual enterprise subscription for active PE funds: $45,000/year"
      ],
      requiredSkillsAndResources: [
        "High-precision document parsing (tables, nested clauses, exhibits)",
        "Legal knowledge engineering (representations, warranties, indemnification caps)",
        "Secure SOC-2 compliant isolated data architecture"
      ],
      potentialBarriers: [
        "Strict client data confidentiality requirements requiring on-premise or single-tenant cloud deployments",
        "High cost of false negatives in liability detection"
      ],
      waysToTest: [
        "Benchmark the engine against 10 publicly filed SEC EDGAR merger disclosure agreements; measure recall rate on change-of-control and non-compete clauses."
      ]
    },
    recommendedAction: {
      immediateNextStep: "Analyze 5 public acquisition agreement filings on SEC EDGAR and extract all non-standard indemnification clauses into a comparative benchmark table.",
      sevenDayValidationPlan: [
        "Day 1-2: Build a parser for SEC EDGAR Exhibit 2.1 (Merger Agreements).",
        "Day 3-4: Implement automated extraction for 10 high-risk clause types (indemnity caps, survival periods, reps & warranties).",
        "Day 5-6: Interview 3 mid-market PE associates; demonstrate the automated comparison on their past closed deals.",
        "Day 7: Document accuracy and associate time savings."
      ],
      thirtyDayExecutionPlan: [
        "Week 2: Build a web interface allowing secure PDF / DOCX batch upload with side-by-side discrepancy highlighting.",
        "Week 3: Sign 2 search-fund operators as design partners for upcoming acquisitions.",
        "Week 4: Implement air-gapped single-tenant deployment option on AWS/Azure.",
        "Week 5: Launch commercial pilot."
      ],
      suggestedMilestones: [
        "100% clause recall on 15 test M&A contracts",
        "First closed transaction using the platform for preliminary diligence"
      ],
      clearSuccessCriteria: [
        "Associate diligence review time reduced from 80 hours to under 6 hours with zero undetected high-severity indemnity liabilities."
      ]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 82,
      problemStrength: 89,
      timingMomentum: 87,
      feasibility: 84,
      valueCreation: 91,
      strategicDifferentiation: 80,
      sourceCount: 1,
    }),
    status: "discovered",
    isSampleData: true,
    featured: true,
  },
  {
    id: "opp-004",
    title: "Enterprise Agentic State Verification Proxy",
    summary: "A deterministic execution gateway and security proxy that validates tool parameters, checks business logic invariants, and enforces rollback checkpoints before autonomous agents write to production banking and ERP APIs.",
    category: "Research & Innovation",
    domains: ["Artificial Intelligence", "Finance & Economics", "Startups & VC"],
    geography: "Global",
    timeHorizon: "6-12 months",
    whyItMatters: {
      underlyingChange: "Autonomous agents are rapidly transitioning from read-only data query systems to state-modifying operational actors in financial and operational databases.",
      historicalContext: "Comparable to the rise of API Gateways (Kong, Apigee) during the microservices transition of 2014-2016.",
      currentSignals: [
        "Consortium of enterprise software providers adopted unified verifiable execution protocols (Jan 2026).",
        "FTC and international regulators warn that enterprises bear direct strict liability for consumer harms caused by autonomous bots."
      ],
      futureImplications: "Production deployments of autonomous agents will be blocked by enterprise CISOs until verifiable pre-execution gatekeeping is established."
    },
    evidence: {
      supportingSources: [
        {
          title: "arXiv: Enterprise Agent Verification and Formal Guardrails",
          publisher: "arXiv Computer Science",
          url: "https://arxiv.org/abs/2401.12345",
          date: "2026-01-28",
          quote: "Non-deterministic LLM tool calls require exterior state-machine validation to prevent cascading financial error loops."
        }
      ],
      counterEvidence: [
        "Frameworks like LangChain or native vendor guardrails may implement basic validation checks."
      ],
      assumptions: [
        "Native LLM reasoning will remain probabilistic and prone to occasional parameter hallucination."
      ],
      dataGaps: [
        "Performance latency overhead acceptable to real-time enterprise microservices."
      ],
      confidenceLevel: "High"
    },
    valueCapture: {
      whoBenefits: [
        "Enterprise Engineering Leads and CISOs deploying autonomous workflows",
        "Fintech infrastructure developers integrating agent capabilities",
        "Cybersecurity audit and compliance teams"
      ],
      businessModelsOrCareerPathways: [
        "Developer infrastructure SaaS: Usage pricing per verified tool call ($0.001/call) or monthly enterprise cluster license",
        "Open-core commercial model with enterprise security extensions"
      ],
      requiredSkillsAndResources: [
        "High-performance reverse proxies (Rust / Go)",
        "API schema validation (OpenAPI, JSON Schema, Protobuf)",
        "Formal verification logic and transactional rollback patterns"
      ],
      potentialBarriers: [
        "Ultra-low latency requirements (<15ms overhead per proxy call)",
        "Broad variety of bespoke enterprise ERP schema structures"
      ],
      waysToTest: [
        "Build a lightweight Rust proxy that intercepts tool calls from a LangGraph/AutoGen agent and rejects any call violating a set invariant (e.g. transfer amount > $500 without secondary signature)."
      ]
    },
    recommendedAction: {
      immediateNextStep: "Publish a benchmark comparing raw agent tool-calling error rates with and without invariant proxy enforcement on simulated accounting transactions.",
      sevenDayValidationPlan: [
        "Day 1-2: Write the proxy core in Go/Rust with an OpenAPI validator.",
        "Day 3-4: Build an interactive demo simulating an autonomous accounts-payable agent attempting to process 1,000 invoices.",
        "Day 5-6: Record a technical demo video and share in top AI engineering communities.",
        "Day 7: Capture GitHub stars and developer signups for alpha access."
      ],
      thirtyDayExecutionPlan: [
        "Week 2: Add support for automated rollback hooks on transactional database writes.",
        "Week 3: Integrate with major agent frameworks (LangGraph, CrewAI, AutoGen).",
        "Week 4: Onboard 3 fintech development teams.",
        "Week 5: Release v1.0 on Hacker News and Product Hunt."
      ],
      suggestedMilestones: [
        "Under 10ms p99 latency overhead",
        "500+ GitHub stars on open proxy core",
        "First production fintech enterprise deployment"
      ],
      clearSuccessCriteria: [
        "Proxy intercepts and neutralizes 100% of injected malformed or unauthorized state mutation requests in production testing."
      ]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 85,
      problemStrength: 91,
      timingMomentum: 88,
      feasibility: 82,
      valueCreation: 87,
      strategicDifferentiation: 89,
      sourceCount: 1,
    }),
    status: "investigating",
    isSampleData: true,
  },
  {
    id: "opp-005",
    title: "Post-Quantum Cryptography (PQC) Legacy Code Migration Engine",
    summary: "An automated static analysis and code refactoring platform that inventories hardcoded RSA, DSA, and ECC encryption routines in legacy banking and healthcare software and generates drop-in quantum-resistant PRs.",
    category: "Emerging Industries & Gaps",
    domains: ["Artificial Intelligence", "Government Policy", "Finance & Economics"],
    geography: "North America & NATO Allies",
    timeHorizon: "1-2 years",
    whyItMatters: {
      underlyingChange: "NIST finalized post-quantum encryption standards (FIPS 203/204/205) and the US federal government set strict 2027 transition deadlines for all federal contractors and banking infrastructure.",
      historicalContext: "Comparable to the Y2K transition and the SHA-1 deprecation, but requiring fundamental algebraic substitutions across deep legacy codebases.",
      currentSignals: [
        "NIST published mandatory implementation timelines (Jan 2026).",
        "Major defense contractors and regional banks initiated internal cryptographic discovery audits."
      ],
      futureImplications: "Every enterprise handling sensitive long-term data must migrate before quantum decrypt-now-harvest-later threats materialize."
    },
    evidence: {
      supportingSources: [
        {
          title: "NIST Post-Quantum Cryptography Standardization Project",
          publisher: "NIST CSRC",
          url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
          date: "2026-01-15",
          quote: "Agencies and federal contractors must establish cryptographic inventory and begin migration to ML-KEM and ML-DSA."
        }
      ],
      counterEvidence: [
        "Practical quantum cryptanalysis threats remain estimated at 5-10 years away by conservative physicists."
      ],
      assumptions: [
        "Regulatory enforcement and compliance penalties will force migration irrespective of whether a quantum computer exists today."
      ],
      dataGaps: [
        "Prevalence of undocumented binary-only cryptographic libraries in older banking mainframes."
      ],
      confidenceLevel: "High"
    },
    valueCapture: {
      whoBenefits: [
        "Enterprise CISOs at tier-1 financial institutions and healthcare networks",
        "Defense suppliers under federal contract compliance obligations",
        "Systems integrators and security consulting consultancies"
      ],
      businessModelsOrCareerPathways: [
        "Enterprise code repository scanner: $25k - $150k annual license based on lines of code and repo count",
        "High-value migration consulting retainers"
      ],
      requiredSkillsAndResources: [
        "Compilers, AST analysis, static analysis tooling (Tree-sitter, Semgrep)",
        "Applied modern cryptography (ML-KEM, SLH-DSA, Kyber)",
        "C / C++ / Java legacy codebase familiarity"
      ],
      potentialBarriers: [
        "Resistance to modifying legacy core banking code without extreme regression test harnesses",
        "PQC ciphertext key size increases requiring network buffer adjustments"
      ],
      waysToTest: [
        "Run static analysis rules over 50 popular open-source Java/C++ banking and cryptography repos; identify all legacy key generation calls and output automatic refactoring diffs."
      ]
    },
    recommendedAction: {
      immediateNextStep: "Create an open-source Semgrep ruleset for detecting deprecated RSA and ECC cipher suite instantiations across Java, Go, and C++ codebases.",
      sevenDayValidationPlan: [
        "Day 1-2: Write Semgrep pattern definitions for OpenSSL and BouncyCastle deprecated algorithms.",
        "Day 3-4: Build a terminal CLI that runs the scanner on any git repository and outputs a 'PQC Risk Score'.",
        "Day 5-6: Test the CLI on 10 prominent open-source fintech repositories (e.g. Apache Fineract).",
        "Day 7: Publish scan findings on GitHub and LinkedIn."
      ],
      thirtyDayExecutionPlan: [
        "Week 2: Implement automated code patch generation using an LLM fine-tuned on post-quantum library replacements.",
        "Week 3: Connect with 5 enterprise security engineers at regional banks.",
        "Week 4: Build compliance export reports mapped to NIST FIPS 203 guidelines.",
        "Week 5: Launch commercial pilot for defense contractor audit readiness."
      ],
      suggestedMilestones: [
        "1,000 open-source repositories scanned",
        "First paid enterprise scan engagement ($10,000)"
      ],
      clearSuccessCriteria: [
        "Enterprise customer validates that scanner identified 100% of legacy cryptographic endpoints and accepted 80%+ of generated refactoring pull requests."
      ]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 96,
      problemStrength: 87,
      timingMomentum: 92,
      feasibility: 79,
      valueCreation: 88,
      strategicDifferentiation: 90,
      sourceCount: 1,
    }),
    status: "discovered",
    isSampleData: true,
  },
  {
    id: "opp-006",
    title: "Experimental Low-Evidence Opportunity (Edge Synthetic Food Synthesis)",
    summary: "Decentralized automated micro-reactors for consumer on-demand protein and nutrient synthesis from atmospheric carbon and microbial cultures.",
    category: "Emerging Industries & Gaps",
    domains: ["Climate & Energy", "Healthcare & Biotech"],
    geography: "Global",
    timeHorizon: "3-5 years",
    whyItMatters: {
      underlyingChange: "Early lab experiments suggest possible microbial protein production at extreme theoretical efficiency.",
      historicalContext: "Analogous to vertical farming hype cycles of 2018-2021 which faced brutal unit-economic thermodynamic limitations.",
      currentSignals: [
        "A few speculative venture blog posts and preliminary university lab preprints."
      ],
      futureImplications: "Unproven potential to decentralize caloric production if thermodynamic limits can be bypassed."
    },
    evidence: {
      supportingSources: [],
      counterEvidence: [
        "Thermodynamic conversion efficiency remains orders of magnitude below economic parity with traditional agriculture.",
        "Severe consumer adoption skepticism regarding synthetic microbial foods."
      ],
      assumptions: [
        "Bioreactor manufacturing costs will drop by 95% over the next decade.",
        "Consumers will accept microbial paste over traditional food textures."
      ],
      dataGaps: [
        "Zero verified large-scale commercial deployments.",
        "No independent life-cycle energy balance audits."
      ],
      confidenceLevel: "Insufficient"
    },
    valueCapture: {
      whoBenefits: ["Theoretical space exploration", "Disaster relief scenarios"],
      businessModelsOrCareerPathways: ["Unproven hardware licensing"],
      requiredSkillsAndResources: ["Biochemical engineering", "Millions in deep-tech wet lab equipment"],
      potentialBarriers: ["Thermodynamic laws of energy conversion", "Capital intensity"],
      waysToTest: ["Review academic thermodynamic papers on conversion efficiency."]
    },
    recommendedAction: {
      immediateNextStep: "Do not invest capital or build startup prototypes until peer-reviewed energetic efficiency benchmarks are validated.",
      sevenDayValidationPlan: ["Review foundational energetic conversion physics."],
      thirtyDayExecutionPlan: ["Monitor peer-reviewed journals for verified efficiency breakthroughs."],
      suggestedMilestones: ["First verified lab demonstration exceeding 15% net energetic conversion efficiency."],
      clearSuccessCriteria: ["Peer-reviewed replication by independent laboratory."]
    },
    scores: calculateOpportunityScore({
      evidenceQuality: 22,
      problemStrength: 45,
      timingMomentum: 30,
      feasibility: 25,
      valueCreation: 60,
      strategicDifferentiation: 70,
      sourceCount: 0,
    }),
    status: "discovered",
    isSampleData: true,
  }
];

// Enrich opportunities with default personal fit
export const SEED_OPPORTUNITIES: Opportunity[] = RAW_OPPORTUNITIES.map((opp) => {
  const personalFit = calculatePersonalFit(opp, DEFAULT_USER_PROFILE);
  return {
    ...opp,
    personalFit,
  };
});
