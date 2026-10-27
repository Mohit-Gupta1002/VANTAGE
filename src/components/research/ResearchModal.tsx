"use client";

import React, { useState } from "react";
import { ResearchReport, DomainType } from "@/types";
import { DOMAINS_LIST } from "@/lib/data/seed";
import {
  Search,
  Sparkles,
  ExternalLink,
  X,
  Layers,
  History,
  GitFork,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
} from "lucide-react";

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function ResearchModal({ isOpen, onClose, initialQuery = "" }: ResearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [domain, setDomain] = useState<string>("Artificial Intelligence");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ResearchReport | null>(null);

  if (!isOpen) return null;

  const handleRunResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          domain,
          deepSynthesize: true,
        }),
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error("Research query error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c1017] border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0e141f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">VANTAGE Research & Query Synthesis</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Query Input */}
        <form onSubmit={handleRunResearch} className="p-5 border-b border-slate-800 bg-[#090d14] space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any strategic question, explore an emerging sector, or investigate a policy..."
                className="w-full pl-9 pr-4 py-2 bg-[#0c1017] border border-slate-700 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
            </div>

            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-[#0c1017] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {DOMAINS_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Synthesize"}
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Try: &quot;Behind-the-meter nuclear data centers&quot;</span>
            <span>•</span>
            <span>&quot;EU AI Act audit requirements&quot;</span>
            <span>•</span>
            <span>&quot;Post-quantum cryptography banking migration&quot;</span>
          </div>
        </form>

        {/* Report Output Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed flex-1">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">
                Retrieving signals, identifying cross-domain vectors, and evaluating evidence...
              </p>
            </div>
          ) : report ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                    {report.domain}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{report.title}</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Confidence: <strong className="text-emerald-400">{report.confidence}</strong>
                </span>
              </div>

              {/* Historical Precedents */}
              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Historical Precedents & Evolution
                </span>
                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                  {report.historicalContext}
                </p>
              </div>

              {/* Current Signals */}
              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Supporting Present Signals
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.currentSignals.map((sig, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cross-Domain Connections */}
              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Cross-Domain Intersection Vectors
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {report.crossDomainConnections.map((conn, i) => (
                    <li key={i}>{conn}</li>
                  ))}
                </ul>
              </div>

              {/* Multi-Horizon Scenarios */}
              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5" /> Plausible Scenario Trajectories
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.scenarios.map((scen, i) => (
                    <li key={i} className="bg-[#090d14] p-2 rounded border border-slate-800/80">
                      {scen}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Traceable Sources */}
              {report.sources.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Verified Citations & Precedents:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {report.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-[#090d14] border border-slate-700 text-cyan-300 hover:underline flex items-center gap-1"
                      >
                        {src.title} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              Enter a query above to run a synthesized intelligence report across historical context, current signals, and future scenarios.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
