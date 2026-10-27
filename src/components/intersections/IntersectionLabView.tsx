"use client";

import React, { useState } from "react";
import { DomainType, IntersectionHypothesis, UserProfile } from "@/types";
import { DOMAINS_LIST } from "@/lib/data/seed";
import { analyzeDomainIntersection } from "@/lib/research/intersections";
import {
  Layers,
  Sparkles,
  ArrowRight,
  TestTube,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Sliders,
  RefreshCw,
  Bookmark,
} from "lucide-react";

interface IntersectionLabViewProps {
  profile: UserProfile;
  onExploreOpportunity?: (title: string) => void;
}

export function IntersectionLabView({ profile, onExploreOpportunity }: IntersectionLabViewProps) {
  const [domainA, setDomainA] = useState<DomainType>("Artificial Intelligence");
  const [domainB, setDomainB] = useState<DomainType>("Legaltech & Operations");
  const [timeHorizon, setTimeHorizon] = useState("6-12 Months");
  const [capital, setCapital] = useState(profile.capitalRange);
  const [riskTolerance, setRiskTolerance] = useState(profile.riskTolerance);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [hypothesis, setHypothesis] = useState<IntersectionHypothesis>(() =>
    analyzeDomainIntersection("Artificial Intelligence", "Legaltech & Operations")
  );

  const handleRunAnalysis = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      const result = analyzeDomainIntersection(domainA, domainB, {
        timeHorizon,
        capital,
        riskTolerance,
      });
      setHypothesis(result);
      setIsSynthesizing(false);
    }, 400);
  };

  const swapDomains = () => {
    const temp = domainA;
    setDomainA(domainB);
    setDomainB(temp);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" /> Intersection Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Synthesize non-obvious opportunities at the convergence of disparate domains, backed by verified structural shifts and cheap test experiments.
          </p>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
          Core Differentiator
        </span>
      </div>

      {/* Control Console */}
      <div className="p-5 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-cyan-400" /> Cross-Domain Matrix Controls
          </span>
          <button
            onClick={swapDomains}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Invert Vectors
          </button>
        </div>

        {/* Domain Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Primary Domain (Vector Alpha)
            </label>
            <select
              value={domainA}
              onChange={(e) => setDomainA(e.target.value as DomainType)}
              className="w-full bg-[#080c13] border border-cyan-800/60 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-cyan-400"
            >
              {DOMAINS_LIST.map((d) => (
                <option key={d} value={d} disabled={d === domainB}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Secondary Domain (Vector Beta)
            </label>
            <select
              value={domainB}
              onChange={(e) => setDomainB(e.target.value as DomainType)}
              className="w-full bg-[#080c13] border border-indigo-800/60 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-400"
            >
              {DOMAINS_LIST.map((d) => (
                <option key={d} value={d} disabled={d === domainA}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Strategic Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Time Horizon</label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="6-12 Months">6-12 Months</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3-5 Years">3-5 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Available Capital</label>
            <select
              value={capital}
              onChange={(e) => setCapital(e.target.value as any)}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Bootstrap (<$1k)">Bootstrap (&lt;$1k)</option>
              <option value="Seed ($1k-$10k)">Seed ($1k-$10k)</option>
              <option value="Growth ($10k-$50k)">Growth ($10k-$50k)</option>
              <option value="Institutional ($50k+)">Institutional ($50k+)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value as any)}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
              <option value="Contrarian High-Risk">Contrarian High-Risk</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isSynthesizing}
          className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/20"
        >
          {isSynthesizing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Convergence Matrix...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Discover Intersection Opportunities
            </>
          )}
        </button>
      </div>

      {/* Structured Intersection Result Dossier */}
      <div className="rounded-xl bg-[#0c1017] border border-slate-800 p-6 space-y-6 shadow-xl">
        {/* Convergence Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {hypothesis.domainA}
            </span>
            <span className="text-slate-400 font-bold">×</span>
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-indigo-950 text-indigo-400 border border-indigo-800">
              {hypothesis.domainB}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Synthesis Confidence: <strong className="text-cyan-400">{hypothesis.confidenceScore}%</strong>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
              {hypothesis.recommendedCategory}
            </span>
          </div>
        </div>

        {/* 8 Core Analytical Sections from Section 4.D */}
        <div className="space-y-6 text-sm">
          {/* Shifts in A & B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#0e141f] border border-cyan-900/30 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                1. What is changing in {hypothesis.domainA}?
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{hypothesis.changesInA}</p>
            </div>

            <div className="p-4 rounded-lg bg-[#0e141f] border border-indigo-900/30 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                2. What is changing in {hypothesis.domainB}?
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{hypothesis.changesInB}</p>
            </div>
          </div>

          {/* Interaction Reason */}
          <div className="p-4 rounded-lg bg-[#080c13] border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" /> 3. Why might the two developments interact?
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{hypothesis.interactionReason}</p>
          </div>

          {/* Unmet Need */}
          <div className="p-4 rounded-lg bg-[#0d1624] border border-cyan-800/40 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> 4. Emerging Unmet Need & Opportunity
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">{hypothesis.emergingUnmetNeed}</p>
          </div>

          {/* Who Benefits */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              5. Who could capture value?
            </span>
            <div className="flex flex-wrap gap-2">
              {hypothesis.whoCouldBenefit.map((beneficiary, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded bg-[#0e141f] border border-slate-800 text-slate-300">
                  {beneficiary}
                </span>
              ))}
            </div>
          </div>

          {/* Evidence vs Assumptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 6. Supporting Precedent Evidence
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {hypothesis.supportingEvidence.map((ev, i) => (
                  <li key={i}>• {ev}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> 7. Unverified Assumptions to Test
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {hypothesis.unverifiedAssumptions.map((asm, i) => (
                  <li key={i}>• {asm}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8. Cheap Test Experiment */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-[#0e141f] to-cyan-950/20 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                8. 7-Day Cheap Validation Experiment (Cost: &lt;$100)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {hypothesis.cheapTestExperiment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
