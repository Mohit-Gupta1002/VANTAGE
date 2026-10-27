"use client";

import React from "react";
import { ScoreDimensions, PersonalFitAnalysis } from "@/types";
import { AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";

interface ScoreDisplayProps {
  scores: ScoreDimensions;
  personalFit?: PersonalFitAnalysis;
  showDetails?: boolean;
}

export function ScoreDisplay({ scores, personalFit, showDetails = false }: ScoreDisplayProps) {
  const dimensions = [
    { label: "Evidence Quality", weight: "25%", score: scores.evidenceQuality, desc: scores.dimensionReasoning.evidenceQuality },
    { label: "Problem Strength", weight: "20%", score: scores.problemStrength, desc: scores.dimensionReasoning.problemStrength },
    { label: "Timing & Momentum", weight: "15%", score: scores.timingMomentum, desc: scores.dimensionReasoning.timingMomentum },
    { label: "Feasibility", weight: "15%", score: scores.feasibility, desc: scores.dimensionReasoning.feasibility },
    { label: "Value Creation", weight: "15%", score: scores.valueCreation, desc: scores.dimensionReasoning.valueCreation },
    { label: "Strategic Diff.", weight: "10%", score: scores.strategicDifferentiation, desc: scores.dimensionReasoning.strategicDifferentiation },
  ];

  return (
    <div className="space-y-4">
      {/* Top summary badges */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Opportunity Score */}
        <div className="flex items-center gap-2 bg-[#0d1522] border border-[#1e293b] rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Opportunity Score</span>
          {scores.isInsufficientEvidence ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-3 h-3" /> Insufficient Evidence
            </span>
          ) : (
            <span className={`text-base font-bold font-mono-num ${
              scores.totalOpportunityScore >= 80 ? "text-cyan-400" : scores.totalOpportunityScore >= 65 ? "text-sky-400" : "text-slate-300"
            }`}>
              {scores.totalOpportunityScore}<span className="text-xs text-slate-500">/100</span>
            </span>
          )}
        </div>

        {/* Personal Fit Score */}
        {personalFit && (
          <div className="flex items-center gap-2 bg-[#0e1726] border border-[#1e293b] rounded-lg px-3 py-1.5">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Personal Fit</span>
            <span className={`text-base font-bold font-mono-num ${
              personalFit.personalFitScore >= 75 ? "text-emerald-400" : personalFit.personalFitScore >= 50 ? "text-amber-400" : "text-rose-400"
            }`}>
              {personalFit.personalFitScore}<span className="text-xs text-slate-500">/100</span>
            </span>
          </div>
        )}
      </div>

      {/* Insufficient Evidence Warning Banner */}
      {scores.isInsufficientEvidence && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs leading-relaxed">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="font-semibold block text-amber-200">Insufficient Evidence Warning</strong>
            Primary verification sources or empirical datasets are absent or critically limited. VANTAGE treats this claim as speculative until peer-reviewed or audited data emerges.
          </div>
        </div>
      )}

      {/* Breakdown Dimensions */}
      {showDetails && (
        <div className="space-y-3 pt-2">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Evaluation Dimensions (Weighted)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {dimensions.map((dim) => (
              <div key={dim.label} className="p-2.5 rounded-lg bg-[#0d121b] border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">{dim.label} <span className="text-slate-500 text-[10px]">({dim.weight})</span></span>
                  <span className="font-mono-num font-semibold text-slate-200">{dim.score}/100</span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      dim.score >= 80 ? "bg-cyan-500" : dim.score >= 60 ? "bg-sky-500" : dim.score >= 40 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
