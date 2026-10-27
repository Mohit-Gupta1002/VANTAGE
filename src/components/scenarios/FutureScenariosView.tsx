"use client";

import React, { useState } from "react";
import { FutureScenario, DomainType } from "@/types";
import { RAW_FUTURE_SCENARIOS, DOMAINS_LIST } from "@/lib/data/seed";
import {
  GitFork,
  TrendingUp,
  TrendingDown,
  Clock,
  Layers,
  ShieldAlert,
  Sparkles,
  Award,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface FutureScenariosViewProps {
  scenarios?: FutureScenario[];
}

export function FutureScenariosView({ scenarios = RAW_FUTURE_SCENARIOS }: FutureScenariosViewProps) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const active = scenarios[selectedScenarioIndex] || scenarios[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GitFork className="w-6 h-6 text-cyan-400" /> Future Scenarios & Uncertainty Modeling
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Multi-horizon scenario matrices (1, 3, 5, 10 years) exploring Base, Upside, and Downside trajectories with early indicators to monitor.
          </p>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
          Exploratory Reasoning (Not Guaranteed)
        </span>
      </div>

      {/* Scenario Topic Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scenarios.map((scen, idx) => (
          <button
            key={scen.id}
            onClick={() => setSelectedScenarioIndex(idx)}
            className={`p-4 rounded-xl border text-left transition ${
              selectedScenarioIndex === idx
                ? "bg-[#0f1724] border-cyan-500 shadow-md shadow-cyan-950/20"
                : "bg-[#0c1017] border-slate-800 hover:border-slate-700 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-cyan-400 font-semibold uppercase tracking-wider">{scen.domain}</span>
              <span className="font-mono text-slate-400">{scen.timeframe} Horizon</span>
            </div>
            <h3 className="text-sm font-bold text-white line-clamp-1">{scen.topic}</h3>
          </button>
        ))}
      </div>

      {/* Active Scenario Canvas */}
      {active && (
        <div className="space-y-6">
          {/* Active Topic Banner */}
          <div className="p-5 rounded-xl bg-[#0b0f17] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                Active Strategic Horizon ({active.timeframe})
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{active.topic}</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-slate-300">
              Domain: {active.domain}
            </span>
          </div>

          {/* Three Scenarios: Base, Upside, Downside */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Base Scenario */}
            <div className="rounded-xl bg-[#0c1017] border border-slate-800 hover:border-sky-500/40 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                    Base Case
                  </span>
                  <span className="font-mono text-slate-400">Prob: {active.baseScenario.probability}</span>
                </div>

                <h3 className="text-base font-bold text-white">{active.baseScenario.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{active.baseScenario.narrative}</p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Drivers:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {active.baseScenario.keyDrivers.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-cyan-400 uppercase block mb-1">
                  Early Indicators To Monitor:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {active.baseScenario.earlyIndicators.map((ind, i) => (
                    <li key={i}>🔍 {ind}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Upside Scenario */}
            <div className="rounded-xl bg-[#0c1017] border border-slate-800 hover:border-emerald-500/40 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Upside Accelerated
                  </span>
                  <span className="font-mono text-slate-400">Prob: {active.upsideScenario.probability}</span>
                </div>

                <h3 className="text-base font-bold text-white">{active.upsideScenario.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{active.upsideScenario.narrative}</p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Drivers:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {active.upsideScenario.keyDrivers.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-emerald-400 uppercase block mb-1">
                  Early Indicators To Monitor:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {active.upsideScenario.earlyIndicators.map((ind, i) => (
                    <li key={i}>🔍 {ind}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Downside Scenario */}
            <div className="rounded-xl bg-[#0c1017] border border-slate-800 hover:border-rose-500/40 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Downside Friction
                  </span>
                  <span className="font-mono text-slate-400">Prob: {active.downsideScenario.probability}</span>
                </div>

                <h3 className="text-base font-bold text-white">{active.downsideScenario.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{active.downsideScenario.narrative}</p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Key Drivers:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {active.downsideScenario.keyDrivers.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] font-semibold text-rose-400 uppercase block mb-1">
                  Early Indicators To Monitor:
                </span>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {active.downsideScenario.earlyIndicators.map((ind, i) => (
                    <li key={i}>🔍 {ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Strategic Implications: Winners, Losers, Emerging Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Winners */}
            <div className="p-4 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" /> Potential Winners
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {active.winners.map((w, i) => (
                  <li key={i}>✓ {w}</li>
                ))}
              </ul>
            </div>

            {/* Losers */}
            <div className="p-4 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" /> Vulnerable / Disrupted
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {active.losers.map((l, i) => (
                  <li key={i}>✕ {l}</li>
                ))}
              </ul>
            </div>

            {/* Emerging Opportunities */}
            <div className="p-4 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Emerging Opportunities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {active.emergingOpportunities.map((op, i) => (
                  <li key={i}>★ {op}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Invalidating Assumptions */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 space-y-1.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Assumptions That Could Invalidate These Scenarios
            </span>
            <ul className="space-y-1 text-slate-300 pt-1">
              {active.invalidatingAssumptions.map((asm, i) => (
                <li key={i}>• {asm}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
