"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types";
import {
  User,
  Sliders,
  Clock,
  DollarSign,
  ShieldAlert,
  Dna,
  Save,
  CheckCircle2,
  Plus,
  X,
  Target,
  Sparkles,
} from "lucide-react";

interface ProfileSettingsViewProps {
  profile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

export function ProfileSettingsView({ profile, onSaveProfile }: ProfileSettingsViewProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [newSkill, setNewSkill] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newConstraint, setNewConstraint] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setFormData({ ...formData, goals: [...formData.goals, newGoal.trim()] });
      setNewGoal("");
    }
  };

  const removeGoal = (idx: number) => {
    setFormData({ ...formData, goals: formData.goals.filter((_, i) => i !== idx) });
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setFormData({ ...formData, constraints: [...formData.constraints, newConstraint.trim()] });
      setNewConstraint("");
    }
  };

  const removeConstraint = (idx: number) => {
    setFormData({ ...formData, constraints: formData.constraints.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" /> Personal Advantage & Work DNA Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Define your unique capabilities, capital constraints, time budget, and Work DNA to calculate personalized fit scores for every opportunity.
          </p>
        </div>

        {saveSuccess && (
          <span className="text-xs font-semibold px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated & Scores Recalculated!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Bio */}
        <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Identity & Background</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Current Role / Persona</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-400 font-semibold mb-1">Professional / Academic Background</label>
            <textarea
              rows={2}
              value={formData.background}
              onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg p-3 text-white text-xs"
            />
          </div>
        </div>

        {/* Work DNA Card */}
        <div className="p-5 rounded-xl bg-[#0c1017] border border-cyan-900/40 space-y-4">
          <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
            <Dna className="w-4 h-4 text-cyan-400" /> Work DNA & Primary Superpower
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Archetype</label>
              <select
                value={formData.workDNA.archetype}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workDNA: { ...formData.workDNA, archetype: e.target.value as any },
                  })
                }
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="Builder / Architect">Builder / Architect (Product & Code)</option>
                <option value="Operator / Scaler">Operator / Scaler (Execution & Systems)</option>
                <option value="Researcher / Theorist">Researcher / Theorist (Deep Science & Rigor)</option>
                <option value="Dealmaker / Connector">Dealmaker / Connector (Sales & Partnerships)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Preferred Work Style</label>
              <select
                value={formData.workDNA.workStyle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workDNA: { ...formData.workDNA, workStyle: e.target.value as any },
                  })
                }
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="Async Deep Work">Async Deep Work (Autonomous Concentration)</option>
                <option value="Rapid Iteration & Prototyping">Rapid Iteration & Prototyping (Fast feedback)</option>
                <option value="Community-Centric">Community-Centric (High-collaboration)</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-400 font-semibold mb-1">Primary Unfair Advantage / Superpower</label>
            <input
              type="text"
              value={formData.workDNA.primarySuperpower}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  workDNA: { ...formData.workDNA, primarySuperpower: e.target.value },
                })
              }
              className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
            />
          </div>
        </div>

        {/* Resources & Constraints */}
        <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Resources, Capital & Risk Posture</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-slate-400">
                <span>Available Weekly Hours:</span>
                <span className="font-mono text-cyan-400 font-bold">{formData.availableHours}h / wk</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={formData.availableHours}
                onChange={(e) => setFormData({ ...formData, availableHours: Number(e.target.value) })}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Capital / Budget Runway</label>
              <select
                value={formData.capitalRange}
                onChange={(e) => setFormData({ ...formData, capitalRange: e.target.value as any })}
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="Bootstrap (<$1k)">Bootstrap (&lt;$1k)</option>
                <option value="Seed ($1k-$10k)">Seed ($1k-$10k)</option>
                <option value="Growth ($10k-$50k)">Growth ($10k-$50k)</option>
                <option value="Institutional ($50k+)">Institutional ($50k+)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Risk Tolerance</label>
              <select
                value={formData.riskTolerance}
                onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value as any })}
                className="w-full bg-[#080c13] border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive</option>
                <option value="Contrarian High-Risk">Contrarian High-Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Management */}
        <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Skills & Technical Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e141f] border border-slate-700 text-xs text-slate-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add skill (e.g. Distributed Systems, Rust, Energy Finance)..."
              className="flex-1 bg-[#080c13] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Goals & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Goals */}
          <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Strategic Goals
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {formData.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 bg-[#080c13] p-2 rounded">
                  <span>• {goal}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(idx)}
                    className="text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add strategic milestone..."
                className="flex-1 bg-[#080c13] border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
              <button
                type="button"
                onClick={addGoal}
                className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Constraints */}
          <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> Personal Constraints
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {formData.constraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 bg-[#080c13] p-2 rounded">
                  <span>⚠ {constraint}</span>
                  <button
                    type="button"
                    onClick={() => removeConstraint(idx)}
                    className="text-slate-500 hover:text-rose-400 shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newConstraint}
                onChange={(e) => setNewConstraint(e.target.value)}
                placeholder="Add constraint (e.g. day job, budget)..."
                className="flex-1 bg-[#080c13] border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
              <button
                type="button"
                onClick={addConstraint}
                className="px-2.5 py-1 rounded bg-slate-800 text-xs text-slate-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Save Profile & Update Personal Fit
          </button>
        </div>
      </form>
    </div>
  );
}
