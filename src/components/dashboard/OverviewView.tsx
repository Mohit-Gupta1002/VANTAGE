"use client";

import React from "react";
import { IntelligenceSignal, Opportunity, IntersectionHypothesis, UserProfile } from "@/types";
import { ScoreDisplay } from "../shared/ScoreDisplay";
import {
  Compass,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Bookmark,
} from "lucide-react";

interface OverviewViewProps {
  signals: IntelligenceSignal[];
  opportunities: Opportunity[];
  intersections: IntersectionHypothesis[];
  profile: UserProfile;
  onSelectOpportunity: (opp: Opportunity) => void;
  onNavigateTab: (tab: string) => void;
  onSaveOpportunity: (oppId: string) => void;
  savedOpportunityIds: string[];
}

export function OverviewView({
  signals,
  opportunities,
  intersections,
  profile,
  onSelectOpportunity,
  onNavigateTab,
  onSaveOpportunity,
  savedOpportunityIds,
}: OverviewViewProps) {
  const topOpportunities = opportunities.slice(0, 3);
  const featuredIntersection = intersections[0];

  return (
    <div className="space-y-6">
      {/* Daily Intelligence Briefing Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0d1624] via-[#0f1b2d] to-[#0c1421] border border-cyan-900/40 p-6 shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-3 h-3" /> Daily Intelligence Briefing
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Strategic Intelligence Briefing
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Autonomous Systems Governance & Behind-The-Meter Energy Inflections
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Enterprise software transitions toward deterministic autonomous agents face strict EU AI Act compliance deadlines, while regional power grid interconnection delays drive direct behind-the-meter clean energy partnerships for AI computing clusters.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab("intersections")}
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black shadow-md hover:shadow-cyan-500/20 transition flex items-center gap-1.5"
            >
              Open Intersection Lab <ArrowUpRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Traceability: Verified Sourced Precedents
            </span>
          </div>
        </div>
      </div>

      {/* Action Queue & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Queue: What You Should Do Next */}
        <div className="lg:col-span-2 rounded-xl bg-[#0b0f17] border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Action Queue: What You Should Do Next
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("tracker")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              View Full Tracker <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "q-1",
                priority: "Urgent (P0)",
                badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
                title: "Run 7-Day Validation for EU AI Act Audit Middleware",
                description: "Extract Article 53/55 criteria into automated testing script. Reach out to 5 enterprise CTOs.",
                opp: opportunities[0],
                timeEstimate: "3h session",
              },
              {
                id: "q-2",
                priority: "High (P1)",
                badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                title: "Evaluate Real-Time ERCOT & CAISO Negative Pricing Feeds",
                description: "Map negative wholesale price intervals against Ray batch training job execution.",
                opp: opportunities[1],
                timeEstimate: "2h research",
              },
              {
                id: "q-3",
                priority: "Strategic",
                badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
                title: "Benchmark SEC EDGAR Merger Indemnity Discrepancies",
                description: "Parse 5 public Form 8-K / Exhibit 2.1 acquisitions to measure automatic clause extraction.",
                opp: opportunities[2],
                timeEstimate: "4h testing",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800 hover:border-slate-700 transition flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.priority}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.timeEstimate}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>

                {item.opp && (
                  <button
                    onClick={() => onSelectOpportunity(item.opp)}
                    className="shrink-0 p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition text-xs font-medium flex items-center gap-1"
                  >
                    Dossier <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Advantage Profile Card */}
        <div className="rounded-xl bg-[#0b0f17] border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Personal Advantage Fit
              </span>
              <button
                onClick={() => onNavigateTab("profile")}
                className="text-xs text-cyan-400 hover:underline"
              >
                Edit Profile
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800 space-y-1.5">
              <div className="text-sm font-bold text-white">{profile.name}</div>
              <div className="text-xs text-cyan-300 font-medium">{profile.role}</div>
              <div className="text-[11px] text-slate-400 line-clamp-2">{profile.background}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-[#0e141f] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Time Budget</span>
                <span className="font-bold text-white">{profile.availableHours}h / week</span>
              </div>
              <div className="p-2.5 rounded bg-[#0e141f] border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Capital Band</span>
                <span className="font-bold text-white">{profile.capitalRange}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 uppercase font-medium">Work DNA Archetype</span>
              <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-1 rounded">
                {profile.workDNA.archetype} ({profile.workDNA.workStyle})
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab("discover")}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-center"
          >
            Rank Opportunities by My Fit →
          </button>
        </div>
      </div>

      {/* Recommended Opportunities Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Top Recommended Opportunities</h2>
            <p className="text-xs text-slate-400">Calculated via 6-dimensional evidence scoring & personal advantage fit</p>
          </div>
          <button
            onClick={() => onNavigateTab("discover")}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            Explore All ({opportunities.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topOpportunities.map((opp) => {
            const isSaved = savedOpportunityIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="group relative rounded-xl bg-[#0c1017] border border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-400 border border-cyan-800/40">
                      {opp.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveOpportunity(opp.id);
                      }}
                      className={`p-1.5 rounded transition ${
                        isSaved ? "text-cyan-400 bg-cyan-950/60" : "text-slate-400 hover:text-white bg-slate-800/40"
                      }`}
                      title={isSaved ? "Saved in Tracker" : "Save Opportunity"}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-2">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {opp.summary}
                  </p>

                  <ScoreDisplay scores={opp.scores} personalFit={opp.personalFit} />
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{opp.timeHorizon}</span>
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition"
                  >
                    View Dossier <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Cross-Domain Intersection Spotlight */}
      {featuredIntersection && (
        <div className="rounded-xl bg-[#0b0f17] border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Featured Intersection Lab Hypothesis
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("intersections")}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Test Other Combinations <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-cyan-300">
              <span className="px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                {featuredIntersection.domainA}
              </span>
              <span className="text-slate-500">×</span>
              <span className="px-2.5 py-1 rounded bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
                {featuredIntersection.domainB}
              </span>
              <span className="text-slate-400 font-normal ml-auto font-mono text-[11px]">
                Confidence: {featuredIntersection.confidenceScore}%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-white">Unmet Need:</strong> {featuredIntersection.emergingUnmetNeed}
            </p>

            <div className="p-3 rounded bg-[#090d14] border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">Cheap Test:</span>
              <span>{featuredIntersection.cheapTestExperiment}</span>
            </div>
          </div>
        </div>
      )}

      {/* Emerging Signals Ticker Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Emerging Current Signals
          </h3>
          <button
            onClick={() => onNavigateTab("feed")}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            Full Intelligence Feed ({signals.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {signals.slice(0, 4).map((sig) => (
            <div
              key={sig.id}
              className="p-4 rounded-lg bg-[#0c1017] border border-slate-800 hover:border-slate-700 transition space-y-2"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-cyan-400 uppercase tracking-wider">{sig.domain}</span>
                <span className="font-mono text-slate-400">{sig.publishedAt}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white hover:text-cyan-300 transition">
                {sig.title}
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2">{sig.summary}</p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
                <span className="truncate max-w-[200px]">Source: {sig.sourceName}</span>
                <a
                  href={sig.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
