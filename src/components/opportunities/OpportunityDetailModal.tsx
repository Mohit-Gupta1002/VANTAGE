"use client";

import React, { useState } from "react";
import { Opportunity, OpportunityStatus } from "@/types";
import { ScoreDisplay } from "../shared/ScoreDisplay";
import {
  X,
  ExternalLink,
  Bookmark,
  Calendar,
  Globe,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onSaveToTracker: (oppId: string, status: OpportunityStatus, notes?: string) => void;
  isSaved?: boolean;
}

export function OpportunityDetailModal({
  opportunity,
  onClose,
  onSaveToTracker,
  isSaved = false,
}: OpportunityDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "why" | "evidence" | "value" | "action" | "scoring">("overview");
  const [saveStatus, setSaveStatus] = useState<OpportunityStatus>("discovered");
  const [saveNotes, setSaveNotes] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  if (!opportunity) return null;

  const handleSave = () => {
    onSaveToTracker(opportunity.id, saveStatus, saveNotes);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1017] border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 bg-[#0e141f] flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                {opportunity.category}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {opportunity.timeHorizon}
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 flex items-center gap-1">
                <Globe className="w-3 h-3" /> {opportunity.geography}
              </span>
              {opportunity.isSampleData && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/50 text-slate-400 border border-slate-700/50">
                  Sample Intelligence Model
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {opportunity.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick summary scores bar */}
        <div className="px-6 py-3 bg-[#090d14] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <ScoreDisplay scores={opportunity.scores} personalFit={opportunity.personalFit} />

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                isSaved || showSaveSuccess
                  ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-cyan-600 hover:bg-cyan-500 text-black font-bold shadow-md hover:shadow-cyan-500/20"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              {showSaveSuccess ? "Saved to Tracker!" : isSaved ? "In Action Tracker" : "Save Opportunity"}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#0e141f] px-6 gap-2 overflow-x-auto text-xs font-medium">
          {[
            { id: "overview", label: "Overview" },
            { id: "why", label: "Why It Matters" },
            { id: "evidence", label: "Evidence & Assumptions" },
            { id: "value", label: "Value Capture & Fit" },
            { id: "action", label: "Execution Roadmap" },
            { id: "scoring", label: "Score Breakdown" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-cyan-400 text-cyan-300 font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Executive Summary</h4>
                <p className="text-slate-200 text-base leading-relaxed bg-[#111723] p-4 rounded-lg border border-slate-800">
                  {opportunity.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" /> Active Domains
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opportunity.domains.map((d) => (
                      <span key={d} className="px-2.5 py-1 rounded text-xs bg-slate-800 text-slate-200 border border-slate-700">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Confidence Level
                  </span>
                  <div className="pt-1 flex items-center gap-2">
                    <span className={`text-sm font-semibold px-2.5 py-0.5 rounded ${
                      opportunity.evidence.confidenceLevel === "High" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                      opportunity.evidence.confidenceLevel === "Medium" ? "bg-sky-950 text-sky-300 border border-sky-800" :
                      "bg-amber-950 text-amber-300 border border-amber-800"
                    }`}>
                      {opportunity.evidence.confidenceLevel} Rigor
                    </span>
                    <span className="text-xs text-slate-400">
                      ({opportunity.evidence.supportingSources.length} verified citations)
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Fit Highlight */}
              {opportunity.personalFit && (
                <div className="p-4 rounded-lg bg-[#0b1320] border border-cyan-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Personal Fit Assessment</h4>
                    <span className="text-xs font-bold text-cyan-400 font-mono-num">{opportunity.personalFit.personalFitScore}/100</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {opportunity.personalFit.whyItMatches.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "why" && (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">1. Underlying Change</h4>
                <p className="text-slate-200">{opportunity.whyItMatters.underlyingChange}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1.5">2. Relevant Historical Context</h4>
                <p className="text-slate-300">{opportunity.whyItMatters.historicalContext}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">3. Current Supporting Signals</h4>
                <ul className="space-y-2">
                  {opportunity.whyItMatters.currentSignals.map((sig, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-[#090d14] p-2.5 rounded border border-slate-800/80">
                      <span className="text-cyan-400 font-mono text-[11px] font-bold">#{i + 1}</span>
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1.5">4. Potential Future Implications</h4>
                <p className="text-slate-300">{opportunity.whyItMatters.futureImplications}</p>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-5">
              {/* Sources */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Supporting Sources & Citations</h4>
                {opportunity.evidence.supportingSources.length === 0 ? (
                  <div className="p-3 bg-amber-950/20 border border-amber-600/30 rounded text-amber-300 text-xs">
                    No verified primary citations provided. High risk of speculation.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {opportunity.evidence.supportingSources.map((src, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#0e141f] border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-cyan-300">{src.publisher}</span>
                          <span className="text-[11px] font-mono text-slate-400">{src.date}</span>
                        </div>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-200 hover:text-cyan-400 inline-flex items-center gap-1 font-medium transition"
                        >
                          {src.title} <ExternalLink className="w-3 h-3" />
                        </a>
                        {src.quote && (
                          <blockquote className="text-[11px] text-slate-400 italic border-l-2 border-slate-700 pl-2 mt-1">
                            &ldquo;{src.quote}&rdquo;
                          </blockquote>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Counter Evidence */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Counter-Evidence & Bear Case
                </h4>
                <ul className="space-y-1.5">
                  {opportunity.evidence.counterEvidence.map((ce, i) => (
                    <li key={i} className="text-xs text-slate-300 bg-rose-950/10 border border-rose-900/30 p-2.5 rounded">
                      {ce}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Assumptions & Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Key Assumptions
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {opportunity.evidence.assumptions.map((asm, i) => (
                      <li key={i}>• {asm}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" /> Known Data Gaps
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {opportunity.evidence.dataGaps.map((dg, i) => (
                      <li key={i}>• {dg}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "value" && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Target Beneficiaries</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.valueCapture.whoBenefits.map((wb, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-[#0e141f] border border-slate-800 text-slate-300">
                      {wb}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Business Models & Career Pathways</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {opportunity.valueCapture.businessModelsOrCareerPathways.map((bm, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{bm}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Required Skills & Resources</h5>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {opportunity.valueCapture.requiredSkillsAndResources.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Potential Barriers to Entry</h5>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {opportunity.valueCapture.potentialBarriers.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Personal Fit Gaps & Advantages */}
              {opportunity.personalFit && (
                <div className="p-4 rounded-lg bg-[#0b1320] border border-cyan-900/40 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Your Specific Advantages & Gaps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-emerald-400 font-semibold block mb-1">Advantages You Possess:</span>
                      <ul className="space-y-1 text-slate-300">
                        {opportunity.personalFit.advantagesPossessed.map((adv, i) => (
                          <li key={i}>✓ {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-amber-400 font-semibold block mb-1">Gaps or Risks to Address:</span>
                      <ul className="space-y-1 text-slate-300">
                        {opportunity.personalFit.skillGaps.map((sg, i) => (
                          <li key={i}>⚠ {sg}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "action" && (
            <div className="space-y-5">
              <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1">Immediate Next Step</span>
                <p className="text-sm font-medium text-white">{opportunity.recommendedAction.immediateNextStep}</p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">7-Day Validation Plan</h4>
                <ol className="space-y-2">
                  {opportunity.recommendedAction.sevenDayValidationPlan.map((step, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-[#090d14] p-2.5 rounded border border-slate-800/80">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4 rounded-lg bg-[#0e141f] border border-slate-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">30-Day Execution Roadmap</h4>
                <ul className="space-y-2">
                  {opportunity.recommendedAction.thirtyDayExecutionPlan.map((step, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-[#090d14] p-2.5 rounded border border-slate-800/80">
                      <span className="text-indigo-400 font-bold shrink-0">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Suggested Milestones</h5>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {opportunity.recommendedAction.suggestedMilestones.map((ms, i) => (
                      <li key={i}>• {ms}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0e141f] border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Clear Success Criteria</h5>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {opportunity.recommendedAction.clearSuccessCriteria.map((sc, i) => (
                      <li key={i}>• {sc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "scoring" && (
            <div className="space-y-4">
              <ScoreDisplay scores={opportunity.scores} personalFit={opportunity.personalFit} showDetails={true} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0e141f] flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            ID: <span className="font-mono text-slate-300">{opportunity.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
            >
              Close Dossier
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black transition"
            >
              {isSaved ? "Update Saved Tracker" : "Save to My Opportunities"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
