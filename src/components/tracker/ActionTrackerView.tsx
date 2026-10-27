"use client";

import React, { useState } from "react";
import { UserOpportunityRecord, Opportunity, OpportunityStatus } from "@/types";
import {
  Kanban,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
  Edit3,
  TestTube,
  ChevronRight,
  Bookmark,
  ExternalLink,
  Save,
  Check,
} from "lucide-react";

interface ActionTrackerViewProps {
  records: UserOpportunityRecord[];
  allOpportunities: Opportunity[];
  onUpdateRecord: (
    recordId: string,
    updates: Partial<UserOpportunityRecord> & { newExperiment?: any }
  ) => void;
  onSelectOpportunity: (opp: Opportunity) => void;
}

export function ActionTrackerView({
  records,
  allOpportunities,
  onUpdateRecord,
  onSelectOpportunity,
}: ActionTrackerViewProps) {
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState("");
  const [activeNextAction, setActiveNextAction] = useState("");
  const [activeTargetDate, setActiveTargetDate] = useState("");
  const [activeProgress, setActiveProgress] = useState(0);

  // Experiment modal state
  const [experimentModalRecordId, setExperimentModalRecordId] = useState<string | null>(null);
  const [expHypothesis, setExpHypothesis] = useState("");
  const [expResult, setExpResult] = useState("");
  const [expLearning, setExpLearning] = useState("");

  const statuses: OpportunityStatus[] = [
    "discovered",
    "investigating",
    "validating",
    "executing",
    "archived",
  ];

  const statusLabels: Record<OpportunityStatus, { label: string; color: string }> = {
    discovered: { label: "Discovered", color: "bg-slate-800 text-slate-300 border-slate-700" },
    investigating: { label: "Investigating", color: "bg-sky-950 text-sky-400 border-sky-800" },
    validating: { label: "Validating (7-Day Sprint)", color: "bg-cyan-950 text-cyan-400 border-cyan-800" },
    executing: { label: "Executing (30-Day Plan)", color: "bg-emerald-950 text-emerald-400 border-emerald-800" },
    archived: { label: "Archived / Learned", color: "bg-slate-900 text-slate-500 border-slate-800" },
  };

  const startEditing = (record: UserOpportunityRecord) => {
    setEditingRecordId(record.id);
    setActiveNotes(record.notes);
    setActiveNextAction(record.nextAction);
    setActiveTargetDate(record.targetDate);
    setActiveProgress(record.progress);
  };

  const saveEditing = (recordId: string) => {
    onUpdateRecord(recordId, {
      notes: activeNotes,
      nextAction: activeNextAction,
      targetDate: activeTargetDate,
      progress: activeProgress,
    });
    setEditingRecordId(null);
  };

  const handleAddExperiment = (recordId: string) => {
    if (!expHypothesis || !expResult || !expLearning) return;
    onUpdateRecord(recordId, {
      newExperiment: {
        date: new Date().toISOString().split("T")[0],
        hypothesis: expHypothesis,
        result: expResult,
        learning: expLearning,
      },
    });
    setExperimentModalRecordId(null);
    setExpHypothesis("");
    setExpResult("");
    setExpLearning("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Kanban className="w-6 h-6 text-cyan-400" /> Saved Intelligence & Action Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track validation progress, manage next execution actions, log real-world experiment results, and advance through lifecycle stages.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-cyan-300">
          {records.length} Opportunities Tracked
        </span>
      </div>

      {/* Status Columns Kanban / Grouping */}
      {records.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0b0f17] border border-slate-800 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No opportunities in tracker yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse the Opportunity Discovery Engine and click &quot;Save Opportunity&quot; to begin tracking your validation workflow.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {statuses.map((statusKey) => {
            const recordsInStatus = records.filter((r) => r.status === statusKey);
            if (recordsInStatus.length === 0) return null;

            return (
              <div key={statusKey} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${statusLabels[statusKey].color}`}>
                    {statusLabels[statusKey].label} ({recordsInStatus.length})
                  </span>
                </div>

                <div className="space-y-4">
                  {recordsInStatus.map((record) => {
                    const opp = allOpportunities.find((o) => o.id === record.opportunityId);
                    const isEditing = editingRecordId === record.id;

                    return (
                      <div
                        key={record.id}
                        className="rounded-xl bg-[#0c1017] border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition"
                      >
                        {/* Top row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                              {opp?.category || "Strategic Opportunity"}
                            </span>
                            <h3 className="text-base font-bold text-white hover:text-cyan-300 transition">
                              {opp?.title || record.opportunityId}
                            </h3>
                          </div>

                          {/* Status Dropdown */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-slate-400">Stage:</span>
                            <select
                              value={record.status}
                              onChange={(e) =>
                                onUpdateRecord(record.id, {
                                  status: e.target.value as OpportunityStatus,
                                })
                              }
                              className="bg-[#080c13] border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                            >
                              {statuses.map((s) => (
                                <option key={s} value={s}>
                                  {statusLabels[s].label}
                                </option>
                              ))}
                            </select>

                            {opp && (
                              <button
                                onClick={() => onSelectOpportunity(opp)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-black text-xs font-semibold text-cyan-300 transition"
                              >
                                Dossier
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar & Next Action */}
                        {isEditing ? (
                          <div className="space-y-3 bg-[#080c13] p-4 rounded-lg border border-slate-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                              <div>
                                <label className="block text-slate-400 font-medium mb-1">Next Action</label>
                                <input
                                  type="text"
                                  value={activeNextAction}
                                  onChange={(e) => setActiveNextAction(e.target.value)}
                                  className="w-full bg-[#0c1017] border border-slate-600 rounded px-2.5 py-1.5 text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-slate-400 font-medium mb-1">Target Date</label>
                                <input
                                  type="date"
                                  value={activeTargetDate}
                                  onChange={(e) => setActiveTargetDate(e.target.value)}
                                  className="w-full bg-[#0c1017] border border-slate-600 rounded px-2.5 py-1.5 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Progress:</span>
                                <span className="font-mono text-cyan-400 font-bold">{activeProgress}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={activeProgress}
                                onChange={(e) => setActiveProgress(Number(e.target.value))}
                                className="w-full accent-cyan-500"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-400 font-medium mb-1 text-xs">Research & Personal Notes</label>
                              <textarea
                                value={activeNotes}
                                onChange={(e) => setActiveNotes(e.target.value)}
                                rows={3}
                                className="w-full bg-[#0c1017] border border-slate-600 rounded p-2 text-xs text-slate-200"
                              />
                            </div>

                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                onClick={() => setEditingRecordId(null)}
                                className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => saveEditing(record.id)}
                                className="px-3 py-1 rounded bg-cyan-500 text-xs font-bold text-black flex items-center gap-1"
                              >
                                <Save className="w-3.5 h-3.5" /> Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                              <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800/80 md:col-span-2">
                                <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                                  Current Next Action:
                                </span>
                                <p className="text-slate-200 font-medium">{record.nextAction}</p>
                              </div>

                              <div className="p-3 rounded-lg bg-[#0e141f] border border-slate-800/80">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] uppercase font-bold text-slate-400">Target Date:</span>
                                  <span className="font-mono text-slate-200">{record.targetDate}</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 mb-1">
                                  <span>Execution Progress</span>
                                  <span className="font-mono text-cyan-400 font-bold">{record.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-500 rounded-full"
                                    style={{ width: `${record.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            {record.notes && (
                              <div className="p-3 rounded-lg bg-[#080c13] border border-slate-800 text-xs text-slate-300">
                                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                                  Notes & Interview Learnings:
                                </span>
                                <p className="leading-relaxed">{record.notes}</p>
                              </div>
                            )}

                            {/* Completed Experiments Log */}
                            {record.experiments && record.experiments.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                  <TestTube className="w-3.5 h-3.5 text-amber-400" /> Completed Validation Experiments ({record.experiments.length})
                                </span>
                                <div className="space-y-2">
                                  {record.experiments.map((exp) => (
                                    <div
                                      key={exp.id}
                                      className="p-3 rounded-lg bg-[#090d14] border border-amber-900/30 text-xs space-y-1"
                                    >
                                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                                        <span>Experiment #{exp.id}</span>
                                        <span>{exp.date}</span>
                                      </div>
                                      <p className="text-slate-300">
                                        <strong className="text-amber-300">Hypothesis:</strong> {exp.hypothesis}
                                      </p>
                                      <p className="text-slate-300">
                                        <strong className="text-sky-300">Result:</strong> {exp.result}
                                      </p>
                                      <p className="text-emerald-300">
                                        <strong>Learning:</strong> {exp.learning}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Card Action Buttons */}
                            <div className="pt-2 flex items-center justify-between text-xs">
                              <button
                                onClick={() => setExperimentModalRecordId(record.id)}
                                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> Log Experiment Result
                              </button>

                              <button
                                onClick={() => startEditing(record)}
                                className="text-slate-400 hover:text-white font-medium flex items-center gap-1"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit Action & Notes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Log Experiment Modal */}
      {experimentModalRecordId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0c1017] border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TestTube className="w-5 h-5 text-amber-400" /> Log Cheap Validation Experiment
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tested Hypothesis</label>
                <input
                  type="text"
                  value={expHypothesis}
                  onChange={(e) => setExpHypothesis(e.target.value)}
                  placeholder="e.g. Founders lack automated compliance auditing for EU AI Act."
                  className="w-full bg-[#080c13] border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Empirical Result</label>
                <input
                  type="text"
                  value={expResult}
                  onChange={(e) => setExpResult(e.target.value)}
                  placeholder="e.g. Conducted 5 user calls; 4 confirmed pain, 2 offered to pay."
                  className="w-full bg-[#080c13] border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Key Strategic Learning</label>
                <textarea
                  value={expLearning}
                  onChange={(e) => setExpLearning(e.target.value)}
                  rows={2}
                  placeholder="e.g. Reframe marketing message around avoiding regulatory fines."
                  className="w-full bg-[#080c13] border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setExperimentModalRecordId(null)}
                className="px-3 py-1.5 rounded bg-slate-800 text-xs text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddExperiment(experimentModalRecordId)}
                className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-xs font-bold text-black"
              >
                Save Experiment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
