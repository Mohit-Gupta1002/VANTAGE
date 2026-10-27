# VANTAGE — AI-Powered Opportunity Intelligence Platform

VANTAGE is an AI-powered strategic intelligence workstation that discovers, evaluates, connects, and prioritizes opportunities using historical intelligence, current signals, cross-domain analysis, future scenarios, and personal fit.

---

## 1. Core Architecture & Philosophy

The platform connects four layers of strategic intelligence:
- **Past (Historical Intelligence):** 10-year domain evolution timelines (2014–2026), structural inflection points, regulatory predecessors, recurring patterns, and limits of analogy.
- **Present (Current Signals):** Real-time verified market developments across 10 strategic sectors with primary source traceability, publication dates, and evidence quality ratings.
- **Future (Scenarios & Uncertainty):** Multi-horizon scenario matrices (1, 3, 5, 10 years) exploring Base, Upside, and Downside trajectories with early indicators to monitor.
- **Personal Advantage:** Dynamic Personal Fit scoring calibrated against the user's specific Work DNA, skills, capital range, weekly time budget, risk tolerance, and personal constraints.

### Core Principle
$$\text{Discover} \longrightarrow \text{Connect} \longrightarrow \text{Evaluate} \longrightarrow \text{Prioritize} \longrightarrow \text{Execute} \longrightarrow \text{Learn}$$

---

## 2. Platform Modules

### A. Intelligence Dashboard (`/`)
- Personalized daily strategic briefing
- Action Queue (*What You Should Do Next*) with priority indicators and time estimates
- Top recommended opportunities scored across 6 dimensions
- Featured cross-domain intersection spotlight
- Real-time emerging signal ticker

### B. Current Intelligence Feed
- 10 Strategic Sectors: Artificial Intelligence, Startups & VC, Finance & Economics, Education & Fellowships, Government Policy, Climate & Energy, Healthcare & Biotech, Real Estate & Infrastructure, Legaltech & Operations, Competitions & Grants.
- Filter by domain, signal type (Regulatory, Breakthrough, Adoption Shift, Capital Influx, etc.), geography, and minimum evidence quality slider.
- Direct links to primary regulatory filings and peer-reviewed sources.

### C. Historical Intelligence (10-Year Evolution)
- Chronological interactive timelines (2014–2026).
- Sourced events, structural impact, key lessons for today, recurring patterns, and explicit limits of analogy.

### D. Intersection Lab (Core Differentiator)
- Multi-domain matrix selector (select 2 or more domains).
- Structured 8-point convergence analysis:
  1. What is changing in Domain A?
  2. What is changing in Domain B?
  3. Why do the developments interact?
  4. Emerging unmet need and opportunity
  5. Target beneficiaries
  6. Supporting precedent evidence
  7. Unverified assumptions to test
  8. 7-day cheap validation experiment (cost <$100).

### E. Opportunity Discovery & Dossiers
- Categories: Startup & Business, Career & Skill, Research & Innovation, Investment Themes, Competitions & Grants, Emerging Industries & Gaps.
- Dedicated Opportunity Dossier with tabs:
  - **Overview**: Executive summary, domains, confidence level
  - **Why It Matters**: Underlying change, historical context, current supporting signals, future implications
  - **Evidence**: Verified sources, counter-evidence & bear case, key assumptions, data gaps
  - **Value Capture**: Beneficiaries, business models, required skills, potential barriers, personal advantages/gaps
  - **Execution Roadmap**: Immediate next step, 7-day validation plan, 30-day execution plan, milestones, success criteria
  - **Score Breakdown**: Interactive dimension visualizers

### F. Evidence Engine & Scoring Model
Weighted opportunity score calculated on a 0–100 scale:
- **Evidence Quality:** 25%
- **Problem Strength:** 20%
- **Timing & Momentum:** 15%
- **Feasibility:** 15%
- **Potential Value Creation:** 15%
- **Strategic Differentiation:** 10%

*Honesty Standard:* When evidence quality falls below 40 or citations count is 0, an explicit **"Insufficient Evidence"** warning badge is triggered rather than manufacturing precision.

### G. Personal Advantage Engine & Work DNA
- Profiles: Work DNA Archetype (Builder/Architect, Operator/Scaler, Researcher/Theorist, Dealmaker/Connector), work style, unfair advantages, skills, capital budget, available weekly hours, risk tolerance, goals, and constraints.
- Real-time dynamic recalculation of personal fit scores across every opportunity.

### H. Future Scenarios & Uncertainty Modeling
- Base, Upside, and Downside trajectories across 1, 3, 5, and 10-year horizons.
- Key drivers, early indicators to monitor, winners, losers, and invalidating assumptions.

### I. Saved Intelligence & Action Tracker
- Lifecycle status tracking: *Discovered* $\to$ *Investigating* $\to$ *Validating* $\to$ *Executing* $\to$ *Archived*.
- Editable next actions, target dates, execution progress slider, and completed experiment logger (*Hypothesis $\to$ Result $\to$ Learning*).

### J. Global Research Query Modal (`Ctrl+K`)
- Ingests strategic questions and synthesizes multi-layer reports combining historical precedents, active signals, cross-domain connections, scenarios, and citations.

---

## 3. Technology Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS (Workstation Dark Theme, HSL token palette)
- **Icons:** Lucide React
- **Persistence:** LocalStorage client synchronizer + Server REST API endpoints

---

## 4. API Contracts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Daily briefing, emerging signals, action queue |
| `GET` | `/api/signals` | Filterable signals by domain, type, evidence quality, query |
| `POST` | `/api/research` | Multi-layer strategic intelligence query synthesis |
| `POST` | `/api/intersections` | Cross-domain convergence hypothesis generation |
| `POST` | `/api/opportunities/discover` | Filtered & ranked opportunities with personal fit |
| `GET` | `/api/opportunities/[id]` | Full detailed opportunity dossier |
| `POST` | `/api/opportunities/[id]/evaluate` | Re-evaluates opportunity with custom weights or profile |
| `POST` | `/api/scenarios` | Multi-horizon scenario analysis (Base, Upside, Downside) |
| `GET` | `/api/my-opportunities` | Returns all saved opportunities and experiments |
| `POST` | `/api/my-opportunities` | Saves opportunity to user tracker |
| `PATCH` | `/api/my-opportunities/[id]` | Updates status, progress %, notes, and experiments |

---

## 5. Verification & Testing

Run unit tests verifying scoring weights, insufficient evidence threshold, and personal fit logic:
```bash
node scripts/test-engine.mjs
```

Run live HTTP endpoint verification:
```bash
node scripts/verify-api.mjs
```

Build production bundle:
```bash
npm run build
```

Run development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001) in your browser.
