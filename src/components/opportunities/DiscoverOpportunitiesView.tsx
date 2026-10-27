"use client";

import React, { useState, useMemo } from "react";
import { Opportunity, OpportunityCategory, DomainType, UserProfile } from "@/types";
import { DOMAINS_LIST } from "@/lib/data/seed";
import { ScoreDisplay } from "../shared/ScoreDisplay";
import {
  Compass,
  Search,
  Filter,
  Bookmark,
  ChevronRight,
  Sparkles,
  Layers,
  Globe,
  Clock,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";

interface DiscoverOpportunitiesViewProps {
  opportunities: Opportunity[];
  profile: UserProfile;
  onSelectOpportunity: (opp: Opportunity) => void;
  onSaveOpportunity: (oppId: string) => void;
  savedOpportunityIds: string[];
}

export function DiscoverOpportunitiesView({
  opportunities,
  profile,
  onSelectOpportunity,
  onSaveOpportunity,
  savedOpportunityIds,
}: DiscoverOpportunitiesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedHorizon, setSelectedHorizon] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"opportunityScore" | "personalFitScore">("opportunityScore");

  const categories = [
    "All",
    "Startup & Business",
    "Career & Skill",
    "Research & Innovation",
    "Emerging Industries & Gaps",
    "Competitions & Grants",
    "Investment Themes",
  ];

  const filtered = useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesSearch =
          searchQuery === "" ||
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.domains.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCat = selectedCategory === "All" || opp.category === selectedCategory;
        const matchesDom = selectedDomain === "All" || opp.domains.includes(selectedDomain as DomainType);
        const matchesHorizon = selectedHorizon === "All" || opp.timeHorizon === selectedHorizon;

        return matchesSearch && matchesCat && matchesDom && matchesHorizon;
      })
      .sort((a, b) => {
        if (sortBy === "personalFitScore") {
          return (b.personalFit?.personalFitScore || 0) - (a.personalFit?.personalFitScore || 0);
        }
        return b.scores.totalOpportunityScore - a.scores.totalOpportunityScore;
      });
  }, [opportunities, searchQuery, selectedCategory, selectedDomain, selectedHorizon, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" /> Opportunity Discovery Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Systematically evaluated opportunities backed by 6-dimensional evidence scoring and personalized to your specific Work DNA.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Rank by:</span>
          <div className="flex rounded-lg bg-[#0b0f17] border border-slate-700 p-0.5">
            <button
              onClick={() => setSortBy("opportunityScore")}
              className={`px-3 py-1 rounded-md transition ${
                sortBy === "opportunityScore"
                  ? "bg-cyan-500 text-black font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Opportunity Score
            </button>
            <button
              onClick={() => setSortBy("personalFitScore")}
              className={`px-3 py-1 rounded-md transition ${
                sortBy === "personalFitScore"
                  ? "bg-cyan-500 text-black font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Personal Fit
            </button>
          </div>
        </div>
      </div>

      {/* Categories Toolbar */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-lg border whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-cyan-950/60 border-cyan-500 text-cyan-300 font-bold"
                : "bg-[#0c1017] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="p-4 rounded-xl bg-[#0b0f17] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#080c13] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Domains</option>
            {DOMAINS_LIST.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedHorizon}
            onChange={(e) => setSelectedHorizon(e.target.value)}
            className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Time Horizons</option>
            <option value="6-12 months">6-12 Months</option>
            <option value="1-2 years">1-2 Years</option>
            <option value="3-5 years">3-5 Years</option>
          </select>
        </div>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((opp) => {
          const isSaved = savedOpportunityIds.includes(opp.id);
          return (
            <div
              key={opp.id}
              className="group relative rounded-xl bg-[#0c1017] border border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-400 border border-cyan-800/40">
                    {opp.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-400">{opp.timeHorizon}</span>
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
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-2">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {opp.summary}
                </p>

                {/* Domains */}
                <div className="flex flex-wrap gap-1">
                  {opp.domains.map((d) => (
                    <span key={d} className="text-[10px] px-2 py-0.5 rounded bg-[#0e141f] text-slate-400 border border-slate-800">
                      {d}
                    </span>
                  ))}
                </div>

                <ScoreDisplay scores={opp.scores} personalFit={opp.personalFit} />
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {opp.geography}
                </span>

                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-cyan-500 hover:text-black text-cyan-300 transition flex items-center gap-1"
                >
                  View Dossier <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
