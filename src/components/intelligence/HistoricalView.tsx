"use client";

import React, { useState } from "react";
import { HistoricalEvent, DomainType } from "@/types";
import { DOMAINS_LIST, RAW_HISTORICAL_EVENTS } from "@/lib/data/seed";
import {
  History,
  Calendar,
  Layers,
  ExternalLink,
  BookOpen,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface HistoricalViewProps {
  events?: HistoricalEvent[];
}

export function HistoricalView({ events = RAW_HISTORICAL_EVENTS }: HistoricalViewProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const filteredEvents = selectedDomain === "All"
    ? events
    : events.filter((e) => e.domain === selectedDomain);

  return (
    <div className="space-y-6">
      {/* Historical Intelligence Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <History className="w-6 h-6 text-cyan-400" /> Historical Intelligence: 10-Year Evolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Trace structural inflection points, regulatory predecessors, and recurring technology patterns to understand how current opportunities emerged.
          </p>
        </div>

        {/* Domain Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Domain:</span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-[#0b0f17] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Domains</option>
            {DOMAINS_LIST.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Epistemological Banner */}
      <div className="p-3.5 rounded-xl bg-[#090e17] border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-semibold mb-0.5">Analogy Rigor & Non-Fabrication Standard</strong>
          VANTAGE distinguishes documented historical events from analytical interpretations. Recurring historical patterns are probabilistic heuristics, not deterministic forecasts.
        </div>
      </div>

      {/* Chronological Timeline */}
      <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-8 my-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#07090e] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

            <div className="rounded-xl bg-[#0c1017] border border-slate-800 hover:border-slate-700 p-5 space-y-4 transition shadow-sm">
              {/* Event Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                    {event.year}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-800/80">
                    {event.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {event.domain}
                  </span>
                </div>

                {event.sources.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    {event.sources.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 inline-flex items-center gap-1 transition"
                      >
                        {s.title} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Impact */}
              <div className="p-3 rounded-lg bg-[#080c13] border border-slate-800 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Historical Structural Impact:
                </span>
                <p className="text-slate-300">{event.impact}</p>
              </div>

              {/* Lessons & Recurring Patterns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Key Lessons */}
                <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Lessons For Today
                  </span>
                  <ul className="space-y-1 text-slate-300 pt-1">
                    {event.keyLessons.map((l, i) => (
                      <li key={i}>• {l}</li>
                    ))}
                  </ul>
                </div>

                {/* Recurring Pattern */}
                <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" /> Recurring Pattern
                  </span>
                  <p className="text-slate-300 pt-1 leading-relaxed">{event.recurringPattern}</p>
                </div>

                {/* Limit of Analogy */}
                <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Limit of Analogy
                  </span>
                  <p className="text-slate-400 pt-1 leading-relaxed">{event.limitOfAnalogy}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
