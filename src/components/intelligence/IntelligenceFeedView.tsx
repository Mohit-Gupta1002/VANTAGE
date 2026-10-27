"use client";

import React, { useState, useMemo } from "react";
import { IntelligenceSignal, DomainType } from "@/types";
import { DOMAINS_LIST } from "@/lib/data/seed";
import {
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  Globe,
  Calendar,
  SlidersHorizontal,
  ChevronDown,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";

interface IntelligenceFeedViewProps {
  signals: IntelligenceSignal[];
  onOpenResearchModal?: (query: string) => void;
}

export function IntelligenceFeedView({ signals, onOpenResearchModal }: IntelligenceFeedViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("All");
  const [minEvidence, setMinEvidence] = useState<number>(0);
  const [selectedSignalForDetail, setSelectedSignalForDetail] = useState<IntelligenceSignal | null>(null);

  const filteredSignals = useMemo(() => {
    return signals.filter((sig) => {
      const matchesSearch =
        searchQuery === "" ||
        sig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sig.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = selectedDomain === "All" || sig.domain === selectedDomain;
      const matchesType = selectedSignalType === "All" || sig.signalType === selectedSignalType;
      const matchesEvidence = sig.evidenceQuality >= minEvidence;

      return matchesSearch && matchesDomain && matchesType && matchesEvidence;
    });
  }, [signals, searchQuery, selectedDomain, selectedSignalType, minEvidence]);

  const signalTypes = ["All", "Regulatory", "Adoption Shift", "Breakthrough", "Capital Influx", "Grant / Competition", "Policy"];

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Current Intelligence Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time verified market signals, regulatory filings, research preprints, and non-dilutive programs across 10 strategic domains.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-cyan-400 border border-slate-700">
            {filteredSignals.length} Active Signals
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
            Traceable Sourced
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#0b0f17] border border-slate-800 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals by keyword, regulation, company, or technology tag..."
            className="w-full pl-10 pr-4 py-2 bg-[#080c13] border border-slate-700/80 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Domain Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Domain / Sector</label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Domains (10)</option>
              {DOMAINS_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Signal Type Filter */}
          <div>
            <label className="block text-slate-400 font-medium mb-1">Signal Type</label>
            <select
              value={selectedSignalType}
              onChange={(e) => setSelectedSignalType(e.target.value)}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {signalTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Min Evidence Quality Slider */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1 text-slate-400">
              <span className="font-medium">Min Evidence Quality Threshold:</span>
              <span className="font-mono text-cyan-400 font-bold">{minEvidence}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minEvidence}
              onChange={(e) => setMinEvidence(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      {filteredSignals.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0b0f17] border border-slate-800 space-y-3">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No signals match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query, lowering the minimum evidence threshold, or selecting &quot;All Domains&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDomain("All");
              setSelectedSignalType("All");
              setMinEvidence(0);
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSignals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => setSelectedSignalForDetail(signal)}
              className="cursor-pointer group rounded-xl bg-[#0c1017] border border-slate-800 hover:border-cyan-500/40 p-5 space-y-3.5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-cyan-950/20"
            >
              <div className="space-y-2.5">
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                    {signal.domain}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {signal.geography}
                    </span>
                    <span>•</span>
                    <span>{signal.publishedAt}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition">
                  {signal.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {signal.summary}
                </p>

                {/* Why It Matters Callout */}
                <div className="p-3 rounded-lg bg-[#080c13] border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block">
                    Strategic Significance
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{signal.whyItMatters}</p>
                </div>

                {/* Potential Opportunities Tags */}
                {signal.potentialOpportunities.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Associated Opportunity Vectors:
                    </span>
                    <ul className="space-y-1">
                      {signal.potentialOpportunities.map((opp, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer: Source & Evidence Score */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                    {signal.verificationStatus}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                    EQ: {signal.evidenceQuality}/100
                  </span>
                </div>

                <a
                  href={signal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-cyan-300 text-xs font-medium inline-flex items-center gap-1 transition"
                >
                  {signal.sourceName} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal for Selected Signal */}
      {selectedSignalForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0c1017] border border-slate-800 rounded-xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {selectedSignalForDetail.domain}
                </span>
                <h2 className="text-lg font-bold text-white mt-2">{selectedSignalForDetail.title}</h2>
              </div>
              <button
                onClick={() => setSelectedSignalForDetail(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed bg-[#080c13] p-4 rounded-lg border border-slate-800">
              {selectedSignalForDetail.summary}
            </p>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-cyan-400 uppercase tracking-wider block">Why It Matters</span>
              <p className="text-slate-300 leading-relaxed">{selectedSignalForDetail.whyItMatters}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-lg bg-[#080c13] border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Published</span>
                <span className="font-mono text-white">{selectedSignalForDetail.publishedAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Retrieved</span>
                <span className="font-mono text-white">{selectedSignalForDetail.retrievedAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Evidence Quality</span>
                <span className="font-mono text-cyan-400 font-bold">{selectedSignalForDetail.evidenceQuality} / 100</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Verification Status</span>
                <span className="text-emerald-400 font-semibold">{selectedSignalForDetail.verificationStatus}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href={selectedSignalForDetail.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold inline-flex items-center gap-1.5 transition"
              >
                Inspect Primary Source <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedSignalForDetail(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
